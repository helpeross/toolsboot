var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  emptyInput: z ? "输入为空" : "Empty input",
  invalidJS: z ? "无法解析：存在未闭合的字符串、注释或模板串" : "Cannot parse: unterminated string, comment or template literal",
  bytesOut: z ? "字节" : "bytes",
  charsOut: z ? "字符" : "chars",
  zh: z
}; })();

/* __TB_I18N__ */
var TB_L = (document.documentElement.lang === "zh-cn") ? {
  copiedOk: '<span class="text-emerald-600 dark:text-emerald-400 font-medium">已复制到剪贴板</span>',
  pastedOk: '<span class="text-emerald-600 dark:text-emerald-400 font-medium">已从剪贴板粘贴</span>',
  copyFail: '<span class="text-red-500 dark:text-red-400 font-medium">复制失败</span>',
  clipUnavail: '<span class="text-red-500 dark:text-red-400 font-medium">剪贴板不可用</span>',
  clipBlocked: '<span class="text-red-500 dark:text-red-400 font-medium">剪贴板读取被阻止 - 请改用 Ctrl+V</span>',
  clipNoApi: '<span class="text-red-500 dark:text-red-400 font-medium">剪贴板 API 不可用 - 请改用 Ctrl+V</span>'
} : {
  copiedOk: '<span class="text-emerald-600 dark:text-emerald-400 font-medium">Copied to clipboard</span>',
  pastedOk: '<span class="text-emerald-600 dark:text-emerald-400 font-medium">Pasted from clipboard</span>',
  copyFail: '<span class="text-red-500 dark:text-red-400 font-medium">Copy failed</span>',
  clipUnavail: '<span class="text-red-500 dark:text-red-400 font-medium">Clipboard unavailable</span>',
  clipBlocked: '<span class="text-red-500 dark:text-red-400 font-medium">Clipboard read blocked - use Ctrl+V instead</span>',
  clipNoApi: '<span class="text-red-500 dark:text-red-400 font-medium">Clipboard API unavailable - use Ctrl+V instead</span>'
};

(function () {
  "use strict";
  var el = {
    input: document.getElementById("jsf-input"),
    output: document.getElementById("jsf-output"),
    status: document.getElementById("jsf-status"),
    live: document.getElementById("jsf-live"),
    copy: document.getElementById("jsf-copy"),
    clear: document.getElementById("jsf-clear"),
    formatBtn: document.getElementById("jsf-format"),
    minifyBtn: document.getElementById("jsf-minify"),
    resizer: document.getElementById("jsf-resizer"),
    left: document.getElementById("jsf-left"),
    right: document.getElementById("jsf-right"),
    panels: document.getElementById("jsf-panels"),
    layout: document.getElementById("jsf-layout"),
    layoutStack: document.getElementById("jsf-layout-stack"),
    layoutCol: document.getElementById("jsf-layout-col"),
    tool: document.getElementById("jsf-tool"),
    fullscreen: document.getElementById("jsf-fullscreen"),
    fsEnter: document.getElementById("jsf-fs-enter"),
    fsExit: document.getElementById("jsf-fs-exit")
  };
  var mode = "format";
  var PRE_VALUE = { return: 1, typeof: 1, instanceof: 1, "in": 1, "of": 1, "new": 1, delete: 1, void: 1, throw: 1, case: 1, do: 1, else: 1, yield: 1, await: 1 };

  function tokenizeJS(input) {
    var tokens = [], i = 0, n = input.length;
    var expectValue = true;
    while (i < n) {
      var ch = input[i];
      if (ch === "'" || ch === '"' || ch === "`") {
        var q = ch, j = i + 1, buf = ch, closed = false;
        while (j < n) {
          if (input[j] === "\\") { buf += input.slice(j, j + 2); j += 2; continue; }
          if (input[j] === q) { buf += q; j++; closed = true; break; }
          buf += input[j]; j++;
        }
        if (!closed) throw new Error(L.invalidJS);
        tokens.push({ type: "str", value: buf });
        i = j; expectValue = false;
      } else if (ch === "/" && input[i + 1] === "/") {
        var j2 = input.indexOf("\n", i);
        if (j2 < 0) j2 = n;
        tokens.push({ type: "line", value: input.slice(i, j2) });
        i = j2;
      } else if (ch === "/" && input[i + 1] === "*") {
        var j3 = input.indexOf("*/", i + 2);
        if (j3 < 0) throw new Error(L.invalidJS);
        tokens.push({ type: "block", value: input.slice(i, j3 + 2) });
        i = j3 + 2;
      } else if (ch === "/" && expectValue) {
        var j4 = i + 1, buf2 = "/", closed2 = false;
        while (j4 < n) {
          if (input[j4] === "\\") { buf2 += input.slice(j4, j4 + 2); j4 += 2; continue; }
          if (input[j4] === "/") { buf2 += "/"; j4++; closed2 = true; break; }
          buf2 += input[j4]; j4++;
        }
        if (!closed2) throw new Error(L.invalidJS);
        while (j4 < n && /[a-z]/i.test(input[j4])) { buf2 += input[j4]; j4++; }
        tokens.push({ type: "regex", value: buf2 });
        i = j4; expectValue = false;
      } else if (/\s/.test(ch)) {
        i++;
      } else if (/[a-zA-Z_$]/.test(ch)) {
        var j5 = i;
        while (j5 < n && /[a-zA-Z0-9_$]/.test(input[j5])) j5++;
        var word = input.slice(i, j5);
        tokens.push({ type: "id", value: word });
        i = j5;
        expectValue = !!PRE_VALUE[word];
      } else if (/[0-9]/.test(ch)) {
        var j6 = i;
        while (j6 < n && /[0-9a-fA-FxXoObB.eE]/.test(input[j6])) j6++;
        if (j6 < n && (input[j6] === "+" || input[j6] === "-") && /[eE]/.test(input[j6 - 1])) j6++;
        tokens.push({ type: "num", value: input.slice(i, j6) });
        i = j6; expectValue = false;
      } else {
        var three = input.slice(i, i + 3);
        var two = input.slice(i, i + 2);
        var op = (three === "===" || three === "!==" || three === "**=" || three === ">>>" || three === "...") ? three
          : (two === "=>" || two === "==" || two === "!=" || two === "<=" || two === ">=" || two === "&&" || two === "||" || two === "++" || two === "--" || two === "+=" || two === "-=" || two === "*=" || two === "/=" || two === "%=" || two === "&=" || two === "|=" || two === "^=" || two === "**" || two === "<<" || two === ">>" || two === "??" || two === "?.") ? two : ch;
        tokens.push({ type: "op", value: op });
        i += op.length;
        if (op === ")" || op === "]" || op === "}" || op === "++" || op === "--") { expectValue = false; }
        else if (op === "(" || op === "[" || op === "," || op === ";" || op === ":" || op === "?" || op === "=" || op === "{" || op === "=>" || op === "&&" || op === "||" || op === "??" || op === "+" || op === "-" || op === "*" || op === "/" || op === "%" || op === "!" || op === "~" || op === "&" || op === "|" || op === "^" || op === "<" || op === ">" || op === "===" || op === "!==" || op === "==" || op === "!=" || op === "<=" || op === ">=" || op === "**" || op === "<<" || op === ">>" || op === ">>>" || op === "?." || op === "+=" || op === "-=" || op === "*=" || op === "/=" || op === "%=" || op === "&=" || op === "|=" || op === "^=" || op === "**=") { expectValue = true; }
      }
    }
    return tokens;
  }

  function pad(n) { var s = ""; for (var i = 0; i < n; i++) s += "  "; return s; }

    function formatJS(input) {
    var tokens = tokenizeJS(input);
    var out = [], indent = 0, paren = 0, inFor = false, forParen = 0, atLineStart = true;
    function lastChar() {
      if (!out.length) return "";
      return out[out.length - 1].charAt(out[out.length - 1].length - 1);
    }
    function emit(s) {
      if (atLineStart && s !== "\n") {
        out.push(pad(indent) + s);
        atLineStart = false;
      } else {
        out.push(s);
        atLineStart = (s === "\n");
      }
    }
    function newline() { out.push("\n"); atLineStart = true; }
    function space() { if (!atLineStart && lastChar() !== " ") out.push(" "); }
    for (var k = 0; k < tokens.length; k++) {
      var t = tokens[k], v = t.value;
      if (t.type === "line") { if (!atLineStart) newline(); emit(v); newline(); continue; }
      if (t.type === "block") { if (!atLineStart) space(); emit(v); if (v.charAt(v.length - 1) === "\n") atLineStart = true; continue; }
      if (v === "{") { if (!atLineStart) space(); emit("{"); indent++; newline(); continue; }
      if (v === "}") { indent = Math.max(0, indent - 1); newline(); emit("}"); continue; }
      if (v === "(") {
        if (!atLineStart && /[a-zA-Z0-9_$)\]"]/.test(lastChar())) space();
        emit("(");
        paren++;
        if (paren === 1) {
          var scan = out.join("").replace(/\s+$/, "");
          inFor = /for\s*$/.test(scan);
          if (inFor) forParen = 1;
        }
        continue;
      }
      if (v === ")") { emit(")"); paren = Math.max(0, paren - 1); if (inFor && forParen > 0) { forParen--; if (forParen <= 0) inFor = false; } continue; }
      if (v === ";") { emit(";"); if (inFor) emit(" "); else newline(); continue; }
      if (v === ",") { emit(","); emit(" "); continue; }
      if (v === ":") { emit(": "); continue; }
      if (v === "." || v === "?." || v === "...") { emit(v); continue; }
      if (v === "[") { if (!atLineStart && /[a-zA-Z0-9_$)\]"]/.test(lastChar())) space(); emit("["); continue; }
      if (v === "]") { emit("]"); continue; }
      if (t.type === "op") { if (!atLineStart) space(); emit(v); space(); continue; }
      if (!atLineStart && /[a-zA-Z0-9_$)\]"]/.test(lastChar())) space();
      emit(v);
    }
    return out.join("").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  }

  function minifyJS(input) {
    var tokens = tokenizeJS(input);
    var out = "", prevType = "", prevVal = "";
    for (var k = 0; k < tokens.length; k++) {
      var t = tokens[k], v = t.value;
      if (t.type === "line" || t.type === "block") continue;
      var needSpace = false;
      if ((prevType === "id" || prevType === "num" || prevType === "regex") && (t.type === "id" || t.type === "num" || t.type === "regex")) needSpace = true;
      if (prevType === "str" && t.type === "str") needSpace = true;
      if (prevVal === "return" || prevVal === "typeof" || prevVal === "new" || prevVal === "case" || prevVal === "in" || prevVal === "of" || prevVal === "instanceof") needSpace = true;
      if (needSpace && out) out += " ";
      out += v;
      prevType = t.type; prevVal = v;
    }
    return out;
  }

  function update() {
    var raw = el.input.value;
    if (!raw) { el.output.value = ""; setStatus(""); return; }
    try {
      var res = mode === "format" ? formatJS(raw) : minifyJS(raw);
      el.output.value = res;
      var bytes = new TextEncoder().encode(res).length;
      setStatus('<span class="text-slate-400 dark:text-zinc-500">' + L.bytesOut + ": " + bytes + (mode === "format" ? " · " + L.charsOut + ": " + res.length : "") + "</span>");
    } catch (e) {
      el.output.value = "";
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(e.message) + "</span>");
    }
  }

  function setMode(m) {
    mode = m;
    el.formatBtn.classList.toggle("active", m === "format");
    el.minifyBtn.classList.toggle("active", m === "minify");
    if (el.live.checked) update();
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) { return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function copyOutput() {
    if (!el.output.value) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(el.output.value).then(function () { flashStatus(TB_L.copiedOk); })
        .catch(function () { fallbackCopy(); });
    } else { fallbackCopy(); }
  }
  function fallbackCopy() {
    el.output.select();
    try { document.execCommand("copy"); flashStatus(TB_L.copiedOk); }
    catch (e) { setStatus(TB_L.copyFail); }
  }
  var statusTimer = null;
  function flashStatus(html) {
    var prev = el.status.innerHTML;
    setStatus(html);
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { setStatus(prev); }, 2000);
  }
  function clearAll() {
    el.input.value = ""; el.output.value = ""; setStatus(""); el.input.focus();
  }

  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("jsf-stacked", stacked);
    el.layoutStack.classList.toggle("hidden", stacked);
    el.layoutCol.classList.toggle("hidden", !stacked);
    syncHeight();
  }
  function toggleFullscreen() {
    el.tool.classList.toggle("page-fs");
    var isFs = el.tool.classList.contains("page-fs");
    if (isFs) { el.output.style.height = ""; } else { syncHeight(); }
    el.fsEnter.classList.toggle("hidden", isFs);
    el.fsExit.classList.toggle("hidden", !isFs);
  }
  function initResizer() {
    var dragging = false;
    el.resizer.addEventListener("mousedown", function (e) {
      dragging = true;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      e.preventDefault();
    });
    document.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      var rect = el.panels.getBoundingClientRect();
      var pct = ((e.clientX - rect.left) / rect.width) * 100;
      if (pct < 15) pct = 15;
      if (pct > 85) pct = 85;
      el.left.style.flex = "0 0 " + pct + "%";
      el.left.style.width = pct + "%";
      el.right.style.flex = "1 1 auto";
    });
    document.addEventListener("mouseup", function () {
      if (dragging) { dragging = false; document.body.style.cursor = ""; document.body.style.userSelect = ""; }
    });
  }
  function syncHeight() {
    if (window.innerWidth < 1024) return;
    if (el.tool.classList.contains("page-fs")) return;
    el.output.style.height = el.input.offsetHeight + "px";
  }

  el.input.addEventListener("input", function () { if (el.live.checked) update(); });
  el.live.addEventListener("change", function () { if (el.live.checked) update(); });
  el.formatBtn.addEventListener("click", function () { setMode("format"); });
  el.minifyBtn.addEventListener("click", function () { setMode("minify"); });
  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("jsf-paste");
  function pasteIntoInput() {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function (t) {
        if (t == null) return;
        el.input.value = t;
        el.input.dispatchEvent(new Event("input", { bubbles: true }));
        flashStatus(TB_L.pastedOk);
      }).catch(function () { setStatus(TB_L.clipBlocked); });
    } else { setStatus(TB_L.clipNoApi); }
  }
  pasteBtn.addEventListener("click", pasteIntoInput);

  if (window.ResizeObserver) new ResizeObserver(syncHeight).observe(el.input);
  window.addEventListener("resize", syncHeight);
  initResizer();
  update();
})();

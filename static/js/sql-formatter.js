var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  emptyInput: z ? "输入为空" : "Empty input",
  invalidSQL: z ? "无法解析：存在未闭合的字符串或注释" : "Cannot parse: unterminated string or comment",
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
    input: document.getElementById("sqlf-input"),
    output: document.getElementById("sqlf-output"),
    status: document.getElementById("sqlf-status"),
    live: document.getElementById("sqlf-live"),
    copy: document.getElementById("sqlf-copy"),
    clear: document.getElementById("sqlf-clear"),
    formatBtn: document.getElementById("sqlf-format"),
    minifyBtn: document.getElementById("sqlf-minify"),
    resizer: document.getElementById("sqlf-resizer"),
    left: document.getElementById("sqlf-left"),
    right: document.getElementById("sqlf-right"),
    panels: document.getElementById("sqlf-panels"),
    layout: document.getElementById("sqlf-layout"),
    layoutStack: document.getElementById("sqlf-layout-stack"),
    layoutCol: document.getElementById("sqlf-layout-col"),
    tool: document.getElementById("sqlf-tool"),
    fullscreen: document.getElementById("sqlf-fullscreen"),
    fsEnter: document.getElementById("sqlf-fs-enter"),
    fsExit: document.getElementById("sqlf-fs-exit")
  };
  var mode = "format";
  var KEYWORDS = {};
  var CLAUSES = {};
  var words = ("SELECT FROM WHERE GROUP HAVING ORDER LIMIT OFFSET JOIN INNER LEFT RIGHT FULL OUTER CROSS ON AND OR NOT IN EXISTS BETWEEN LIKE IS NULL UNION ALL INSERT INTO VALUES UPDATE SET DELETE CREATE ALTER DROP INDEX VIEW CASE WHEN THEN ELSE END AS ASC DESC DISTINCT WITH PRIMARY KEY FOREIGN REFERENCES UNIQUE CHECK DEFAULT").split(" ");
  for (var wi = 0; wi < words.length; wi++) KEYWORDS[words[wi]] = 1;
  var clauseWords = ("SELECT FROM WHERE GROUP HAVING ORDER LIMIT OFFSET JOIN INNER LEFT RIGHT FULL OUTER CROSS UNION INSERT INTO VALUES UPDATE SET DELETE CREATE ALTER DROP WITH AND OR").split(" ");
  for (var ci = 0; ci < clauseWords.length; ci++) CLAUSES[clauseWords[ci]] = 1;

  function tokenizeSQL(input) {
    var tokens = [], i = 0, n = input.length;
    while (i < n) {
      var ch = input[i];
      if (ch === "'" || ch === '"') {
        var q = ch, j = i + 1, buf = ch;
        while (j < n) {
          if (input[j] === "\\" && q === "'") { buf += input.slice(j, j + 2); j += 2; continue; }
          if (input[j] === q) {
            if (input[j + 1] === q) { buf += q + q; j += 2; continue; }
            buf += q; j++; break;
          }
          buf += input[j]; j++;
        }
        if (j > n) throw new Error(L.invalidSQL);
        tokens.push({ type: "str", value: buf });
        i = j;
      } else if (ch === "-" && input[i + 1] === "-") {
        var j2 = input.indexOf("\n", i);
        if (j2 < 0) j2 = n;
        tokens.push({ type: "line", value: input.slice(i, j2) });
        i = j2;
      } else if (ch === "/" && input[i + 1] === "*") {
        var j3 = input.indexOf("*/", i + 2);
        if (j3 < 0) throw new Error(L.invalidSQL);
        tokens.push({ type: "block", value: input.slice(i, j3 + 2) });
        i = j3 + 2;
      } else if (ch === "`") {
        var j4 = input.indexOf("`", i + 1);
        if (j4 < 0) throw new Error(L.invalidSQL);
        tokens.push({ type: "id", value: input.slice(i, j4 + 1) });
        i = j4 + 1;
      } else if (/\s/.test(ch)) {
        i++;
      } else if (/[a-zA-Z_$]/.test(ch)) {
        var j5 = i;
        while (j5 < n && /[a-zA-Z0-9_$]/.test(input[j5])) j5++;
        tokens.push({ type: "word", value: input.slice(i, j5) });
        i = j5;
      } else if (/[0-9]/.test(ch)) {
        var j6 = i;
        while (j6 < n && /[0-9a-fA-FxXoObB.eE+-]/.test(input[j6])) {
          if ((input[j6] === "+" || input[j6] === "-") && !/[eE]/.test(input[j6 - 1])) break;
          j6++;
        }
        tokens.push({ type: "num", value: input.slice(i, j6) });
        i = j6;
      } else {
        var two = input.slice(i, i + 2);
        var op = (two === "<=" || two === ">=" || two === "!=" || two === "<>" || two === "||" || two === "&&" || two === ":=") ? two : ch;
        tokens.push({ type: "op", value: op });
        i += op.length;
      }
    }
    return tokens;
  }

  function formatSQL(input) {
    var tokens = tokenizeSQL(input);
    var out = [], depth = 0, atLineStart = true, prevWord = "";
    function pad(n) { var s = ""; for (var i = 0; i < n; i++) s += "  "; return s; }
    function emit(s) {
      if (atLineStart && s !== "\n") { out.push(pad(depth) + s); atLineStart = false; }
      else { out.push(s); atLineStart = (s === "\n"); }
    }
    function newline() { out.push("\n"); atLineStart = true; }
    function space() { if (!atLineStart && out[out.length - 1] !== " ") out.push(" "); }
    for (var k = 0; k < tokens.length; k++) {
      var t = tokens[k], v = t.value;
      if (t.type === "line") { if (!atLineStart) newline(); emit(v); newline(); continue; }
      if (t.type === "block") { if (!atLineStart) space(); emit(v); continue; }
      if (t.type === "str" || t.type === "num") {
        if (!atLineStart) space();
        emit(v);
        prevWord = "";
        continue;
      }
      if (t.type === "op") {
        if (v === "(") {
          if (!atLineStart && /[a-zA-Z0-9_$"']/.test(out[out.length - 1].charAt(out[out.length - 1].length - 1))) { /* no space for function call */ }
          else if (!atLineStart) space();
          emit("(");
          depth++;
        } else if (v === ")") {
          depth = Math.max(0, depth - 1);
          emit(")");
        } else if (v === ",") {
          emit(",");
          if (depth === 0) newline(); else emit(" ");
        } else if (v === ";") {
          emit(";");
          newline();
        } else {
          space();
          emit(v);
          space();
        }
        prevWord = "";
        continue;
      }
      // word / identifier
      var upper = v.toUpperCase();
      var isKeyword = !!KEYWORDS[upper];
      var isClause = !!CLAUSES[upper];
      if (isClause && depth === 0) {
        if (!atLineStart) newline();
        if (prevWord === "GROUP" || prevWord === "ORDER" || prevWord === "HAVING") { /* BY follows on same line */ }
        emit(upper);
        atLineStart = false;
      } else if (isKeyword) {
        if (!atLineStart) space();
        emit(upper);
      } else {
        if (!atLineStart) space();
        emit(v);
      }
      prevWord = upper;
    }
    return out.join("").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  }

  function minifySQL(input) {
    var tokens = tokenizeSQL(input);
    var out = "", prevIsWord = false, curIsWord = false;
    for (var k = 0; k < tokens.length; k++) {
      var t = tokens[k], v = t.value;
      if (t.type === "line" || t.type === "block") continue;
      curIsWord = (t.type === "word") || (t.type === "num") || (t.type === "str");
      if (prevIsWord && curIsWord) out += " ";
      out += v;
      prevIsWord = curIsWord;
    }
    return out;
  }

  function update() {
    var raw = el.input.value;
    if (!raw) { el.output.value = ""; setStatus(""); return; }
    try {
      var res = mode === "format" ? formatSQL(raw) : minifySQL(raw);
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
    el.tool.classList.toggle("sqlf-stacked", stacked);
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

  var pasteBtn = document.getElementById("sqlf-paste");
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

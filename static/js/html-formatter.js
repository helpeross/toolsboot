var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  emptyInput: z ? "输入为空" : "Empty input",
  invalidHTML: z ? "无法解析：HTML 结构不完整（存在未闭合的标签）" : "Cannot parse: incomplete HTML structure (unclosed tags)",
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
    input: document.getElementById("htmlf-input"),
    output: document.getElementById("htmlf-output"),
    status: document.getElementById("htmlf-status"),
    live: document.getElementById("htmlf-live"),
    copy: document.getElementById("htmlf-copy"),
    clear: document.getElementById("htmlf-clear"),
    formatBtn: document.getElementById("htmlf-format"),
    minifyBtn: document.getElementById("htmlf-minify"),
    resizer: document.getElementById("htmlf-resizer"),
    left: document.getElementById("htmlf-left"),
    right: document.getElementById("htmlf-right"),
    panels: document.getElementById("htmlf-panels"),
    layout: document.getElementById("htmlf-layout"),
    layoutStack: document.getElementById("htmlf-layout-stack"),
    layoutCol: document.getElementById("htmlf-layout-col"),
    tool: document.getElementById("htmlf-tool"),
    fullscreen: document.getElementById("htmlf-fullscreen"),
    fsEnter: document.getElementById("htmlf-fs-enter"),
    fsExit: document.getElementById("htmlf-fs-exit")
  };
  var mode = "format";
  var VOID = { area: 1, base: 1, br: 1, col: 1, embed: 1, hr: 1, img: 1, input: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1 };
  var RAW = { script: 1, style: 1, pre: 1, textarea: 1 };

  function pad(n) { var s = ""; for (var i = 0; i < n; i++) s += "  "; return s; }

  function tagName(tag) {
    var m = /^<\/?\s*([a-zA-Z][a-zA-Z0-9-]*)/.exec(tag);
    return m ? m[1].toLowerCase() : "";
  }

  function formatHTML(input) {
    var out = [], indent = 0, i = 0, len = input.length;
    while (i < len) {
      if (input[i] === "<") {
        if (input.startsWith("<!--", i)) {
          var e1 = input.indexOf("-->", i + 4);
          if (e1 < 0) throw new Error(L.invalidHTML);
          out.push(pad(indent) + input.slice(i, e1 + 3)); i = e1 + 3;
        } else if (input.startsWith("<!", i)) {
          var e2 = input.indexOf(">", i + 2);
          if (e2 < 0) throw new Error(L.invalidHTML);
          out.push(pad(indent) + input.slice(i, e2 + 1)); i = e2 + 1;
        } else if (input.startsWith("</", i)) {
          var e3 = input.indexOf(">", i + 2);
          if (e3 < 0) throw new Error(L.invalidHTML);
          indent = Math.max(0, indent - 1);
          out.push(pad(indent) + input.slice(i, e3 + 1)); i = e3 + 1;
        } else {
          var e4 = input.indexOf(">", i + 1);
          if (e4 < 0) throw new Error(L.invalidHTML);
          var tag = input.slice(i, e4 + 1);
          out.push(pad(indent) + tag);
          var name = tagName(tag);
          if (!VOID[name] && !/\/>$/.test(tag)) indent++;
          i = e4 + 1;
          if (RAW[name]) {
            var close = "</" + name;
            var ci = input.toLowerCase().indexOf(close, i);
            if (ci < 0) throw new Error(L.invalidHTML);
            var content = input.slice(i, ci).trim();
            if (content) out.push(pad(indent) + content);
            indent = Math.max(0, indent - 1);
            var ce = input.indexOf(">", ci);
            out.push(pad(indent) + input.slice(ci, ce + 1));
            i = ce + 1;
          }
        }
      } else {
        var e5 = input.indexOf("<", i);
        var text = e5 < 0 ? input.slice(i) : input.slice(i, e5);
        var t = text.trim();
        if (t) out.push(pad(indent) + t);
        if (e5 < 0) break;
        i = e5;
      }
    }
    return out.join("\n");
  }

  function minifyHTML(input) {
    var out = "", i = 0, len = input.length;
    while (i < len) {
      if (input[i] === "<") {
        if (input.startsWith("<!--", i)) {
          var e1 = input.indexOf("-->", i + 4);
          if (e1 < 0) throw new Error(L.invalidHTML);
          out += input.slice(i, e1 + 3); i = e1 + 3;
        } else {
          var e2 = input.indexOf(">", i + 1);
          if (e2 < 0) throw new Error(L.invalidHTML);
          var tag = input.slice(i, e2 + 1);
          out += tag; i = e2 + 1;
          var name = tagName(tag);
          if (RAW[name]) {
            var close = "</" + name;
            var ci = input.toLowerCase().indexOf(close, i);
            if (ci < 0) throw new Error(L.invalidHTML);
            out += input.slice(i, ci);
            var ce = input.indexOf(">", ci);
            out += input.slice(ci, ce + 1);
            i = ce + 1;
          }
        }
      } else {
        var e3 = input.indexOf("<", i);
        var text = e3 < 0 ? input.slice(i) : input.slice(i, e3);
        if (text.trim()) out += text.trim();
        if (e3 < 0) break;
        i = e3;
      }
    }
    return out;
  }

  function update() {
    var raw = el.input.value;
    if (!raw) { el.output.value = ""; setStatus(""); return; }
    try {
      var res = mode === "format" ? formatHTML(raw) : minifyHTML(raw);
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
    el.tool.classList.toggle("htmlf-stacked", stacked);
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

  var pasteBtn = document.getElementById("htmlf-paste");
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

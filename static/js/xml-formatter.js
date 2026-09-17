var L=(function(){var z=document.documentElement.lang==="zh-cn";return {
inBytes:z?"输入 ":"In: ",
outBytes:z?"输出 ":"Out: ",
copied:z?"已复制到剪贴板":"Copied to clipboard",
copyFailed:z?"复制失败":"Copy failed",
clipUnavail:z?"剪贴板不可用":"Clipboard unavailable",
pasteBlocked:z?"剪贴板读取被阻止——请按 Ctrl+V 粘贴":"Clipboard read blocked - press Ctrl+V instead",
pasteUnavail:z?"剪贴板 API 不可用——请按 Ctrl+V 粘贴":"Clipboard API unavailable - press Ctrl+V instead",
pasted:z?"已从剪贴板粘贴":"Pasted from clipboard",
emptyInput:z?"输入为空":"Empty input",
badXml:z?"不是有效的 XML：":"Not valid XML: ",
validXml:z?"XML 有效":"XML is valid",
minified:z?"已压缩":"minified",
formatted:z?"已格式化":"formatted",
localRun:z?"所有处理均在浏览器本地完成。":"All processing runs locally in your browser."
,
zh:z,
fmt:z?"格式化":"Format",
minify:z?"压缩":"Minify"
};})();

/*!
 * XML Formatter - ToolsBoot
 * Pretty-print / minify / validate XML using DOMParser (local only).
 */
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
    input: document.getElementById("xfmt-input"),
    output: document.getElementById("xfmt-output"),
    status: document.getElementById("xfmt-status"),
    live: document.getElementById("xfmt-live"),
    copy: document.getElementById("xfmt-copy"),
    clear: document.getElementById("xfmt-clear"),
    resizer: document.getElementById("xfmt-resizer"),
    left: document.getElementById("xfmt-left"),
    right: document.getElementById("xfmt-right"),
    panels: document.getElementById("xfmt-panels"),
    layout: document.getElementById("xfmt-layout"),
    layoutStack: document.getElementById("xfmt-layout-stack"),
    layoutCol: document.getElementById("xfmt-layout-col"),
    tool: document.getElementById("xfmt-tool"),
    fullscreen: document.getElementById("xfmt-fullscreen"),
    fsEnter: document.getElementById("xfmt-fs-enter"),
    fsExit: document.getElementById("xfmt-fs-exit")
  };

  var mode = "fmt"; // "fmt" | "min"

  function parseXml(xml) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(xml, "application/xml");
    var err = doc.getElementsByTagName("parsererror");
    if (err.length > 0) {
      var msg = err[0].textContent.trim().split("\n")[0];
      throw new Error(msg);
    }
    return doc;
  }

  // Pretty-print: re-serialize with 2-space indentation
  function formatXml(doc) {
    var xml = new XMLSerializer().serializeToString(doc);
    var out = "";
    var indent = 0;
    var tokens = xml.replace(/>\s*</g, "><").split("><");
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      var isClose = t.charAt(0) === "/";
      var isOpen = t.charAt(0) !== "/" && t.charAt(0) !== "?" && t.charAt(0) !== "!" && t.indexOf("/") !== t.length - 1 && !/\/>$/.test(t);
      var isSelfClose = /\/>$/.test(t) || t.charAt(0) === "?" || t.charAt(0) === "!";
      if (isClose) indent--;
      if (i > 0) out += "\n";
      out += "  ".repeat(Math.max(indent, 0)) + "<" + t + ">";
      if (isOpen) indent++;
    }
    return out;
  }

  function minifyXml(doc) {
    return new XMLSerializer().serializeToString(doc).replace(/>\s*</g, "><").trim();
  }

  var debounceTimer = null;
  function update() {
    var raw = el.input.value;
    if (!raw) {
      el.output.value = "";
      setStatus("");
      return;
    }
    try {
      var doc = parseXml(raw);
      var result = mode === "fmt" ? formatXml(doc) : minifyXml(doc);
      el.output.value = result;
      var inBytes = new TextEncoder().encode(raw).length;
      var outBytes = new TextEncoder().encode(result).length;
      var saved = mode === "min" && inBytes > 0
        ? Math.max(0, Math.round((1 - outBytes / inBytes) * 100)) + "%"
        : "";
      setStatus(
        '<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.validXml + "</span>" +
        ' <span class="text-slate-300 dark:text-zinc-600">|</span> ' +
        '<span class="text-slate-400 dark:text-zinc-500">' + L.inBytes + inBytes + "</span>" +
        ' <span class="text-slate-300 dark:text-zinc-600">|</span> ' +
        '<span class="text-slate-400 dark:text-zinc-500">' + L.outBytes + outBytes + "</span>" +
        (saved ? ' <span class="text-slate-300 dark:text-zinc-600">|</span> <span class="text-brand-600 dark:text-brand-400 font-medium">-' + saved + "</span>" : "")
      );
    } catch (e) {
      el.output.value = "";
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.badXml + e.message) + "</span>");
    }
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function copyOutput() {
    if (!el.output.value) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(el.output.value).then(function () {
        flashStatus(TB_L.copiedOk);
      }).catch(function () { fallbackCopy(); });
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
    el.input.value = "";
    el.output.value = "";
    setStatus("");
    el.input.focus();
  }

  // ---- Layout / fullscreen / resizer ----
  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("xfmt-stacked", stacked);
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
      if (dragging) {
        dragging = false;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    });
  }

  function syncHeight() {
    if (window.innerWidth < 1024) return;
    if (el.tool.classList.contains("page-fs")) return;
    el.output.style.height = el.input.offsetHeight + "px";
  }

  // ---- Events ----
  el.input.addEventListener("input", function () {
    if (el.live.checked) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(update, 200);
    }
  });
  el.live.addEventListener("change", function () { if (el.live.checked) update(); });
  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("xfmt-paste");
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

  if (window.ResizeObserver) {
    new ResizeObserver(syncHeight).observe(el.input);
  }
  window.addEventListener("resize", syncHeight);

  el.input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      update();
    }
  });

  initResizer();
  update();
})();

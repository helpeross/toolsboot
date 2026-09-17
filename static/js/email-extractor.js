var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  clipUnavail: z ? "剪贴板不可用" : "Clipboard unavailable",
  pasteBlocked: z ? "剪贴板读取被阻止——请按 Ctrl+V 粘贴" : "Clipboard read blocked - press Ctrl+V instead",
  pasteUnavail: z ? "剪贴板 API 不可用——请按 Ctrl+V 粘贴" : "Clipboard API unavailable - press Ctrl+V instead",
  pasted: z ? "已从剪贴板粘贴" : "Pasted from clipboard",
  emptyInput: z ? "输入为空" : "Empty input",
  found: z ? "个邮箱" : "emails found",
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
    input: document.getElementById("emx-input"),
    output: document.getElementById("emx-output"),
    status: document.getElementById("emx-status"),
    dedupe: document.getElementById("emx-dedupe"),
    copy: document.getElementById("emx-copy"),
    clear: document.getElementById("emx-clear"),
    resizer: document.getElementById("emx-resizer"),
    left: document.getElementById("emx-left"),
    right: document.getElementById("emx-right"),
    panels: document.getElementById("emx-panels"),
    layout: document.getElementById("emx-layout"),
    layoutStack: document.getElementById("emx-layout-stack"),
    layoutCol: document.getElementById("emx-layout-col"),
    tool: document.getElementById("emx-tool"),
    fullscreen: document.getElementById("emx-fullscreen"),
    fsEnter: document.getElementById("emx-fs-enter"),
    fsExit: document.getElementById("emx-fs-exit")
  };
  var EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

  function update() {
    var raw = el.input.value;
    if (!raw) { el.output.value = ""; setStatus(""); return; }
    var matches = raw.match(EMAIL_RE) || [];
    var emails = el.dedupe.checked ? Array.from(new Set(matches)) : matches;
    el.output.value = emails.join("\n");
    setStatus('<span class="text-slate-400 dark:text-zinc-500">' + emails.length + " " + L.found + "</span>");
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
    el.tool.classList.toggle("emx-stacked", stacked);
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

  el.input.addEventListener("input", update);
  el.dedupe.addEventListener("change", update);
  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("emx-paste");
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

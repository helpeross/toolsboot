var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  clipUnavail: z ? "剪贴板不可用" : "Clipboard unavailable",
  pasteBlocked: z ? "剪贴板读取被阻止——请按 Ctrl+V 粘贴" : "Clipboard read blocked - press Ctrl+V instead",
  pasteUnavail: z ? "剪贴板 API 不可用——请按 Ctrl+V 粘贴" : "Clipboard API unavailable - press Ctrl+V instead",
  pasted: z ? "已从剪贴板粘贴" : "Pasted from clipboard",
  generated: z ? "已生成" : "Generated",
  invalidCount: z ? "数量需在 1–1000 之间" : "Count must be between 1 and 1000",
  invalidLen: z ? "长度需在 4–64 之间" : "Length must be between 4 and 64",
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
    count: document.getElementById("oid-count"),
    countRange: document.getElementById("oid-count-range"),
    length: document.getElementById("oid-length"),
    lenVal: document.getElementById("oid-len-val"),
    alphabet: document.getElementById("oid-alphabet"),
    generate: document.getElementById("oid-generate"),
    output: document.getElementById("oid-output"),
    status: document.getElementById("oid-status"),
    copy: document.getElementById("oid-copy"),
    clear: document.getElementById("oid-clear"),
    resizer: document.getElementById("oid-resizer"),
    left: document.getElementById("oid-left"),
    right: document.getElementById("oid-right"),
    panels: document.getElementById("oid-panels"),
    layout: document.getElementById("oid-layout"),
    layoutStack: document.getElementById("oid-layout-stack"),
    layoutCol: document.getElementById("oid-layout-col"),
    tool: document.getElementById("oid-tool"),
    fullscreen: document.getElementById("oid-fullscreen"),
    fsEnter: document.getElementById("oid-fs-enter"),
    fsExit: document.getElementById("oid-fs-exit")
  };
  var DEFAULT_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-";

  function randomIndex(len) {
    if (window.crypto && window.crypto.getRandomValues) {
      var arr = new Uint32Array(1);
      window.crypto.getRandomValues(arr);
      return arr[0] % len;
    }
    return Math.floor(Math.random() * len);
  }
  function genOne(alphabet, len) {
    var out = "";
    for (var i = 0; i < len; i++) out += alphabet[randomIndex(alphabet.length)];
    return out;
  }
  function generate() {
    var count = Math.min(1000, Math.max(1, parseInt(el.count.value, 10) || 10));
    var len = Math.min(64, Math.max(4, parseInt(el.length.value, 10) || 21));
    var alphabet = el.alphabet.value || DEFAULT_ALPHABET;
    var lines = [];
    for (var i = 0; i < count; i++) lines.push(genOne(alphabet, len));
    el.output.value = lines.join("\n");
    setStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.generated + " " + count + "</span>");
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
    el.output.value = ""; setStatus("");
  }

  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("oid-stacked", stacked);
    el.layoutStack.classList.toggle("hidden", stacked);
    el.layoutCol.classList.toggle("hidden", !stacked);
  }
  function toggleFullscreen() {
    el.tool.classList.toggle("page-fs");
    var isFs = el.tool.classList.contains("page-fs");
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

  el.count.addEventListener("input", function () {
    var v = Math.min(1000, Math.max(1, parseInt(el.count.value, 10) || 1));
    el.countRange.value = v;
  });
  el.countRange.addEventListener("input", function () {
    el.count.value = el.countRange.value;
  });
  el.length.addEventListener("input", function () {
    el.lenVal.textContent = el.length.value;
  });
  el.generate.addEventListener("click", function () {
    generate();
  });
  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  initResizer();
  generate();
})();

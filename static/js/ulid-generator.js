var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  clipUnavail: z ? "剪贴板不可用" : "Clipboard unavailable",
  pasteBlocked: z ? "剪贴板读取被阻止——请按 Ctrl+V 粘贴" : "Clipboard read blocked - press Ctrl+V instead",
  pasteUnavail: z ? "剪贴板 API 不可用——请按 Ctrl+V 粘贴" : "Clipboard API unavailable - press Ctrl+V instead",
  pasted: z ? "已从剪贴板粘贴" : "Pasted from clipboard",
  generated: z ? "已生成" : "Generated",
  invalidUlid: z ? "不是有效的 ULID" : "Not a valid ULID",
  timestamp: z ? "时间戳" : "Timestamp",
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
    count: document.getElementById("ulid-count"),
    countRange: document.getElementById("ulid-count-range"),
    generate: document.getElementById("ulid-generate"),
    decodeInput: document.getElementById("ulid-decode-input"),
    decodeBtn: document.getElementById("ulid-decode"),
    decoded: document.getElementById("ulid-decoded"),
    output: document.getElementById("ulid-output"),
    status: document.getElementById("ulid-status"),
    copy: document.getElementById("ulid-copy"),
    clear: document.getElementById("ulid-clear"),
    resizer: document.getElementById("ulid-resizer"),
    left: document.getElementById("ulid-left"),
    right: document.getElementById("ulid-right"),
    panels: document.getElementById("ulid-panels"),
    layout: document.getElementById("ulid-layout"),
    layoutStack: document.getElementById("ulid-layout-stack"),
    layoutCol: document.getElementById("ulid-layout-col"),
    tool: document.getElementById("ulid-tool"),
    fullscreen: document.getElementById("ulid-fullscreen"),
    fsEnter: document.getElementById("ulid-fs-enter"),
    fsExit: document.getElementById("ulid-fs-exit")
  };
  var CROCKFORD = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

  function encodeBase32(n, len) {
    var out = "";
    for (var i = 0; i < len; i++) { out = CROCKFORD[n % 32] + out; n = Math.floor(n / 32); }
    return out;
  }
  function genUlid() {
    var time = Date.now();
    var ts = encodeBase32(time, 10);
    var rand = "";
    var arr = new Uint8Array(10);
    if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(arr);
    else for (var i = 0; i < 10; i++) arr[i] = Math.floor(Math.random() * 256);
    for (var j = 0; j < 10; j++) rand += CROCKFORD[arr[j] & 31];
    return ts + rand;
  }
  function generate() {
    var count = Math.min(1000, Math.max(1, parseInt(el.count.value, 10) || 10));
    var lines = [];
    for (var i = 0; i < count; i++) lines.push(genUlid());
    el.output.value = lines.join("\n");
    setStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.generated + " " + count + "</span>");
  }
  function decode() {
    var s = el.decodeInput.value.trim().toUpperCase();
    if (!/^[0-9A-HJKMNP-TV-Z]{26}$/.test(s)) {
      el.decoded.textContent = L.invalidUlid;
      return;
    }
    var time = 0;
    for (var i = 0; i < 10; i++) { time = time * 32 + CROCKFORD.indexOf(s[i]); }
    var d = new Date(time);
    el.decoded.textContent = L.timestamp + ": " + time + " · " + d.toISOString().replace("T", " ").slice(0, 19) + " UTC";
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
    el.output.value = ""; el.decoded.textContent = ""; setStatus("");
  }

  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("ulid-stacked", stacked);
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
  el.generate.addEventListener("click", generate);
  el.decodeBtn.addEventListener("click", decode);
  el.decodeInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") decode();
  });
  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  initResizer();
  generate();
})();

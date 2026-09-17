var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  clipUnavail: z ? "剪贴板不可用" : "Clipboard unavailable",
  pasteBlocked: z ? "剪贴板读取被阻止——请按 Ctrl+V 粘贴" : "Clipboard read blocked - press Ctrl+V instead",
  pasteUnavail: z ? "剪贴板 API 不可用——请按 Ctrl+V 粘贴" : "Clipboard API unavailable - press Ctrl+V instead",
  pasted: z ? "已从剪贴板粘贴" : "Pasted from clipboard",
  emptyInput: z ? "输入为空" : "Empty input",
  invalidB32: z ? "无法解码：不是有效的 Base32 文本（仅允许 A-Z 与 2-7，且长度需正确）" : "Cannot decode: not valid Base32 text (only A-Z and 2-7 allowed)",
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
    input: document.getElementById("b32-input"),
    output: document.getElementById("b32-output"),
    status: document.getElementById("b32-status"),
    live: document.getElementById("b32-live"),
    copy: document.getElementById("b32-copy"),
    clear: document.getElementById("b32-clear"),
    encodeBtn: document.getElementById("b32-encode"),
    decodeBtn: document.getElementById("b32-decode"),
    resizer: document.getElementById("b32-resizer"),
    left: document.getElementById("b32-left"),
    right: document.getElementById("b32-right"),
    panels: document.getElementById("b32-panels"),
    layout: document.getElementById("b32-layout"),
    layoutStack: document.getElementById("b32-layout-stack"),
    layoutCol: document.getElementById("b32-layout-col"),
    tool: document.getElementById("b32-tool"),
    fullscreen: document.getElementById("b32-fullscreen"),
    fsEnter: document.getElementById("b32-fs-enter"),
    fsExit: document.getElementById("b32-fs-exit")
  };
  var mode = "encode";
  var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

  function bytesFromStr(str) {
    var bytes = new TextEncoder().encode(str);
    return Array.prototype.slice.call(bytes);
  }
  function strFromBytes(arr) {
    return new TextDecoder("utf-8", { fatal: false }).decode(new Uint8Array(arr));
  }
  function base32Encode(bytes) {
    var out = "", bits = 0, value = 0;
    for (var i = 0; i < bytes.length; i++) {
      value = (value << 8) | bytes[i];
      bits += 8;
      while (bits >= 5) {
        out += ALPHABET[(value >>> (bits - 5)) & 31];
        bits -= 5;
      }
    }
    if (bits > 0) out += ALPHABET[(value << (5 - bits)) & 31];
    while (out.length % 8 !== 0) out += "=";
    return out;
  }
  function base32Decode(text) {
    var cleaned = text.toUpperCase().replace(/[\s\-]/g, "").replace(/=+$/, "");
    var bytes = [], buffer = 0, bits = 0;
    for (var i = 0; i < cleaned.length; i++) {
      var idx = ALPHABET.indexOf(cleaned[i]);
      if (idx < 0) throw new Error(L.invalidB32);
      buffer = (buffer << 5) | idx;
      bits += 5;
      if (bits >= 8) {
        bytes.push((buffer >>> (bits - 8)) & 255);
        bits -= 8;
      }
    }
    return bytes;
  }

  function update() {
    var raw = el.input.value;
    if (!raw) { el.output.value = ""; setStatus(""); return; }
    try {
      if (mode === "encode") {
        var enc = base32Encode(bytesFromStr(raw));
        el.output.value = enc;
        setStatus('<span class="text-slate-400 dark:text-zinc-500">' + L.bytesOut + ": " + bytesFromStr(raw).length + " → " + L.charsOut + ": " + enc.replace(/=/g, "").length + "</span>");
      } else {
        var dec = strFromBytes(base32Decode(raw));
        el.output.value = dec;
        setStatus('<span class="text-slate-400 dark:text-zinc-500">' + L.charsOut + ": " + raw.replace(/[\s\-=]/g, "").length + " → " + L.bytesOut + ": " + new TextEncoder().encode(dec).length + "</span>");
      }
    } catch (e) {
      el.output.value = "";
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(e.message) + "</span>");
    }
  }

  function setMode(m) {
    mode = m;
    el.encodeBtn.classList.toggle("active", m === "encode");
    el.decodeBtn.classList.toggle("active", m === "decode");
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
    el.tool.classList.toggle("b32-stacked", stacked);
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
  el.encodeBtn.addEventListener("click", function () { setMode("encode"); });
  el.decodeBtn.addEventListener("click", function () { setMode("decode"); });
  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("b32-paste");
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

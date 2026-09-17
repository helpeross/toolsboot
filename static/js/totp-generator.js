var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  clipUnavail: z ? "剪贴板不可用" : "Clipboard unavailable",
  pasteBlocked: z ? "剪贴板读取被阻止——请按 Ctrl+V 粘贴" : "Clipboard read blocked - press Ctrl+V instead",
  pasteUnavail: z ? "剪贴板 API 不可用——请按 Ctrl+V 粘贴" : "Clipboard API unavailable - press Ctrl+V instead",
  pasted: z ? "已从剪贴板粘贴" : "Pasted from clipboard",
  secretGen: z ? "已生成随机密钥" : "Random secret generated",
  invalidSecret: z ? "密钥不是有效的 Base32" : "Secret is not valid Base32",
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
    secret: document.getElementById("totp-secret"),
    rand: document.getElementById("totp-rand"),
    digits: document.getElementById("totp-digits"),
    code: document.getElementById("totp-code"),
    progress: document.getElementById("totp-progress"),
    countdown: document.getElementById("totp-countdown"),
    copy: document.getElementById("totp-copy"),
    status: document.getElementById("totp-status"),
    resizer: document.getElementById("totp-resizer"),
    left: document.getElementById("totp-left"),
    right: document.getElementById("totp-right"),
    panels: document.getElementById("totp-panels"),
    layout: document.getElementById("totp-layout"),
    layoutStack: document.getElementById("totp-layout-stack"),
    layoutCol: document.getElementById("totp-layout-col"),
    tool: document.getElementById("totp-tool"),
    fullscreen: document.getElementById("totp-fullscreen"),
    fsEnter: document.getElementById("totp-fs-enter"),
    fsExit: document.getElementById("totp-fs-exit")
  };
  var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  var lastCode = "";

  function b32decode(s) {
    var cleaned = s.toUpperCase().replace(/[\s-]/g, "").replace(/=+$/, "");
    var bytes = [], buffer = 0, bits = 0;
    for (var i = 0; i < cleaned.length; i++) {
      var idx = ALPHABET.indexOf(cleaned[i]);
      if (idx < 0) return null;
      buffer = (buffer << 5) | idx;
      bits += 5;
      if (bits >= 8) { bytes.push((buffer >>> (bits - 8)) & 255); bits -= 8; }
    }
    return bytes;
  }
  function randomSecret() {
    var arr = new Uint8Array(20);
    if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(arr);
    else for (var i = 0; i < 20; i++) arr[i] = Math.floor(Math.random() * 256);
    var out = "";
    for (var j = 0; j < arr.length; j++) { out += ALPHABET[arr[j] & 31]; if (out.length % 4 === 0) out += " "; }
    return out.trim();
  }
  function hotp(keyBytes, counter, digits) {
    var buf = new ArrayBuffer(8);
    var view = new DataView(buf);
    view.setUint32(4, Math.floor(counter / 4294967296));
    view.setUint32(0, counter >>> 0);
    return window.crypto.subtle.importKey("raw", keyBytes, { name: "HMAC", hash: "SHA-1" }, false, ["sign"])
      .then(function (key) { return window.crypto.subtle.sign("HMAC", key, new Uint8Array(buf)); })
      .then(function (sig) {
        var h = new Uint8Array(sig);
        var offset = h[h.length - 1] & 15;
        var bin = ((h[offset] & 127) << 24) | (h[offset + 1] << 16) | (h[offset + 2] << 8) | h[offset + 3];
        var code = bin % Math.pow(10, digits);
        var s = String(code);
        while (s.length < digits) s = "0" + s;
        return s;
      });
  }
  function update() {
    var secret = el.secret.value.trim();
    var keyBytes = b32decode(secret);
    if (!secret) {
      el.code.textContent = "------";
      el.progress.style.width = "100%";
      el.countdown.textContent = "30s";
      lastCode = "";
      return;
    }
    if (!keyBytes) {
      el.code.textContent = "------";
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.invalidSecret) + "</span>");
      return;
    }
    var counter = Math.floor(Date.now() / 1000 / 30);
    var digits = parseInt(el.digits.value, 10) || 6;
    hotp(keyBytes, counter, digits).then(function (code) {
      lastCode = code;
      el.code.textContent = code;
    }).catch(function () {
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.clipUnavail) + "</span>");
    });
    var remain = 30 - (Math.floor(Date.now() / 1000) % 30);
    el.progress.style.width = (remain / 30 * 100) + "%";
    el.countdown.textContent = remain + "s";
  }

  function tick() {
    var remain = 30 - (Math.floor(Date.now() / 1000) % 30);
    el.progress.style.width = (remain / 30 * 100) + "%";
    el.countdown.textContent = remain + "s";
    if (remain === 30 || remain === 29) update();
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) { return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function copyCode() {
    if (!lastCode) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(lastCode).then(function () { flashStatus(TB_L.copiedOk); })
        .catch(function () { setStatus(TB_L.copyFail); });
    } else { setStatus(TB_L.copyFail); }
  }
  var statusTimer = null;
  function flashStatus(html) {
    var prev = el.status.innerHTML;
    setStatus(html);
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { setStatus(prev); }, 2000);
  }

  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("totp-stacked", stacked);
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

  el.secret.addEventListener("input", update);
  el.digits.addEventListener("change", update);
  el.rand.addEventListener("click", function () {
    el.secret.value = randomSecret();
    update();
    flashStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + esc(L.secretGen) + "</span>");
  });
  el.copy.addEventListener("click", copyCode);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("totp-paste");
  function pasteIntoInput() {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function (t) {
        if (t == null) return;
        el.secret.value = t;
        el.secret.dispatchEvent(new Event("input", { bubbles: true }));
        flashStatus(TB_L.pastedOk);
      }).catch(function () { setStatus(TB_L.clipBlocked); });
    } else { setStatus(TB_L.clipNoApi); }
  }
  pasteBtn.addEventListener("click", pasteIntoInput);

  initResizer();
  update();
  setInterval(tick, 1000);
})();

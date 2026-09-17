var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  clipUnavail: z ? "剪贴板不可用" : "Clipboard unavailable",
  pasteBlocked: z ? "剪贴板读取被阻止——请按 Ctrl+V 粘贴" : "Clipboard read blocked - press Ctrl+V instead",
  pasteUnavail: z ? "剪贴板 API 不可用——请按 Ctrl+V 粘贴" : "Clipboard API unavailable - press Ctrl+V instead",
  pasted: z ? "已从剪贴板粘贴" : "Pasted from clipboard",
  emptyInput: z ? "输入为空" : "Empty input",
  needSecret: z ? "请输入密码短语" : "Enter a passphrase first",
  randomKey: z ? "已生成随机口令" : "Random key generated",
  encrypted: z ? "加密完成" : "Encrypted",
  decrypted: z ? "解密完成" : "Decrypted",
  decryptFail: z ? "解密失败：口令错误或密文被篡改" : "Decryption failed: wrong passphrase or tampered ciphertext",
  noCrypto: z ? "当前浏览器不支持 Web Crypto（需 HTTPS 或 localhost）" : "Web Crypto is unavailable (HTTPS or localhost required)",
  localNote: z ? "所有加密解密均在浏览器本地完成，密钥不会上传。" : "All encryption runs locally; your passphrase is never uploaded.",
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
    input: document.getElementById("aes-input"),
    secret: document.getElementById("aes-secret"),
    genkey: document.getElementById("aes-genkey"),
    modeSel: document.getElementById("aes-mode"),
    output: document.getElementById("aes-output"),
    status: document.getElementById("aes-status"),
    encryptBtn: document.getElementById("aes-encrypt"),
    decryptBtn: document.getElementById("aes-decrypt"),
    copy: document.getElementById("aes-copy"),
    clear: document.getElementById("aes-clear"),
    resizer: document.getElementById("aes-resizer"),
    left: document.getElementById("aes-left"),
    right: document.getElementById("aes-right"),
    panels: document.getElementById("aes-panels"),
    layout: document.getElementById("aes-layout"),
    layoutStack: document.getElementById("aes-layout-stack"),
    layoutCol: document.getElementById("aes-layout-col"),
    tool: document.getElementById("aes-tool"),
    fullscreen: document.getElementById("aes-fullscreen"),
    fsEnter: document.getElementById("aes-fs-enter"),
    fsExit: document.getElementById("aes-fs-exit")
  };
  var action = "encrypt";

  function b64(buf) {
    var bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
    var bin = "";
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }
  function fromB64(s) {
    var bin = atob(s.replace(/\s/g, ""));
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }
  function randomBytes(n) {
    var arr = new Uint8Array(n);
    if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(arr);
    else for (var i = 0; i < n; i++) arr[i] = Math.floor(Math.random() * 256);
    return arr;
  }
  function deriveKey(pass, salt) {
    var enc = new TextEncoder().encode(pass);
    return window.crypto.subtle.importKey("raw", enc, "PBKDF2", false, ["deriveKey"])
      .then(function (key) {
        return window.crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256" },
          key, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]
        );
      });
  }

  function doEncrypt() {
    if (!window.crypto || !window.crypto.subtle) { setStatus(err(TB_L.clipUnavail + " · " + esc(L.noCrypto))); return; }
    if (!el.input.value) { setStatus(err(esc(L.emptyInput))); return; }
    if (!el.secret.value) { setStatus(err(esc(L.needSecret))); return; }
    var salt = randomBytes(16);
    var iv = el.modeSel.value === "CBC" ? randomBytes(16) : randomBytes(12);
    var data = new TextEncoder().encode(el.input.value);
    deriveKey(el.secret.value, salt).then(function (key) {
      var algo = el.modeSel.value === "CBC"
        ? { name: "AES-CBC", iv: iv }
        : { name: "AES-GCM", iv: iv, tagLength: 128 };
      return window.crypto.subtle.encrypt(algo, key, data);
    }).then(function (ct) {
      var out = "v1." + b64(salt) + "." + b64(iv) + "." + b64(ct);
      el.output.value = out;
      setStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + esc(L.encrypted) + " · " + esc(L.localNote) + "</span>");
    }).catch(function () { setStatus(err(esc(L.noCrypto))); });
  }

  function doDecrypt() {
    if (!window.crypto || !window.crypto.subtle) { setStatus(err(esc(L.noCrypto))); return; }
    if (!el.input.value) { setStatus(err(esc(L.emptyInput))); return; }
    if (!el.secret.value) { setStatus(err(esc(L.needSecret))); return; }
    var parts = el.input.value.trim().split(".");
    if (parts.length !== 4 || parts[0] !== "v1") { setStatus(err(esc(L.decryptFail))); return; }
    var salt, iv;
    try { salt = fromB64(parts[1]); iv = fromB64(parts[2]); }
    catch (e) { setStatus(err(esc(L.decryptFail))); return; }
    var ct = fromB64(parts[3]);
    deriveKey(el.secret.value, salt).then(function (key) {
      var algo = el.modeSel.value === "CBC"
        ? { name: "AES-CBC", iv: iv }
        : { name: "AES-GCM", iv: iv, tagLength: 128 };
      return window.crypto.subtle.decrypt(algo, key, ct);
    }).then(function (pt) {
      el.output.value = new TextDecoder("utf-8", { fatal: false }).decode(pt);
      setStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + esc(L.decrypted) + "</span>");
    }).catch(function () { setStatus(err(esc(L.decryptFail))); });
  }

  function run() {
    if (action === "encrypt") doEncrypt(); else doDecrypt();
  }
  function setAction(a) {
    action = a;
    el.encryptBtn.classList.toggle("active", a === "encrypt");
    el.decryptBtn.classList.toggle("active", a === "decrypt");
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function err(html) { return '<span class="text-red-500 dark:text-red-400 font-medium">' + html + "</span>"; }
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
    el.input.value = ""; el.secret.value = ""; el.output.value = ""; setStatus(""); el.input.focus();
  }
  function genRandomKey() {
    var chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*-_+=?";
    var out = "";
    var arr = randomBytes(24);
    for (var i = 0; i < 24; i++) out += chars[arr[i] % chars.length];
    el.secret.value = out;
    flashStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + esc(L.randomKey) + "</span>");
  }

  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("aes-stacked", stacked);
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

  el.encryptBtn.addEventListener("click", function () { setAction("encrypt"); run(); });
  el.decryptBtn.addEventListener("click", function () { setAction("decrypt"); run(); });
  el.modeSel.addEventListener("change", run);
  el.genkey.addEventListener("click", genRandomKey);
  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("aes-paste");
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

  el.input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); }
  });

  if (window.ResizeObserver) new ResizeObserver(syncHeight).observe(el.input);
  window.addEventListener("resize", syncHeight);
  initResizer();
})();

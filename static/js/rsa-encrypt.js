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
keyPairGen:z?"密钥对已生成（2048 位 RSA-OAEP）":"Key pair generated (2048-bit RSA-OAEP)",
keysReady:z?"公钥与私钥已填入对应区域":"Public and private keys are filled in above",
noPub:z?"加密需要公钥":"A public key is required to encrypt",
noPriv:z?"解密需要私钥":"A private key is required to decrypt",
noCrypto:z?"当前环境不支持 Web Crypto（需 HTTPS 或 localhost）":"Web Crypto is unavailable (requires HTTPS or localhost)",
badPub:z?"公钥无效或格式不受支持（支持 SPKI PEM）":"Invalid public key (SPKI PEM expected)",
badPriv:z?"私钥无效或格式不受支持（支持 PKCS#8 PEM）":"Invalid private key (PKCS#8 PEM expected)",
badCipher:z?"密文不是有效的 Base64":"Ciphertext is not valid Base64",
decFail:z?"解密失败——密钥与密文不匹配？":"Decryption failed - wrong key or corrupted ciphertext?",
plainTooLong:z?"明文过长：RSA-OAEP-2048 单次最多 190 字节":"Plaintext too long: RSA-OAEP-2048 allows at most 190 bytes per operation",
modeEnc:z?"加密模式":"Encrypt mode",
modeDec:z?"解密模式":"Decrypt mode",
localRun:z?"密钥对在本地生成，加解密全程不离开浏览器。":"Keys are generated locally; encrypt/decrypt never leaves your browser."
,
zh:z,
enc:z?"加密":"Encrypt",
dec:z?"解密":"Decrypt"
};})();

/*!
 * RSA Encrypt / Decrypt - ToolsBoot
 * RSA-OAEP (2048-bit) via the Web Crypto API. Key generation, PEM import/
 * export and encrypt/decrypt all run locally in the browser.
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
    pub: document.getElementById("rsa-pub"),
    priv: document.getElementById("rsa-priv"),
    input: document.getElementById("rsa-input"),
    output: document.getElementById("rsa-output"),
    status: document.getElementById("rsa-status"),
    modeEnc: document.getElementById("rsa-mode-enc"),
    modeDec: document.getElementById("rsa-mode-dec"),
    gen: document.getElementById("rsa-gen"),
    live: document.getElementById("rsa-live"),
    copy: document.getElementById("rsa-copy"),
    clear: document.getElementById("rsa-clear"),
    resizer: document.getElementById("rsa-resizer"),
    left: document.getElementById("rsa-left"),
    right: document.getElementById("rsa-right"),
    panels: document.getElementById("rsa-panels"),
    layout: document.getElementById("rsa-layout"),
    layoutStack: document.getElementById("rsa-layout-stack"),
    layoutCol: document.getElementById("rsa-layout-col"),
    tool: document.getElementById("rsa-tool"),
    fullscreen: document.getElementById("rsa-fullscreen"),
    fsEnter: document.getElementById("rsa-fs-enter"),
    fsExit: document.getElementById("rsa-fs-exit")
  };

  var mode = "enc";

  if (!window.crypto || !window.crypto.subtle) {
    setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.noCrypto) + "</span>");
  }

  // ---- PEM <-> binary helpers ----
  function pemToBytes(pem) {
    var b64 = pem.replace(/-----BEGIN [^-]+-----/g, "").replace(/-----END [^-]+-----/g, "").replace(/\s+/g, "");
    var binary = atob(b64);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }

  function bytesToPem(bytes, label) {
    var binary = "";
    for (var i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    var b64 = btoa(binary);
    var lines = b64.match(/.{1,64}/g) || [];
    return "-----BEGIN " + label + "-----\n" + lines.join("\n") + "\n-----END " + label + "-----";
  }

  function b64ToBytes(b64) {
    var s = b64.trim();
    var pad = s.length % 4;
    if (pad) s += "=".repeat(4 - pad);
    var binary = atob(s);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }

  function bytesToB64(bytes) {
    var binary = "";
    for (var i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  // ---- Key generation ----
  function generateKeys() {
    window.crypto.subtle.generateKey(
      { name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
      true, ["encrypt", "decrypt"]
    ).then(function (pair) {
      return Promise.all([
        window.crypto.subtle.exportKey("spki", pair.publicKey),
        window.crypto.subtle.exportKey("pkcs8", pair.privateKey)
      ]).then(function (bufs) {
        el.pub.value = bytesToPem(new Uint8Array(bufs[0]), "PUBLIC KEY");
        el.priv.value = bytesToPem(new Uint8Array(bufs[1]), "PRIVATE KEY");
        setStatus(
          '<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.keyPairGen + "</span>" +
          ' <span class="text-slate-300 dark:text-zinc-600">|</span> <span class="text-slate-400 dark:text-zinc-500">' + L.keysReady + "</span>"
        );
      });
    }).catch(function () {
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.noCrypto) + "</span>");
    });
  }

  // ---- Import keys from PEM ----
  function importPublic() {
    var pem = el.pub.value.trim();
    if (!pem) return Promise.reject(new Error(L.noPub));
    return window.crypto.subtle.importKey(
      "spki", pemToBytes(pem), { name: "RSA-OAEP", hash: "SHA-256" }, false, ["encrypt"]
    ).catch(function () { throw new Error(L.badPub); });
  }

  function importPrivate() {
    var pem = el.priv.value.trim();
    if (!pem) return Promise.reject(new Error(L.noPriv));
    return window.crypto.subtle.importKey(
      "pkcs8", pemToBytes(pem), { name: "RSA-OAEP", hash: "SHA-256" }, false, ["decrypt"]
    ).catch(function () { throw new Error(L.badPriv); });
  }

  // ---- Encrypt / decrypt ----
  function doEncrypt() {
    var raw = el.input.value;
    if (!raw) return;
    var data = new TextEncoder().encode(raw);
    if (data.length > 190) {
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.plainTooLong) + "</span>");
      return;
    }
    importPublic().then(function (key) {
      return window.crypto.subtle.encrypt({ name: "RSA-OAEP" }, key, data);
    }).then(function (buf) {
      el.output.value = bytesToB64(new Uint8Array(buf));
      setStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.modeEnc + "</span>");
    }).catch(function (e) {
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(e.message) + "</span>");
    });
  }

  function doDecrypt() {
    var raw = el.input.value.trim();
    if (!raw) return;
    var cipher;
    try {
      cipher = b64ToBytes(raw);
    } catch (e) {
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.badCipher) + "</span>");
      return;
    }
    importPrivate().then(function (key) {
      return window.crypto.subtle.decrypt({ name: "RSA-OAEP" }, key, cipher);
    }).then(function (buf) {
      el.output.value = new TextDecoder("utf-8").decode(buf);
      setStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.modeDec + "</span>');
    }).catch(function (e) {
      var msg = e.message === L.noPriv || e.message === L.badPriv ? e.message : L.decFail;
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(msg) + "</span>");
    });
  }

  var busy = false;
  function update() {
    if (busy) return;
    if (!el.live.checked) return;
    busy = true;
    if (mode === "enc") doEncrypt(); else doDecrypt();
    setTimeout(function () { busy = false; }, 100);
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function setMode(m) {
    mode = m;
    var isEnc = m === "enc";
    el.modeEnc.classList.toggle("active", isEnc);
    el.modeDec.classList.toggle("active", !isEnc);
    var activeBtn = isEnc ? el.modeEnc : el.modeDec;
    activeBtn.classList.remove("jt-pop");
    void activeBtn.offsetWidth;
    activeBtn.classList.add("jt-pop");
    el.output.value = "";
    setStatus("");
    update();
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
    el.tool.classList.toggle("rsa-stacked", stacked);
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
  el.modeEnc.addEventListener("click", function () { setMode("enc"); });
  el.modeDec.addEventListener("click", function () { setMode("dec"); });
  el.gen.addEventListener("click", function () {
    el.gen.classList.remove("jt-pop");
    void el.gen.offsetWidth;
    el.gen.classList.add("jt-pop");
    generateKeys();
  });
  el.input.addEventListener("input", function () { update(); });
  el.live.addEventListener("change", function () { if (el.live.checked) update(); });
  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("rsa-paste");
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
  setMode("enc");
  setStatus('<span class="text-slate-400 dark:text-zinc-500">' + L.localRun + "</span>");
})();

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
invalidJwt:z?"不是有效的 JWT（应包含三段）":"Not a valid JWT (expected 3 parts)",
invalidSeg:z?"段不是有效的 Base64URL":"Segment is not valid Base64URL",
invalidJson:z?"段解码后不是有效 JSON":"Decoded segment is not valid JSON",
algNone:z?"签名验证需要密钥":"A secret is required to verify the signature",
algUnknown:z?"不支持的签名算法：":"Unsupported signature algorithm: ",
algNoHmac:z?"算法不是 HS256/384/512，无法用密钥验证":"Algorithm is not HS256/384/512, cannot verify with a secret",
sigValid:z?"签名有效":"Signature is valid",
sigInvalid:z?"签名无效":"Signature is invalid",
sigNotChecked:z?"未验证签名（未提供密钥或算法不支持）":"Signature not verified (no secret or unsupported algorithm)",
localRun:z?"所有解码均在浏览器本地完成。密钥仅用于本地验证，不会上传。":"All decoding runs locally. The secret is only used locally to verify, never uploaded."
,
zh:z,
header:z?"Header":"Header",
payload:z?"Payload":"Payload",
signature:z?"签名":"Signature",
status:z?"状态":"Status"
};})();

/*!
 * JWT Decoder / Encoder - ToolsBoot
 * Decodes JWT header/payload and verifies HS256/384/512 signatures locally
 * using the Web Crypto API. No third-party libraries.
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
    input: document.getElementById("jwt-input"),
    secret: document.getElementById("jwt-secret"),
    output: document.getElementById("jwt-output"),
    status: document.getElementById("jwt-status"),
    live: document.getElementById("jwt-live"),
    copy: document.getElementById("jwt-copy"),
    clear: document.getElementById("jwt-clear"),
    verify: document.getElementById("jwt-verify"),
    resizer: document.getElementById("jwt-resizer"),
    left: document.getElementById("jwt-left"),
    right: document.getElementById("jwt-right"),
    panels: document.getElementById("jwt-panels"),
    layout: document.getElementById("jwt-layout"),
    layoutStack: document.getElementById("jwt-layout-stack"),
    layoutCol: document.getElementById("jwt-layout-col"),
    tool: document.getElementById("jwt-tool"),
    fullscreen: document.getElementById("jwt-fullscreen"),
    fsEnter: document.getElementById("jwt-fs-enter"),
    fsExit: document.getElementById("jwt-fs-exit")
  };

  // ---- Base64URL helpers ----
  function b64urlDecode(seg) {
    var s = seg.replace(/-/g, "+").replace(/_/g, "/");
    var pad = s.length % 4;
    if (pad) s += "=".repeat(4 - pad);
    var binary;
    try { binary = atob(s); } catch (e) { throw new Error(L.invalidSeg); }
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
  }

  function b64urlEncode(str) {
    var bytes = new TextEncoder().encode(str);
    var binary = "";
    for (var i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function prettyJson(text) {
    return JSON.stringify(JSON.parse(text), null, 2);
  }

  // ---- Signature verification via Web Crypto ----
  function hmacAlg(alg) {
    if (alg === "HS256") return "SHA-256";
    if (alg === "HS384") return "SHA-384";
    if (alg === "HS512") return "SHA-512";
    return null;
  }

  function bytesFromB64url(seg) {
    var s = seg.replace(/-/g, "+").replace(/_/g, "/");
    var pad = s.length % 4;
    if (pad) s += "=".repeat(4 - pad);
    var binary = atob(s);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }

  function verifySignature(header, signingInput, sigSeg, secret) {
    var algName = header.alg || "";
    var hash = hmacAlg(algName);
    if (!hash) return { ok: false, note: L.algNoHmac };
    if (!window.crypto || !window.crypto.subtle) {
      return { ok: false, note: L.clipUnavail };
    }
    var keyPromise = window.crypto.subtle.importKey(
      "raw", new TextEncoder().encode(secret), { name: "HMAC", hash: hash }, false, ["sign"]
    );
    return keyPromise.then(function (key) {
      return window.crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signingInput));
    }).then(function (sigBuf) {
      var expected = new Uint8Array(sigBuf);
      var actual = bytesFromB64url(sigSeg);
      if (expected.length !== actual.length) return false;
      var diff = 0;
      for (var i = 0; i < expected.length; i++) diff |= expected[i] ^ actual[i];
      return diff === 0;
    });
  }

  var verifying = false;
  function update() {
    var raw = el.input.value.trim();
    if (!raw) {
      el.output.value = "";
      setStatus("");
      return;
    }
    var parts = raw.split(".");
    if (parts.length !== 3) {
      el.output.value = "";
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.invalidJwt) + "</span>");
      return;
    }
    try {
      var headerText = b64urlDecode(parts[0]);
      var payloadText = b64urlDecode(parts[1]);
      var header = JSON.parse(headerText);
      var payload = JSON.parse(payloadText);
      var out =
        L.header + ":\n" + prettyJson(headerText) +
        "\n\n" + L.payload + ":\n" + prettyJson(payloadText) +
        "\n\n" + L.signature + ": " + parts[2];
      el.output.value = out;

      var secret = el.secret.value;
      var statusHtml;
      if (secret) {
        verifying = true;
        verifySignature(header, parts[0] + "." + parts[1], parts[2], secret).then(function (valid) {
          if (!verifying) return;
          setStatus(
            '<span class="' + (valid ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400") + ' font-medium">' +
            (valid ? L.sigValid : L.sigInvalid) + "</span>"
          );
        }).catch(function () {
          setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.clipUnavail) + "</span>");
        });
      } else {
        setStatus('<span class="text-slate-400 dark:text-zinc-500">' + L.sigNotChecked + "</span>");
      }
    } catch (e) {
      el.output.value = "";
      var msg = e.message === L.invalidSeg || e.message === L.invalidJson
        ? esc(e.message)
        : esc(L.invalidJson);
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + msg + "</span>");
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
    el.secret.value = "";
    el.output.value = "";
    setStatus("");
    el.input.focus();
  }

  // ---- Layout / fullscreen / resizer (shared pattern) ----
  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("jwt-stacked", stacked);
    el.layoutStack.classList.toggle("hidden", stacked);
    el.layoutCol.classList.toggle("hidden", !stacked);
    syncHeight();
  }

  function toggleFullscreen() {
    el.tool.classList.toggle("page-fs");
    var isFs = el.tool.classList.contains("page-fs");
    if (isFs) { el.output.style.height = ""; } else { syncHeight(); }
    var e2 = el.tool.classList.contains("page-fs");
    el.fsEnter.classList.toggle("hidden", e2);
    el.fsExit.classList.toggle("hidden", !e2);
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

  // ---- Event wiring ----
  el.input.addEventListener("input", function () {
    if (el.live.checked) update();
  });
  el.secret.addEventListener("input", function () {
    if (el.live.checked) update();
  });
  el.live.addEventListener("change", function () {
    if (el.live.checked) update();
  });
  el.verify.addEventListener("click", function () {
    el.verify.classList.remove("jt-pop");
    void el.verify.offsetWidth;
    el.verify.classList.add("jt-pop");
    update();
  });
  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("jwt-paste");
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

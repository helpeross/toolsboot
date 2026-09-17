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
noAlgo:z?"请至少选择一种算法":"Select at least one algorithm",
fileLoaded:z?"已加载文件 ":"Loaded file ",
bytes:z?" 字节":" bytes",
noCrypto:z?"当前环境不支持 Web Crypto（SHA-1/256/512 需要 HTTPS 或 localhost）":"Web Crypto unavailable (SHA-1/256/512 need HTTPS or localhost)",
localRun:z?"所有计算均在浏览器本地完成，文件不会上传。":"All hashing runs locally; files are never uploaded."
,
zh:z,
text:z?"文本":"Text",
file:z?"文件":"File"
};})();

/*!
 * Hash Generator (MD5/SHA-1/SHA-256/SHA-512) - ToolsBoot
 * MD5 is implemented from scratch; SHA family uses the Web Crypto API.
 * Everything runs locally in the browser.
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
    input: document.getElementById("hgen-input"),
    output: document.getElementById("hgen-output"),
    status: document.getElementById("hgen-status"),
    file: document.getElementById("hgen-file"),
    fileBtn: document.getElementById("hgen-file-btn"),
    md5: document.getElementById("hgen-md5"),
    sha1: document.getElementById("hgen-sha1"),
    sha256: document.getElementById("hgen-sha256"),
    sha512: document.getElementById("hgen-sha512"),
    live: document.getElementById("hgen-live"),
    copy: document.getElementById("hgen-copy"),
    clear: document.getElementById("hgen-clear"),
    resizer: document.getElementById("hgen-resizer"),
    left: document.getElementById("hgen-left"),
    right: document.getElementById("hgen-right"),
    panels: document.getElementById("hgen-panels"),
    layout: document.getElementById("hgen-layout"),
    layoutStack: document.getElementById("hgen-layout-stack"),
    layoutCol: document.getElementById("hgen-layout-col"),
    tool: document.getElementById("hgen-tool"),
    fullscreen: document.getElementById("hgen-fullscreen"),
    fsEnter: document.getElementById("hgen-fs-enter"),
    fsExit: document.getElementById("hgen-fs-exit")
  };

  var fileBytes = null;
  var fileMeta = null;

  // ---- MD5 (implemented from scratch) ----
  function md5(bytes) {
    var K = new Uint32Array([
      0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
      0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
      0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
      0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
      0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
      0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
      0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
      0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
    ]);
    var s = new Uint32Array([
      7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
      5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
      4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
      6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
    ]);
    function rotl(x, c) { return (x << c) | (x >>> (32 - c)); }
    function add32(x, y) { return (x + y) | 0; }
    var len = bytes.length;
    var bitLen = len * 8;
    var withOne = len + 1;
    var paddedLen = ((withOne + 8 + 63) & ~63);
    var msg = new Uint8Array(paddedLen);
    msg.set(bytes);
    msg[len] = 0x80;
    var dv = new DataView(msg.buffer);
    dv.setUint32(paddedLen - 8, bitLen >>> 0, true);
    dv.setUint32(paddedLen - 4, Math.floor(bitLen / 0x100000000), true);
    var a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;
    var M = new Uint32Array(16);
    for (var i = 0; i < paddedLen / 64; i++) {
      var base = i * 64;
      for (var j = 0; j < 16; j++) M[j] = dv.getUint32(base + j * 4, true);
      var A = a0, B = b0, C = c0, D = d0;
      for (var k = 0; k < 64; k++) {
        var F, g;
        if (k < 16) { F = (B & C) | (~B & D); g = k; }
        else if (k < 32) { F = (D & B) | (~D & C); g = (5 * k + 1) % 16; }
        else if (k < 48) { F = B ^ C ^ D; g = (3 * k + 5) % 16; }
        else { F = C ^ (B | ~D); g = (7 * k) % 16; }
        var tmp = D;
        D = C;
        C = B;
        B = add32(B, rotl(add32(add32(add32(A, F), K[k]), M[g]), s[k]));
        A = tmp;
      }
      a0 = add32(a0, A); b0 = add32(b0, B); c0 = add32(c0, C); d0 = add32(d0, D);
    }
    function toHex(v) {
      var out = "";
      for (var i2 = 0; i2 < 4; i2++) {
        var b = (v >>> (i2 * 8)) & 0xff;
        out += (b < 16 ? "0" : "") + b.toString(16);
      }
      return out;
    }
    return toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0);
  }

  // ---- SHA family via Web Crypto ----
  function shaHex(alg, bytes) {
    return window.crypto.subtle.digest(alg, bytes).then(function (buf) {
      var arr = new Uint8Array(buf);
      var out = "";
      for (var i = 0; i < arr.length; i++) out += (arr[i] < 16 ? "0" : "") + arr[i].toString(16);
      return out;
    });
  }

  // ---- Main update ----
  var pending = 0;
  function update() {
    var hasText = el.input.value.length > 0;
    if (!hasText && !fileBytes) {
      el.output.value = "";
      setStatus("");
      return;
    }
    var bytes = fileBytes || new TextEncoder().encode(el.input.value);
    var srcName = fileMeta ? (L.fileLoaded + fileMeta.name + " - " + fileMeta.size + L.bytes) : null;

    var want = [];
    if (el.md5.checked) want.push("MD5");
    if (el.sha1.checked) want.push("SHA-1");
    if (el.sha256.checked) want.push("SHA-256");
    if (el.sha512.checked) want.push("SHA-512");
    if (want.length === 0) {
      el.output.value = "";
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.noAlgo) + "</span>");
      return;
    }

    pending++;
    var token = pending;
    var tasks = [];
    if (el.md5.checked) tasks.push(Promise.resolve(["MD5", md5(bytes)]));
    if (el.sha1.checked) tasks.push(shaHex("SHA-1", bytes).then(function (h) { return ["SHA-1", h]; }));
    if (el.sha256.checked) tasks.push(shaHex("SHA-256", bytes).then(function (h) { return ["SHA-256", h]; }));
    if (el.sha512.checked) tasks.push(shaHex("SHA-512", bytes).then(function (h) { return ["SHA-512", h]; }));

    Promise.all(tasks).then(function (results) {
      if (token !== pending) return;
      var lines = results.map(function (r) { return r[0] + ": " + r[1]; });
      el.output.value = lines.join("\n");
      var inBytes = new TextEncoder().encode(el.input.value).length + (fileBytes ? fileBytes.length : 0);
      var outBytes = new TextEncoder().encode(el.output.value).length;
      var html =
        '<span class="text-slate-400 dark:text-zinc-500">' + L.inBytes + inBytes + "</span>" +
        ' <span class="text-slate-300 dark:text-zinc-600">|</span> ' +
        '<span class="text-slate-400 dark:text-zinc-500">' + L.outBytes + outBytes + "</span>";
      if (srcName) html += ' <span class="text-slate-300 dark:text-zinc-600">|</span> <span class="text-brand-600 dark:text-brand-400 font-medium">' + esc(srcName) + "</span>";
      setStatus(html);
    }).catch(function () {
      if (token !== pending) return;
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.noCrypto) + "</span>");
    });
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ---- File handling ----
  function handleFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
      fileBytes = new Uint8Array(reader.result);
      fileMeta = { name: file.name, size: file.size };
      el.fileBtn.classList.add("active");
      update();
    };
    reader.onerror = function () {
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.clipUnavail) + "</span>");
    };
    reader.readAsArrayBuffer(file);
  }

  function clearFileState() {
    fileBytes = null;
    fileMeta = null;
    el.fileBtn.classList.remove("active");
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
    clearFileState();
    el.input.value = "";
    el.output.value = "";
    setStatus("");
    el.input.focus();
  }

  // ---- Layout / fullscreen / resizer ----
  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("hgen-stacked", stacked);
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
    clearFileState();
    if (el.live.checked) update();
  });
  el.fileBtn.addEventListener("click", function () {
    el.fileBtn.classList.remove("jt-pop");
    void el.fileBtn.offsetWidth;
    el.fileBtn.classList.add("jt-pop");
    el.file.click();
  });
  el.file.addEventListener("change", function () {
    if (el.file.files && el.file.files[0]) handleFile(el.file.files[0]);
    el.file.value = "";
  });
  [el.md5, el.sha1, el.sha256, el.sha512].forEach(function (cb) {
    cb.addEventListener("change", function () { update(); });
  });
  el.live.addEventListener("change", function () { if (el.live.checked) update(); });
  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("hgen-paste");
  function pasteIntoInput() {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function (t) {
        if (t == null) return;
        clearFileState();
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

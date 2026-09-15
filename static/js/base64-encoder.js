var L=(function(){var z=document.documentElement.lang==="zh-cn";return {
inBytes:z?"输入 ":"In: ",
outBytes:z?"输出 ":"Out: ",
copied:z?"已复制到剪贴板":"Copied to clipboard",
copiedOutput:z?"已复制输出":"Copied output",
copiedMin:z?"已复制压缩后的 CSS":"Copied minified CSS",
copiedDiff:z?"已复制差异结果":"Copied unified diff",
copiedCity:z?"已复制城市时间":"Copied city times",
copyFailed:z?"复制失败":"Copy failed",
clipUnavail:z?"剪贴板不可用":"Clipboard unavailable",
pasteBlocked:z?"剪贴板读取被阻止——请按 Ctrl+V 粘贴":"Clipboard read blocked - press Ctrl+V instead",
pasteUnavail:z?"剪贴板 API 不可用——请按 Ctrl+V 粘贴":"Clipboard API unavailable - press Ctrl+V instead",
pasted:z?"已从剪贴板粘贴":"Pasted from clipboard",
qrReady:z?"二维码已生成":"QR code ready",
qrLong:z?"内容超过该容错级别的最大长度":"Content too long for this error level",
qrHint:z?"输入文本或网址以生成二维码。":"Enter text or a URL to generate a QR code.",
decoded:z?"已解码":"Decoded",
noQR:z?"未找到二维码":"No QR code found",
noQRImg:z?"此图片中未找到二维码。":"No QR code found in this image.",
nFailed:z?"失败":"failed",
imgPasted:z?"已粘贴图片":"Image pasted",
added:z?"处新增":"added",
removed:z?"处删除":"removed",
valid:z?"有效":"Valid",
errPrefix:z?"错误：":"Error: ",
invalidB64:z?"无法解码——不是有效的 Base64 字符串。":"Cannot decode - not a valid Base64 string.",
invalidPct:z?"无法解码——不是有效的百分号编码。":"Cannot decode - not valid percent-encoding.",
encErr:z?"编码错误：":"Encoding error: ",
cssFile:z?"请选择 CSS 或文本文件":"Please choose a CSS or text file",
tooLarge:z?"输入过大——请将每侧控制在 ":"Input too large - please keep each side under ",
lines:z?" 行以内":" lines",
nsInvalid:z?"命名空间必须是有效 UUID（如 6ba7b810-9dad-11d1-80b4-00c04fd430c8）":"Namespace must be a valid UUID (e.g. 6ba7b810-9dad-11d1-80b4-00c04fd430c8)",
shaCtx:z?"SHA-1 (v5) 需要安全上下文（https 或 localhost）":"SHA-1 (v5) requires a secure context (https or localhost)",
notUuid:z?"不是有效 UUID。":"Not a valid UUID.",
validUuid:z?"有效 UUID":"Valid UUID",
tsNum:z?"时间戳必须是数字（秒或毫秒）":"Timestamp must be a number (seconds or milliseconds)",
tsRange:z?"时间戳超出范围（1970 - 3000）":"Timestamp out of range (1970 - 3000)",
tsInvalid:z?"日期时间无效":"Invalid date & time",
pwNoChar:z?"所选类型没有可用字符":"No characters available for a selected type",
pwNotEnough:z?"唯一字符不足":"Not enough unique characters",
pwCustomEmpty:z?"自定义字符为空——请添加字符或取消勾选":"Custom characters are empty - add some or uncheck Custom",
pwSelectType:z?"请至少选择一种字符类型":"Select at least one character type",
pwMinExceed:z?"每类最少字符数超过密码长度":"Minimum characters (exceed password length)",
pwUniqueNeed:z?"唯一模式需要更多不同字符":"Unique mode needs more distinct characters",
emptyInput:z?"输入为空":"Empty input",
badValue:z?"值无效":"Bad value",
unexpectedIndent:z?"缩进错误":"Unexpected indentation",
mixedBlock:z?"混合块样式":"Mixed block styles",
unexpectedContent:z?"意外内容":"Unexpected content",
langLen:z?"密文长度必须是 ":"Ciphertext length must be a multiple of ",
langChar:z?"无效字符":"Invalid character",
langOutRange:z?"解码字节超出范围——语言选择错误？":"Decoded byte out of range - wrong language?",
langUtf8:z?"UTF-8 解码失败——密钥或语言错误？":"Invalid UTF-8 result - wrong key or language?",
langDetect:z?"无法识别密文语言——它不匹配任何受支持的书写系统":"Cannot detect the ciphertext language - it does not match any of the supported scripts",
invalidNum:z?"无效的":"Invalid",
invalidPctEnc:z?"无效的百分号编码":"Invalid percent-encoding",
localRun:z?"所有转换均在浏览器本地完成。解密自动识别语言；如设置过密钥请输入密钥。":"All conversions run locally in your browser. Decryption auto-detects the language; enter the key if one was used."
,
zh:z,
invalidB64Str:z?"无效的 Base64 字符串":"Invalid Base64 string",
phType:z?"输入或粘贴要编码的文本…":"Type or paste text to encode...",
phPasteB64:z?"粘贴 Base64 字符串以解码…":"Paste a Base64 string to decode...",
phDecoded:z?"解码后的文本将显示在这里…":"Decoded text will appear here...",
phB64Result:z?"Base64 结果将显示在这里…":"Base64 result will appear here...",
phTypeUrl:z?"输入或粘贴文本、URL 或查询字符串…":"Type or paste text, a URL, or a query string...",
phPastePct:z?"粘贴百分号编码字符串以解码…":"Paste a percent-encoded string to decode...",
phPctResult:z?"百分号编码结果将显示在这里…":"Percent-encoded result will appear here...",
readFileErr:z?"无法读取文件。":"Could not read the file.",
restoredNote:z?"已恢复你的原始文本——注意它不是纯 JSON。":"Restored your original text - note it is not plain JSON.",
noteComments:z?"输入包含注释或多余分号。已提取出 JSON。":"Input had comments or stray semicolons. JSON extracted below.",
noteExtra:z?"输入包含额外非 JSON 文本。已提取出 JSON。":"Input had extra non-JSON text. JSON extracted below.",
nothingCopy:z?"没有可复制的内容":"Nothing to copy",
fileLoaded:z?"已加载 ":"loaded ",
chars:z?" 字符":" chars",
nothingDl:z?"暂无内容可下载":"Nothing to download yet",
downloadedX:z?"已下载 ":"Downloaded ",
qrFirst:z?"请先生成二维码":"Generate a QR code first",
scanning:z?"扫描中…":"Scanning...",
queued:z?"排队中":"Queued",
remove:z?"移除":"Remove",
copyValue:z?"复制内容":"Copy value",
qrsEmpty:z?"解码后的二维码内容将显示在这里。":"Decoded QR values will appear here.",
editHint:z?"编辑两侧文本，然后点击对比标记差异":"Edit both sides, then hit Compare to mark the differences",
pastedX:z?"已粘贴 ":"Pasted ",
hitCompare:z?"——点击对比":" - hit Compare",
nothingCopyYet:z?"暂无内容可复制":"Nothing to copy yet",
loaded:z?"已加载 ":"Loaded ",
currentTime:z?"当前时间 · 12 个城市":"Current time · 12 cities",
copiedPrefix:z?"已复制 ":"Copied ",
settingsReset:z?"设置已恢复默认":"Settings reset to defaults",
keyChars:z?"密钥：":"key: ",
noKey:z?"无密钥":"no key",
keyApplied:z?"已使用密钥":"key applied",
v1Desc:z?"基于时间":"time-based",
v2Desc:z?"DCE 安全":"DCE security",
v4Desc:z?"随机":"random",
v6Desc:z?"时间有序":"time-ordered",
v7Desc:z?"时间戳":"timestamp",
v8Desc:z?"自定义":"custom",
vUnknown:z?"未知":"unknown"
};})();

/*!
 * Base64 Encoder / Decoder - ToolsBoot
 * All logic implemented from scratch. No third-party libraries.
 * Runs entirely in the browser - no data is ever sent to a server.
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
  copiedOk: 'L.copied',
  pastedOk: 'L.pasted',
  copyFail: 'L.copyFailed',
  clipUnavail: 'L.clipUnavail',
  clipBlocked: 'L.pasteBlocked',
  clipNoApi: 'L.pasteUnavail'
};
(function () {
  "use strict";

  // ---- DOM references ----
  var el = {
    input: document.getElementById("b64-input"),
    output: document.getElementById("b64-output"),
    status: document.getElementById("b64-status"),
    modeEncode: document.getElementById("b64-mode-encode"),
    modeDecode: document.getElementById("b64-mode-decode"),
    urlSafe: document.getElementById("b64-urlsafe"),
    live: document.getElementById("b64-live"),
    copy: document.getElementById("b64-copy"),
    clear: document.getElementById("b64-clear"),
    dropzone: document.getElementById("b64-dropzone"),
    dropTarget: document.getElementById("b64-drop-target"),
    fileInput: document.getElementById("b64-file"),
    fileBtn: document.getElementById("b64-file-btn"),
    resizer: document.getElementById("b64-resizer"),
    left: document.getElementById("b64-left"),
    right: document.getElementById("b64-right"),
    panels: document.getElementById("b64-panels"),
    layout: document.getElementById("b64-layout"),
    layoutStack: document.getElementById("b64-layout-stack"),
    layoutCol: document.getElementById("b64-layout-col"),
    tool: document.getElementById("b64-tool"),
    fullscreen: document.getElementById("b64-fullscreen"),
    fsEnter: document.getElementById("b64-fs-enter"),
    fsExit: document.getElementById("b64-fs-exit")
  };

  // "encode" = text -> base64, "decode" = base64 -> text
  var mode = "encode";

  // ---- File state: full data URI of the currently loaded file ----
  var fileDataUri = null;
  var fileMeta = null; // { name, size }

  // ---- UTF-8 safe Base64 encode ----
  function encodeB64(text, urlSafe) {
    if (!text) return "";
    // Convert string to UTF-8 bytes
    var bytes = new TextEncoder().encode(text);
    // Convert bytes to binary string in chunks (avoid call-stack overflow on large input)
    var chunk = 8192;
    var binary = "";
    for (var i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + chunk, bytes.length)));
    }
    var b64 = btoa(binary);
    if (urlSafe) {
      b64 = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }
    return b64;
  }

  // ---- UTF-8 safe Base64 decode ----
  function decodeB64(b64, urlSafe) {
    if (!b64) return "";
    var s = b64.trim();
    // Reverse URL-safe mapping
    if (urlSafe) {
      s = s.replace(/-/g, "+").replace(/_/g, "/");
    }
    // Pad to multiple of 4
    var pad = s.length % 4;
    if (pad) s += "=".repeat(4 - pad);
    // Decode
    var binary;
    try {
      binary = atob(s);
    } catch (e) {
      throw new Error(L.invalidB64Str);
    }
    // Convert binary string to bytes
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    // Decode bytes as UTF-8
    return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
  }

  // ---- Byte counter ----
  function byteLen(text) {
    if (!text) return 0;
    return new TextEncoder().encode(text).length;
  }

  // ---- Main update (text pipeline) ----
  var debounceTimer = null;
  function update() {
    var raw = el.input.value;
    if (!raw) {
      el.output.value = "";
      setStatus("");
      return;
    }
    try {
      var result;
      if (mode === "encode") {
        result = encodeB64(raw, el.urlSafe.checked);
      } else {
        result = decodeB64(raw, el.urlSafe.checked);
      }
      el.output.value = result;
      var inBytes = byteLen(raw);
      var outBytes = byteLen(result);
      setStatus(
        '<span class="text-slate-400 dark:text-zinc-500">' + L.inBytes + inBytes + "</span>" +
        ' <span class="text-slate-300 dark:text-zinc-600">|</span> ' +
        '<span class="text-slate-400 dark:text-zinc-500">' + L.outBytes + outBytes + "</span>"
      );
    } catch (e) {
      el.output.value = "";
      var msg = mode === "decode"
        ? L.invalidB64
        : L.encErr + esc(e.message);
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + msg + "</span>");
    }
  }

  function setStatus(html) {
    el.status.innerHTML = html;
  }

  function esc(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ---- File state helpers ----
  function clearFileState() {
    fileDataUri = null;
    fileMeta = null;
  }

  // URL-safe variant of Base64. When the value is a full data URI
  // (data:<mime>;base64,<data>), keep the prefix intact and transform only
  // the payload after the comma.
  function applyUrlSafe(b64) {
    if (!el.urlSafe.checked) return b64;
    var commaIdx = b64.indexOf(",");
    var prefix = commaIdx >= 0 ? b64.substring(0, commaIdx + 1) : "";
    var data = commaIdx >= 0 ? b64.substring(commaIdx + 1) : b64;
    return prefix + data.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function renderFileStatus() {
    if (!fileMeta) return;
    var sizeKB = (fileMeta.size / 1024).toFixed(1);
    setStatus(
      '<span class="text-brand-600 dark:text-brand-400 font-medium">File: ' + esc(fileMeta.name) + "</span>" +
      ' <span class="text-slate-300 dark:text-zinc-600">|</span> ' +
      '<span class="text-slate-400 dark:text-zinc-500">' + sizeKB + " KB</span>"
    );
  }

  // ---- Mode switching ----
  function setMode(m) {
    mode = m;
    var isEncode = m === "encode";
    el.modeEncode.classList.toggle("active", isEncode);
    el.modeDecode.classList.toggle("active", !isEncode);
    // Click feedback: replay the pop animation on the newly active button
    var activeBtn = isEncode ? el.modeEncode : el.modeDecode;
    activeBtn.classList.remove("jt-pop");
    void activeBtn.offsetWidth; // restart animation even when re-clicking the same mode
    activeBtn.classList.add("jt-pop");
    el.input.placeholder = isEncode
      ? L.phType
      : L.phPasteB64;
    el.output.placeholder = isEncode
      ? L.phB64Result
      : L.phDecoded;
    // Explicit mode change exits file mode (the file's Base64 is just text now)
    clearFileState();
    // The left input is always the source - switching modes only changes how
    // it is transformed; the output is never copied back into the input.
    update();
  }

  // ---- File handling: show the file's data URI on the right ----
  function handleFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
      // reader.result is the full data URI: data:<mime>;base64,<data>
      // Keep the prefix - it identifies the file type and is needed for
      // embedding in <img src> / CSS, so it is NOT stripped here.
      var dataUri = reader.result;
      // Switch to encode mode so the right panel shows the file's encoding
      if (mode !== "encode") {
        mode = "encode";
        el.modeEncode.classList.add("active");
        el.modeDecode.classList.remove("active");
        el.input.placeholder = L.phType;
        el.output.placeholder = L.phB64Result;
      }
      fileDataUri = dataUri;
      fileMeta = { name: file.name, size: file.size };
      el.output.value = applyUrlSafe(fileDataUri);
      renderFileStatus();
    };
    reader.onerror = function () {
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + L.readFileErr + '</span>');
    };
    reader.readAsDataURL(file);
  }

  // ---- Copy to clipboard ----
  function copyOutput() {
    if (!el.output.value) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(el.output.value).then(function () {
        flashStatus('L.copied');
      }).catch(function () {
        fallbackCopy();
      });
    } else {
      fallbackCopy();
    }
  }

  function fallbackCopy() {
    el.output.select();
    try { document.execCommand("copy"); flashStatus('L.copied'); }
    catch (e) { setStatus('L.copyFailed'); }
  }

  var statusTimer = null;
  function flashStatus(html) {
    var prev = el.status.innerHTML;
    setStatus(html);
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { setStatus(prev); }, 2000);
  }

  // ---- Clear ----
  function clearAll() {
    clearFileState();
    el.input.value = "";
    el.output.value = "";
    setStatus("");
    el.input.focus();
  }

  // ---- Toggle side-by-side <-> stacked layout ----
  var stacked = false;
  function applyLayout() {
    // The .url-stacked class (defined in head.html) overrides the responsive
    // lg:flex-row arrangement: panels stack vertically, the left panel's
    // border moves to the bottom, the drag handle hides, and the two panels
    // get a reduced height.
    el.tool.classList.toggle("url-stacked", stacked);
    el.layoutStack.classList.toggle("hidden", stacked);
    el.layoutCol.classList.toggle("hidden", !stacked);
    syncHeight();
  }

  // ---- Page fullscreen (fills the viewport, no browser fullscreen) ----
  function toggleFullscreen() {
    el.tool.classList.toggle("page-fs");
    var isFs = el.tool.classList.contains("page-fs");
    if (isFs) {
      el.output.style.height = ""; // clear inline height set by syncHeight
    } else {
      syncHeight();
    }
    updateFsIcon();
  }

  function updateFsIcon() {
    var isFs = el.tool.classList.contains("page-fs");
    el.fsEnter.classList.toggle("hidden", isFs);
    el.fsExit.classList.toggle("hidden", !isFs);
  }

  // ---- Drag-to-resize (desktop only) ----
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
      var parent = el.left.parentElement;
      var rect = parent.getBoundingClientRect();
      var offset = e.clientX - rect.left;
      var pct = (offset / rect.width) * 100;
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

  // ---- Sync panel heights ----
  function syncHeight() {
    if (window.innerWidth < 1024) return;
    if (el.tool.classList.contains("page-fs")) return; // page-fs CSS fills the panels
    // Match the output textarea to the input textarea so the two panels stay
    // balanced. Do NOT force the whole right panel's height here - the panel
    // also contains the status bar, so a forced height squeezes it and clips
    // the status text.
    el.output.style.height = el.input.offsetHeight + "px";
  }

  // ---- Event wiring ----
  el.modeEncode.addEventListener("click", function () { setMode("encode"); });
  el.modeDecode.addEventListener("click", function () { setMode("decode"); });

  el.urlSafe.addEventListener("change", function () {
    if (fileDataUri) {
      el.output.value = applyUrlSafe(fileDataUri);
      renderFileStatus();
    } else {
      update();
    }
  });
  el.live.addEventListener("change", function () {
    if (el.live.checked) {
      if (fileDataUri) {
        el.output.value = applyUrlSafe(fileDataUri);
        renderFileStatus();
      } else {
        update();
      }
    }
  });

  el.input.addEventListener("input", function () {
    clearFileState(); // user is back to typing text
    if (el.live.checked) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(update, 200);
    }
  });

  // Allow Enter in input to trigger update even when live is off
  el.input.addEventListener("dblclick", function () {
    if (!el.live.checked) update();
  });

  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  // Paste into the input textarea
  var pasteBtn = document.getElementById("b64-paste");
  function pasteIntoInput() {
    var input = document.getElementById("b64-input");
    if (!input) return;
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function (t) {
        if (t == null) return;
        input.value = t;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        flashStatus('L.pasted');
      }).catch(function () {
        setStatus('L.pasteBlocked');
      });
    } else {
      setStatus('L.pasteUnavail');
    }
  }
  pasteBtn.addEventListener("click", pasteIntoInput);

  // ---- File: button, picker, and drag-and-drop ----
  el.fileBtn.addEventListener("click", function () { el.fileInput.click(); });
  el.dropzone.addEventListener("click", function () { el.fileInput.click(); });
  el.fileInput.addEventListener("change", function () {
    if (el.fileInput.files && el.fileInput.files[0]) handleFile(el.fileInput.files[0]);
    el.fileInput.value = ""; // allow picking the same file again
  });

  // Reveal the drop overlay only while a file is dragged over the input panel
  el.dropTarget.addEventListener("dragover", function (e) {
    e.preventDefault();
    el.dropzone.classList.remove("hidden");
    el.dropzone.classList.add("flex");
    el.dropzone.classList.add("border-brand-500", "bg-brand-50/95", "dark:bg-brand-500/10");
  });
  el.dropTarget.addEventListener("dragleave", function (e) {
    if (!el.dropTarget.contains(e.relatedTarget)) {
      el.dropzone.classList.add("hidden");
      el.dropzone.classList.remove("flex");
      el.dropzone.classList.remove("border-brand-500", "bg-brand-50/95", "dark:bg-brand-500/10");
    }
  });
  el.dropTarget.addEventListener("drop", function (e) {
    e.preventDefault();
    el.dropzone.classList.add("hidden");
    el.dropzone.classList.remove("flex");
    el.dropzone.classList.remove("border-brand-500", "bg-brand-50/95", "dark:bg-brand-500/10");
    var file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  // Resize observer for panel height sync
  if (window.ResizeObserver) {
    new ResizeObserver(syncHeight).observe(el.input);
  }
  window.addEventListener("resize", syncHeight);

  // Keyboard shortcut: Ctrl+Enter to update when live is off
  el.input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      update();
    }
  });

  initResizer();

  // Initial state: encode mode, drop overlay stays hidden
  setMode("encode");
})();

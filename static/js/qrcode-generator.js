var L=(function(){var z=document.documentElement.lang==="zh-cn";return {
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
 * QR Code Generator - ToolsBoot
 * Uses qrcode-generator (MIT) from static/js/vendor/qrcode.min.js.
 * Canvas rendering with custom size, margin, error level and colors.
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

  if (typeof qrcode === "undefined") {
    return; // vendor lib failed to load
  }

  // ---- DOM ----
  var el = {
    input: document.getElementById("qrc-input"),
    size: document.getElementById("qrc-size"),
    sizeVal: document.getElementById("qrc-size-val"),
    margin: document.getElementById("qrc-margin"),
    marginVal: document.getElementById("qrc-margin-val"),
    ec: document.getElementById("qrc-ec"),
    fg: document.getElementById("qrc-fg"),
    fgVal: document.getElementById("qrc-fg-val"),
    bg: document.getElementById("qrc-bg"),
    bgVal: document.getElementById("qrc-bg-val"),
    generate: document.getElementById("qrc-generate"),
    live: document.getElementById("qrc-live"),
    paste: document.getElementById("qrc-paste"),
    clear: document.getElementById("qrc-clear"),
    dl: document.getElementById("qrc-dl"),
    status: document.getElementById("qrc-status"),
    preview: document.getElementById("qrc-preview"),
    tool: document.getElementById("qrc-tool"),
    layout: document.getElementById("qrc-layout"),
    layoutStack: document.getElementById("qrc-layout-stack"),
    layoutCol: document.getElementById("qrc-layout-col"),
    fullscreen: document.getElementById("qrc-fullscreen"),
    fsEnter: document.getElementById("qrc-fs-enter"),
    fsExit: document.getElementById("qrc-fs-exit"),
    left: document.getElementById("qrc-left"),
    right: document.getElementById("qrc-right"),
    resizer: document.getElementById("qrc-resizer")
  };

  var canvas = null;

  // ================= Generator =================

  function generate() {
    var text = el.input.value;
    if (!text.trim()) {
      el.preview.innerHTML = '<p class="text-xs text-slate-400 dark:text-zinc-500">' + L.qrHint + '</p>';
      setStatus("");
      return;
    }
    try {
      var ec = el.ec.value;
      var qr = qrcode(0, ec);
      qr.addData(text);
      qr.make();

      var n = qr.getModuleCount();
      var margin = parseInt(el.margin.value, 10);
      var targetPx = parseInt(el.size.value, 10);
      var cell = Math.max(1, Math.floor(targetPx / (n + margin * 2)));
      var px = cell * (n + margin * 2);

      if (!canvas) {
        canvas = document.createElement("canvas");
        el.preview.appendChild(canvas);
      }
      // drop the placeholder hint once a QR code is displayed
      var hint = el.preview.querySelector("p");
      if (hint) hint.remove();
      canvas.width = px;
      canvas.height = px;
      canvas.style.width = targetPx + "px";
      canvas.style.height = targetPx + "px";
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = el.bg.value;
      ctx.fillRect(0, 0, px, px);
      ctx.fillStyle = el.fg.value;
      for (var r = 0; r < n; r++) {
        for (var c = 0; c < n; c++) {
          if (qr.isDark(r, c)) {
            ctx.fillRect((c + margin) * cell, (r + margin) * cell, cell, cell);
          }
        }
      }
      setStatus(
        '<span class="text-emerald-600 dark:text-emerald-400 font-medium">QR code ready</span>' +
        ' <span class="text-slate-300 dark:text-zinc-600">|</span>' +
        ' <span class="text-slate-400 dark:text-zinc-500">' + n + "&times;" + n + " modules &middot; " + px + "&times;" + px + " px &middot; EC-" + ec + "</span>"
      );
    } catch (e) {
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + L.qrLong + '</span>');
    }
  }

  function setStatus(html) {
    el.status.innerHTML = html;
  }
  var statusTimer = null;
  function flashStatus(html) {
    var prev = el.status.innerHTML;
    setStatus(html);
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { setStatus(prev); }, 2000);
  }

  // ================= Download PNG =================

  function downloadPng() {
    if (!canvas) {
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + L.qrFirst + '</span>');
      return;
    }
    var url = canvas.toDataURL("image/png");
    var a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    flashStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.downloadedX + 'qrcode.png</span>');
  }

  // ================= Paste / Clear =================

  function pasteIntoInput() {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function (t) {
        if (t == null) return;
        el.input.value = t;
        if (el.live.checked) generate();
        flashStatus(L.pasted);
      }).catch(function () {
        setStatus(L.pasteBlocked);
      });
    } else {
      setStatus(L.pasteUnavail);
    }
  }

  function clearAll() {
    el.input.value = "";
    el.preview.innerHTML = '<p class="text-xs text-slate-400 dark:text-zinc-500">' + L.qrHint + '</p>';
    canvas = null;
    setStatus("");
  }

  // ================= Layout toggle =================
  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("qrc-stacked", stacked);
    el.layoutStack.classList.toggle("hidden", stacked);
    el.layoutCol.classList.toggle("hidden", !stacked);
  }

  // ================= Page fullscreen =================
  function toggleFullscreen() {
    el.tool.classList.toggle("page-fs");
    updateFsIcon();
  }
  function updateFsIcon() {
    var isFs = el.tool.classList.contains("page-fs");
    el.fsEnter.classList.toggle("hidden", isFs);
    el.fsExit.classList.toggle("hidden", !isFs);
  }

  // ================= Drag-to-resize =================
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

  // ================= Events =================
  var debounceTimer = null;
  function schedule() {
    if (!el.live.checked) return;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(generate, 200);
  }

  function bindRange(range, label, suffix) {
    range.addEventListener("input", function () {
      label.textContent = range.value + (suffix || "");
      if (el.live.checked) generate();
    });
  }
  bindRange(el.size, el.sizeVal, "");
  bindRange(el.margin, el.marginVal, "");

  el.ec.addEventListener("change", function () { if (el.live.checked) generate(); });
  el.fg.addEventListener("input", function () { el.fgVal.textContent = el.fg.value; if (el.live.checked) generate(); });
  el.bg.addEventListener("input", function () { el.bgVal.textContent = el.bg.value; if (el.live.checked) generate(); });
  el.input.addEventListener("input", schedule);
  el.generate.addEventListener("click", function () { generate(); });
  el.live.addEventListener("change", function () { if (el.live.checked) generate(); });
  el.paste.addEventListener("click", pasteIntoInput);
  el.clear.addEventListener("click", clearAll);
  el.dl.addEventListener("click", downloadPng);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);
  initResizer();

  // Init
  clearAll();
})();

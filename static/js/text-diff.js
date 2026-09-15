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
 * Text Diff - ToolsBoot
 * Original implementation. No third-party libraries.
 * Two editable panes; line diff (LCS) with per-character highlighting
 * rendered via a transparent-text overlay behind the textareas.
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

  // ---- DOM ----
  var el = {
    a: document.getElementById("tdiff-a"),
    b: document.getElementById("tdiff-b"),
    ovA: document.getElementById("tdiff-ov-a"),
    ovB: document.getElementById("tdiff-ov-b"),
    gutterA: document.getElementById("tdiff-gutter-a"),
    gutterB: document.getElementById("tdiff-gutter-b"),
    ws: document.getElementById("tdiff-ws"),
    ci: document.getElementById("tdiff-case"),
    compare: document.getElementById("tdiff-compare"),
    copy: document.getElementById("tdiff-copy"),
    clearMarks: document.getElementById("tdiff-clear-marks"),
    pasteA: document.getElementById("tdiff-paste-a"),
    pasteB: document.getElementById("tdiff-paste-b"),
    clearA: document.getElementById("tdiff-clear-a"),
    clearB: document.getElementById("tdiff-clear-b"),
    fileA: document.getElementById("tdiff-file-a"),
    fileB: document.getElementById("tdiff-file-b"),
    fileInputA: document.getElementById("tdiff-file-a-input"),
    fileInputB: document.getElementById("tdiff-file-b-input"),
    countA: document.getElementById("tdiff-count-a"),
    countB: document.getElementById("tdiff-count-b"),
    status: document.getElementById("tdiff-status"),
    tool: document.getElementById("tdiff-tool"),
    layout: document.getElementById("tdiff-layout"),
    layoutStack: document.getElementById("tdiff-layout-stack"),
    layoutCol: document.getElementById("tdiff-layout-col"),
    fullscreen: document.getElementById("tdiff-fullscreen"),
    fsEnter: document.getElementById("tdiff-fs-enter"),
    fsExit: document.getElementById("tdiff-fs-exit"),
    left: document.getElementById("tdiff-left"),
    right: document.getElementById("tdiff-right"),
    resizer: document.getElementById("tdiff-resizer")
  };

  var MAX_LINES = 2000;
  var MAX_CHARS = 600; // per line for char-level diff

  // ================= Core diff helpers =================

  function prepLine(s) {
    // normalise for comparison according to options (raw text is rendered)
    if (el.ws.checked) s = s.replace(/^\s+|\s+$/g, "");
    if (el.ci.checked) s = s.toLowerCase();
    return s;
  }

  // Line-level LCS. Returns ops [{t:'eq'|'del'|'add', a, b, text}]
  function lineOps(aText, bText) {
    var a = aText.split("\n");
    var b = bText.split("\n");
    var n = a.length, m = b.length;
    var w = m + 1;
    var dp = new Uint32Array((n + 1) * w);
    for (var i = n - 1; i >= 0; i--) {
      var row = i * w, nr = row + w;
      for (var j = m - 1; j >= 0; j--) {
        dp[row + j] = prepLine(a[i]) === prepLine(b[j])
          ? dp[nr + j + 1] + 1
          : (dp[nr + j] > dp[row + j + 1] ? dp[nr + j] : dp[row + j + 1]);
      }
    }
    var ops = [];
    var x = 0, y = 0;
    while (x < n && y < m) {
      if (prepLine(a[x]) === prepLine(b[y])) { ops.push({ t: "eq", a: x + 1, b: y + 1, text: a[x] }); x++; y++; }
      else if (dp[(x + 1) * w + y] >= dp[x * w + y + 1]) { ops.push({ t: "del", a: x + 1, text: a[x] }); x++; }
      else { ops.push({ t: "add", b: y + 1, text: b[y] }); y++; }
    }
    while (x < n) { ops.push({ t: "del", a: x + 1, text: a[x] }); x++; }
    while (y < m) { ops.push({ t: "add", b: y + 1, text: b[y] }); y++; }
    return ops;
  }

  // Char-level LCS. ops [{t:'eq'|'del'|'add', c}]
  function charOps(a, b) {
    var n = a.length, m = b.length;
    if (n === 0) return b.split("").map(function (c) { return { t: "add", c: c }; });
    if (m === 0) return a.split("").map(function (c) { return { t: "del", c: c }; });
    var w = m + 1;
    var dp = new Uint32Array((n + 1) * w);
    for (var i = n - 1; i >= 0; i--) {
      var row = i * w, nr = row + w;
      for (var j = m - 1; j >= 0; j--) {
        var ca = el.ci.checked ? a[i].toLowerCase() : a[i];
        var cb = el.ci.checked ? b[j].toLowerCase() : b[j];
        dp[row + j] = ca === cb ? dp[nr + j + 1] + 1 : (dp[nr + j] > dp[row + j + 1] ? dp[nr + j] : dp[row + j + 1]);
      }
    }
    var ops = [];
    var x = 0, y = 0;
    while (x < n && y < m) {
      var aa = el.ci.checked ? a[x].toLowerCase() : a[x];
      var bb = el.ci.checked ? b[y].toLowerCase() : b[y];
      if (aa === bb) { ops.push({ t: "eq", c: a[x] }); x++; y++; }
      else if (dp[(x + 1) * w + y] >= dp[x * w + y + 1]) { ops.push({ t: "del", c: a[x] }); x++; }
      else { ops.push({ t: "add", c: b[y] }); y++; }
    }
    while (x < n) { ops.push({ t: "del", c: a[x] }); x++; }
    while (y < m) { ops.push({ t: "add", c: b[y] }); y++; }
    return ops;
  }

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Build inline HTML for the OLD line: eq + deleted chars only
  function markCharsOld(ops) {
    var out = "";
    for (var i = 0; i < ops.length; i++) {
      var op = ops[i];
      if (op.t === "add") continue;
      if (op.t === "del") out += '<span class="tdiff-chg-del">' + esc(op.c) + "</span>";
      else out += esc(op.c);
    }
    return out;
  }

  // Build inline HTML for the NEW line: eq + added chars only
  function markCharsNew(ops) {
    var out = "";
    for (var i = 0; i < ops.length; i++) {
      var op = ops[i];
      if (op.t === "del") continue;
      if (op.t === "add") out += '<span class="tdiff-chg-add">' + esc(op.c) + "</span>";
      else out += esc(op.c);
    }
    return out;
  }

  // ================= Diff + render =================

  var lastDiff = null; // for unified diff export

  function render() {
    var aText = el.a.value;
    var bText = el.b.value;
    lastDiff = null;

    // reset overlays/gutters first (also handles empty input)
    el.ovA.innerHTML = "";
    el.ovB.innerHTML = "";
    el.gutterA.innerHTML = "";
    el.gutterB.innerHTML = "";

    if (!aText.trim() && !bText.trim()) { setStatus(""); return; }
    var total = aText.split("\n").length + bText.split("\n").length;
    if (total > MAX_LINES * 2) {
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + L.tooLarge + MAX_LINES + L.lines + '</span>');
      return;
    }

    var ops = lineOps(aText, bText);
    lastDiff = ops;
    var htmlA = "", htmlB = "", gA = "", gB = "";
    var nEq = 0, nDel = 0, nAdd = 0, nMod = 0;

    // Pair consecutive del/add runs as "modified" lines
    var i = 0;
    while (i < ops.length) {
      var op = ops[i];
      if (op.t === "eq") {
        nEq++;
        htmlA += '<div class="tdiff-row">' + esc(op.text) + "</div>";
        htmlB += '<div class="tdiff-row">' + esc(op.text) + "</div>";
        gA += '<div class="tdiff-gnum">' + op.a + "</div>";
        gB += '<div class="tdiff-gnum">' + op.b + "</div>";
        i++;
        continue;
      }
      // collect a del run and an add run
      var dels = [], adds = [];
      while (i < ops.length && ops[i].t === "del") { dels.push(ops[i]); i++; }
      while (i < ops.length && ops[i].t === "add") { adds.push(ops[i]); i++; }
      var k = Math.min(dels.length, adds.length);
      for (var p = 0; p < k; p++) {
        nMod++;
        var oldT = dels[p].text, newT = adds[p].text;
        if (oldT.length > MAX_CHARS || newT.length > MAX_CHARS) {
          htmlA += '<div class="tdiff-row tdiff-row-mod-a">' + esc(oldT) + "</div>";
          htmlB += '<div class="tdiff-row tdiff-row-mod-b">' + esc(newT) + "</div>";
        } else {
          var co = charOps(oldT, newT);
          htmlA += '<div class="tdiff-row tdiff-row-mod-a">' + markCharsOld(co) + "</div>";
          htmlB += '<div class="tdiff-row tdiff-row-mod-b">' + markCharsNew(co) + "</div>";
        }
        gA += '<div class="tdiff-gnum tdiff-gmod-a">' + dels[p].a + "</div>";
        gB += '<div class="tdiff-gnum tdiff-gmod-b">' + adds[p].b + "</div>";
      }
      for (var r = k; r < dels.length; r++) {
        nDel++;
        htmlA += '<div class="tdiff-row tdiff-row-del">' + esc(dels[r].text) + "</div>";
        htmlB += '<div class="tdiff-row tdiff-row-blank">&nbsp;</div>';
        gA += '<div class="tdiff-gnum tdiff-gdel">' + dels[r].a + "</div>";
        gB += '<div class="tdiff-gnum"></div>';
      }
      for (var s = k; s < adds.length; s++) {
        nAdd++;
        htmlA += '<div class="tdiff-row tdiff-row-blank">&nbsp;</div>';
        htmlB += '<div class="tdiff-row tdiff-row-add">' + esc(adds[s].text) + "</div>";
        gA += '<div class="tdiff-gnum"></div>';
        gB += '<div class="tdiff-gnum tdiff-gadd">' + adds[s].b + "</div>";
      }
    }

    el.ovA.innerHTML = htmlA;
    el.ovB.innerHTML = htmlB;
    el.gutterA.innerHTML = gA;
    el.gutterB.innerHTML = gB;

    setStatus(
      '<span class="text-red-500 dark:text-red-400 font-medium">' + nMod + " modified</span>" +
      ' <span class="text-emerald-600 dark:text-emerald-400 font-medium">' + nAdd + ' ' + L.added + '</span>' +
      ' <span class="text-red-500 dark:text-red-400 font-medium">' + nDel + ' ' + L.removed + '</span>' +
      ' <span class="text-slate-400 dark:text-zinc-500">' + nEq + " unchanged</span>" +
      ' <span class="text-slate-300 dark:text-zinc-600">|</span>' +
      ' <span class="text-emerald-600 dark:text-emerald-400 font-medium">marked</span>'
    );
    syncGutters();
  }

  function clearMarks() {
    el.ovA.innerHTML = "";
    el.ovB.innerHTML = "";
    lastDiff = null;
    renderPlainGutters();
    setStatus('<span class="text-slate-400 dark:text-zinc-500">' + L.editHint + '</span>');
  }

  // Show plain line numbers (no marks) in the gutters
  function renderPlainGutters() {
    var g = "", i;
    var la = el.a.value.split("\n").length;
    for (i = 1; i <= la; i++) g += '<div class="tdiff-gnum">' + i + "</div>";
    el.gutterA.innerHTML = g;
    g = "";
    var lb = el.b.value.split("\n").length;
    for (i = 1; i <= lb; i++) g += '<div class="tdiff-gnum">' + i + "</div>";
    el.gutterB.innerHTML = g;
  }

  // ================= Overlay scroll sync =================

  function syncGutters() {
    el.gutterA.scrollTop = el.a.scrollTop;
    el.gutterB.scrollTop = el.b.scrollTop;
    el.ovA.scrollTop = el.a.scrollTop;
    el.ovB.scrollTop = el.b.scrollTop;
    el.ovA.scrollLeft = el.a.scrollLeft;
    el.ovB.scrollLeft = el.b.scrollLeft;
  }
  var syncing = false;
  function onScroll() {
    if (syncing) return;
    syncing = true;
    el.ovA.scrollTop = el.a.scrollTop;
    el.ovB.scrollTop = el.b.scrollTop;
    el.gutterA.scrollTop = el.a.scrollTop;
    el.gutterB.scrollTop = el.b.scrollTop;
    el.ovA.scrollLeft = el.a.scrollLeft;
    el.ovB.scrollLeft = el.b.scrollLeft;
    syncing = false;
  }

  // ================= Status =================

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

  // ================= Paste =================

  function pasteInto(target, label) {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function (t) {
        if (t == null) return;
        target.value = t;
        clearMarks();
        flashStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.pastedX + label + L.hitCompare + '</span>');
      }).catch(function () {
        setStatus('L.pasteBlocked');
      });
    } else {
      setStatus('L.pasteUnavail');
    }
  }

  // ================= Unified diff =================

  function copyUnified() {
    if (!lastDiff) { setStatus('<span class="text-slate-400 dark:text-zinc-500">' + L.nothingCopyYet + '</span>'); return; }
    var out = [];
    var aCount = 0, bCount = 0;
    for (var i = 0; i < lastDiff.length; i++) {
      var op = lastDiff[i];
      if (op.t === "eq") { aCount++; bCount++; }
      else if (op.t === "del") { aCount++; }
      else { bCount++; }
    }
    out.push("@@ -1," + aCount + " +1," + bCount + " @@");
    for (var j = 0; j < lastDiff.length; j++) {
      var o = lastDiff[j];
      if (o.t === "eq") out.push(" " + o.text);
      else if (o.t === "del") out.push("-" + o.text);
      else out.push("+" + o.text);
    }
    var text = out.join("\n");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        flashStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.copiedDiff + '</span>');
      }).catch(function () { setStatus('L.copyFailed'); });
    } else {
      setStatus('L.clipUnavail');
    }
  }

  // ================= File loading =================

  function handleFile(file, side) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      if (side === "a") el.a.value = e.target.result;
      else el.b.value = e.target.result;
      clearMarks();
      updateCounts();
      flashStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.loaded + file.name + L.hitCompare + '</span>');
    };
    reader.readAsText(file);
  }

  function bindFileButton(btn, input, side) {
    btn.addEventListener("click", function () { input.click(); });
    input.addEventListener("change", function () {
      if (input.files && input.files[0]) handleFile(input.files[0], side);
      input.value = "";
    });
  }

  function bindDrop(wrapEl, side) {
    wrapEl.addEventListener("dragover", function (e) {
      e.preventDefault();
      wrapEl.classList.add("tdiff-dragover");
    });
    wrapEl.addEventListener("dragleave", function () {
      wrapEl.classList.remove("tdiff-dragover");
    });
    wrapEl.addEventListener("drop", function (e) {
      e.preventDefault();
      wrapEl.classList.remove("tdiff-dragover");
      if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0], side);
    });
  }

  // ================= Char / size counters =================

  function fmtCount(s) {
    if (!s) return "0 chars · 0 B";
    var bytes = new Blob([s]).size;
    var size = bytes < 1024 ? bytes + " B" : (bytes / 1024).toFixed(1) + " KB";
    return s.length + " chars · " + size;
  }

  function updateCounts() {
    el.countA.textContent = fmtCount(el.a.value);
    el.countB.textContent = fmtCount(el.b.value);
  }

  // ================= Layout toggle =================
  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("tdiff-stacked", stacked);
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

  el.a.addEventListener("input", clearMarks);
  el.b.addEventListener("input", clearMarks);
  el.a.addEventListener("input", updateCounts);
  el.b.addEventListener("input", updateCounts);
  el.clearA.addEventListener("click", function () { el.a.value = ""; clearMarks(); updateCounts(); });
  el.clearB.addEventListener("click", function () { el.b.value = ""; clearMarks(); updateCounts(); });
  el.ws.addEventListener("change", function () { render(); });
  el.ci.addEventListener("change", function () { render(); });
  el.compare.addEventListener("click", function () { render(); });
  el.copy.addEventListener("click", copyUnified);
  el.clearMarks.addEventListener("click", clearMarks);
  el.pasteA.addEventListener("click", function () { pasteInto(el.a, "Input A"); });
  el.pasteB.addEventListener("click", function () { pasteInto(el.b, "Input B"); });
  bindFileButton(el.fileA, el.fileInputA, "a");
  bindFileButton(el.fileB, el.fileInputB, "b");
  bindDrop(el.left.querySelector(".tdiff-wrap"), "a");
  bindDrop(el.right.querySelector(".tdiff-wrap"), "b");
  el.a.addEventListener("scroll", onScroll);
  el.b.addEventListener("scroll", onScroll);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);
  initResizer();

  // Init: show line numbers without marks
  clearMarks();
  updateCounts();
})();

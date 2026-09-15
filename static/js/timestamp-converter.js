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
 * Timestamp Converter - ToolsBoot
 * Original implementation. No third-party libraries.
 * Automatic two-way conversion: paste a Unix timestamp -> world clock updates;
 * pick a date & time -> the Unix value updates. Shows the instant across
 * 12 major world cities using the Intl API.
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
    ts: document.getElementById("tsc-ts"),
    date: document.getElementById("tsc-date"),
    unix: document.getElementById("tsc-unix"),
    now: document.getElementById("tsc-now"),
    nowBtn: document.getElementById("tsc-now-btn"),
    live: document.getElementById("tsc-live"),
    copy: document.getElementById("tsc-copy"),
    clear: document.getElementById("tsc-clear"),
    cities: document.getElementById("tsc-cities"),
    status: document.getElementById("tsc-status"),
    tool: document.getElementById("tsc-tool"),
    layout: document.getElementById("tsc-layout"),
    layoutStack: document.getElementById("tsc-layout-stack"),
    layoutCol: document.getElementById("tsc-layout-col"),
    fullscreen: document.getElementById("tsc-fullscreen"),
    fsEnter: document.getElementById("tsc-fs-enter"),
    fsExit: document.getElementById("tsc-fs-exit"),
    left: document.getElementById("tsc-left"),
    right: document.getElementById("tsc-right"),
    resizer: document.getElementById("tsc-resizer")
  };

  var lastInput = null; // 'ts' | 'date' | null - which field was edited last
  var lastDate = null;  // the Date the panel currently shows
  var tsUnit = "auto";  // 'auto' | 's' | 'ms' - how to interpret the timestamp input

  // ---- Cities ----
  var CITIES = [
    { label: L.zh ? "北京" : "Beijing",    tz: "Asia/Shanghai" },
    { label: L.zh ? "东京" : "Tokyo",      tz: "Asia/Tokyo" },
    { label: L.zh ? "新加坡" : "Singapore",  tz: "Asia/Singapore" },
    { label: L.zh ? "迪拜" : "Dubai",      tz: "Asia/Dubai" },
    { label: L.zh ? "莫斯科" : "Moscow",     tz: "Europe/Moscow" },
    { label: L.zh ? "柏林" : "Berlin",     tz: "Europe/Berlin" },
    { label: L.zh ? "巴黎" : "Paris",      tz: "Europe/Paris" },
    { label: L.zh ? "伦敦" : "London",     tz: "Europe/London" },
    { label: L.zh ? "纽约" : "New York",   tz: "America/New_York" },
    { label: L.zh ? "芝加哥" : "Chicago",    tz: "America/Chicago" },
    { label: L.zh ? "洛杉矶" : "Los Angeles", tz: "America/Los_Angeles" },
    { label: L.zh ? "悉尼" : "Sydney",     tz: "Australia/Sydney" }
  ];

  // ---- Time helpers ----
  function fmtInTz(tz, d) {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
    }).formatToParts(d);
    var m = {};
    parts.forEach(function (p) { m[p.type] = p.value; });
    return m.year + "-" + m.month + "-" + m.day + " " + m.hour + ":" + m.minute + ":" + m.second;
  }

  function tzOffsetMs(tz, d) {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
    }).formatToParts(d);
    var m = {};
    parts.forEach(function (p) { m[p.type] = p.value; });
    var localAsUTC = Date.UTC(+m.year, +m.month - 1, +m.day, +m.hour % 24, +m.minute, +m.second);
    var utc = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
    return localAsUTC - utc;
  }

  function fmtOffset(ms) {
    var sign = ms < 0 ? "-" : "+";
    var a = Math.abs(ms);
    var h = Math.floor(a / 3600000);
    var m = Math.floor((a % 3600000) / 60000);
    return "UTC" + sign + String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
  }

  function fmtDateLocal(d) {
    function p(n) { return String(n).padStart(2, "0"); }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " +
           p(d.getHours()) + ":" + p(d.getMinutes()) + ":" + p(d.getSeconds());
  }

  // datetime-local value ("YYYY-MM-DDTHH:mm:ss", local time)
  function fmtLocalInput(d) {
    function p(n) { return String(n).padStart(2, "0"); }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + "T" +
           p(d.getHours()) + ":" + p(d.getMinutes()) + ":" + p(d.getSeconds());
  }

  // Keep the two input fields in sync (fills without re-dispatching events)
  function syncInputs(d, src) {
    if (src === "ts") {
      el.date.value = fmtLocalInput(d);
    } else if (src === "date") {
      el.ts.value = String(tsUnit === "ms" ? d.getTime() : Math.floor(d.getTime() / 1000));
    }
  }

  // ---- Render the world clock + unix readout for a given Date ----
  function render(d, source) {
    lastDate = d;
    var html = "";
    CITIES.forEach(function (c) {
      html +=
        '<div class="flex items-baseline gap-2 py-0.5 border-b border-dashed border-slate-100 dark:border-zinc-800/60">' +
        '<span class="text-xs font-semibold text-slate-600 dark:text-zinc-300 w-20 shrink-0">' + c.label + "</span>" +
        '<span class="text-[11px] font-mono text-slate-400 dark:text-zinc-500 w-16 shrink-0">' + fmtOffset(tzOffsetMs(c.tz, d)) + "</span>" +
        '<span class="text-sm font-mono text-slate-800 dark:text-zinc-200">' + fmtInTz(c.tz, d) + "</span>" +
        "</div>";
    });
    el.cities.innerHTML = html;

    el.unix.textContent = Math.floor(d.getTime() / 1000) + " s · " + d.getTime() + " ms";

    if (source === "ts") {
      setStatus(
        '<span class="text-emerald-600 dark:text-emerald-400 font-medium">From timestamp &rarr; ' + fmtDateLocal(d) + "</span>" +
        ' <span class="text-slate-300 dark:text-zinc-600">|</span> <span class="text-slate-400 dark:text-zinc-500">12 cities</span>'
      );
    } else if (source === "date") {
      setStatus(
        '<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + fmtDateLocal(d) + " &rarr; " + Math.floor(d.getTime() / 1000) + " s</span>" +
        ' <span class="text-slate-300 dark:text-zinc-600">|</span> <span class="text-slate-400 dark:text-zinc-500">12 cities</span>'
      );
    } else {
      setStatus('<span class="text-slate-400 dark:text-zinc-500">' + L.currentTime + '</span>');
    }
  }

  // ---- Parsers ----
  function parseTsInput() {
    var v = el.ts.value.trim();
    if (!v) return null;
    if (!/^\d{1,15}$/.test(v)) throw new Error(L.tsNum);
    var n = parseInt(v, 10);
    var d;
    if (tsUnit === "ms") {
      d = new Date(n);
    } else if (tsUnit === "s") {
      d = new Date(n * 1000);
    } else {
      d = v.length >= 13 ? new Date(n) : new Date(n * 1000);
    }
    if (isNaN(d.getTime())) throw new Error(L.tsRange);
    if (d.getFullYear() > 3000 || d.getFullYear() < 1970) {
      throw new Error(L.tsRange);
    }
    return d;
  }

  function parseDateInput() {
    var v = el.date.value;
    if (!v) return null;
    var d = new Date(v); // datetime-local -> local time
    if (isNaN(d.getTime())) throw new Error(L.tsInvalid);
    return d;
  }

  // ---- Pick which input drives the panel ----
  function pickDate() {
    var tsVal = el.ts.value.trim();
    var dateVal = el.date.value;
    if (lastInput === "ts" && tsVal) return { d: parseTsInput(), src: "ts" };
    if (lastInput === "date" && dateVal) return { d: parseDateInput(), src: "date" };
    if (tsVal) return { d: parseTsInput(), src: "ts" };
    if (dateVal) return { d: parseDateInput(), src: "date" };
    return null;
  }

  function update() {
    try {
      var picked = pickDate();
      if (!picked) {
        setStatus("");
        return; // empty inputs -> tick keeps following the clock
      }
      syncInputs(picked.d, picked.src);
      render(picked.d, picked.src);
    } catch (e) {
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(e.message) + "</span>");
    }
  }

  function esc(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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

  // ---- Live clock ----
  function tick() {
    el.now.textContent = Math.floor(Date.now() / 1000) + " s · " + Date.now() + " ms";
    if (!el.ts.value.trim() && !el.date.value) {
      render(new Date(), "now");
    }
  }

  // ---- Copy / Clear ----
  function copyTimes() {
    if (!lastDate) return;
    var lines = CITIES.map(function (c) {
      return c.label + " (" + fmtOffset(tzOffsetMs(c.tz, lastDate)) + "): " + fmtInTz(c.tz, lastDate);
    });
    var txt = lines.join("\n") +
      "\nUnix: " + Math.floor(lastDate.getTime() / 1000) + " s · " + lastDate.getTime() + " ms";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () {
        flashStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.copiedCity + '</span>');
      }).catch(function () { setStatus('L.copyFailed'); });
    } else {
      setStatus('L.clipUnavail');
    }
  }

  function clearAll() {
    el.ts.value = "";
    el.date.value = "";
    lastInput = null;
    el.unix.textContent = "";
    render(new Date(), "now");
    setStatus("");
  }

  // ---- Layout toggle ----
  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("tsc-stacked", stacked);
    el.layoutStack.classList.toggle("hidden", stacked);
    el.layoutCol.classList.toggle("hidden", !stacked);
  }

  // ---- Page fullscreen ----
  function toggleFullscreen() {
    el.tool.classList.toggle("page-fs");
    updateFsIcon();
  }
  function updateFsIcon() {
    var isFs = el.tool.classList.contains("page-fs");
    el.fsEnter.classList.toggle("hidden", isFs);
    el.fsExit.classList.toggle("hidden", !isFs);
  }

  // ---- Drag-to-resize ----
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

  // ---- Events ----
  var debounceTimer = null;
  function schedule() {
    if (!el.live.checked) return;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(update, 200);
  }

  el.ts.addEventListener("input", function () { lastInput = "ts"; schedule(); });
  el.date.addEventListener("input", function () { lastInput = "date"; schedule(); });
  document.querySelectorAll("#tsc-left [data-unit]").forEach(function (b) {
    b.addEventListener("click", function () {
      tsUnit = b.getAttribute("data-unit");
      document.querySelectorAll("#tsc-left [data-unit]").forEach(function (o) {
        o.classList.toggle("active", o.getAttribute("data-unit") === tsUnit);
      });
      update();
    });
  });
  el.live.addEventListener("change", function () { if (el.live.checked) update(); });
  el.nowBtn.addEventListener("click", function () {
    el.ts.value = "";
    el.date.value = "";
    lastInput = null;
    el.unix.textContent = "";
    render(new Date(), "now");
    setStatus("");
  });
  el.copy.addEventListener("click", copyTimes);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);
  initResizer();

  // Init
  render(new Date(), "now");
  setInterval(tick, 1000);
  tick();
})();

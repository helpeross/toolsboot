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
 * Password Generator - ToolsBoot
 * Original implementation. No third-party libraries.
 * Cryptographically random passwords with per-type minimums,
 * unique-character and ambiguous-character options.
 * Settings are persisted in localStorage so they survive reloads.
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

  // ---- DOM references ----
  var el = {
    generate: document.getElementById("pwgen-generate"),
    copyIco: document.getElementById("pwgen-copy-ico"),
    dlTxt: document.getElementById("pwgen-dl-txt"),
    dlCsv: document.getElementById("pwgen-dl-csv"),
    clearIco: document.getElementById("pwgen-clear-ico"),
    reset: document.getElementById("pwgen-reset"),
    charDigits: document.getElementById("pwgen-char-digits"),
    charLower: document.getElementById("pwgen-char-lower"),
    charUpper: document.getElementById("pwgen-char-upper"),
    charSymbols: document.getElementById("pwgen-char-symbols"),
    charCustom: document.getElementById("pwgen-char-custom"),
    customChars: document.getElementById("pwgen-custom-chars"),
    minDigits: document.getElementById("pwgen-min-digits"),
    minLower: document.getElementById("pwgen-min-lower"),
    minUpper: document.getElementById("pwgen-min-upper"),
    minSymbols: document.getElementById("pwgen-min-symbols"),
    minCustom: document.getElementById("pwgen-min-custom"),
    length: document.getElementById("pwgen-length"),
    lengthRange: document.getElementById("pwgen-length-range"),
    count: document.getElementById("pwgen-count"),
    unique: document.getElementById("pwgen-unique"),
    noAmb: document.getElementById("pwgen-noamb"),
    output: document.getElementById("pwgen-output"),
    status: document.getElementById("pwgen-status"),
    tool: document.getElementById("pwgen-tool"),
    layout: document.getElementById("pwgen-layout"),
    layoutStack: document.getElementById("pwgen-layout-stack"),
    layoutCol: document.getElementById("pwgen-layout-col"),
    fullscreen: document.getElementById("pwgen-fullscreen"),
    fsEnter: document.getElementById("pwgen-fs-enter"),
    fsExit: document.getElementById("pwgen-fs-exit"),
    left: document.getElementById("pwgen-left"),
    right: document.getElementById("pwgen-right"),
    resizer: document.getElementById("pwgen-resizer")
  };

  var LENGTH_MAX = 256;
  var COUNT_MAX = 100;
  var RANGE_LENGTH_MAX = 64;
  var CONFIG_KEY = "pwgen-config-v1";

  // ---- Character pools ----
  var POOLS = {
    digits: "0123456789",
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    symbols: "!@#$%^&*()-_=+[]{};:,.<>?/|~"
  };
  var AMBIGUOUS = /[0O1lI|]/;

  // ---- Random helpers (cryptographically secure) ----
  function randInt(n) {
    // Uniform int in [0, n)
    var max = 0x100000000 - (0x100000000 % n);
    var x = new Uint32Array(1);
    do {
      window.crypto.getRandomValues(x);
    } while (x[0] >= max);
    return x[0] % n;
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = randInt(i + 1);
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
  }

  // ---- Build the active pools from the UI ----
  function activeGroups() {
    var groups = [];
    function add(key, checked, minEl, pool) {
      if (!checked) return;
      var min = parseInt(minEl.value, 10);
      if (!min || min < 0) min = 0;
      groups.push({ key: key, min: min, pool: pool });
    }
    add("digits", el.charDigits.checked, el.minDigits, POOLS.digits);
    add("lower", el.charLower.checked, el.minLower, POOLS.lower);
    add("upper", el.charUpper.checked, el.minUpper, POOLS.upper);
    add("symbols", el.charSymbols.checked, el.minSymbols, POOLS.symbols);
    if (el.charCustom.checked) {
      var custom = dedupe(el.customChars.value);
      if (custom) {
        add("custom", true, el.minCustom, custom);
      } else {
        add("custom", true, el.minCustom, ""); // enabled but empty - will fail with a clear message
      }
    }
    // Exclude ambiguous characters
    if (el.noAmb.checked) {
      groups.forEach(function (g) { g.pool = g.pool.replace(AMBIGUOUS, ""); });
    }
    // Merge everything into one combined pool (deduped)
    var merged = "";
    groups.forEach(function (g) { merged += g.pool; });
    return { groups: groups, merged: dedupe(merged) };
  }

  function dedupe(s) {
    var seen = {};
    var out = "";
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      if (!seen[c]) { seen[c] = true; out += c; }
    }
    return out;
  }

  // ---- Generate one password ----
  function onePassword(len, groups, merged, uniqueMode) {
    var chars = [];
    var used = {};

    function pickFrom(pool) {
      if (!pool) throw new Error("No characters available for a selected type");
      // In normal mode any character can repeat
      if (!uniqueMode) return pool[randInt(pool.length)];
      for (var tries = 0; tries < 50; tries++) {
        var c = pool[randInt(pool.length)];
        if (!used[c]) { used[c] = true; return c; }
      }
      throw new Error("Not enough unique characters");
    }

    // Guarantee each enabled type its minimum
    groups.forEach(function (g) {
      if (!g.pool) throw new Error("Custom characters are empty - add some or uncheck Custom");
      for (var i = 0; i < g.min; i++) chars.push(pickFrom(g.pool));
    });

    // Fill the rest from the merged pool
    for (var j = chars.length; j < len; j++) chars.push(pickFrom(merged));

    // Randomize the order so the guaranteed minimums are not front-loaded
    shuffle(chars);
    return chars.join("");
  }

  // ---- Generate ----
  function generate() {
    var len = parseInt(el.length.value, 10);
    if (!len || len < 1) len = 1;
    if (len > LENGTH_MAX) len = LENGTH_MAX;
    el.length.value = len;
    el.lengthRange.value = Math.min(len, RANGE_LENGTH_MAX);

    var cnt = parseInt(el.count.value, 10);
    if (!cnt || cnt < 1) cnt = 1;
    if (cnt > COUNT_MAX) cnt = COUNT_MAX;
    el.count.value = cnt;

    var ctx = activeGroups();
    var totalMin = 0;
    ctx.groups.forEach(function (g) { totalMin += g.min; });

    try {
      if (!ctx.groups.length) throw new Error("Select at least one character type");
      if (totalMin > len) {
        throw new Error("Minimum characters (" + totalMin + ") exceed password length (" + len + ")");
      }
      if (el.unique.checked && ctx.merged.length < len) {
        throw new Error("Unique mode needs at least " + len + " distinct characters, only " + ctx.merged.length + " available");
      }
      var list = [];
      for (var i = 0; i < cnt; i++) {
        list.push(onePassword(len, ctx.groups, ctx.merged, el.unique.checked));
      }
      el.output.value = list.join("\n");
      var tags = [];
      if (el.unique.checked) tags.push("unique");
      if (el.noAmb.checked) tags.push("no-amb");
      setStatus(
        '<span class="text-emerald-600 dark:text-emerald-400 font-medium">Generated ' + cnt + " password" + (cnt > 1 ? "s" : "") + " (" + len + " chars)</span>" +
        (tags.length ? ' <span class="text-slate-300 dark:text-zinc-600">|</span> <span class="text-slate-400 dark:text-zinc-500">' + tags.join(", ") + "</span>" : "") +
        ' <span class="text-slate-300 dark:text-zinc-600">|</span> <span class="text-slate-400 dark:text-zinc-500">local &amp; private</span>'
      );
    } catch (e) {
      el.output.value = "";
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

  // ---- Copy / Clear ----
  function copyAll() {
    if (!el.output.value) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(el.output.value).then(function () {
        flashStatus(L.copied);
      }).catch(function () { fallbackCopy(); });
    } else {
      fallbackCopy();
    }
  }

  function fallbackCopy() {
    el.output.select();
    try {
      document.execCommand("copy");
      flashStatus(L.copied);
    } catch (e) {
      setStatus(L.copyFailed);
    }
  }

  function clearAll() {
    el.output.value = "";
    setStatus("");
  }

  // ---- Download ----
  function download(kind) {
    if (!el.output.value) return;
    var content, mime, ext;
    if (kind === "txt") {
      content = el.output.value;
      mime = "text/plain;charset=utf-8";
      ext = "txt";
    } else {
      content = "password\n" + el.output.value.split("\n").filter(Boolean).map(function (l) {
        return '"' + l.replace(/"/g, '""') + '"';
      }).join("\n");
      mime = "text/csv;charset=utf-8";
      ext = "csv";
    }
    var blob = new Blob([content], { type: mime });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "passwords." + ext;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    flashStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.downloadedX + ext.toUpperCase() + "</span>");
  }

  // ---- Config persistence ----
  function saveConfig() {
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify({
        digits: el.charDigits.checked,
        lower: el.charLower.checked,
        upper: el.charUpper.checked,
        symbols: el.charSymbols.checked,
        custom: el.charCustom.checked,
        customChars: el.customChars.value,
        minDigits: el.minDigits.value,
        minLower: el.minLower.value,
        minUpper: el.minUpper.value,
        minSymbols: el.minSymbols.value,
        minCustom: el.minCustom.value,
        length: el.length.value,
        count: el.count.value,
        unique: el.unique.checked,
        noAmb: el.noAmb.checked
      }));
    } catch (e) { /* localStorage unavailable - ignore */ }
  }

  function loadConfig() {
    try {
      var raw = localStorage.getItem(CONFIG_KEY);
      if (!raw) return false;
      var c = JSON.parse(raw);
      el.charDigits.checked = !!c.digits;
      el.charLower.checked = !!c.lower;
      el.charUpper.checked = !!c.upper;
      el.charSymbols.checked = !!c.symbols;
      el.charCustom.checked = !!c.custom;
      el.customChars.value = c.customChars || "";
      el.minDigits.value = c.minDigits != null ? c.minDigits : 1;
      el.minLower.value = c.minLower != null ? c.minLower : 1;
      el.minUpper.value = c.minUpper != null ? c.minUpper : 1;
      el.minSymbols.value = c.minSymbols != null ? c.minSymbols : 1;
      el.minCustom.value = c.minCustom != null ? c.minCustom : 0;
      el.length.value = c.length != null ? c.length : 16;
      el.count.value = c.count != null ? c.count : 1;
      el.unique.checked = !!c.unique;
      el.noAmb.checked = !!c.noAmb;
      el.lengthRange.value = Math.min(parseInt(el.length.value, 10) || 16, RANGE_LENGTH_MAX);
      return true;
    } catch (e) {
      return false;
    }
  }

  function resetAll() {
    try { localStorage.removeItem(CONFIG_KEY); } catch (e) {}
    el.charDigits.checked = true;
    el.charLower.checked = true;
    el.charUpper.checked = true;
    el.charSymbols.checked = true;
    el.charCustom.checked = false;
    el.customChars.value = "";
    el.minDigits.value = 1;
    el.minLower.value = 1;
    el.minUpper.value = 1;
    el.minSymbols.value = 1;
    el.minCustom.value = 0;
    el.length.value = 16;
    el.lengthRange.value = 16;
    el.count.value = 1;
    el.unique.checked = false;
    el.noAmb.checked = false;
    flashStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.settingsReset + '</span>');
    generate();
  }

  // ---- Layout toggle ----
  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("pwgen-stacked", stacked);
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

  // ---- Event wiring ----
  function popBtn() {
    el.generate.classList.remove("jt-pop");
    void el.generate.offsetWidth;
    el.generate.classList.add("jt-pop");
  }

  var debounceTimer = null;
  function schedule() {
    saveConfig();
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(generate, 250);
  }

  el.generate.addEventListener("click", function () { popBtn(); generate(); });
  el.copyIco.addEventListener("click", copyAll);
  el.dlTxt.addEventListener("click", function () { download("txt"); });
  el.dlCsv.addEventListener("click", function () { download("csv"); });
  el.clearIco.addEventListener("click", clearAll);
  el.reset.addEventListener("click", resetAll);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);
  initResizer();

  // Any setting change: persist, then regenerate (debounced)
  var changeInputs = [el.charDigits, el.charLower, el.charUpper, el.charSymbols, el.charCustom,
                      el.customChars, el.minDigits, el.minLower, el.minUpper, el.minSymbols,
                      el.minCustom, el.count, el.unique, el.noAmb];
  changeInputs.forEach(function (inp) {
    inp.addEventListener("input", schedule);
    inp.addEventListener("change", schedule);
  });

  // Length slider <-> number box two-way sync.
  // While dragging, keep the number box in step with the slider so the
  // debounced generate() (which reads the number box) cannot snap the slider back.
  el.lengthRange.addEventListener("input", function () {
    el.length.value = el.lengthRange.value;
    schedule();
  });
  el.lengthRange.addEventListener("change", schedule);
  el.length.addEventListener("input", function () {
    el.lengthRange.value = Math.min(parseInt(el.length.value, 10) || 1, RANGE_LENGTH_MAX);
    schedule();
  });
  el.length.addEventListener("change", schedule);

  // Regenerate on Enter in number fields
  [el.minDigits, el.minLower, el.minUpper, el.minSymbols, el.minCustom, el.length, el.count]
    .forEach(function (inp) {
      inp.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); generate(); }
      });
    });

  // Init: restore saved settings, then generate
  loadConfig();
  generate();
})();

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
 * Language Cipher - ToolsBoot
 * Original implementation. No third-party libraries.
 * Encrypts/decrypts text by mapping UTF-8 bytes onto a chosen script
 * (hanzi, English letters, Greek, Cyrillic, Thai, kana), with an optional
 * secret key applied as a per-byte shift (mod 256). Decryption needs the
 * same language AND the same key. Everything runs locally in the browser.
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
    copy: document.getElementById("langc-copy"),
    clearIco: document.getElementById("langc-clear-ico"),
    set: document.getElementById("langc-set"),
    key: document.getElementById("langc-key"),
    input: document.getElementById("langc-input"),
    output: document.getElementById("langc-output"),
    status: document.getElementById("langc-status"),
    live: document.getElementById("langc-live"),
    tool: document.getElementById("langc-tool"),
    layout: document.getElementById("langc-layout"),
    layoutStack: document.getElementById("langc-layout-stack"),
    layoutCol: document.getElementById("langc-layout-col"),
    fullscreen: document.getElementById("langc-fullscreen"),
    fsEnter: document.getElementById("langc-fs-enter"),
    fsExit: document.getElementById("langc-fs-exit"),
    left: document.getElementById("langc-left"),
    right: document.getElementById("langc-right"),
    resizer: document.getElementById("langc-resizer")
  };

  var mode = "encrypt";

  // ---- Script sets ----
  var SETS = {
    han: { name: "Chinese (hanzi)", gen: 0x4e00, count: 4096 },
    kor: { name: "Korean (hangul)", gen: 0xac00, count: 4096 },
    eng: { name: "English letters", chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" },
    gre: { name: "Greek", chars: "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω0123456789" },
    cyr: { name: "Cyrillic", chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя0123456789" },
    tha: { name: "Thai", chars: "กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะาำิีึืุูเแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙" },
    kana: { name: "Japanese kana", chars: "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ" },
    ara: { name: "Arabic", chars: "ابتثجحخدذرزسشصضطظعغفقكلمنهوي٠١٢٣٤٥٦٧٨٩" },
    heb: { name: "Hebrew", chars: "אבגדהוזחטיכלמנסעפצקרשתךףץםן0123456789" },
    dev: { name: "Devanagari (Hindi)", chars: "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह०१२३४५६७८९" },
    ben: { name: "Bengali", chars: "অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ০১২৩৪৫৬৭৮৯" },
    tam: { name: "Tamil", chars: "அஆஇஈஉஊஎஏஐஒஓஔகஙசஜஞடணதநபமயரலவழளறனஷஸஹ௦௧௨௩௪௫௬௭௮௯" },
    geo: { name: "Georgian", chars: "აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ0123456789" },
    arm: { name: "Armenian", chars: "աբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆ0123456789" },
    eth: { name: "Ethiopic (Amharic)", gen: 0x1200, count: 231 },
    mya: { name: "Myanmar", chars: "ကခဂဃငစဆဇဈဉညဋဌဍဎဏတထဒဓနပဖဗဘမယရလဝသဟဠအ၀၁၂၃၄၅၆၇၈၉" },
    khm: { name: "Khmer", chars: "កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ០១២៣៤៥៦៧៨៩" }
  };

  var SET_CACHE = {};
  function getSet(key) {
    if (SET_CACHE[key]) return SET_CACHE[key];
    var def = SETS[key];
    var chars = def.chars;
    if (!chars) {
      chars = "";
      for (var i = 0; i < def.count; i++) chars += String.fromCharCode(def.gen + i);
    }
    // Deduplicate and build the index map
    var seen = {}, out = "", map = {};
    for (var j = 0; j < chars.length; j++) {
      var c = chars[j];
      if (!seen[c]) { seen[c] = 1; map[c] = out.length; out += c; }
    }
    var n = out.length;
    var nd = n >= 256 ? 1 : 2; // digits per byte
    SET_CACHE[key] = { name: def.name, chars: out, map: map, n: n, nd: nd };
    return SET_CACHE[key];
  }

  // ---- Key sequence: UTF-16 code units mod 256, cycled ----
  function keySeq(key) {
    var a = [];
    for (var i = 0; i < key.length; i++) a.push(key.charCodeAt(i) % 256);
    return a;
  }

  // ---- Encrypt: text -> UTF-8 bytes -> (key shift) -> script chars ----
  function encrypt(str, key) {
    var bytes = Array.from(new TextEncoder().encode(str));
    if (key) {
      var ks = keySeq(key);
      for (var i = 0; i < bytes.length; i++) bytes[i] = (bytes[i] + ks[i % ks.length]) % 256;
    }
    var s = getSet(el.set.value);
    var out = "";
    for (var j = 0; j < bytes.length; j++) {
      var b = bytes[j];
      if (s.nd === 1) {
        out += s.chars[b];
      } else {
        out += s.chars[Math.floor(b / s.n)] + s.chars[b % s.n];
      }
    }
    return out;
  }

  // ---- Decrypt: script chars -> bytes -> (key unshift) -> UTF-8 text ----
  function decrypt(str, key) {
    var s = getSet(el.set.value);
    if (!str) return "";
    if (str.length % s.nd !== 0) {
      throw new Error(L.langLen + s.nd + " " + s.name);
    }
    var bytes = [];
    for (var i = 0; i < str.length; i += s.nd) {
      var v = 0;
      for (var k = 0; k < s.nd; k++) {
        var idx = s.map[str[i + k]];
        if (idx === undefined) {
          throw new Error(L.langChar + " " + s.name + ": " + str[i + k]);
        }
        v = v * s.n + idx;
      }
      if (v > 255) throw new Error(L.langOutRange);
      bytes.push(v);
    }
    if (key) {
      var ks = keySeq(key);
      for (var j = 0; j < bytes.length; j++) bytes[j] = (bytes[j] - ks[j % ks.length] + 256) % 256;
    }
    try {
      return new TextDecoder("utf-8", { fatal: true }).decode(new Uint8Array(bytes));
    } catch (e) {
      throw new Error(L.langUtf8);
    }
  }

  // ---- Status helpers ----
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

  // ---- Auto-detect which script a ciphertext belongs to ----
  // Every script's character set is disjoint except the shared digits
  // 0-9 (English/Greek/Cyrillic), and a valid ciphertext can never consist
  // of digits only (the high digit of each encoded byte is always a letter).
  // So a valid ciphertext hits exactly one script.
  function detectSet(text) {
    var hits = [];
    if (!text) return hits;
    Object.keys(SETS).forEach(function (key) {
      var s = getSet(key);
      var ok = true;
      for (var i = 0; i < text.length; i++) {
        if (s.map[text[i]] === undefined) { ok = false; break; }
      }
      if (ok) hits.push(key);
    });
    return hits;
  }

  // ---- Run ----
  function run() {
    var text = el.input.value;
    var key = el.key.value;
    if (!text) {
      el.output.value = "";
      setStatus("");
      return;
    }
    try {
      if (mode === "encrypt") {
        var s = getSet(el.set.value);
        var out = encrypt(text, key);
        el.output.value = out;
        setStatus(
          '<span class="text-emerald-600 dark:text-emerald-400 font-medium">Encrypted ' + text.length + " chars &rarr; " + out.length + " chars</span>" +
          ' <span class="text-slate-300 dark:text-zinc-600">|</span> <span class="text-slate-400 dark:text-zinc-500">' + s.name + "</span>" +
          ' <span class="text-slate-300 dark:text-zinc-600">|</span> <span class="text-slate-400 dark:text-zinc-500">' + (key ? L.keyChars + key.length + " chars" : L.noKey) + "</span>"
        );
      } else {
        var hits = detectSet(text);
        if (hits.length === 0) {
          throw new Error(L.langDetect);
        }
        var chosen = hits.length === 1 ? hits[0]
          : (hits.indexOf(el.set.value) >= 0 ? el.set.value : hits[0]);
        var auto = chosen !== el.set.value;
        el.set.value = chosen;
        var s2 = getSet(chosen);
        var plain = decrypt(text, key);
        el.output.value = plain;
        setStatus(
          '<span class="text-emerald-600 dark:text-emerald-400 font-medium">Decrypted ' + text.length + " chars &rarr; " + plain.length + " chars</span>" +
          ' <span class="text-slate-300 dark:text-zinc-600">|</span> <span class="text-slate-400 dark:text-zinc-500">' + s2.name + (auto ? " (auto-detected)" : "") + "</span>" +
          ' <span class="text-slate-300 dark:text-zinc-600">|</span> <span class="text-slate-400 dark:text-zinc-500">' + (key ? L.keyApplied : L.noKey) + "</span>"
        );
      }
    } catch (e) {
      el.output.value = "";
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(e.message) + "</span>");
    }
  }

  function esc(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ---- Mode switch ----
  function setMode(m) {
    mode = m;
    document.querySelectorAll("#langc-left .jt-mode[data-mode]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-mode") === m);
    });
  }

  // ---- Copy / Clear ----
  function copyOut() {
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
    el.input.value = "";
    el.output.value = "";
    setStatus("");
  }

  // ---- Layout toggle ----
  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("langc-stacked", stacked);
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
    debounceTimer = setTimeout(run, 200);
  }

  // The mode switch itself is the manual action: clicking Encrypt/Decrypt
  // always runs that mode immediately (independent of the Live checkbox).
  document.querySelectorAll("#langc-left .jt-mode[data-mode]").forEach(function (b) {
    b.addEventListener("click", function () {
      setMode(b.getAttribute("data-mode"));
      run();
    });
  });
  el.input.addEventListener("input", schedule);
  el.set.addEventListener("change", schedule);
  el.key.addEventListener("input", schedule);
  el.live.addEventListener("change", function () {
    if (el.live.checked) run();
  });
  el.clearIco.addEventListener("click", clearAll);
  el.copy.addEventListener("click", copyOut);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  // Paste into the input textarea
  var pasteBtn = document.getElementById("langc-paste");
  function pasteIntoInput() {
    var input = document.getElementById("langc-input");
    if (!input) return;
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function (t) {
        if (t == null) return;
        input.value = t;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        flashStatus(L.pasted);
      }).catch(function () {
        setStatus(L.pasteBlocked);
      });
    } else {
      setStatus(L.pasteUnavail);
    }
  }
  pasteBtn.addEventListener("click", pasteIntoInput);
  initResizer();

  setStatus('<span class="text-slate-400 dark:text-zinc-500">' + L.localRun + '</span>');
})();

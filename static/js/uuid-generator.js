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
vUnknown:z?"未知":"unknown",
uuidExpected:z?"需要 32 位十六进制字符（8-4-4-4-12，可省略连字符）":"Expected 32 hex characters (8-4-4-4-12, hyphens optional)",
version:z?"版本":"version",
variant:z?"变体":"variant"
};})();

/*!
 * UUID Generator - ToolsBoot
 * Original implementation. No third-party libraries.
 * Supports v1 / v3 / v4 / v5 / v6 / v7, output formatting options,
 * TXT/CSV downloads, and a UUID validator with version detection.
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
    generate: document.getElementById("uuid-generate"),
    copy: document.getElementById("uuid-copy"),
    dlTxt: document.getElementById("uuid-dl-txt"),
    dlCsv: document.getElementById("uuid-dl-csv"),
    clear: document.getElementById("uuid-clear"),
    version: document.getElementById("uuid-version"),
    nsWrap: document.getElementById("uuid-ns-wrap"),
    namespace: document.getElementById("uuid-namespace"),
    name: document.getElementById("uuid-name"),
    count: document.getElementById("uuid-count"),
    countRange: document.getElementById("uuid-count-range"),
    output: document.getElementById("uuid-output"),
    status: document.getElementById("uuid-status"),
    checkInput: document.getElementById("uuid-check-input"),
    checkBtn: document.getElementById("uuid-check-btn"),
    checkResult: document.getElementById("uuid-check-result"),
    tool: document.getElementById("uuid-tool"),
    layout: document.getElementById("uuid-layout"),
    layoutStack: document.getElementById("uuid-layout-stack"),
    layoutCol: document.getElementById("uuid-layout-col"),
    fullscreen: document.getElementById("uuid-fullscreen"),
    fsEnter: document.getElementById("uuid-fs-enter"),
    fsExit: document.getElementById("uuid-fs-exit"),
    panels: document.getElementById("uuid-panels"),
    left: document.getElementById("uuid-left"),
    right: document.getElementById("uuid-right"),
    resizer: document.getElementById("uuid-resizer")
  };

  var MAX_COUNT = 5000;  // typed limit; the slider tops out at 1000
  var RANGE_MAX = 1000;
  var countTimer = null;
  var nsTimer = null;

  // Output-format state (driven by the segmented controls)
  var cfg = { caseMode: "lower", hyphenMode: "keep", wrapMode: "plain", layoutMode: "lines" };

  // ---- Helpers ----
  function randBytes(n) {
    var b = new Uint8Array(n);
    window.crypto.getRandomValues(b);
    return b;
  }

  function hexStr(bytes) {
    var s = "";
    for (var i = 0; i < bytes.length; i++) {
      s += (bytes[i] < 16 ? "0" : "") + bytes[i].toString(16);
    }
    return s;
  }

  function uuidFromBytes(b) {
    var h = hexStr(b);
    return h.slice(0, 8) + "-" + h.slice(8, 12) + "-" + h.slice(12, 16) + "-" +
           h.slice(16, 20) + "-" + h.slice(20);
  }

  // Set the version nibble (byte 6 high bits) and RFC 4122 variant (byte 8)
  function finalize(b, version) {
    b[6] = (b[6] & 0x0f) | (version << 4);
    b[8] = (b[8] & 0x3f) | 0x80;
    return uuidFromBytes(b);
  }

  // ---- v4: random ----
  function uuidV4() {
    return finalize(randBytes(16), 4);
  }

  // ---- v7: 48-bit Unix-millisecond timestamp + random ----
  function uuidV7() {
    var b = randBytes(16);
    var ts = BigInt(Date.now());
    b[0] = Number((ts >> 40n) & 0xffn);
    b[1] = Number((ts >> 32n) & 0xffn);
    b[2] = Number((ts >> 24n) & 0xffn);
    b[3] = Number((ts >> 16n) & 0xffn);
    b[4] = Number((ts >> 8n) & 0xffn);
    b[5] = Number(ts & 0xffn);
    return finalize(b, 7);
  }

  // 100-ns intervals since 1582-10-15 00:00:00 UTC (60-bit counter)
  function gregorianNs() {
    return (BigInt(Date.now()) + 12219292800000n) * 10000n +
           BigInt(Math.floor(Math.random() * 10000));
  }

  // ---- v1: 60-bit timestamp + clock sequence + random node ----
  function uuidV1() {
    var b = randBytes(16);
    var ns = gregorianNs();
    // time_low = bits 0-31, time_mid = bits 32-47, time_hi = bits 48-59
    b[0] = Number((ns >> 24n) & 0xffn);
    b[1] = Number((ns >> 16n) & 0xffn);
    b[2] = Number((ns >> 8n) & 0xffn);
    b[3] = Number(ns & 0xffn);
    b[4] = Number((ns >> 40n) & 0xffn);
    b[5] = Number((ns >> 32n) & 0xffn);
    b[6] = Number((ns >> 56n) & 0x0fn) | 0x10; // version 1 + time_hi bits 56-59
    b[7] = Number((ns >> 48n) & 0xffn);        // time_hi bits 48-55
    b[8] = (b[8] & 0x3f) | 0x80; // variant + random clock_seq_hi
    return uuidFromBytes(b); // bytes 9-15 (clock_seq_low + node) already random
  }

  // ---- v6: v1 timestamp reordered (48-bit) for lexicographic sort ----
  function uuidV6() {
    var b = randBytes(16);
    var ns = gregorianNs();
    var ts = ns >> 12n; // most significant 48 bits of the 60-bit counter
    b[0] = Number((ts >> 40n) & 0xffn);
    b[1] = Number((ts >> 32n) & 0xffn);
    b[2] = Number((ts >> 24n) & 0xffn);
    b[3] = Number((ts >> 16n) & 0xffn);
    b[4] = Number((ts >> 8n) & 0xffn);
    b[5] = Number(ts & 0xffn);
    return finalize(b, 6);
  }

  // ---- v3 / v5: hash of namespace + name ----
  function parseNamespace(s) {
    var t = String(s || "").trim().replace(/^urn:uuid:/i, "").replace(/[{}]/g, "").replace(/-/g, "");
    if (!/^[0-9a-f]{32}$/i.test(t)) throw new Error("Namespace must be a valid UUID (e.g. 6ba7b810-9dad-11d1-80b4-00c04fd430c8)");
    var b = new Uint8Array(16);
    for (var i = 0; i < 16; i++) b[i] = parseInt(t.substr(i * 2, 2), 16);
    return b;
  }

  function nameData() {
    return new TextEncoder().encode(String(el.name.value || ""));
  }

  function concat(a, b2) {
    var o = new Uint8Array(a.length + b2.length);
    o.set(a);
    o.set(b2, a.length);
    return o;
  }

  function uuidV3() {
    return finalize(md5(concat(parseNamespace(el.namespace.value), nameData())), 3);
  }

  async function uuidV5() {
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error("SHA-1 (v5) requires a secure context (https or localhost)");
    }
    var hash = await window.crypto.subtle.digest("SHA-1", concat(parseNamespace(el.namespace.value), nameData()));
    // RFC 4122: v5 uses the first 16 bytes of the 20-byte SHA-1 digest
    return finalize(new Uint8Array(hash, 0, 16), 5);
  }

  // ---- MD5 (compact implementation; used by v3) ----
  var md5 = (function () {
    function rotl(x, n) { return (x << n) | (x >>> (32 - n)); }
    function add32(a, b) { return (a + b) & 0xffffffff; }
    var K = [];
    for (var i = 0; i < 64; i++) K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296);
    var S = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
             5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
             4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
             6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];
    function md5(bytes) {
      var origLen = bytes.length;
      var bitLen = origLen * 8;
      var padded = new Uint8Array((((origLen + 8) >> 6) + 1) << 6);
      padded.set(bytes);
      padded[origLen] = 0x80;
      var lo = bitLen & 0xffffffff;
      var hi = Math.floor(bitLen / 0x100000000) & 0xffffffff;
      var off = padded.length - 8;
      padded[off] = lo & 0xff; padded[off + 1] = (lo >>> 8) & 0xff;
      padded[off + 2] = (lo >>> 16) & 0xff; padded[off + 3] = (lo >>> 24) & 0xff;
      padded[off + 4] = hi & 0xff; padded[off + 5] = (hi >>> 8) & 0xff;
      padded[off + 6] = (hi >>> 16) & 0xff; padded[off + 7] = (hi >>> 24) & 0xff;

      var a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;
      for (var i = 0; i < padded.length; i += 64) {
        var M = new Array(16);
        for (var j = 0; j < 16; j++) {
          var o = i + j * 4;
          M[j] = padded[o] | (padded[o + 1] << 8) | (padded[o + 2] << 16) | (padded[o + 3] << 24);
        }
        var A = a0, B = b0, C = c0, D = d0;
        for (var k = 0; k < 64; k++) {
          var F, g;
          if (k < 16) { F = (B & C) | (~B & D); g = k; }
          else if (k < 32) { F = (D & B) | (~D & C); g = (5 * k + 1) & 15; }
          else if (k < 48) { F = B ^ C ^ D; g = (3 * k + 5) & 15; }
          else { F = C ^ (B | ~D); g = (7 * k) & 15; }
          F = add32(add32(add32(F, A), K[k]), M[g]);
          var temp = D;
          D = C;
          C = B;
          B = add32(B, rotl(F, S[k]));
          A = temp;
        }
        a0 = add32(a0, A); b0 = add32(b0, B); c0 = add32(c0, C); d0 = add32(d0, D);
      }
      var out = new Uint8Array(16);
      function wb(v, idx) {
        out[idx] = v & 0xff; out[idx + 1] = (v >>> 8) & 0xff;
        out[idx + 2] = (v >>> 16) & 0xff; out[idx + 3] = (v >>> 24) & 0xff;
      }
      wb(a0, 0); wb(b0, 4); wb(c0, 8); wb(d0, 12);
      return out;
    }
    return md5;
  })();

  // ---- Version dispatch ----
  function makeUuid(v) {
    switch (v) {
      case "v1": return uuidV1();
      case "v3": return uuidV3();
      case "v5": return uuidV5();
      case "v6": return uuidV6();
      case "v7": return uuidV7();
      default: return uuidV4();
    }
  }

  // ---- Output formatting ----
  function formatUuid(u) {
    var out = u;
    if (cfg.hyphenMode === "remove") out = out.replace(/-/g, "");
    if (cfg.caseMode === "upper") out = out.toUpperCase();
    if (cfg.wrapMode === "braces") out = "{" + out + "}";
    if (cfg.wrapMode === "urn") out = "urn:uuid:" + out;
    return out;
  }

  function renderList(list) {
    var formatted = list.map(formatUuid);
    if (cfg.layoutMode === "comma") return formatted.join(", ");
    if (cfg.layoutMode === "json") return JSON.stringify(formatted);
    return formatted.join("\n");
  }

  // ---- Generate ----
  async function generate() {
    var n = parseInt(el.count.value, 10);
    if (!n || n < 1) n = 1;
    if (n > MAX_COUNT) n = MAX_COUNT;
    el.count.value = n;
    var v = el.version.value;
    try {
      var list = [];
      for (var i = 0; i < n; i++) {
        list.push(await makeUuid(v));
      }
      el.output.value = renderList(list);
      setStatus(
        '<span class="text-emerald-600 dark:text-emerald-400 font-medium">Generated ' + n + " UUID" + (n > 1 ? "s" : "") + " (v" + v.slice(1) + ")</span>" +
        ' <span class="text-slate-300 dark:text-zinc-600">|</span> ' +
        '<span class="text-slate-400 dark:text-zinc-500">' + list.length + " line" + (list.length > 1 ? "s" : "") + "</span>"
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

  // ---- Copy all ----
  function copyAll() {
    if (!el.output.value) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(el.output.value).then(function () {
        flashStatus(L.copied);
      }).catch(function () {
        fallbackCopy();
      });
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

  // ---- Downloads ----
  function download(kind) {
    if (!el.output.value) return;
    var content, mime, ext;
    if (kind === "txt") {
      content = el.output.value;
      mime = "text/plain;charset=utf-8";
      ext = "txt";
    } else {
      content = "uuid\n" + el.output.value.split("\n").filter(Boolean).map(function (l) {
        return '"' + l.replace(/"/g, '""') + '"';
      }).join("\n");
      mime = "text/csv;charset=utf-8";
      ext = "csv";
    }
    var blob = new Blob([content], { type: mime });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "uuids." + ext;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    flashStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.downloadedX + 'uuids.' + ext + "</span>");
  }

  // ---- Clear ----
  function clearAll() {
    el.output.value = "";
    setStatus("");
  }

  // ---- Validator: validate a UUID string and detect its version ----
  function validate() {
    var s = el.checkInput.value.trim();
    if (!s) {
      el.checkResult.innerHTML = "";
      return;
    }
    var t = s.replace(/^urn:uuid:/i, "").replace(/^\{/, "").replace(/\}$/, "").trim();
    var hyphenated = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(t);
    var plain = /^[0-9a-f]{32}$/i.test(t);
    if (!hyphenated && !plain) {
      el.checkResult.innerHTML =
        '<span class="text-red-500 dark:text-red-400 font-medium">' + L.notUuid + '</span> ' +
        '<span class="text-slate-400 dark:text-zinc-500">' + L.uuidExpected + '.</span>';
      return;
    }
    var hex = t.replace(/-/g, "").toLowerCase();
    var b = [];
    for (var i = 0; i < 16; i++) b.push(parseInt(hex.substr(i * 2, 2), 16));
    var version = b[6] >> 4;
    var variantBits = b[8] >> 6;
    var variantName = variantBits === 2 ? "RFC 4122" : variantBits === 3 ? "Microsoft" : variantBits === 0 ? "NCS" : "reserved";
    var vName = {
      1: L.v1Desc,
      2: L.v2Desc,
      3: "MD5 namespace",
      4: L.v4Desc,
      5: "SHA-1 namespace",
      6: L.v6Desc,
      7: L.v7Desc,
      8: L.v8Desc
    }[version] || (L.vUnknown + " (" + version + ")");
    el.checkResult.innerHTML =
      '<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.validUuid + '</span> ' +
      '<span class="text-slate-400 dark:text-zinc-500">- ' + L.version + ' ' + version + " (" + vName + "), " + L.variant + " " + variantName + ".</span>";
  }

  // ---- Segmented controls (reuse .jt-mode styling) ----
  function bindSeg(selector, apply) {
    var btns = Array.prototype.slice.call(document.querySelectorAll(selector));
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        btns.forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        b.classList.remove("jt-pop");
        void b.offsetWidth;
        b.classList.add("jt-pop");
        apply(b);
        generate();
      });
    });
  }

  bindSeg("[data-case]", function (b) { cfg.caseMode = b.getAttribute("data-case"); });
  bindSeg("[data-hyphen]", function (b) { cfg.hyphenMode = b.getAttribute("data-hyphen"); });
  bindSeg("[data-wrap]", function (b) { cfg.wrapMode = b.getAttribute("data-wrap"); });
  bindSeg("[data-layout]", function (b) { cfg.layoutMode = b.getAttribute("data-layout"); });

  // ---- Page fullscreen (fills the viewport, no browser fullscreen) ----
  function toggleFullscreen() {
    el.tool.classList.toggle("page-fs");
    updateFsIcon();
  }
  function updateFsIcon() {
    var isFs = el.tool.classList.contains("page-fs");
    el.fsEnter.classList.toggle("hidden", isFs);
    el.fsExit.classList.toggle("hidden", !isFs);
  }

  // ---- Toggle side-by-side <-> stacked layout ----
  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("uuid-stacked", stacked);
    el.layoutStack.classList.toggle("hidden", stacked);
    el.layoutCol.classList.toggle("hidden", !stacked);
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

  el.generate.addEventListener("click", function () { popBtn(); generate(); });
  el.copy.addEventListener("click", copyAll);
  el.dlTxt.addEventListener("click", function () { download("txt"); });
  el.dlCsv.addEventListener("click", function () { download("csv"); });
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);
  initResizer();

  // Version switch: show namespace/name inputs for v3/v5, then regenerate
  el.version.addEventListener("change", function () {
    var needsNs = el.version.value === "v3" || el.version.value === "v5";
    el.nsWrap.classList.toggle("hidden", !needsNs);
    el.nsWrap.classList.toggle("flex", needsNs);
    generate();
  });

  // Namespace / name edits regenerate (debounced for v3/v5)
  [el.namespace, el.name].forEach(function (inp) {
    inp.addEventListener("input", function () {
      clearTimeout(nsTimer);
      nsTimer = setTimeout(generate, 300);
    });
  });

  // Keep the slider in step with the number input (slider caps at 1000)
  function syncRange() {
    var n = parseInt(el.count.value, 10);
    if (!n || n < 1) n = 1;
    el.countRange.value = Math.min(n, RANGE_MAX);
  }

  el.count.addEventListener("change", function () { syncRange(); generate(); });
  el.count.addEventListener("input", function () {
    syncRange();
    clearTimeout(countTimer);
    countTimer = setTimeout(generate, 400);
  });
  el.count.addEventListener("blur", function () {
    var n = parseInt(el.count.value, 10);
    if (!n || n < 1) el.count.value = 1;
    if (n > MAX_COUNT) el.count.value = MAX_COUNT;
    syncRange();
    generate();
  });

  // Dragging the slider updates the count live (debounced)
  el.countRange.addEventListener("input", function () {
    var v = parseInt(el.countRange.value, 10);
    if (!v || v < 1) v = 1;
    el.count.value = v;
    clearTimeout(countTimer);
    countTimer = setTimeout(generate, 150);
  });

  // Validator
  el.checkBtn.addEventListener("click", validate);
  el.checkInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); validate(); }
  });

  // Initial generation
  generate();
})();

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
lineNo:z?"第 ":"at line ",
lineT:z?" 行":" ",
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
 * JSON to YAML - ToolsBoot
 * Original implementation. No third-party libraries.
 * Two-way conversion between JSON and a practical YAML subset:
 *   JSON -> YAML  : full block-style serializer (maps, arrays, scalars)
 *   YAML -> JSON  : indentation-based parser (maps, arrays, quoted/plain scalars,
 *                   numbers, booleans, null, comments, inline "- key: value")
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

  // ---- DOM ----
  var el = {
    input: document.getElementById("j2y-input"),
    output: document.getElementById("j2y-output"),
    live: document.getElementById("j2y-live"),
    copy: document.getElementById("j2y-copy"),
    clear: document.getElementById("j2y-clear"),
    paste: document.getElementById("j2y-paste"),
    status: document.getElementById("j2y-status"),
    tool: document.getElementById("j2y-tool"),
    layout: document.getElementById("j2y-layout"),
    layoutStack: document.getElementById("j2y-layout-stack"),
    layoutCol: document.getElementById("j2y-layout-col"),
    fullscreen: document.getElementById("j2y-fullscreen"),
    fsEnter: document.getElementById("j2y-fs-enter"),
    fsExit: document.getElementById("j2y-fs-exit"),
    left: document.getElementById("j2y-left"),
    right: document.getElementById("j2y-right"),
    resizer: document.getElementById("j2y-resizer")
  };

  var mode = "to-yaml"; // 'to-yaml' | 'to-json'

  // ================= JSON -> YAML =================

  function yamlScalar(v) {
    if (v === null || v === undefined) return "null";
    if (typeof v === "boolean") return v ? "true" : "false";
    if (typeof v === "number") {
      if (!isFinite(v)) return "null";
      return String(v);
    }
    var s = String(v);
    if (s === "") return '""';
    // Quote when the plain form would be ambiguous
    if (/^[\s"']|["'\\\u0000-\u001f]/.test(s)) return JSON.stringify(s);
    if (/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(s)) return JSON.stringify(s);
    if (/^(true|false|null|yes|no|on|off|~)$/i.test(s)) return JSON.stringify(s);
    if (/[#\[\]{},&*!|>'"%@`]/.test(s) && /(: |^[-?:])/.test(s)) return JSON.stringify(s);
    if (/:\s|:\s*$/.test(s)) return JSON.stringify(s);
    return s;
  }

  function yamlKey(k) {
    var s = String(k);
    if (s === "") return '""';
    if (/^[\s"']|["'\\\u0000-\u001f]/.test(s)) return JSON.stringify(s);
    if (/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(s)) return JSON.stringify(s);
    if (/^(true|false|null|yes|no|on|off)$/i.test(s)) return JSON.stringify(s);
    if (/:\s|:\s*$/.test(s)) return JSON.stringify(s);
    return s;
  }

  function isScalar(v) {
    return v === null || typeof v !== "object";
  }

  function yamlStringify(value) {
    var out = [];
    (function walk(v, indent, prefix) {
      var pad = "  ".repeat(indent);
      if (Array.isArray(v)) {
        if (v.length === 0) { out.push(pad + prefix + (prefix ? " []" : "[]")); return; }
        if (prefix) out.push(pad + prefix);
        var itemIndent = indent + (prefix ? 1 : 0);
        var ipad = "  ".repeat(itemIndent);
        v.forEach(function (item) {
          if (isScalar(item)) {
            out.push(ipad + "- " + yamlScalar(item));
          } else if (Array.isArray(item)) {
            out.push(ipad + "-");
            walk(item, itemIndent + 1, "");
          } else {
            var ks = Object.keys(item);
            if (ks.length === 0) { out.push(ipad + "- {}"); return; }
            out.push(ipad + "-");
            ks.forEach(function (k) {
              walk(item[k], itemIndent + 1, yamlKey(k) + ":");
            });
          }
        });
      } else if (v && typeof v === "object") {
        var keys = Object.keys(v);
        if (keys.length === 0) { out.push(pad + prefix + " {}"); return; }
        if (prefix) out.push(pad + prefix);
        keys.forEach(function (k) {
          walk(v[k], indent + (prefix ? 1 : 0), yamlKey(k) + ":");
        });
      } else {
        out.push(pad + prefix + " " + yamlScalar(v));
      }
    })(value, 0, "");
    return out.join("\n");
  }

  // ================= YAML -> JSON =================

  function stripComment(line) {
    var quote = null;
    for (var i = 0; i < line.length; i++) {
      var c = line[i];
      if (quote) {
        if (c === quote) quote = null;
        continue;
      }
      if (c === '"' || c === "'") quote = c;
      else if (c === "#" && (i === 0 || line[i - 1] === " " || line[i - 1] === "\t")) {
        return line.slice(0, i);
      }
    }
    return line;
  }

  function yamlScalarToJson(s) {
    s = s.trim();
    if (s === "{}") return {};
    if (s === "[]") return [];
    if (s === "" || s === "null" || s === "~" || s === "Null" || s === "NULL") return null;
    if (s === "true" || s === "True" || s === "TRUE") return true;
    if (s === "false" || s === "False" || s === "FALSE") return false;
    if (/^-?(?:0|[1-9]\d*)$/.test(s)) return parseInt(s, 10);
    if (/^-?(?:0|[1-9]\d*)\.\d+$/.test(s) || /^-?(?:0|[1-9]\d*)(?:\.\d+)?[eE][+-]?\d+$/.test(s)) return parseFloat(s);
    if (/^0x[0-9a-fA-F]+$/.test(s)) return parseInt(s, 16);
    if (s.length >= 2 && s[0] === '"' && s[s.length - 1] === '"') {
      try { return JSON.parse(s); } catch (e) { return s.slice(1, -1); }
    }
    if (s.length >= 2 && s[0] === "'" && s[s.length - 1] === "'") {
      return s.slice(1, -1).replace(/''/g, "'");
    }
    return s;
  }

  // Returns {val, pos}; lines: [{ind, text}] with 1-based line numbers
  function yamlParse(text) {
    var lines = [];
    var raw = text.split(/\r?\n/);
    for (var i = 0; i < raw.length; i++) {
      var clean = stripComment(raw[i]);
      if (!clean.trim()) continue;
      var m = clean.match(/^(\s*)(.*)$/);
      lines.push({ ind: m[1].length, text: m[2], no: i + 1 });
    }
    if (!lines.length) throw new Error(L.emptyInput);

    function parseScalar(s, no) {
      try { return yamlScalarToJson(s); }
      catch (e) { throw new Error(L.badValue + " " + L.lineNo + no + L.lineT + ': "' + s + '"'); }
    }

    function parseBlock(pos, indent) {
      var container = null; // {type:'map', map:{}} | {type:'seq', arr:[]}
      while (pos < lines.length) {
        var ln = lines[pos];
        if (ln.ind < indent) break;
        if (ln.ind > indent) {
          throw new Error(L.unexpectedIndent + " " + L.lineNo + ln.no + L.lineT);
        }
        var t = ln.text;
        if (t.charAt(0) === "-" && (t.length === 1 || t.charAt(1) === " ")) {
          if (!container || container.type !== "seq") {
            if (container) throw new Error(L.mixedBlock + " " + L.lineNo + ln.no + L.lineT);
            container = { type: "seq", arr: [] };
          }
          var rest = t.slice(1).trim();
          if (rest === "") {
            pos++;
            if (pos < lines.length && lines[pos].ind > indent) {
              var sub = parseBlock(pos, lines[pos].ind);
              container.arr.push(sub.val);
              pos = sub.pos;
            } else {
              container.arr.push(null);
            }
          } else if (/^[^:]+:\s*/.test(rest) && rest.indexOf(":") > 0) {
            // inline map item: "- key: value" (with optional aligned continuations)
            var mm = rest.match(/^([^:]+):\s*(.*)$/);
            var fakeText = mm[1].trim() + ":" + (mm[2].trim() ? " " + mm[2].trim() : "");
            lines.splice(pos, 1, { ind: indent + 2, text: fakeText, no: ln.no });
            var sub4 = parseBlock(pos, indent + 2);
            container.arr.push(sub4.val);
            pos = sub4.pos;
          } else {
            container.arr.push(parseScalar(rest, ln.no));
            pos++;
          }
        } else {
          // map entry "key: value" or bare scalar document
          var cm = t.match(/^([^:]+):\s*(.*)$/);
          if (cm && cm[1].trim() !== "") {
            if (!container || container.type !== "map") {
              if (container) throw new Error(L.mixedBlock + " " + L.lineNo + ln.no + L.lineT);
              container = { type: "map", map: {} };
            }
            var k = cm[1].trim();
            var val = cm[2].trim();
            if (val === "") {
              pos++;
              if (pos < lines.length && lines[pos].ind > indent) {
                var sub3 = parseBlock(pos, lines[pos].ind);
                container.map[k] = sub3.val;
                pos = sub3.pos;
              } else {
                container.map[k] = null;
              }
            } else {
              container.map[k] = parseScalar(val, ln.no);
              pos++;
            }
          } else {
            // bare scalar document (single value, no map)
            if (container) throw new Error(L.unexpectedContent + " " + L.lineNo + ln.no + L.lineT);
            return { val: parseScalar(t, ln.no), pos: pos + 1 };
          }
        }
      }
      if (!container) return { val: null, pos: pos };
      return { val: container.type === "seq" ? container.arr : container.map, pos: pos };
    }

    var res = parseBlock(0, lines[0].ind);
    if (res.pos < lines.length) {
      throw new Error(L.unexpectedContent + " " + L.lineNo + lines[res.pos].no + L.lineT);
    }
    return res.val;
  }

  // ================= Conversion runner =================

  function run() {
    var text = el.input.value;
    if (!text.trim()) {
      el.output.value = "";
      setStatus("");
      return;
    }
    try {
      if (mode === "to-yaml") {
        var obj = JSON.parse(text);
        el.output.value = yamlStringify(obj);
        setStatus(
          '<span class="text-emerald-600 dark:text-emerald-400 font-medium">JSON &rarr; YAML</span>' +
          ' <span class="text-slate-300 dark:text-zinc-600">|</span>' +
          ' <span class="text-slate-400 dark:text-zinc-500">' + el.output.value.length + " chars</span>"
        );
      } else {
        var val = yamlParse(text);
        el.output.value = JSON.stringify(val, null, 2);
        setStatus(
          '<span class="text-emerald-600 dark:text-emerald-400 font-medium">YAML &rarr; JSON</span>' +
          ' <span class="text-slate-300 dark:text-zinc-600">|</span>' +
          ' <span class="text-slate-400 dark:text-zinc-500">' + el.output.value.length + " chars</span>"
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

  // ---- Mode switch ----
  function setMode(m) {
    mode = m;
    document.querySelectorAll("#j2y-left .jt-mode[data-mode]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-mode") === m);
    });
    el.input.placeholder = m === "to-yaml"
      ? '{"name": "ToolsBoot", "tools": ["base64", "yaml"]}'
      : "name: ToolsBoot\ntools:\n  - base64\n  - yaml";
    run();
  }

  // ---- Paste ----
  function pasteIntoInput() {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function (t) {
        if (t == null) return;
        el.input.value = t;
        el.input.dispatchEvent(new Event("input", { bubbles: true }));
        flashStatus(L.pasted);
      }).catch(function () {
        setStatus(L.pasteBlocked);
      });
    } else {
      setStatus(L.pasteUnavail);
    }
  }

  // ---- Copy / Clear ----
  function copyOutput() {
    if (!el.output.value) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(el.output.value).then(function () {
        flashStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.copiedOutput + '</span>');
      }).catch(function () { setStatus(L.copyFailed); });
    } else {
      setStatus(L.clipUnavail);
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
    el.tool.classList.toggle("j2y-stacked", stacked);
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

  document.querySelectorAll("#j2y-left .jt-mode[data-mode]").forEach(function (b) {
    b.addEventListener("click", function () { setMode(b.getAttribute("data-mode")); });
  });
  el.input.addEventListener("input", schedule);
  el.live.addEventListener("change", function () { if (el.live.checked) run(); });
  el.paste.addEventListener("click", pasteIntoInput);
  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);
  initResizer();

  // Init
  run();
})();

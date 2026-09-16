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

/* =========================================================
 * ToolsBoot — JSON Formatter (client-side tool)
 * Original implementation. Runs fully in the browser.
 * Data never leaves the device.
 * ========================================================= */
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
    input: document.getElementById("jt-input"),
    output: document.getElementById("jt-output"),
    status: document.getElementById("jt-status"),
    resizer: document.getElementById("jt-resizer"),
    left: document.getElementById("jt-left"),
    right: document.getElementById("jt-right"),
    modeStrict: document.getElementById("jt-mode-strict"),
    modeRelaxed: document.getElementById("jt-mode-relaxed"),
    copy: document.getElementById("jt-copy"),
    clear: document.getElementById("jt-clear"),
    optColor: document.getElementById("jt-opt-color"),
    optIndex: document.getElementById("jt-opt-index"),
    optType: document.getElementById("jt-opt-type"),
    optCompress: document.getElementById("jt-opt-compress"),
    options: document.getElementById("jt-options"),
    optionsBtn: document.getElementById("jt-options-btn"),
    optionsMenu: document.getElementById("jt-options-menu"),
    tool: document.getElementById("json-tool"),
    fullscreen: document.getElementById("jt-fullscreen"),
    fsEnter: document.getElementById("jt-fs-enter"),
    fsExit: document.getElementById("jt-fs-exit"),
    restore: document.getElementById("jt-restore")
  };

  // Modes: "strict" (JSON.parse) or "relaxed" (JS expression eval)
  var mode = "strict";
  // Filled with the original pasted text when we auto-extract JSON from a messy
  // input, so the user can restore it. Cleared once restored or replaced.
  var extractionState = null;
  // Set right before a programmatic restore so update() won't re-extract.
  var suppressExtract = false;

  // ---- HTML escaping (XSS-safe output injection) ----
  function esc(v) {
    return String(v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // ---- Core parser dispatch ----
  function parse(content, m) {
    if (m === "relaxed") {
      // Support non-standard JSON: unquoted keys, single quotes, trailing commas
      return (0, eval)("(" + content + ")"); // eslint-disable-line no-eval
    }
    return JSON.parse(content);
  }

  // ---- Smart recovery: extract real JSON out of JSONP / semicolons / comments ----
  // When a paste is not pure JSON (e.g. "callback({...});", "/* c */ {...}",
  // trailing "// note" or stray semicolons), try to locate and parse the JSON
  // payload inside it. Returns {value, note} when extraction succeeds, otherwise
  // throws so the UI can show a normal "Invalid JSON" message.
  function smartParse(raw, m) {
    function grabBrace(text) {
      var from = text.indexOf("{");
      if (from === -1) { from = text.indexOf("["); }
      if (from === -1) return null;
      var openC = text.charAt(from);
      var closeC = openC === "{" ? "}" : "]";
      var depth = 0;
      for (var i = from; i < text.length; i++) {
        var ch = text.charAt(i);
        if (ch === openC) depth++;
        else if (ch === closeC) { depth--; if (depth === 0) { return { text: text.slice(from, i + 1) }; } }
      }
      return null;
    }

    try {
      return { value: parse(raw, m), note: null, text: raw };
    } catch (err) {
      var cleaned = raw
        .replace(/^\s*(<\?xml[^>]*>\s*)?(<!--[^]*?-->)?\s*/, "")
        .replace(/\/\*[^]*?\*\//g, " ")
        .replace(/(^|[^:])\/\/[^\n\r]*/g, "$1 ")
        .replace(/^[\s;]+/, "")
        .replace(/[\s;]+$/, "");

      // 1) JSONP: fn({...});  -> extract inner payload
      var jsonp = cleaned.match(/[\w.$]+\s*\(\s*(.*?)\s*\)\s*;?\s*$/s);
      if (jsonp) {
        var inner = grabBrace(jsonp[1]);
        if (inner) {
          try { return { value: parse(inner.text, m), note: "jsonp", text: inner.text }; }
          catch (e) {}
        }
        try { return { value: parse(jsonp[1], m), note: "jsonp", text: jsonp[1] }; }
        catch (e2) {}
      }

      // 2) Comments / semicolons only
      if (cleaned !== raw.trim()) {
        try { return { value: parse(cleaned, m), note: "cleaned", text: cleaned }; }
        catch (e) {}
      }

      // 3) Balanced brace slice
      var slice = grabBrace(raw);
      if (slice) {
        try { return { value: parse(slice.text, m), note: "slice", text: slice.text }; }
        catch (e3) {}
      }

      throw err;
    }
  }
  // ---- Syntax coloring classes (rainbow keys) ----
  var KEY_COLORS = ["k0", "k1", "k2", "k3", "k4", "k5", "k6", "k7", "k8"];

  function typeTag(t) {
    return t.map(function (n) { return ' <span class="jttype t-' + n + '">' + n + "</span>"; }).join("");
  }

  // ---- Render value into a tree of HTML ----
  function render(val, depth, cfg, key, index) {
    if (cfg.compress) {
      // Compact single-line view — colorize but no tree/indices
      return '<span class="jts-str">' + esc(JSON.stringify(val)) + "</span>";
    }
    var out = "";
    var t = [];
    var isArr = Array.isArray(val);

    if (val === null) { t.push("null"); }
    else if (typeof val === "undefined") { t.push("undefined"); }
    else if (typeof val === "number" || typeof val === "bigint") { t.push("number"); }
    else if (typeof val === "boolean") { t.push("boolean"); }
    else if (typeof val === "string") { t.push("string"); }
    else if (isArr) { t.push("array"); }
    else if (typeof val === "object") { t.push("object"); }
    else { t.push(typeof val); }

    // Leaf values
    if (val === null) {
      return '<span class="jts-null">null</span>' + (cfg.showType ? typeTag(t) : "");
    }
    if (typeof val === "number" || typeof val === "bigint") {
      return '<span class="jts-num">' + esc(val) + "</span>" + (cfg.showType ? typeTag(t) : "");
    }
    if (typeof val === "boolean") {
      return '<span class="jts-bool">' + esc(val) + "</span>" + (cfg.showType ? typeTag(t) : "");
    }
    if (typeof val === "string") {
      return '<span class="jts-str">"' + esc(val) + '"</span>' + (cfg.showType ? typeTag(t) : "");
    }

    // Compound: object / array
    if (isArr) {
      if (val.length === 0) {
        return '<span class="jts-brk">[]</span>' + (cfg.showType ? typeTag(t) : "");
      }
      out += '<span class="jts-toggle" data-toggle>-</span><span class="jts-brk">[</span>';
      out += '<span class="jts-size" data-size style="display:none">' + val.length + " items</span>";
      out += '<ul class="jts-tree">';
      for (var i = 0; i < val.length; i++) {
        out += "<li>";
        if (cfg.index) out += '<span class="jts-idx">' + i + ":</span>";
        out += render(val[i], depth + 1, cfg, key, i);
        if (i < val.length - 1) out += '<span class="jts-brk">,</span>';
        out += "</li>";
      }
      out += "</ul><span class='jts-brk'>]</span>" + (cfg.showType ? typeTag(t) : "");
      return out;
    }

    var keys = Object.keys(val);
    if (keys.length === 0) {
      return '<span class="jts-brk">{}</span>' + (cfg.showType ? typeTag(t) : "");
    }
    out += '<span class="jts-toggle" data-toggle>-</span><span class="jts-brk">{</span>';
    out += '<span class="jts-size" data-size style="display:none">' + keys.length + " keys</span>";
    out += '<ul class="jts-tree">';
    for (var j = 0; j < keys.length; j++) {
      var k = keys[j];
      var ci = (j + depth) % 9;
      var keyClass = cfg.color ? 'class="jts-key ' + KEY_COLORS[ci] + '"' : 'class="jts-key"';
      out += "<li>" + "<span " + keyClass + '>"' + esc(k) + '"</span><span class="jts-brk">: </span>';
      out += render(val[k], depth + 1, cfg, k, j);
      if (j < keys.length - 1) out += '<span class="jts-brk">,</span>';
      out += "</li>";
    }
    out += "</ul><span class='jts-brk'>}</span>" + (cfg.showType ? typeTag(t) : "");
    return out;
  }

  function formatOutput(val, cfg) {
    if (cfg.compress) {
      return render(val, 0, cfg, null, null);
    }
    return render(val, 0, cfg, null, null);
  }

  // ---- Parse + render into #jt-output ----
  function update() {
    var raw = el.input.value.trim();
    if (!raw) {
      extractionState = null;
      suppressExtract = false;
      el.restore.classList.add("hidden");
      el.restore.classList.remove("inline-flex");
      el.output.innerHTML = "";
      setStatus("");
      return;
    }
    try {
      var res = smartParse(raw, mode);
      var obj = res.value;
      var cfg = {
        color: el.optColor.checked,
        index: el.optIndex.checked,
        type: el.optType.checked,
        compress: el.optCompress.checked
      };
      // avoid crashing the UI on enormous objects: render outside event loop
      setTimeout(function () {
        el.output.innerHTML = formatOutput(obj, cfg);
      }, 0);
      if (res.note) {
        if (suppressExtract) {
          // After Restore: keep the original text, do not re-extract.
          suppressExtract = false;
          el.restore.classList.add("hidden");
          el.restore.classList.remove("inline-flex");
          setStatus('<span class="text-slate-500 dark:text-zinc-400 font-medium">' + L.restoredNote + '</span>');
        } else {
          // Messy input: remember original the first time, then swap in the clean JSON.
          if (!extractionState) extractionState = el.input.value;
          if (el.input.value !== res.text) el.input.value = res.text;
          el.restore.classList.remove("hidden");
          el.restore.classList.add("inline-flex");
          var emsg = "";
          if (res.note === "jsonp") {
            emsg = "Input isn't plain JSON (looks like JSONP). JSON extracted below.";
          } else if (res.note === "cleaned") {
            emsg = L.noteComments;
          } else {
            emsg = L.noteExtra;
          }
          setStatus('<span class="text-amber-600 dark:text-amber-400 font-medium">' + emsg + "</span>");
        }
      } else {
        // Pure JSON. If a messy original is still waiting, keep Restore available.
        if (extractionState) {
          el.restore.classList.remove("hidden");
          el.restore.classList.add("inline-flex");
        } else {
          el.restore.classList.add("hidden");
          el.restore.classList.remove("inline-flex");
        }
        setStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.valid + '</span>');
      }    } catch (e) {
      el.output.innerHTML = "";
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + L.errPrefix + esc(e.message) + "</span>");
    }
  }

  function setStatus(html) {
    el.status.innerHTML = html;
  }

  // ---- Escape / unescape helpers ----
  function escapeString(s) {
    var obj;
    try { obj = JSON.parse(s); } catch (e) {
      try { obj = parse(s, "relaxed"); } catch (e2) { return s; }
    }
    return JSON.stringify(JSON.stringify(obj));
  }
  function unescapeString(s) {
    var out = s;
    try {
      if (s.charAt(0) === '"' && s.charAt(s.length - 1) === '"') {
        var p = JSON.parse(s);
        if (typeof p === "string") { out = p; }
      }
    } catch (e) {}
    return out
      .replace(/\\"/g, '"')
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\\\/g, "\\");
  }

  // ---- Toolbar actions ----
  var actions = {
    format: function (raw) {
      var o = parse(raw, "strict");
      return JSON.stringify(o, null, 2);
    },
    minify: function (raw) {
      var o = parse(raw, "strict");
      return JSON.stringify(o);
    },
    escape: function (raw) {
      return escapeString(raw);
    },
    unescape: function (raw) {
      return unescapeString(raw);
    }
  };

  function runAction(action, raw) {
    try {
      var out = actions[action](raw);
      el.input.value = out;
      update();
    } catch (e) {
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(e.message) + "</span>");
    }
  }

  // ---- Event wiring ----
  var debounceTimer = null;
  el.input.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(update, 250);
  });
  el.restore.addEventListener("click", function () {
    if (extractionState) {
      el.input.value = extractionState;
      suppressExtract = true;
      extractionState = null;
      update();
    }
  });
  el.input.addEventListener("dblclick", function () {
    if (!el.input.value.trim()) return;
    try {
      var o = parse(el.input.value, "relaxed");
      el.input.value = JSON.stringify(o, null, 2);
      update();
    } catch (e) {
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(e.message) + "</span>");
    }
  });

  // Toolbar action buttons
  document.querySelectorAll("#json-tool [data-act]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      runAction(btn.getAttribute("data-act"), el.input.value);
    });
  });

  // Mode switch
  function setBtnStates() {
    el.modeStrict.classList.toggle("active", mode === "strict");
    el.modeRelaxed.classList.toggle("active", mode === "relaxed");
  }
  el.modeStrict.addEventListener("click", function () { mode = "strict"; setBtnStates(); update(); });
  el.modeRelaxed.addEventListener("click", function () { mode = "relaxed"; setBtnStates(); update(); });

  // Options toggles
  [el.optColor, el.optIndex, el.optType, el.optCompress].forEach(function (chk) {
    chk.addEventListener("change", update);
  });

  // Options dropdown
  function closeMenu() {
    el.optionsMenu.classList.add("hidden");
  }
  el.optionsBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    el.optionsMenu.classList.toggle("hidden");
  });
  document.addEventListener("click", function (e) {
    if (!el.options.contains(e.target)) closeMenu();
  });

  // ---- Page fullscreen (fills the viewport, no browser fullscreen) ----
  function toggleFullscreen() {
    el.tool.classList.toggle("page-fs");
    var isFs = el.tool.classList.contains("page-fs");
    if (isFs) {
      el.right.style.height = ""; // clear inline height set by syncHeight
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
  el.fullscreen.addEventListener("click", toggleFullscreen);
  updateFsIcon();

  // Paste into the input textarea
  var pasteBtn = document.getElementById("jt-paste");
  function pasteIntoInput() {
    var input = document.getElementById("jt-input");
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

  // Expand / collapse toggle (event delegation)
  el.output.addEventListener("click", function (e) {
    var tg = e.target.closest(".jts-toggle");
    if (!tg) return;
    var parent = tg.parentElement;
    var list = parent.querySelector(".jts-tree");
    var size = parent.querySelector(".jts-size");
    if (!list) return;
    if (list.style.display === "none") {
      list.style.display = "";
      if (size) size.style.display = "none";
      tg.textContent = "-";
    } else {
      list.style.display = "none";
      if (size) size.style.display = "";
      tg.textContent = "+";
    }
  });

  // Copy formatted output
  el.copy.addEventListener("click", function () {
    var text = el.output.textContent;
    if (!text) { setStatus(L.nothingCopy); return; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        setStatus(L.copied);
      }, function () { fallbackCopy(text); });
    } else { fallbackCopy(text); }
  });

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); setStatus(L.copied); }
    catch (e) { setStatus('<span class="text-red-500">' + L.copyFailed + '</span>'); }
    document.body.removeChild(ta);
  }

  // Clear button
  el.clear.addEventListener("click", function () {
    el.input.value = "";
    update();
  });

  // Horizontal drag-resize (desktop): drag the splitter to rebalance the two
  // panels. The reference container is the shared parent of jt-left, jt-resizer
  // and jt-right, so newLeft is always measured against its left edge.
  var dragging = false;
  el.resizer.addEventListener("mousedown", function (e) {
    dragging = true;
    e.preventDefault();
    e.stopPropagation();
  });
  document.addEventListener("mousemove", function (e) {
    if (!dragging) return;
    var rect = el.left.parentElement.getBoundingClientRect();
    var newLeft = e.clientX - rect.left;
    if (newLeft > 160 && newLeft < rect.width - 200) {
      el.left.style.flex = "0 0 " + (newLeft) + "px";
      el.left.style.width = newLeft + "px";
    }
  });
  document.addEventListener("mouseup", function () { dragging = false; });
  document.addEventListener("mouseleave", function () { dragging = false; });

  // Initial render
  update();

  // ---- Keep right panel height in sync with the LEFT TEXTAREA ----
  // The container uses lg:items-start so the left (textarea) and right panels
  // never stretch each other. The left panel height is therefore driven ONLY by
  // the user-resizable textarea. We mirror that exact height onto the right
  // panel, so dragging the textarea's resize handle keeps both columns equal.
  // The rendered output lives inside .jt-output which carries overflow:auto, so
  // a very long JSON tree scrolls internally and can never inflate the layout.
  function syncHeight() {
    if (window.innerWidth < 1024) return; // stacked layout on mobile
    if (el.tool.classList.contains("page-fs")) return; // page-fs CSS fills the panels
    el.right.style.height = el.left.offsetHeight + "px";
  }
  window.addEventListener("resize", syncHeight);
  if (window.ResizeObserver) {
    var roSync = new ResizeObserver(function () { syncHeight(); });
    roSync.observe(el.input); // textarea resize handle is the height source
  }
  syncHeight();
})();
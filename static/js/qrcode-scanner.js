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
 * QR Code Scanner - ToolsBoot
 * Decodes QR codes from images using jsQR (locally vendored).
 * Supports click-select, drag & drop, paste (Ctrl+V) and multiple images.
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

  if (typeof jsQR === "undefined") {
    return; // vendor lib failed to load
  }

  var el = {
    tool: document.getElementById("qrs-tool"),
    layout: document.getElementById("qrs-layout"),
    layoutStack: document.getElementById("qrs-layout-stack"),
    layoutCol: document.getElementById("qrs-layout-col"),
    fullscreen: document.getElementById("qrs-fullscreen"),
    fsEnter: document.getElementById("qrs-fs-enter"),
    fsExit: document.getElementById("qrs-fs-exit"),
    left: document.getElementById("qrs-left"),
    right: document.getElementById("qrs-right"),
    resizer: document.getElementById("qrs-resizer"),
    drop: document.getElementById("qrs-drop"),
    file: document.getElementById("qrs-file"),
    list: document.getElementById("qrs-list"),
    hint: document.getElementById("qrs-hint"),
    results: document.getElementById("qrs-results"),
    empty: document.getElementById("qrs-empty"),
    status: document.getElementById("qrs-status"),
    clear: document.getElementById("qrs-clear"),
    copyAll: document.getElementById("qrs-copy-all") || document.getElementById("qrs-copyall"),
    resultsClear: document.getElementById("qrs-results-clear")
  };

  var queue = [];      // pending decode tasks
  var busy = false;
  var totals = { img: 0, ok: 0, fail: 0 };

  // ================= Decode =================

  function decodeFile(file) {
    var task = { file: file, status: "pending" };
    queue.push(task);
    renderList();
    pump();
  }

  function pump() {
    if (busy) return;
    var t = queue.find(function (x) { return x.status === "pending"; });
    if (!t) { updateStatus(); return; }
    busy = true;
    t.status = "reading";
    renderList();
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        try {
          var canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          var id = ctx.getImageData(0, 0, canvas.width, canvas.height);
          var code = null;
          try {
            code = jsQR(id.data, id.width, id.height, { inversionAttempts: "dontInvert" });
          } catch (e) {
            code = null;
          }
          if (!code && id.width > 1200) {
            // downscale large images for better detection
            var sc = 1200 / id.width;
            var c2 = document.createElement("canvas");
            c2.width = Math.round(id.width * sc);
            c2.height = Math.round(id.height * sc);
            var ctx2 = c2.getContext("2d");
            ctx2.drawImage(canvas, 0, 0, c2.width, c2.height);
            var id2 = ctx2.getImageData(0, 0, c2.width, c2.height);
            try {
              code = jsQR(id2.data, id2.width, id2.height, { inversionAttempts: "dontInvert" });
            } catch (e2) { code = null; }
          }
          t.dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          t.value = code ? code.data : null;
          t.status = "done";
          if (code) { totals.ok++; } else { totals.fail++; }
        } catch (e) {
          t.value = null;
          t.status = "done";
          totals.fail++;
        }
        busy = false;
        renderList();
        updateStatus();
        pump();
      };
      img.onerror = function () {
        t.value = null;
        t.status = "done";
        totals.fail++;
        busy = false;
        renderList();
        updateStatus();
        pump();
      };
      img.src = t.dataUrl = reader.result;
    };
    reader.onerror = function () {
      t.status = "done";
      t.value = null;
      totals.fail++;
      busy = false;
      renderList();
      updateStatus();
      pump();
    };
    reader.readAsDataURL(t.file);
  }

  function renderList() {
    el.list.innerHTML = "";
    if (queue.length === 0) {
      el.hint.textContent = "";
      return;
    }
    queue.forEach(function (t) {
      var row = document.createElement("div");
      row.className = "flex items-center gap-2.5 bg-slate-50 dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-800 rounded-lg p-2";
      var img = document.createElement("img");
      img.className = "w-10 h-10 object-cover rounded-md border border-slate-200 dark:border-zinc-700 bg-white";
      img.src = t.dataUrl || "";
      row.appendChild(img);
      var meta = document.createElement("div");
      meta.className = "flex-1 min-w-0";
      var name = document.createElement("p");
      name.className = "text-xs font-medium text-slate-700 dark:text-zinc-300 truncate";
      name.textContent = t.file.name;
      var state = document.createElement("p");
      state.className = "text-[10px] text-slate-400 dark:text-zinc-500";
      state.textContent = t.status === "done"
        ? (t.value ? L.decoded : L.noQR)
        : (t.status === "reading" ? L.scanning : L.queued);
      if (t.status === "done") {
        state.className = t.value
          ? "text-[10px] text-emerald-600 dark:text-emerald-400"
          : "text-[10px] text-amber-500 dark:text-amber-400";
      }
      meta.appendChild(name);
      meta.appendChild(state);
      row.appendChild(meta);
      if (t.status === "pending" || t.status === "reading") {
        var spin = document.createElement("div");
        spin.className = "w-4 h-4 border-2 border-slate-300 dark:border-zinc-600 border-t-brand-500 rounded-full animate-spin";
        row.appendChild(spin);
      } else {
        var del = document.createElement("button");
        del.type = "button";
        del.title = L.remove;
        del.className = "jt-icon-btn";
        del.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';
        del.addEventListener("click", function () {
          var i = queue.indexOf(t);
          if (i > -1) { queue.splice(i, 1); renderList(); updateStatus(); }
        });
        row.appendChild(del);
      }
      el.list.appendChild(row);
    });
    el.hint.textContent = queue.length + " image" + (queue.length > 1 ? "s" : "") + " selected";
  }

  function renderResults() {
    var done = queue.filter(function (t) { return t.status === "done"; });
    if (done.length === 0) {
      el.results.innerHTML = '<p id="qrs-empty" class="text-xs text-slate-400 dark:text-zinc-500 text-center py-10">' + L.qrsEmpty + '</p>';
      return;
    }
    el.results.innerHTML = "";
    done.forEach(function (t) {
      var card = document.createElement("div");
      card.className = "flex items-start gap-3 bg-slate-50 dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-800 rounded-lg p-3";
      var img = document.createElement("img");
      img.className = "w-14 h-14 object-contain rounded-md border border-slate-200 dark:border-zinc-700 bg-white shrink-0";
      img.src = t.dataUrl;
      card.appendChild(img);
      var body = document.createElement("div");
      body.className = "flex-1 min-w-0";
      if (t.value) {
        var val = document.createElement("p");
        val.className = "text-xs text-slate-700 dark:text-zinc-300 break-all font-mono";
        val.textContent = t.value;
        body.appendChild(val);
      } else {
        var none = document.createElement("p");
        none.className = "text-xs text-amber-500 dark:text-amber-400";
        none.textContent = L.noQRImg;
        body.appendChild(none);
      }
      card.appendChild(body);
      if (t.value) {
        var cp = document.createElement("button");
        cp.type = "button";
        cp.title = L.copyValue;
        cp.className = "jt-icon-btn shrink-0";
        cp.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>';
        cp.addEventListener("click", function () { copyText(t.value); });
        card.appendChild(cp);
      }
      el.results.appendChild(card);
    });
  }

  function updateStatus() {
    renderResults();
    var done = queue.filter(function (t) { return t.status === "done"; }).length;
    var pending = queue.length - done;
    var parts = [];
    if (queue.length > 0) {
      parts.push('<span class="text-slate-500 dark:text-zinc-400">' + queue.length + ' image' + (queue.length > 1 ? "s" : "") + "</span>");
      parts.push('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + totals.ok + " decoded</span>");
      if (totals.fail > 0) parts.push('<span class="text-amber-500 dark:text-amber-400">' + totals.fail + " " + L.nFailed + "</span>");
      if (pending > 0) parts.push('<span class="text-slate-400 dark:text-zinc-500">' + pending + " scanning&hellip;</span>");
      el.status.innerHTML = parts.join(' <span class="text-slate-300 dark:text-zinc-600">|</span> ');
    } else {
      el.status.innerHTML = "";
    }
  }

  var flashTimer = null;
  function flash(html) {
    var prev = el.status.innerHTML;
    el.status.innerHTML = html;
    clearTimeout(flashTimer);
    flashTimer = setTimeout(function () { el.status.innerHTML = prev; }, 2200);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        flash('L.copied');
      }).catch(function () {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); flash('L.copied'); }
    catch (e) { flash('L.copyFailed'); }
    document.body.removeChild(ta);
  }

  function clearAll() {
    queue = [];
    totals = { img: 0, ok: 0, fail: 0 };
    el.file.value = "";
    renderList();
    updateStatus();
  }

  // ================= File entry points =================

  function addFiles(files) {
    var imgs = Array.prototype.filter.call(files, function (f) {
      return f.type && f.type.indexOf("image/") === 0;
    });
    if (imgs.length === 0) {
      flash('<span class="text-amber-500 dark:text-amber-400">No image files found</span>');
      return;
    }
    imgs.forEach(function (f) {
      totals.img++;
      decodeFile(f);
    });
  }

  // ================= Layout / fullscreen =================

  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("qrs-stacked", stacked);
    el.layoutStack.classList.toggle("hidden", stacked);
    el.layoutCol.classList.toggle("hidden", !stacked);
  }
  function toggleFullscreen() {
    el.tool.classList.toggle("page-fs");
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
      var rect = el.left.parentElement.getBoundingClientRect();
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

  el.drop.addEventListener("click", function () { el.file.click(); });
  el.file.addEventListener("change", function () { addFiles(el.file.files); });
  ["dragenter", "dragover"].forEach(function (ev) {
    el.drop.addEventListener(ev, function (e) {
      e.preventDefault();
      e.stopPropagation();
      el.drop.classList.add("qrs-dragover");
    });
  });
  ["dragleave", "drop"].forEach(function (ev) {
    el.drop.addEventListener(ev, function (e) {
      e.preventDefault();
      e.stopPropagation();
      el.drop.classList.remove("qrs-dragover");
    });
  });
  el.drop.addEventListener("drop", function (e) {
    if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files);
  });
  document.addEventListener("paste", function (e) {
    var items = e.clipboardData && e.clipboardData.items;
    if (!items) return;
    for (var i = 0; i < items.length; i++) {
      if (items[i].type && items[i].type.indexOf("image/") === 0) {
        var f = items[i].getAsFile();
        if (f) {
          addFiles([f]);
          flash('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.imgPasted + '</span>');
        }
        break;
      }
    }
  });
  el.clear.addEventListener("click", clearAll);
  el.resultsClear.addEventListener("click", clearAll);
  if (el.copyAll) {
    el.copyAll.addEventListener("click", function () {
      var vals = queue.filter(function (t) { return t.value; }).map(function (t) { return t.value; });
      if (vals.length === 0) { flash('<span class="text-amber-500 dark:text-amber-400">Nothing decoded yet</span>'); return; }
      copyText(vals.join("\n"));
    });
  }
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);
  initResizer();
})();

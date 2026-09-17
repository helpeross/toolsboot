var L=(function(){var z=document.documentElement.lang==="zh-cn";return {
inBytes:z?"输入 ":"In: ",
outBytes:z?"输出 ":"Out: ",
copied:z?"已复制到剪贴板":"Copied to clipboard",
copyFailed:z?"复制失败":"Copy failed",
clipUnavail:z?"剪贴板不可用":"Clipboard unavailable",
pasteBlocked:z?"剪贴板读取被阻止——请按 Ctrl+V 粘贴":"Clipboard read blocked - press Ctrl+V instead",
pasteUnavail:z?"剪贴板 API 不可用——请按 Ctrl+V 粘贴":"Clipboard API unavailable - press Ctrl+V instead",
pasted:z?"已从剪贴板粘贴":"Pasted from clipboard",
emptyInput:z?"输入为空":"Empty input",
unknownChar:z?"包含无法转换的字符：":"Contains characters that cannot be translated: ",
invalidMorse:z?"包含无效的摩斯序列":"Contains invalid Morse sequences",
wordSep:z?"词之间用三个空格（或 /）分隔":"Words are separated by three spaces (or /)",
localRun:z?"所有转换均在浏览器本地完成。":"All conversions run locally in your browser."
,
zh:z,
txt2morse:z?"文本 → 摩斯":"Text → Morse",
morse2txt:z?"摩斯 → 文本":"Morse → Text",
spaceWarn:z?"注意：摩斯码中词以三个空格分隔":"Note: in Morse, words are separated by three spaces"
};})();

/*!
 * Morse Code Translator - ToolsBoot
 * Text <-> Morse code, implemented from scratch.
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

  var el = {
    input: document.getElementById("morse-input"),
    output: document.getElementById("morse-output"),
    status: document.getElementById("morse-status"),
    modeEnc: document.getElementById("morse-mode-enc"),
    modeDec: document.getElementById("morse-mode-dec"),
    live: document.getElementById("morse-live"),
    copy: document.getElementById("morse-copy"),
    clear: document.getElementById("morse-clear"),
    resizer: document.getElementById("morse-resizer"),
    left: document.getElementById("morse-left"),
    right: document.getElementById("morse-right"),
    panels: document.getElementById("morse-panels"),
    layout: document.getElementById("morse-layout"),
    layoutStack: document.getElementById("morse-layout-stack"),
    layoutCol: document.getElementById("morse-layout-col"),
    tool: document.getElementById("morse-tool"),
    fullscreen: document.getElementById("morse-fullscreen"),
    fsEnter: document.getElementById("morse-fs-enter"),
    fsExit: document.getElementById("morse-fs-exit")
  };

  var mode = "enc";

  // Morse table: A-Z, 0-9, common punctuation
  var MORSE = {
    A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....",
    I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.",
    Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
    Y: "-.--", Z: "--..",
    "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
    "6": "-....", "7": "--...", "8": "---..", "9": "----.",
    ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
    "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
    ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
    '"': ".-..-.", "$": "...-..-", "@": ".--.-."
  };
  var REV = {};
  for (var k in MORSE) if (Object.prototype.hasOwnProperty.call(MORSE, k)) REV[MORSE[k]] = k;

  function toMorse(text) {
    var words = text.toUpperCase().split(/\s+/).filter(function (w) { return w.length > 0; });
    var out = [];
    for (var i = 0; i < words.length; i++) {
      var chars = [];
      var w = words[i];
      for (var j = 0; j < w.length; j++) {
        var ch = w[j];
        if (MORSE[ch]) chars.push(MORSE[ch]);
        else return { error: L.unknownChar + esc(ch) };
      }
      out.push(chars.join(" "));
    }
    return { text: out.join("   ") };
  }

  function fromMorse(text) {
    // Normalize: treat "/" as a word separator
    var words = text.trim().split(/\s*\/\s*|\s{3,}|\t+/);
    var out = [];
    for (var i = 0; i < words.length; i++) {
      var w = words[i].trim();
      if (!w) continue;
      var syms = w.split(/\s+/);
      var letters = [];
      for (var j = 0; j < syms.length; j++) {
        var s = syms[j];
        if (REV[s]) letters.push(REV[s]);
        else return { error: L.invalidMorse };
      }
      out.push(letters.join(""));
    }
    return { text: out.join(" ") };
  }

  var debounceTimer = null;
  function update() {
    var raw = el.input.value;
    if (!raw) {
      el.output.value = "";
      setStatus("");
      return;
    }
    var r = mode === "enc" ? toMorse(raw) : fromMorse(raw);
    if (r.error) {
      el.output.value = "";
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + r.error + "</span>");
      return;
    }
    el.output.value = r.text;
    var inBytes = new TextEncoder().encode(raw).length;
    var outBytes = new TextEncoder().encode(r.text).length;
    var hint = mode === "enc" ? L.wordSep : "";
    setStatus(
      '<span class="text-slate-400 dark:text-zinc-500">' + L.inBytes + inBytes + "</span>" +
      ' <span class="text-slate-300 dark:text-zinc-600">|</span> ' +
      '<span class="text-slate-400 dark:text-zinc-500">' + L.outBytes + outBytes + "</span>" +
      (hint ? ' <span class="text-slate-300 dark:text-zinc-600">|</span> <span class="text-slate-400 dark:text-zinc-500">' + hint + "</span>" : "")
    );
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function setMode(m) {
    mode = m;
    var isEnc = m === "enc";
    el.modeEnc.classList.toggle("active", isEnc);
    el.modeDec.classList.toggle("active", !isEnc);
    var activeBtn = isEnc ? el.modeEnc : el.modeDec;
    activeBtn.classList.remove("jt-pop");
    void activeBtn.offsetWidth;
    activeBtn.classList.add("jt-pop");
    update();
  }

  function copyOutput() {
    if (!el.output.value) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(el.output.value).then(function () {
        flashStatus(TB_L.copiedOk);
      }).catch(function () { fallbackCopy(); });
    } else { fallbackCopy(); }
  }

  function fallbackCopy() {
    el.output.select();
    try { document.execCommand("copy"); flashStatus(TB_L.copiedOk); }
    catch (e) { setStatus(TB_L.copyFail); }
  }

  var statusTimer = null;
  function flashStatus(html) {
    var prev = el.status.innerHTML;
    setStatus(html);
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { setStatus(prev); }, 2000);
  }

  function clearAll() {
    el.input.value = "";
    el.output.value = "";
    setStatus("");
    el.input.focus();
  }

  // ---- Layout / fullscreen / resizer ----
  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("morse-stacked", stacked);
    el.layoutStack.classList.toggle("hidden", stacked);
    el.layoutCol.classList.toggle("hidden", !stacked);
    syncHeight();
  }

  function toggleFullscreen() {
    el.tool.classList.toggle("page-fs");
    var isFs = el.tool.classList.contains("page-fs");
    if (isFs) { el.output.style.height = ""; } else { syncHeight(); }
    el.fsEnter.classList.toggle("hidden", isFs);
    el.fsExit.classList.toggle("hidden", !isFs);
  }

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
      var rect = el.panels.getBoundingClientRect();
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

  function syncHeight() {
    if (window.innerWidth < 1024) return;
    if (el.tool.classList.contains("page-fs")) return;
    el.output.style.height = el.input.offsetHeight + "px";
  }

  el.modeEnc.addEventListener("click", function () { setMode("enc"); });
  el.modeDec.addEventListener("click", function () { setMode("dec"); });
  el.input.addEventListener("input", function () {
    if (el.live.checked) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(update, 200);
    }
  });
  el.live.addEventListener("change", function () { if (el.live.checked) update(); });
  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("morse-paste");
  function pasteIntoInput() {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function (t) {
        if (t == null) return;
        el.input.value = t;
        el.input.dispatchEvent(new Event("input", { bubbles: true }));
        flashStatus(TB_L.pastedOk);
      }).catch(function () { setStatus(TB_L.clipBlocked); });
    } else { setStatus(TB_L.clipNoApi); }
  }
  pasteBtn.addEventListener("click", pasteIntoInput);

  if (window.ResizeObserver) {
    new ResizeObserver(syncHeight).observe(el.input);
  }
  window.addEventListener("resize", syncHeight);

  el.input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      update();
    }
  });

  initResizer();
  setMode("enc");
})();

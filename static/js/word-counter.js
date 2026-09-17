var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  clipUnavail: z ? "剪贴板不可用" : "Clipboard unavailable",
  pasteBlocked: z ? "剪贴板读取被阻止——请按 Ctrl+V 粘贴" : "Clipboard read blocked - press Ctrl+V instead",
  pasteUnavail: z ? "剪贴板 API 不可用——请按 Ctrl+V 粘贴" : "Clipboard API unavailable - press Ctrl+V instead",
  pasted: z ? "已从剪贴板粘贴" : "Pasted from clipboard",
  emptyInput: z ? "输入为空" : "Empty input",
  words: z ? "单词" : "Words",
  characters: z ? "字符" : "Characters",
  noSpaces: z ? "字符（不含空格）" : "Characters (no spaces)",
  sentences: z ? "句子" : "Sentences",
  paragraphs: z ? "段落" : "Paragraphs",
  readTime: z ? "阅读时长" : "Reading time",
  min: z ? "分钟" : "min",
  sec: z ? "秒" : "s",
  zh: z
}; })();

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
    input: document.getElementById("wc-input"),
    output: document.getElementById("wc-output"),
    status: document.getElementById("wc-status"),
    copy: document.getElementById("wc-copy"),
    words: document.getElementById("wc-words"),
    chars: document.getElementById("wc-chars"),
    charsNs: document.getElementById("wc-chars-ns"),
    sentences: document.getElementById("wc-sentences"),
    paragraphs: document.getElementById("wc-paragraphs"),
    read: document.getElementById("wc-read"),
    resizer: document.getElementById("wc-resizer"),
    left: document.getElementById("wc-left"),
    right: document.getElementById("wc-right"),
    panels: document.getElementById("wc-panels"),
    layout: document.getElementById("wc-layout"),
    layoutStack: document.getElementById("wc-layout-stack"),
    layoutCol: document.getElementById("wc-layout-col"),
    tool: document.getElementById("wc-tool"),
    fullscreen: document.getElementById("wc-fullscreen"),
    fsEnter: document.getElementById("wc-fs-enter"),
    fsExit: document.getElementById("wc-fs-exit")
  };

  function update() {
    var text = el.input.value;
    var wordCount = 0, charCount = text.length, charNs = 0, sentCount = 0, paraCount = 0;
    var m = text.match(/[\p{L}\p{N}_]+/gu);
    wordCount = m ? m.length : 0;
    charNs = text.replace(/\s/g, "").length;
    var sm = text.match(/[^.!?。！？…]+[.!?。！？…]+/g);
    sentCount = sm ? sm.length : 0;
    if (text.trim()) {
      sentCount = sentCount || 1;
      paraCount = text.split(/\n\s*\n/).filter(function (p) { return p.trim().length > 0; }).length;
    }
    var mins = Math.round(wordCount / 200);
    var secs = Math.round(wordCount / 200 * 60) % 60;
    el.words.textContent = wordCount.toLocaleString();
    el.chars.textContent = charCount.toLocaleString();
    el.charsNs.textContent = charNs.toLocaleString();
    el.sentences.textContent = sentCount.toLocaleString();
    el.paragraphs.textContent = paraCount.toLocaleString();
    el.read.textContent = mins > 0 ? mins + L.min : (secs + L.sec);
    setStatus('<span class="text-slate-400 dark:text-zinc-500">' + L.words + ": " + wordCount.toLocaleString() + " · " + L.characters + ": " + charCount.toLocaleString() + "</span>");
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) { return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function copyStats() {
    var text = [
      L.words + ": " + el.words.textContent,
      L.characters + ": " + el.chars.textContent,
      L.noSpaces + ": " + el.charsNs.textContent,
      L.sentences + ": " + el.sentences.textContent,
      L.paragraphs + ": " + el.paragraphs.textContent,
      L.readTime + ": " + el.read.textContent
    ].join("\n");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { flashStatus(TB_L.copiedOk); })
        .catch(function () { setStatus(TB_L.copyFail); });
    } else { setStatus(TB_L.copyFail); }
  }
  var statusTimer = null;
  function flashStatus(html) {
    var prev = el.status.innerHTML;
    setStatus(html);
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { setStatus(prev); }, 2000);
  }

  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("wc-stacked", stacked);
    el.layoutStack.classList.toggle("hidden", stacked);
    el.layoutCol.classList.toggle("hidden", !stacked);
  }
  function toggleFullscreen() {
    el.tool.classList.toggle("page-fs");
    var isFs = el.tool.classList.contains("page-fs");
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
      if (dragging) { dragging = false; document.body.style.cursor = ""; document.body.style.userSelect = ""; }
    });
  }

  el.input.addEventListener("input", update);
  el.copy.addEventListener("click", copyStats);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("wc-paste");
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

  initResizer();
  update();
})();

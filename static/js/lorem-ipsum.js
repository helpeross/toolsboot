var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  clipUnavail: z ? "剪贴板不可用" : "Clipboard unavailable",
  pasteBlocked: z ? "剪贴板读取被阻止——请按 Ctrl+V 粘贴" : "Clipboard read blocked - press Ctrl+V instead",
  pasteUnavail: z ? "剪贴板 API 不可用——请按 Ctrl+V 粘贴" : "Clipboard API unavailable - press Ctrl+V instead",
  pasted: z ? "已从剪贴板粘贴" : "Pasted from clipboard",
  generated: z ? "已生成" : "Generated",
  invalidAmount: z ? "数量需在 1–1000 之间" : "Amount must be between 1 and 1000",
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
    amount: document.getElementById("lor-amount"),
    amountRange: document.getElementById("lor-amount-range"),
    unit: document.getElementById("lor-unit"),
    classic: document.getElementById("lor-classic"),
    generate: document.getElementById("lor-generate"),
    output: document.getElementById("lor-output"),
    status: document.getElementById("lor-status"),
    copy: document.getElementById("lor-copy"),
    clear: document.getElementById("lor-clear"),
    resizer: document.getElementById("lor-resizer"),
    left: document.getElementById("lor-left"),
    right: document.getElementById("lor-right"),
    panels: document.getElementById("lor-panels"),
    layout: document.getElementById("lor-layout"),
    layoutStack: document.getElementById("lor-layout-stack"),
    layoutCol: document.getElementById("lor-layout-col"),
    tool: document.getElementById("lor-tool"),
    fullscreen: document.getElementById("lor-fullscreen"),
    fsEnter: document.getElementById("lor-fs-enter"),
    fsExit: document.getElementById("lor-fs-exit")
  };
  var WORDS = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"];
  var CLASSIC = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  function pickWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }
  function sentence() {
    var n = 5 + Math.floor(Math.random() * 10);
    var words = [];
    for (var i = 0; i < n; i++) words.push(pickWord());
    var s = words.join(" ");
    s = s.charAt(0).toUpperCase() + s.slice(1) + ".";
    return s;
  }
  function generate() {
    var amount = Math.min(1000, Math.max(1, parseInt(el.amount.value, 10) || 3));
    var unit = el.unit.value;
    var out = "";
    if (unit === "words") {
      var w = [];
      for (var i = 0; i < amount; i++) w.push(pickWord());
      out = w.join(" ") + ".";
    } else if (unit === "sentences") {
      var s = [];
      for (var j = 0; j < amount; j++) s.push(sentence());
      out = s.join(" ");
    } else {
      var p = [];
      for (var k = 0; k < amount; k++) {
        var n = 3 + Math.floor(Math.random() * 4);
        var ss = [];
        for (var m = 0; m < n; m++) ss.push(sentence());
        p.push(ss.join(" "));
      }
      out = p.join("\n\n");
    }
    if (el.classic.checked && unit !== "words") {
      out = (unit === "paragraphs" ? CLASSIC + "\n\n" : CLASSIC + " ") + out.replace(/^Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua\.\s?/, "");
    }
    el.output.value = out;
    setStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.generated + " " + amount + "</span>");
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) { return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function copyOutput() {
    if (!el.output.value) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(el.output.value).then(function () { flashStatus(TB_L.copiedOk); })
        .catch(function () { fallbackCopy(); });
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
    el.output.value = ""; setStatus("");
  }

  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("lor-stacked", stacked);
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

  el.amount.addEventListener("input", function () {
    var v = Math.min(1000, Math.max(1, parseInt(el.amount.value, 10) || 1));
    el.amountRange.value = Math.min(100, v);
  });
  el.amountRange.addEventListener("input", function () {
    el.amount.value = el.amountRange.value;
  });
  el.generate.addEventListener("click", generate);
  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  initResizer();
  generate();
})();

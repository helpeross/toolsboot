var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  clipUnavail: z ? "剪贴板不可用" : "Clipboard unavailable",
  pasteBlocked: z ? "剪贴板读取被阻止——请按 Ctrl+V 粘贴" : "Clipboard read blocked - press Ctrl+V instead",
  pasteUnavail: z ? "剪贴板 API 不可用——请按 Ctrl+V 粘贴" : "Clipboard API unavailable - press Ctrl+V instead",
  pasted: z ? "已从剪贴板粘贴" : "Pasted from clipboard",
  emptyInput: z ? "输入为空" : "Empty input",
  camelCase: z ? "驼峰 camelCase" : "camelCase",
  pascalCase: z ? "帕斯卡 PascalCase" : "PascalCase",
  snakeCase: z ? "下划线 snake_case" : "snake_case",
  kebabCase: z ? "短横线 kebab-case" : "kebab-case",
  constCase: z ? "常量 CONSTANT_CASE" : "CONSTANT_CASE",
  trainCase: z ? "火车头 Train-Case" : "Train-Case",
  lowerCase: z ? "小写 lowercase" : "lowercase",
  upperCase: z ? "大写 UPPERCASE" : "UPPERCASE",
  dotCase: z ? "点号 dot.case" : "dot.case",
  titleCase: z ? "标题 Title Case" : "Title Case",
  copyOne: z ? "已复制" : "Copied",
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
    input: document.getElementById("casec-input"),
    output: document.getElementById("casec-output"),
    status: document.getElementById("casec-status"),
    copyAll: document.getElementById("casec-copyall"),
    clear: document.getElementById("casec-clear"),
    resizer: document.getElementById("casec-resizer"),
    left: document.getElementById("casec-left"),
    right: document.getElementById("casec-right"),
    panels: document.getElementById("casec-panels"),
    layout: document.getElementById("casec-layout"),
    layoutStack: document.getElementById("casec-layout-stack"),
    layoutCol: document.getElementById("casec-layout-col"),
    tool: document.getElementById("casec-tool"),
    fullscreen: document.getElementById("casec-fullscreen"),
    fsEnter: document.getElementById("casec-fs-enter"),
    fsExit: document.getElementById("casec-fs-exit")
  };

  function splitWords(text) {
    var words = String(text)
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .split(/[^A-Za-z0-9]+/);
    return words.filter(function (w) { return w.length > 0; });
  }

  function build() {
    var raw = el.input.value;
    if (!raw) { el.output.innerHTML = '<p class="text-sm text-slate-400 dark:text-zinc-500">' + L.emptyInput + '...</p>'; setStatus(""); return; }
    var words = splitWords(raw);
    if (!words.length) { el.output.innerHTML = '<p class="text-sm text-slate-400 dark:text-zinc-500">' + L.emptyInput + '...</p>'; setStatus(""); return; }
    var lower = words.map(function (w) { return w.toLowerCase(); });
    var upper = words.map(function (w) { return w.toUpperCase(); });
    var cap = lower.map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); });
    var formats = [
      { label: L.camelCase, val: lower.map(function (w, i) { return i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1); }).join("") },
      { label: L.pascalCase, val: cap.join("") },
      { label: L.snakeCase, val: lower.join("_") },
      { label: L.kebabCase, val: lower.join("-") },
      { label: L.constCase, val: upper.join("_") },
      { label: L.trainCase, val: cap.join("-") },
      { label: L.lowerCase, val: lower.join(" ") },
      { label: L.upperCase, val: upper.join(" ") },
      { label: L.dotCase, val: lower.join(".") },
      { label: L.titleCase, val: cap.join(" ") }
    ];
    var html = formats.map(function (f, i) {
      return '<div class="flex items-center gap-2 rounded-xl border border-slate-100 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-900/80 px-3 py-2">' +
        '<button type="button" class="jt-icon-btn shrink-0" data-idx="' + i + '" title="' + L.copyOne + '">' +
        '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg></button>' +
        '<div class="min-w-0 flex-1"><div class="text-xs font-medium text-slate-400 dark:text-zinc-500">' + esc(f.label) + '</div>' +
        '<div class="font-mono text-sm text-slate-800 dark:text-zinc-200 break-all leading-snug">' + esc(f.val) + '</div></div></div>';
    }).join("");
    el.output.innerHTML = html;
    setStatus('<span class="text-slate-400 dark:text-zinc-500">' + words.length + ' word' + (words.length > 1 ? "s" : "") + "</span>");
    el.output.querySelectorAll("button[data-idx]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var idx = parseInt(btn.getAttribute("data-idx"), 10);
        var val = formats[idx].val;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(val).then(function () { flashStatus(TB_L.copiedOk); })
            .catch(function () { setStatus(TB_L.copyFail); });
        } else { setStatus(TB_L.copyFail); }
      });
    });
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) { return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  var statusTimer = null;
  function flashStatus(html) {
    var prev = el.status.innerHTML;
    setStatus(html);
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { setStatus(prev); }, 2000);
  }
  function copyAll() {
    var text = el.input.value;
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { flashStatus(TB_L.copiedOk); })
        .catch(function () { setStatus(TB_L.copyFail); });
    } else { setStatus(TB_L.copyFail); }
  }
  function clearAll() {
    el.input.value = ""; setStatus(""); build(); el.input.focus();
  }

  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("casec-stacked", stacked);
    el.layoutStack.classList.toggle("hidden", stacked);
    el.layoutCol.classList.toggle("hidden", !stacked);
    syncHeight();
  }
  function toggleFullscreen() {
    el.tool.classList.toggle("page-fs");
    var isFs = el.tool.classList.contains("page-fs");
    if (isFs) { } else { syncHeight(); }
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
  function syncHeight() {
    if (window.innerWidth < 1024) return;
    if (el.tool.classList.contains("page-fs")) return;
  }

  el.input.addEventListener("input", build);
  el.copyAll.addEventListener("click", copyAll);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("casec-paste");
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

  window.addEventListener("resize", syncHeight);
  initResizer();
  build();
})();

var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  clipUnavail: z ? "剪贴板不可用" : "Clipboard unavailable",
  pasteBlocked: z ? "剪贴板读取被阻止——请按 Ctrl+V 粘贴" : "Clipboard read blocked - press Ctrl+V instead",
  pasteUnavail: z ? "剪贴板 API 不可用——请按 Ctrl+V 粘贴" : "Clipboard API unavailable - press Ctrl+V instead",
  pasted: z ? "已从剪贴板粘贴" : "Pasted from clipboard",
  emptyInput: z ? "输入为空" : "Empty input",
  waiting: z ? "等待输入…" : "Waiting for input...",
  veryWeak: z ? "非常弱" : "Very weak",
  weak: z ? "弱" : "Weak",
  fair: z ? "一般" : "Fair",
  strong: z ? "强" : "Strong",
  veryStrong: z ? "非常强" : "Very strong",
  lower: z ? "小写字母" : "Lowercase letters",
  upper: z ? "大写字母" : "Uppercase letters",
  digits: z ? "数字" : "Numbers",
  symbols: z ? "符号" : "Symbols",
  len8: z ? "至少 8 个字符" : "At least 8 characters",
  len12: z ? "至少 12 个字符" : "At least 12 characters",
  common: z ? "不是常见弱密码" : "Not a common weak password",
  crackTime: z ? "暴力破解时间" : "Time to crack",
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
    input: document.getElementById("pstr-input"),
    show: document.getElementById("pstr-show"),
    label: document.getElementById("pstr-label"),
    score: document.getElementById("pstr-score"),
    bar: document.getElementById("pstr-bar"),
    entropy: document.getElementById("pstr-entropy"),
    time: document.getElementById("pstr-time"),
    checks: document.getElementById("pstr-checks"),
    status: document.getElementById("pstr-status"),
    resizer: document.getElementById("pstr-resizer"),
    left: document.getElementById("pstr-left"),
    right: document.getElementById("pstr-right"),
    panels: document.getElementById("pstr-panels"),
    layout: document.getElementById("pstr-layout"),
    layoutStack: document.getElementById("pstr-layout-stack"),
    layoutCol: document.getElementById("pstr-layout-col"),
    tool: document.getElementById("pstr-tool"),
    fullscreen: document.getElementById("pstr-fullscreen"),
    fsEnter: document.getElementById("pstr-fs-enter"),
    fsExit: document.getElementById("pstr-fs-exit")
  };
  var COMMON = ["password", "123456", "12345678", "123456789", "12345", "qwerty", "abc123", "password1", "111111", "123123", "admin", "letmein", "welcome", "monkey", "dragon", "iloveyou", "sunshine", "princess", "football", "trustno1"];
  var COLORS = [
    ["bg-red-500", "text-red-600 dark:text-red-400"],
    ["bg-orange-500", "text-orange-600 dark:text-orange-400"],
    ["bg-amber-500", "text-amber-600 dark:text-amber-400"],
    ["bg-emerald-500", "text-emerald-600 dark:text-emerald-400"],
    ["bg-brand-500", "text-brand-600 dark:text-brand-400"]
  ];

  function entropyOf(pw) {
    var pool = 0;
    if (/[a-z]/.test(pw)) pool += 26;
    if (/[A-Z]/.test(pw)) pool += 26;
    if (/[0-9]/.test(pw)) pool += 10;
    if (/[^A-Za-z0-9]/.test(pw)) pool += 33;
    if (!pool) return 0;
    return pw.length * Math.log2(pool);
  }
  function crackTime(bits) {
    var secs = Math.pow(2, bits) / 1e10;
    if (secs < 1) return "<1s";
    var units = [
      [31557600, "y"], [2629800, "mo"], [604800, "w"], [86400, "d"],
      [3600, "h"], [60, "m"], [1, "s"]
    ];
    for (var i = 0; i < units.length; i++) {
      if (secs >= units[i][0]) {
        var v = secs / units[i][0];
        return v >= 100 ? Math.round(v).toLocaleString() + units[i][1] : v.toFixed(1) + units[i][1];
      }
    }
    return "<1s";
  }

  function update() {
    var pw = el.input.value;
    if (!pw) {
      el.label.textContent = L.waiting;
      el.score.textContent = "0/100";
      el.bar.style.width = "0%";
      el.bar.className = "h-full w-0 rounded-full bg-slate-300 dark:bg-zinc-600 transition-all duration-300";
      el.entropy.textContent = "0";
      el.time.textContent = "—";
      el.checks.innerHTML = "";
      setStatus("");
      return;
    }
    var bits = entropyOf(pw);
    var score = Math.min(100, Math.round(bits / 128 * 100));
    var lvl = bits < 28 ? 0 : bits < 36 ? 1 : bits < 60 ? 2 : bits < 80 ? 3 : 4;
    var names = [L.veryWeak, L.weak, L.fair, L.strong, L.veryStrong];
    el.label.textContent = names[lvl];
    el.score.textContent = score + "/100";
    el.bar.style.width = score + "%";
    el.bar.className = "h-full rounded-full transition-all duration-300 " + COLORS[lvl][0] + " w-0";
    requestAnimationFrame(function () { el.bar.style.width = score + "%"; });
    el.entropy.textContent = Math.round(bits);
    el.time.textContent = crackTime(bits);
    var common = COMMON.indexOf(pw.toLowerCase()) >= 0;
    var checks = [
      [pw.length >= 8, L.len8],
      [pw.length >= 12, L.len12],
      [/[a-z]/.test(pw), L.lower],
      [/[A-Z]/.test(pw), L.upper],
      [/[0-9]/.test(pw), L.digits],
      [/[^A-Za-z0-9]/.test(pw), L.symbols],
      [!common, L.common]
    ];
    el.checks.innerHTML = checks.map(function (c) {
      return '<li class="flex items-center gap-1.5 ' + (c[0] ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-zinc-500") + '">' +
        '<svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="' + (c[0] ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12") + '"/></svg>' +
        esc(c[1]) + "</li>";
    }).join("");
    setStatus('<span class="text-slate-400 dark:text-zinc-500">' + L.crackTime + ": " + crackTime(bits) + "</span>");
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) { return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("pstr-stacked", stacked);
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
  el.show.addEventListener("change", function () {
    el.input.type = el.show.checked ? "text" : "password";
  });
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("pstr-paste");
  function pasteIntoInput() {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function (t) {
        if (t == null) return;
        el.input.value = t;
        el.input.dispatchEvent(new Event("input", { bubbles: true }));
        var prev = el.status.innerHTML;
        el.status.innerHTML = TB_L.pastedOk;
        setTimeout(function () { el.status.innerHTML = prev; }, 2000);
      }).catch(function () { setStatus(TB_L.clipBlocked); });
    } else { setStatus(TB_L.clipNoApi); }
  }
  pasteBtn.addEventListener("click", pasteIntoInput);

  initResizer();
  update();
})();

var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  clipUnavail: z ? "剪贴板不可用" : "Clipboard unavailable",
  pasteBlocked: z ? "剪贴板读取被阻止——请按 Ctrl+V 粘贴" : "Clipboard read blocked - press Ctrl+V instead",
  pasteUnavail: z ? "剪贴板 API 不可用——请按 Ctrl+V 粘贴" : "Clipboard API unavailable - press Ctrl+V instead",
  pasted: z ? "已从剪贴板粘贴" : "Pasted from clipboard",
  days: z ? "天" : "days",
  weeks: z ? "周" : "weeks",
  months: z ? "月" : "months",
  years: z ? "年" : "years",
  workdays: z ? "工作日" : "workdays",
  daysTotal: z ? "天" : "days",
  pickBoth: z ? "请选择两个日期" : "Pick both dates",
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
    start: document.getElementById("ddiff-start"),
    end: document.getElementById("ddiff-end"),
    today: document.getElementById("ddiff-today"),
    workdays: document.getElementById("ddiff-workdays"),
    days: document.getElementById("ddiff-days"),
    weeks: document.getElementById("ddiff-weeks"),
    months: document.getElementById("ddiff-months"),
    years: document.getElementById("ddiff-years"),
    detail: document.getElementById("ddiff-detail"),
    copy: document.getElementById("ddiff-copy"),
    status: document.getElementById("ddiff-status"),
    resizer: document.getElementById("ddiff-resizer"),
    left: document.getElementById("ddiff-left"),
    right: document.getElementById("ddiff-right"),
    panels: document.getElementById("ddiff-panels"),
    layout: document.getElementById("ddiff-layout"),
    layoutStack: document.getElementById("ddiff-layout-stack"),
    layoutCol: document.getElementById("ddiff-layout-col"),
    tool: document.getElementById("ddiff-tool"),
    fullscreen: document.getElementById("ddiff-fullscreen"),
    fsEnter: document.getElementById("ddiff-fs-enter"),
    fsExit: document.getElementById("ddiff-fs-exit")
  };

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function countWorkdays(a, b) {
    var count = 0;
    var cur = new Date(Math.min(a, b));
    var end = new Date(Math.max(a, b));
    while (cur <= end) {
      var day = cur.getDay();
      if (day !== 0 && day !== 6) count++;
      cur.setDate(cur.getDate() + 1);
    }
    return count;
  }
  function ymd(d) {
    return { y: d.getFullYear(), m: d.getMonth(), d: d.getDate() };
  }
  function update() {
    if (!el.start.value || !el.end.value) {
      el.days.textContent = "—";
      el.weeks.textContent = "—";
      el.months.textContent = "—";
      el.years.textContent = "—";
      el.detail.textContent = "";
      setStatus('<span class="text-slate-400 dark:text-zinc-500">' + esc(L.pickBoth) + "</span>");
      return;
    }
    var a = new Date(el.start.value + "T00:00:00");
    var b = new Date(el.end.value + "T00:00:00");
    var diffMs = Math.abs(b - a);
    var diffDays = Math.round(diffMs / 86400000);
    var diffWeeks = diffDays / 7;
    var ay = ymd(a), by = ymd(b);
    var monthsDiff = Math.abs((by.y - ay.y) * 12 + (by.m - ay.m));
    var yearsDiff = monthsDiff / 12;
    var wd = el.workdays.checked ? countWorkdays(a, b) : null;
    el.days.textContent = diffDays.toLocaleString();
    el.weeks.textContent = (Math.floor(diffWeeks * 10) / 10).toString();
    el.months.textContent = monthsDiff.toString();
    el.years.textContent = (Math.floor(yearsDiff * 10) / 10).toString();
    var detail = "";
    if (wd !== null) detail = L.workdays + ": " + wd.toLocaleString() + " · ";
    detail += diffDays.toLocaleString() + " " + L.daysTotal;
    el.detail.textContent = detail;
    setStatus('<span class="text-slate-400 dark:text-zinc-500">' + diffDays.toLocaleString() + " " + L.daysTotal + "</span>");
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) { return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function copyResult() {
    var text = el.days.textContent + " " + L.daysTotal + " · " + el.weeks.textContent + " " + L.weeks + " · " + el.months.textContent + " " + L.months + " · " + el.years.textContent + " " + L.years;
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
    el.tool.classList.toggle("ddiff-stacked", stacked);
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

  el.start.addEventListener("change", update);
  el.end.addEventListener("change", update);
  el.workdays.addEventListener("change", update);
  el.today.addEventListener("click", function () {
    el.end.value = todayStr();
    update();
  });
  el.copy.addEventListener("click", copyResult);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  initResizer();
  update();
})();

var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  clipUnavail: z ? "剪贴板不可用" : "Clipboard unavailable",
  pasteBlocked: z ? "剪贴板读取被阻止——请按 Ctrl+V 粘贴" : "Clipboard read blocked - press Ctrl+V instead",
  pasteUnavail: z ? "剪贴板 API 不可用——请按 Ctrl+V 粘贴" : "Clipboard API unavailable - press Ctrl+V instead",
  pasted: z ? "已从剪贴板粘贴" : "Pasted from clipboard",
  tipAmount: z ? "小费金额" : "Tip amount",
  total: z ? "总额" : "Total",
  perPerson: z ? "每人应付" : "Per person",
  tipPerPerson: z ? "每人小费" : "Tip per person",
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
    bill: document.getElementById("tip-bill"),
    pct: document.getElementById("tip-pct"),
    pctVal: document.getElementById("tip-pct-val"),
    p10: document.getElementById("tip-p10"),
    p15: document.getElementById("tip-p15"),
    p18: document.getElementById("tip-p18"),
    p20: document.getElementById("tip-p20"),
    p25: document.getElementById("tip-p25"),
    people: document.getElementById("tip-people"),
    peopleRange: document.getElementById("tip-people-range"),
    round: document.getElementById("tip-round"),
    amt: document.getElementById("tip-amt"),
    total: document.getElementById("tip-total"),
    each: document.getElementById("tip-each"),
    eachTip: document.getElementById("tip-each-tip"),
    copy: document.getElementById("tip-copy"),
    status: document.getElementById("tip-status"),
    resizer: document.getElementById("tip-resizer"),
    left: document.getElementById("tip-left"),
    right: document.getElementById("tip-right"),
    panels: document.getElementById("tip-panels"),
    layout: document.getElementById("tip-layout"),
    layoutStack: document.getElementById("tip-layout-stack"),
    layoutCol: document.getElementById("tip-layout-col"),
    tool: document.getElementById("tip-tool"),
    fullscreen: document.getElementById("tip-fullscreen"),
    fsEnter: document.getElementById("tip-fs-enter"),
    fsExit: document.getElementById("tip-fs-exit")
  };
  var pctBtns = ["p10", "p15", "p18", "p20", "p25"];

  function money(n) {
    return "$" + n.toFixed(2);
  }
  function setPct(v) {
    el.pct.value = v;
    el.pctVal.textContent = v + "%";
    pctBtns.forEach(function (k) {
      el[k].classList.toggle("active", parseInt(el[k].textContent, 10) === v);
    });
    update();
  }
  function update() {
    var bill = parseFloat(el.bill.value);
    if (isNaN(bill) || bill < 0) bill = 0;
    var pct = parseInt(el.pct.value, 10) || 0;
    var people = Math.min(100, Math.max(1, parseInt(el.people.value, 10) || 1));
    var tip = bill * pct / 100;
    var total = bill + tip;
    var each = total / people;
    if (el.round.checked) each = Math.ceil(each);
    el.amt.textContent = money(tip);
    el.total.textContent = money(total);
    el.each.textContent = money(each);
    el.eachTip.textContent = money(tip / people);
    setStatus('<span class="text-slate-400 dark:text-zinc-500">' + pct + "% · " + people + " " + (people > 1 ? "people" : "person") + "</span>");
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) { return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function copyResult() {
    var text = [L.tipAmount + ": " + el.amt.textContent, L.total + ": " + el.total.textContent, L.perPerson + ": " + el.each.textContent].join("\n");
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
    el.tool.classList.toggle("tip-stacked", stacked);
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

  el.bill.addEventListener("input", update);
  el.pct.addEventListener("input", function () {
    el.pctVal.textContent = el.pct.value + "%";
    pctBtns.forEach(function (k) { el[k].classList.remove("active"); });
    update();
  });
  pctBtns.forEach(function (k) {
    el[k].addEventListener("click", function () {
      setPct(parseInt(el[k].textContent, 10));
    });
  });
  el.people.addEventListener("input", function () {
    var v = Math.min(20, Math.max(1, parseInt(el.people.value, 10) || 1));
    el.peopleRange.value = v;
    update();
  });
  el.peopleRange.addEventListener("input", function () {
    el.people.value = el.peopleRange.value;
    update();
  });
  el.round.addEventListener("change", update);
  el.copy.addEventListener("click", copyResult);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  initResizer();
  update();
})();

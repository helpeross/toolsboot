var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  zh: z
}; })();

var TB_L = (document.documentElement.lang === "zh-cn") ? {
  copiedOk: '<span class="text-emerald-600 dark:text-emerald-400 font-medium">已复制到剪贴板</span>',
  copyFail: '<span class="text-red-500 dark:text-red-400 font-medium">复制失败</span>'
} : {
  copiedOk: '<span class="text-emerald-600 dark:text-emerald-400 font-medium">Copied to clipboard</span>',
  copyFail: '<span class="text-red-500 dark:text-red-400 font-medium">Copy failed</span>'
};

(function () {
  "use strict";
  var zh = document.documentElement.lang === "zh-cn";
  var el = {
    min: document.getElementById("crong-min"),
    hour: document.getElementById("crong-hour"),
    dom: document.getElementById("crong-dom"),
    mon: document.getElementById("crong-mon"),
    dow: document.getElementById("crong-dow"),
    expr: document.getElementById("crong-expr"),
    desc: document.getElementById("crong-desc"),
    status: document.getElementById("crong-status"),
    copy: document.getElementById("crong-copy"),
    presets: document.getElementById("crong-presets"),
    resizer: document.getElementById("crong-resizer"),
    left: document.getElementById("crong-left"),
    right: document.getElementById("crong-right"),
    panels: document.getElementById("crong-panels"),
    layout: document.getElementById("crong-layout"),
    layoutStack: document.getElementById("crong-layout-stack"),
    layoutCol: document.getElementById("crong-layout-col"),
    tool: document.getElementById("crong-tool"),
    fullscreen: document.getElementById("crong-fullscreen"),
    fsEnter: document.getElementById("crong-fs-enter"),
    fsExit: document.getElementById("crong-fs-exit")
  };

  var MONTHS = zh ? ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"] : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var DAYS = zh ? ["周日", "周一", "周二", "周三", "周四", "周五", "周六"] : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function fillSelect(sel, start, end, starLabel, labels) {
    var star = document.createElement("option");
    star.value = "*"; star.textContent = starLabel; sel.appendChild(star);
    for (var i = start; i <= end; i++) {
      var o = document.createElement("option");
      o.value = String(i);
      o.textContent = labels ? (i + " - " + labels[i]) : String(i);
      sel.appendChild(o);
    }
  }
  fillSelect(el.min, 0, 59, "*");
  fillSelect(el.hour, 0, 23, "*");
  fillSelect(el.dom, 1, 31, "*");
  fillSelect(el.mon, 1, 12, "*", MONTHS);
  fillSelect(el.dow, 0, 6, "*", DAYS);

  function pad2(n) { return ("0" + n).slice(-2); }

  function describe() {
    var m = el.min.value, h = el.hour.value, d = el.dom.value, mo = el.mon.value, dw = el.dow.value;
    var timePart, datePart;
    if (m === "*" && h === "*") timePart = zh ? "每分钟" : "Every minute";
    else if (m === "*") timePart = zh ? "每小时的第 " + h + " 分钟" : "At minute " + h + " past every hour";
    else if (h === "*") timePart = zh ? "每小时的 " + m + " 分" : "At " + m + " minutes past every hour";
    else {
      var hh = (+h) % 12; if (hh === 0) hh = 12;
      timePart = zh ? (pad2(h) + ":" + pad2(m)) : hh + ":" + pad2(m) + ((+h) >= 12 ? " PM" : " AM");
    }
    if (d === "*" && mo === "*" && dw === "*") datePart = zh ? "每天" : "every day";
    else if (d === "*" && mo === "*") datePart = zh ? "每周" + DAYS[+dw] : "on " + DAYS[+dw];
    else if (d !== "*" && mo === "*" && dw === "*") datePart = zh ? "每月" + d + "日" : "on day " + d + " of the month";
    else if (d === "*" && mo !== "*" && dw === "*") datePart = zh ? MONTHS[+mo - 1] + "中" : "in " + MONTHS[+mo - 1];
    else if (d !== "*" && mo !== "*" && dw === "*") datePart = zh ? MONTHS[+mo - 1] + d + "日" : "on " + MONTHS[+mo - 1] + " " + d;
    else datePart = zh ? "每月" + d + "日（" + DAYS[+dw] + "）" : "on day " + d + " (" + DAYS[+dw] + ")";
    var expr = [m, h, d, mo, dw].join(" ");
    el.expr.textContent = expr;
    var everyMinute = timePart === (zh ? "每分钟" : "Every minute") && datePart === (zh ? "每天" : "every day");
    el.desc.textContent = everyMinute
      ? (zh ? "描述：每分钟" : "Every minute")
      : (zh ? "描述：" + timePart + " · " + datePart : timePart + " · " + datePart);
  }

  var PRESETS = zh
    ? [{ label: "每分钟", v: "* * * * *" }, { label: "每小时", v: "0 * * * *" }, { label: "每天", v: "0 0 * * *" }, { label: "每周", v: "0 0 * * 0" }, { label: "每月", v: "0 0 1 * *" }]
    : [{ label: "Every minute", v: "* * * * *" }, { label: "Every hour", v: "0 * * * *" }, { label: "Every day", v: "0 0 * * *" }, { label: "Every week", v: "0 0 * * 0" }, { label: "Every month", v: "0 0 1 * *" }];
  for (var pi = 0; pi < PRESETS.length; pi++) {
    (function (p) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "jt-mode-btn";
      b.textContent = p.label;
      b.addEventListener("click", function () {
        var parts = p.v.split(" ");
        el.min.value = parts[0]; el.hour.value = parts[1]; el.dom.value = parts[2]; el.mon.value = parts[3]; el.dow.value = parts[4];
        describe();
      });
      el.presets.appendChild(b);
    })(PRESETS[pi]);
  }

  function copyExpr() {
    var txt = el.expr.textContent || "";
    if (!txt) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { flashOk(); })
        .catch(function () { setStatus(TB_L.copyFail); });
    } else {
      var ta = document.createElement("textarea");
      ta.value = txt;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); flashOk(); } catch (e) { setStatus(TB_L.copyFail); }
      document.body.removeChild(ta);
    }
  }
  var statusTimer = null;
  function flashOk() {
    var prev = el.status.innerHTML;
    el.status.innerHTML = TB_L.copiedOk;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { el.status.innerHTML = prev; }, 2000);
  }
  function setStatus(html) { el.status.innerHTML = html; }

  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("crong-stacked", stacked);
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

  [el.min, el.hour, el.dom, el.mon, el.dow].forEach(function (s) { s.addEventListener("change", describe); });
  el.copy.addEventListener("click", copyExpr);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);
  initResizer();
  describe();
})();

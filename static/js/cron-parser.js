var L=(function(){var z=document.documentElement.lang==="zh-cn";return {
copied:z?"已复制到剪贴板":"Copied to clipboard",
copyFailed:z?"复制失败":"Copy failed",
clipUnavail:z?"剪贴板不可用":"Clipboard unavailable",
pasteBlocked:z?"剪贴板读取被阻止——请按 Ctrl+V 粘贴":"Clipboard read blocked - press Ctrl+V instead",
pasteUnavail:z?"剪贴板 API 不可用——请按 Ctrl+V 粘贴":"Clipboard API unavailable - press Ctrl+V instead",
pasted:z?"已从剪贴板粘贴":"Pasted from clipboard",
emptyInput:z?"输入为空":"Empty input",
badExpr:z?"无效的 Cron 表达式：":"Invalid cron expression: ",
badField:z?"无效的字段：":"Invalid field: ",
minute:z?"分钟":"minute",
hour:z?"小时":"hour",
day:z?"日":"day",
month:z?"月":"month",
weekday:z?"星期":"weekday",
second:z?"秒":"second",
nextRuns:z?"接下来 10 次执行时间：":"Next 10 run times:",
none:z?"（未找到匹配——请检查表达式）":"(no match found - check the expression)",
valid:z?"表达式有效":"Valid expression",
localRun:z?"解析在浏览器本地完成。":"Parsing runs locally in your browser."
,
zh:z,
anyVal:z?"任意值":"any value"
};})();

/*!
 * Cron Parser - ToolsBoot
 * Parses 5/6-field cron expressions and computes upcoming run times locally.
 * Standard cron semantics: DOM and DOW are OR-ed when both are restricted.
 */
/* __TB_I18N__ */
var TB_L = (document.documentElement.lang === "zh-cn") ? {
  copiedOk: '<span class="text-emerald-600 dark:text-emerald-400 font-medium">已复制到剪贴板</span>',
  pastedOk: '<span class="text-emerald-600 dark:text-emerald-400 font-medium">已从剪贴板粘贴</span>',
  copyFail: '<span class="text-red-500 dark:text-red-400 font-medium">复制失败</span>'
} : {
  copiedOk: '<span class="text-emerald-600 dark:text-emerald-400 font-medium">Copied to clipboard</span>',
  pastedOk: '<span class="text-emerald-600 dark:text-emerald-400 font-medium">Pasted from clipboard</span>',
  copyFail: '<span class="text-red-500 dark:text-red-400 font-medium">Copy failed</span>'
};
(function () {
  "use strict";

  var el = {
    expr: document.getElementById("cron-expr"),
    sec: document.getElementById("cron-sec"),
    next: document.getElementById("cron-next"),
    detail: document.getElementById("cron-detail"),
    output: document.getElementById("cron-output"),
    status: document.getElementById("cron-status"),
    copy: document.getElementById("cron-copy"),
    resizer: document.getElementById("cron-resizer"),
    left: document.getElementById("cron-left"),
    right: document.getElementById("cron-right"),
    panels: document.getElementById("cron-panels"),
    layout: document.getElementById("cron-layout"),
    layoutStack: document.getElementById("cron-layout-stack"),
    layoutCol: document.getElementById("cron-layout-col"),
    tool: document.getElementById("cron-tool"),
    fullscreen: document.getElementById("cron-fullscreen"),
    fsEnter: document.getElementById("cron-fs-enter"),
    fsExit: document.getElementById("cron-fs-exit")
  };

  var MONTHS = { JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12 };
  var DAYS = { SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6 };

  // Parse a single field. Returns an object {all:bool, values:Set} or throws.
  function parseField(str, min, max, names) {
    var s = str.trim().toUpperCase();
    if (s === "*" || s === "?") return { all: true, values: null };
    var values = new Set();
    var parts = s.split(",");
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i].trim();
      if (!part) throw new Error(L.badField + str);
      var step = 1;
      var base = part;
      var slash = part.indexOf("/");
      if (slash >= 0) {
        base = part.slice(0, slash);
        step = parseInt(part.slice(slash + 1), 10);
        if (isNaN(step) || step <= 0) throw new Error(L.badField + str);
      }
      var lo, hi;
      if (base === "*") { lo = min; hi = max; }
      else if (base.indexOf("-") >= 0) {
        var r = base.split("-");
        lo = normName(r[0], names);
        hi = normName(r[1], names);
      } else { lo = hi = normName(base, names); }
      if (lo < min || hi > max || lo > hi) throw new Error(L.badField + str);
      for (var v = lo; v <= hi; v += step) values.add(v);
    }
    return { all: false, values: values };
  }

  function normName(x, names) {
    if (names && names[x]) return names[x];
    var n = parseInt(x, 10);
    if (isNaN(n)) throw new Error("name");
    return n;
  }

  function has(v, field) { return field.all || field.values.has(v); }

  var MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function daysInMonth(y, m) { // m 1-12
    if (m === 2) {
      return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28;
    }
    return MONTH_DAYS[m - 1];
  }

  // Find next matching time strictly after `from` (Date).
  function nextAfter(from, f) {
    var d = new Date(from.getTime());
    if (f.secField) {
      d.setSeconds(d.getSeconds() + 1, 0);
    } else {
      d.setSeconds(0, 0);
      d.setMinutes(d.getMinutes() + 1);
    }
    var guard = 0;
    for (;;) {
      if (guard++ > 366 * 6) return null; // ~6 years of lookahead
      // month
      if (!has(d.getMonth() + 1, f.month)) {
        d.setMonth(d.getMonth() + 1, 1);
        d.setHours(0, 0, 0, 0);
        continue;
      }
      // day of month / weekday (OR semantics when both restricted)
      var domOk = has(d.getDate(), f.dom);
      var dowOk = has(d.getDay(), f.dow);
      var dayOk;
      if (!f.dom.all && !f.dow.all) dayOk = domOk || dowOk;
      else if (!f.dom.all) dayOk = domOk;
      else if (!f.dow.all) dayOk = dowOk;
      else dayOk = true;
      if (!dayOk) {
        d.setDate(d.getDate() + 1);
        d.setHours(0, 0, 0, 0);
        continue;
      }
      // hour
      if (!has(d.getHours(), f.hour)) {
        d.setHours(d.getHours() + 1, 0, 0, 0);
        continue;
      }
      // minute
      if (!has(d.getMinutes(), f.minute)) {
        d.setMinutes(d.getMinutes() + 1, 0, 0);
        continue;
      }
      // second (6-field only)
      if (f.secField && !has(d.getSeconds(), f.sec)) {
        d.setSeconds(d.getSeconds() + 1, 0);
        continue;
      }
      return d;
    }
  }

  function fmtDate(d) {
    function p(n, w) { n = String(n); while (n.length < w) n = "0" + n; return n; }
    return d.getFullYear() + "-" + p(d.getMonth() + 1, 2) + "-" + p(d.getDate(), 2) +
      " " + p(d.getHours(), 2) + ":" + p(d.getMinutes(), 2) + ":" + p(d.getSeconds(), 2) +
      " (UTC" + (d.getTimezoneOffset() <= 0 ? "+" : "-") +
      p(Math.floor(Math.abs(d.getTimezoneOffset()) / 60), 2) + ")";
  }

  var debounceTimer = null;
  function update() {
    var raw = el.expr.value.trim();
    if (!raw) {
      el.output.value = "";
      el.detail.innerHTML = "";
      setStatus("");
      return;
    }
    try {
      var parts = raw.split(/\s+/);
      var secField = parts.length === 6;
      if (parts.length !== 5 && parts.length !== 6) throw new Error(L.badExpr + raw);
      var f = {
        secField: secField,
        sec: secField ? parseField(parts[0], 0, 59) : { all: true, values: null },
        minute: parseField(parts[secField ? 1 : 0], 0, 59),
        hour: parseField(parts[secField ? 2 : 1], 0, 23),
        dom: parseField(parts[secField ? 3 : 2], 1, 31),
        month: parseField(parts[secField ? 4 : 3], 1, 12, MONTHS),
        dow: parseField(parts[secField ? 5 : 4], 0, 7, DAYS)
      };
      // DOW 7 == 0 (Sunday)
      if (!f.dow.all) {
        var vals = f.dow.values;
        if (vals.has(7)) { vals.delete(7); vals.add(0); }
      }

      // Field summary
      function summ(fld, name) {
        if (fld.all) return name + ": *";
        var arr = Array.from(fld.values).sort(function (a, b) { return a - b; });
        return name + ": " + arr.join(",");
      }
      el.detail.innerHTML =
        '<div class="font-mono text-xs leading-relaxed space-y-0.5">' +
        summ(f.sec, "sec") + "<br>" +
        summ(f.minute, "min") + "<br>" +
        summ(f.hour, "hour") + "<br>" +
        summ(f.dom, "dom") + "<br>" +
        summ(f.month, "month") + "<br>" +
        summ(f.dow, "dow") +
        "</div>";

      // Next runs
      var lines = [];
      var d = new Date();
      for (var i = 0; i < 10; i++) {
        var nx = nextAfter(d, f);
        if (!nx) break;
        lines.push(fmtDate(nx));
        d = nx;
      }
      if (lines.length === 0) {
        el.output.value = L.none;
        setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.none) + "</span>");
      } else {
        el.output.value = L.nextRuns + "\n" + lines.join("\n");
        setStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.valid + "</span>");
      }
    } catch (e) {
      el.output.value = "";
      el.detail.innerHTML = "";
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(e.message) + "</span>");
    }
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function copyOutput() {
    if (!el.output.value) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(el.output.value).then(function () {
        flashStatus(TB_L.copiedOk);
      }).catch(function () { flashStatus(TB_L.copyFail); });
    } else { flashStatus(TB_L.copyFail); }
  }

  var statusTimer = null;
  function flashStatus(html) {
    var prev = el.status.innerHTML;
    setStatus(html);
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { setStatus(prev); }, 2000);
  }

  // ---- Layout / fullscreen / resizer ----
  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("cron-stacked", stacked);
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
      if (dragging) {
        dragging = false;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    });
  }

  // ---- Events ----
  el.expr.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(update, 200);
  });
  el.sec.addEventListener("change", update);
  el.next.addEventListener("change", update);
  el.copy.addEventListener("click", copyOutput);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("cron-paste");
  function pasteIntoInput() {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function (t) {
        if (t == null) return;
        el.expr.value = t;
        el.expr.dispatchEvent(new Event("input", { bubbles: true }));
        flashStatus(TB_L.pastedOk);
      }).catch(function () { setStatus(TB_L.clipBlocked); });
    } else { setStatus(TB_L.clipNoApi); }
  }
  pasteBtn.addEventListener("click", pasteIntoInput);

  initResizer();
  update();
})();

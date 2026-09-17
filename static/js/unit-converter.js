var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  clipUnavail: z ? "剪贴板不可用" : "Clipboard unavailable",
  pasteBlocked: z ? "剪贴板读取被阻止——请按 Ctrl+V 粘贴" : "Clipboard read blocked - press Ctrl+V instead",
  pasteUnavail: z ? "剪贴板 API 不可用——请按 Ctrl+V 粘贴" : "Clipboard API unavailable - press Ctrl+V instead",
  pasted: z ? "已从剪贴板粘贴" : "Pasted from clipboard",
  invalid: z ? "请输入有效的数字" : "Enter a valid number",
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
    cat: document.getElementById("uconv-cat"),
    value: document.getElementById("uconv-value"),
    from: document.getElementById("uconv-from"),
    to: document.getElementById("uconv-to"),
    result: document.getElementById("uconv-result"),
    table: document.getElementById("uconv-table"),
    copy: document.getElementById("uconv-copy"),
    status: document.getElementById("uconv-status"),
    resizer: document.getElementById("uconv-resizer"),
    left: document.getElementById("uconv-left"),
    right: document.getElementById("uconv-right"),
    panels: document.getElementById("uconv-panels"),
    layout: document.getElementById("uconv-layout"),
    layoutStack: document.getElementById("uconv-layout-stack"),
    layoutCol: document.getElementById("uconv-layout-col"),
    tool: document.getElementById("uconv-tool"),
    fullscreen: document.getElementById("uconv-fullscreen"),
    fsEnter: document.getElementById("uconv-fs-enter"),
    fsExit: document.getElementById("uconv-fs-exit")
  };

  var UNITS = {
    length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, yd: 0.9144, ft: 0.3048, in: 0.0254, nmi: 1852 },
    weight: { kg: 1, g: 0.001, mg: 0.000001, t: 1000, lb: 0.45359237, oz: 0.028349523125, st: 6.35029318 },
    temperature: { c: 0, f: 1, k: 2 },
    area: { m2: 1, km2: 1000000, cm2: 0.0001, ha: 10000, acre: 4046.8564224, ft2: 0.09290304, in2: 0.00064516 },
    volume: { l: 1, ml: 0.001, m3: 1000, gal: 3.785411784, qt: 0.946352946, pt: 0.473176473, cup: 0.2365882365, floz: 0.0295735295625, tbsp: 0.01478676478125, tsp: 0.00492892159375 },
    speed: { ms: 1, kmh: 1 / 3.6, mph: 0.44704, kn: 0.514444444, ft_s: 0.3048 },
    data: { b: 1, kb: 8000, mb: 8000000, gb: 8000000000, tb: 8000000000000, B: 8, KB: 8000, MB: 8000000, GB: 8000000000, TB: 8000000000000 }
  };
  var LABELS = {
    length: ["m", "km", "cm", "mm", "mi", "yd", "ft", "in", "nmi"],
    weight: ["kg", "g", "mg", "t", "lb", "oz", "st"],
    temperature: ["°C", "°F", "K"],
    area: ["m²", "km²", "cm²", "ha", "acre", "ft²", "in²"],
    volume: ["l", "ml", "m³", "gal", "qt", "pt", "cup", "fl oz", "tbsp", "tsp"],
    speed: ["m/s", "km/h", "mph", "kn", "ft/s"],
    data: ["b", "Kb", "Mb", "Gb", "Tb", "B", "KB", "MB", "GB", "TB"]
  };
  var KEYS = {
    length: ["m", "km", "cm", "mm", "mi", "yd", "ft", "in", "nmi"],
    weight: ["kg", "g", "mg", "t", "lb", "oz", "st"],
    temperature: ["c", "f", "k"],
    area: ["m2", "km2", "cm2", "ha", "acre", "ft2", "in2"],
    volume: ["l", "ml", "m3", "gal", "qt", "pt", "cup", "floz", "tbsp", "tsp"],
    speed: ["ms", "kmh", "mph", "kn", "ft_s"],
    data: ["b", "kb", "mb", "gb", "tb", "B", "KB", "MB", "GB", "TB"]
  };

  function fillUnits() {
    var cat = el.cat.value;
    var keys = KEYS[cat], labels = LABELS[cat];
    var fromVal = el.from.value, toVal = el.to.value;
    el.from.innerHTML = "";
    el.to.innerHTML = "";
    for (var i = 0; i < keys.length; i++) {
      var o1 = document.createElement("option");
      o1.value = keys[i]; o1.textContent = labels[i];
      var o2 = document.createElement("option");
      o2.value = keys[i]; o2.textContent = labels[i];
      el.from.appendChild(o1);
      el.to.appendChild(o2);
    }
    if (keys.indexOf(fromVal) >= 0) el.from.value = fromVal;
    if (keys.indexOf(toVal) >= 0) el.to.value = toVal;
  }

  function convertTemp(v, from, to) {
    var c;
    if (from === "c") c = v;
    else if (from === "f") c = (v - 32) * 5 / 9;
    else c = v - 273.15;
    if (to === "c") return c;
    if (to === "f") return c * 9 / 5 + 32;
    return c + 273.15;
  }

  function fmt(n) {
    if (!isFinite(n)) return "—";
    if (n === 0) return "0";
    if (Math.abs(n) >= 1e15 || (Math.abs(n) < 1e-9 && n !== 0)) return n.toExponential(6);
    return parseFloat(n.toPrecision(12)).toString();
  }

  function update() {
    var v = parseFloat(el.value.value);
    var cat = el.cat.value;
    if (isNaN(v)) { el.result.textContent = "—"; el.table.innerHTML = ""; setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.invalid) + "</span>"); return; }
    var from = el.from.value, to = el.to.value;
    var out;
    if (cat === "temperature") out = convertTemp(v, from, to);
    else out = v * UNITS[cat][from] / UNITS[cat][to];
    el.result.textContent = fmt(out);
    setStatus('<span class="text-slate-400 dark:text-zinc-500">' + v + " " + from + " → " + fmt(out) + " " + to + "</span>");
    var keys = KEYS[cat], labels = LABELS[cat];
    var rows = [];
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === from) continue;
      var val = cat === "temperature" ? convertTemp(v, from, keys[i]) : v * UNITS[cat][from] / UNITS[cat][keys[i]];
      rows.push('<div class="flex items-center justify-between rounded-lg border border-slate-100 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-900/80 px-3 py-1.5 text-sm"><span class="text-slate-500 dark:text-zinc-400">' + esc(labels[i]) + "</span><span class=\"font-mono text-slate-800 dark:text-zinc-200 break-all text-right\">" + fmt(val) + "</span></div>");
    }
    el.table.innerHTML = rows.join("");
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) { return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function copyResult() {
    if (!el.result.textContent || el.result.textContent === "—") return;
    var text = el.value.value + " " + el.from.value + " = " + el.result.textContent + " " + el.to.value;
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
    el.tool.classList.toggle("uconv-stacked", stacked);
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

  el.cat.addEventListener("change", function () { fillUnits(); update(); });
  el.value.addEventListener("input", update);
  el.from.addEventListener("change", update);
  el.to.addEventListener("change", update);
  el.copy.addEventListener("click", copyResult);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  initResizer();
  fillUnits();
  update();
})();

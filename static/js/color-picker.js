var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  invalidColor: z ? "无法识别颜色：支持 #hex、rgb()、rgba()、hsl()、hsla()" : "Cannot recognize color: try #hex, rgb(), rgba(), hsl() or hsla()",
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
  var el = {
    val: document.getElementById("colr-val"),
    native: document.getElementById("colr-native"),
    swatches: document.getElementById("colr-swatches"),
    preview: document.getElementById("colr-preview"),
    formats: document.getElementById("colr-formats"),
    status: document.getElementById("colr-status"),
    resizer: document.getElementById("colr-resizer"),
    left: document.getElementById("colr-left"),
    right: document.getElementById("colr-right"),
    panels: document.getElementById("colr-panels"),
    layout: document.getElementById("colr-layout"),
    layoutStack: document.getElementById("colr-layout-stack"),
    layoutCol: document.getElementById("colr-layout-col"),
    tool: document.getElementById("colr-tool"),
    fullscreen: document.getElementById("colr-fullscreen"),
    fsEnter: document.getElementById("colr-fs-enter"),
    fsExit: document.getElementById("colr-fs-exit")
  };

  var SWATCHES = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#64748b", "#000000", "#ffffff", "#f8fafc", "#e2e8f0", "#94a3b8", "#334155", "#1e293b", "#0f172a", "#7c2d12", "#3f3f46", "#166534", "#1e3a8a"];

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function hex2(n) { return ("0" + n.toString(16)).slice(-2); }

  function parseColor(str) {
    var s = str.trim().toLowerCase();
    var m;
    if ((m = /^#?([0-9a-f]{3})$/.exec(s))) {
      var r3 = parseInt(m[1][0] + m[1][0], 16), g3 = parseInt(m[1][1] + m[1][1], 16), b3 = parseInt(m[1][2] + m[1][2], 16);
      return { r: r3, g: g3, b: b3, a: 1 };
    }
    if ((m = /^#?([0-9a-f]{6})$/.exec(s))) {
      return { r: parseInt(m[1].slice(0, 2), 16), g: parseInt(m[1].slice(2, 4), 16), b: parseInt(m[1].slice(4, 6), 16), a: 1 };
    }
    if ((m = /^#?([0-9a-f]{8})$/.exec(s))) {
      return { r: parseInt(m[1].slice(0, 2), 16), g: parseInt(m[1].slice(2, 4), 16), b: parseInt(m[1].slice(4, 6), 16), a: Math.round((parseInt(m[1].slice(6, 8), 16) / 255) * 100) / 100 };
    }
    if ((m = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/.exec(s))) {
      return { r: clamp(Math.round(+m[1]), 0, 255), g: clamp(Math.round(+m[2]), 0, 255), b: clamp(Math.round(+m[3]), 0, 255), a: m[4] !== undefined ? clamp(+m[4], 0, 1) : 1 };
    }
    if ((m = /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+)\s*)?\)$/.exec(s))) {
      var hsl = hslToRgb(((+m[1]) % 360 + 360) % 360, clamp(+m[2], 0, 100) / 100, clamp(+m[3], 0, 100) / 100);
      return { r: hsl[0], g: hsl[1], b: hsl[2], a: m[4] !== undefined ? clamp(+m[4], 0, 1) : 1 };
    }
    return null;
  }

  function hslToRgb(h, s, l) {
    if (s === 0) { var g = Math.round(l * 255); return [g, g, g]; }
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    function f(t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }
    return [Math.round(f(h / 360 + 1 / 3) * 255), Math.round(f(h / 360) * 255), Math.round(f(h / 360 - 1 / 3) * 255)];
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, h = 0, s = 0;
    if (max !== min) {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60;
    }
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, h = 0, s = max === 0 ? 0 : d / max, v = max;
    if (d !== 0) {
      if (max === r) h = ((g - b) / d) % 6;
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h = Math.round(h * 60);
      if (h < 0) h += 360;
    }
    return { h: h, s: Math.round(s * 100), v: Math.round(v * 100) };
  }

  function hexStr(c, withAlpha) {
    var h = "#" + hex2(c.r) + hex2(c.g) + hex2(c.b);
    if (withAlpha && c.a < 1) h += hex2(Math.round(c.a * 255));
    return h;
  }
  function rgbStr(c) { return c.a < 1 ? "rgba(" + c.r + ", " + c.g + ", " + c.b + ", " + c.a + ")" : "rgb(" + c.r + ", " + c.g + ", " + c.b + ")"; }
  function hslStr(c) { var h = rgbToHsl(c.r, c.g, c.b); return "hsl(" + h.h + ", " + h.s + "%, " + h.l + "%)"; }
  function hsvStr(c) { var h = rgbToHsv(c.r, c.g, c.b); return "hsv(" + h.h + ", " + h.s + "%, " + h.v + "%)"; }

  function renderFormats(c) {
    el.formats.innerHTML = "";
    var rows = [
      { label: "HEX", value: hexStr(c, true) },
      { label: "RGB", value: rgbStr(c) },
      { label: "HSL", value: hslStr(c) },
      { label: "HSV", value: hsvStr(c) }
    ];
    for (var i = 0; i < rows.length; i++) {
      var row = document.createElement("div");
      row.className = "flex items-center gap-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/50 px-3 py-2";
      var lab = document.createElement("span");
      lab.className = "text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-zinc-500 w-10";
      lab.textContent = rows[i].label;
      var val = document.createElement("span");
      val.className = "flex-1 font-mono text-sm text-slate-700 dark:text-zinc-200 break-all select-all";
      val.textContent = rows[i].value;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "jt-icon-btn";
      btn.title = L.copied;
      btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>';
      (function (v) {
        btn.addEventListener("click", function () { copyText(v, btn); });
      })(rows[i].value);
      row.appendChild(lab); row.appendChild(val); row.appendChild(btn);
      el.formats.appendChild(row);
    }
  }

  function copyText(text, btn) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { flashOk(btn); })
        .catch(function () { setStatus(TB_L.copyFail); });
    } else {
      var ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); flashOk(btn); } catch (e) { setStatus(TB_L.copyFail); }
      document.body.removeChild(ta);
    }
  }
  var statusTimer = null;
  function flashOk(btn) {
    var prev = el.status.innerHTML;
    el.status.innerHTML = TB_L.copiedOk;
    if (btn) {
      btn.classList.add("text-emerald-500");
      setTimeout(function () { btn.classList.remove("text-emerald-500"); }, 1200);
    }
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { el.status.innerHTML = prev; }, 2000);
  }
  function setStatus(html) { el.status.innerHTML = html; }

  function update() {
    var c = parseColor(el.val.value);
    if (!c) { el.status.innerHTML = '<span class="text-red-500 dark:text-red-400 font-medium">' + L.invalidColor + "</span>"; return; }
    el.preview.style.background = hexStr(c, false);
    el.native.value = hexStr(c, false);
    renderFormats(c);
    el.status.innerHTML = "";
  }

  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("colr-stacked", stacked);
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

  el.val.addEventListener("input", update);
  el.native.addEventListener("input", function () {
    el.val.value = this.value;
    update();
  });

  for (var i = 0; i < SWATCHES.length; i++) {
    (function (col) {
      var s = document.createElement("button");
      s.type = "button";
      s.className = "aspect-square w-full rounded-md border border-slate-200 dark:border-zinc-600 cursor-pointer hover:scale-110 transition-transform";
      s.style.background = col;
      s.title = col;
      s.addEventListener("click", function () {
        el.val.value = col;
        update();
      });
      el.swatches.appendChild(s);
    })(SWATCHES[i]);
  }

  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);
  initResizer();
  update();
})();

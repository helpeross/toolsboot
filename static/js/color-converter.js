var L=(function(){var z=document.documentElement.lang==="zh-cn";return {
copied:z?"已复制到剪贴板":"Copied to clipboard",
copyFailed:z?"复制失败":"Copy failed",
clipUnavail:z?"剪贴板不可用":"Clipboard unavailable",
badHex:z?"无效的 HEX 颜色":"Invalid HEX color",
badRgb:z?"无效的 RGB 值（示例：255, 0, 128）":"Invalid RGB value (e.g. 255, 0, 128)",
badHsl:z?"无效的 HSL 值（示例：210, 50%, 40%）":"Invalid HSL value (e.g. 210, 50%, 40%)",
localRun:z?"输入任一格式，其余自动转换。":"Type in any format and the others convert automatically."
,
zh:z
};})();

/*!
 * Color Converter - ToolsBoot
 * HEX / RGB / HSL conversion with a live preview swatch. No libraries.
 */
/* __TB_I18N__ */
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
    picker: document.getElementById("cc-picker"),
    hex: document.getElementById("cc-hex"),
    rgb: document.getElementById("cc-rgb"),
    hsl: document.getElementById("cc-hsl"),
    swatch: document.getElementById("cc-swatch"),
    output: document.getElementById("cc-output"),
    status: document.getElementById("cc-status"),
    copy: document.getElementById("cc-copy"),
    resizer: document.getElementById("cc-resizer"),
    left: document.getElementById("cc-left"),
    right: document.getElementById("cc-right"),
    panels: document.getElementById("cc-panels"),
    layout: document.getElementById("cc-layout"),
    layoutStack: document.getElementById("cc-layout-stack"),
    layoutCol: document.getElementById("cc-layout-col"),
    tool: document.getElementById("cc-tool"),
    fullscreen: document.getElementById("cc-fullscreen"),
    fsEnter: document.getElementById("cc-fs-enter"),
    fsExit: document.getElementById("cc-fs-exit")
  };

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  // HEX -> {r,g,b}
  function hexToRgb(hex) {
    var m = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.exec(hex.trim());
    if (!m) return null;
    var h = m[1];
    if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
  }

  // RGB string "r, g, b" -> {r,g,b}
  function rgbStrToRgb(s) {
    var parts = s.split(",").map(function (x) { return parseInt(x.trim(), 10); });
    if (parts.length !== 3 || parts.some(function (x) { return isNaN(x); })) return null;
    return { r: clamp(parts[0], 0, 255), g: clamp(parts[1], 0, 255), b: clamp(parts[2], 0, 255) };
  }

  // HSL string "h, s%, l%" -> {h,s,l} (s/l as 0-1)
  function hslStrToHsl(s) {
    var parts = s.split(",").map(function (x) { return x.trim(); });
    if (parts.length !== 3) return null;
    var h = parseFloat(parts[0]);
    var sm = /^([\d.]+)%?$/.exec(parts[1]);
    var lm = /^([\d.]+)%?$/.exec(parts[2]);
    if (isNaN(h) || !sm || !lm) return null;
    return { h: ((h % 360) + 360) % 360, s: clamp(parseFloat(sm[1]) / 100, 0, 1), l: clamp(parseFloat(lm[1]) / 100, 0, 1) };
  }

  function rgbToHex(rgb) {
    function to2(v) { var s = v.toString(16); return s.length === 1 ? "0" + s : s; }
    return "#" + to2(rgb.r) + to2(rgb.g) + to2(rgb.b);
  }

  function rgbToHsl(rgb) {
    var r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h = 0, s = 0, l = (max + min) / 2;
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

  function hslToRgb(hsl) {
    var h = hsl.h / 360, s = hsl.s, l = hsl.l;
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }
    var q, p;
    if (s === 0) { return { r: l * 255, g: l * 255, b: l * 255 }; }
    q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    p = 2 * l - q;
    return {
      r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
      g: Math.round(hue2rgb(p, q, h) * 255),
      b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255)
    };
  }

  function cssColor(rgb) {
    return "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
  }

  var lastError = "";
  function renderFromRgb(rgb, source) {
    var hex = rgbToHex(rgb);
    var hsl = rgbToHsl(rgb);
    if (source !== "hex") el.hex.value = hex;
    if (source !== "rgb") el.rgb.value = rgb.r + ", " + rgb.g + ", " + rgb.b;
    if (source !== "hsl") el.hsl.value = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%";
    el.picker.value = hex;
    el.swatch.style.background = cssColor(rgb);
    el.output.value =
      "HEX  " + hex + "\n" +
      "RGB  " + rgb.r + ", " + rgb.g + ", " + rgb.b + "\n" +
      "HSL  " + hsl.h + "°, " + hsl.s + "%, " + hsl.l + "%\n" +
      "CSS  " + cssColor(rgb) + "\n" +
      "CSS  hsl(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%)";
    setStatus('<span class="text-slate-400 dark:text-zinc-500">' + L.localRun + "</span>");
  }

  function fail(err) {
    lastError = err;
    setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + err + "</span>");
  }

  function fromHex() {
    var rgb = hexToRgb(el.hex.value);
    if (!rgb) return fail(L.badHex);
    renderFromRgb(rgb, "hex");
  }

  function fromRgb() {
    var rgb = rgbStrToRgb(el.rgb.value);
    if (!rgb) return fail(L.badRgb);
    renderFromRgb(rgb, "rgb");
  }

  function fromHsl() {
    var hsl = hslStrToHsl(el.hsl.value);
    if (!hsl) return fail(L.badHsl);
    renderFromRgb(hslToRgb(hsl), "hsl");
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
    el.tool.classList.toggle("cc-stacked", stacked);
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
  el.hex.addEventListener("input", fromHex);
  el.rgb.addEventListener("input", fromRgb);
  el.hsl.addEventListener("input", fromHsl);
  el.picker.addEventListener("input", function () {
    el.hex.value = el.picker.value;
    fromHex();
  });
  el.copy.addEventListener("click", copyOutput);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  initResizer();
  fromHex();
})();

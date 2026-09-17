var L=(function(){var z=document.documentElement.lang==="zh-cn";return {
copied:z?"已复制图片 URL":"Copied image URL",
copyFailed:z?"复制失败":"Copy failed",
badSize:z?"宽度和高度必须是 1-4000 的数字":"Width and height must be numbers from 1 to 4000",
badHex:z?"无效的 HEX 颜色":"Invalid HEX color",
downloaded:z?"已下载 ":"Downloaded ",
localRun:z?"图片在浏览器本地生成。":"Images are generated locally in your browser."
,
zh:z
};})();

/*!
 * Placeholder Image Generator - ToolsBoot
 * Renders placeholder images on a canvas (PNG) or as SVG. No libraries.
 */
/* __TB_I18N__ */
var TB_L = (document.documentElement.lang === "zh-cn") ? {
  copiedOk: '<span class="text-emerald-600 dark:text-emerald-400 font-medium">已复制图片 URL</span>',
  copyFail: '<span class="text-red-500 dark:text-red-400 font-medium">复制失败</span>'
} : {
  copiedOk: '<span class="text-emerald-600 dark:text-emerald-400 font-medium">Copied image URL</span>',
  copyFail: '<span class="text-red-500 dark:text-red-400 font-medium">Copy failed</span>'
};
(function () {
  "use strict";

  var el = {
    w: document.getElementById("phimg-w"),
    h: document.getElementById("phimg-h"),
    bg: document.getElementById("phimg-bg"),
    bghex: document.getElementById("phimg-bghex"),
    fg: document.getElementById("phimg-fg"),
    fghex: document.getElementById("phimg-fghex"),
    text: document.getElementById("phimg-text"),
    preview: document.getElementById("phimg-preview"),
    output: document.getElementById("phimg-output"),
    status: document.getElementById("phimg-status"),
    png: document.getElementById("phimg-png"),
    svg: document.getElementById("phimg-svg"),
    copy: document.getElementById("phimg-copy"),
    resizer: document.getElementById("phimg-resizer"),
    left: document.getElementById("phimg-left"),
    right: document.getElementById("phimg-right"),
    panels: document.getElementById("phimg-panels"),
    layout: document.getElementById("phimg-layout"),
    layoutStack: document.getElementById("phimg-layout-stack"),
    layoutCol: document.getElementById("phimg-layout-col"),
    tool: document.getElementById("phimg-tool"),
    fullscreen: document.getElementById("phimg-fullscreen"),
    fsEnter: document.getElementById("phimg-fs-enter"),
    fsExit: document.getElementById("phimg-fs-exit")
  };

  function isHex(s) { return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(s.trim()); }

  function render() {
    var w = parseInt(el.w.value, 10);
    var h = parseInt(el.h.value, 10);
    if (isNaN(w) || isNaN(h) || w < 1 || w > 4000 || h < 1 || h > 4000) {
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.badSize) + "</span>");
      return;
    }
    var bgHex = el.bghex.value.trim();
    var fgHex = el.fghex.value.trim();
    if (!isHex(bgHex)) bgHex = "#64748b";
    if (!isHex(fgHex)) fgHex = "#ffffff";
    el.bg.value = bgHex;
    el.fg.value = fgHex;
    var text = el.text.value || (w + " × " + h);

    // SVG source (deterministic)
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' +
      '<rect width="100%" height="100%" fill="' + bgHex + '"/>' +
      '<text x="50%" y="50%" dy="0.35em" text-anchor="middle" fill="' + fgHex + '" ' +
      'font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" ' +
      'font-size="' + Math.max(12, Math.round(Math.min(w, h) / 10)) + '">' +
      escXml(text) + "</text></svg>";

    // Canvas preview + PNG data URL
    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = bgHex;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = fgHex;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var fontPx = Math.max(12, Math.round(Math.min(w, h) / 10));
    ctx.font = fontPx + "px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
    var lines = String(text).split("\n");
    var lineH = fontPx * 1.3;
    var startY = h / 2 - (lines.length - 1) * lineH / 2;
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], w / 2, startY + i * lineH);
    }
    var pngData = canvas.toDataURL("image/png");

    el.preview.src = pngData;
    el.output.value = pngData.length > 4000 ? pngData.slice(0, 4000) + "..." : pngData;
    el.preview.dataset.svg = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    setStatus(
      '<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + w + " × " + h + "</span>" +
      ' <span class="text-slate-300 dark:text-zinc-600">|</span> <span class="text-slate-400 dark:text-zinc-500">' + L.localRun + "</span>"
    );
  }

  function escXml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function downloadPng() {
    if (!el.preview.src || el.preview.src.indexOf("data:image/png") !== 0) return;
    var a = document.createElement("a");
    a.href = el.preview.src;
    a.download = "placeholder-" + el.w.value + "x" + el.h.value + ".png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    flashStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.downloaded + "PNG</span>");
  }

  function downloadSvg() {
    var data = el.preview.dataset.svg;
    if (!data) return;
    var a = document.createElement("a");
    a.href = data;
    a.download = "placeholder-" + el.w.value + "x" + el.h.value + ".svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    flashStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.downloaded + "SVG</span>");
  }

  function copyUrl() {
    var data = el.preview.dataset.svg || el.preview.src;
    if (!data) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(data).then(function () {
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
    el.tool.classList.toggle("phimg-stacked", stacked);
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
  var inputs = [el.w, el.h, el.bg, el.bghex, el.fg, el.fghex, el.text];
  inputs.forEach(function (inp) {
    inp.addEventListener("input", render);
  });
  el.png.addEventListener("click", downloadPng);
  el.svg.addEventListener("click", downloadSvg);
  el.copy.addEventListener("click", copyUrl);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  initResizer();
  render();
})();

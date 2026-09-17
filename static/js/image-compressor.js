var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  notImage: z ? "所选文件不是图片" : "The selected file is not an image",
  noFile: z ? "请先选择图片" : "Choose an image first",
  original: z ? "原始" : "Original",
  compressed: z ? "压缩后" : "Compressed",
  saved: z ? "节省" : "Saved",
  ready: z ? "准备就绪" : "Ready",
  loading: z ? "正在处理…" : "Processing…",
  zh: z
}; })();

(function () {
  "use strict";
  var el = {
    drop: document.getElementById("imgc-drop"),
    file: document.getElementById("imgc-file"),
    empty: document.getElementById("imgc-empty"),
    preview: document.getElementById("imgc-preview"),
    out: document.getElementById("imgc-out"),
    metrics: document.getElementById("imgc-metrics"),
    quality: document.getElementById("imgc-quality"),
    qval: document.getElementById("imgc-qval"),
    width: document.getElementById("imgc-width"),
    wval: document.getElementById("imgc-wval"),
    fmt: document.getElementById("imgc-fmt"),
    download: document.getElementById("imgc-download"),
    status: document.getElementById("imgc-status"),
    resizer: document.getElementById("imgc-resizer"),
    left: document.getElementById("imgc-left"),
    right: document.getElementById("imgc-right"),
    panels: document.getElementById("imgc-panels"),
    layout: document.getElementById("imgc-layout"),
    layoutStack: document.getElementById("imgc-layout-stack"),
    layoutCol: document.getElementById("imgc-layout-col"),
    tool: document.getElementById("imgc-tool"),
    fullscreen: document.getElementById("imgc-fullscreen"),
    fsEnter: document.getElementById("imgc-fs-enter"),
    fsExit: document.getElementById("imgc-fs-exit")
  };

  var current = null; // { name, originalBytes, compressedDataUrl, w, h }

  function setStatus(html) { el.status.innerHTML = html; }
  function fmtBytes(n) {
    if (n < 1024) return n + " B";
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + " KB";
    return (n / 1024 / 1024).toFixed(2) + " MB";
  }

  function compress(img) {
    var quality = parseInt(el.quality.value, 10) / 100;
    var maxW = parseInt(el.width.value, 10) || 0;
    var fmt = el.fmt.value;
    var w = img.naturalWidth, h = img.naturalHeight;
    if (maxW && w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
    var canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, w, h);
    var dataUrl;
    if (fmt === "image/png") dataUrl = canvas.toDataURL("image/png");
    else if (fmt === "image/webp") dataUrl = canvas.toDataURL("image/webp", quality);
    else dataUrl = canvas.toDataURL("image/jpeg", quality);
    return { dataUrl: dataUrl, w: w, h: h };
  }

  function dataUrlBytes(dataUrl) {
    var b64 = dataUrl.split(",")[1] || "";
    var bin = atob(b64);
    return bin.length;
  }

  function render(result, originalBytes, name) {
    el.out.src = result.dataUrl;
    el.empty.classList.add("hidden");
    el.preview.classList.remove("hidden");
    el.download.disabled = false;
    var outBytes = dataUrlBytes(result.dataUrl);
    var pct = originalBytes > 0 ? Math.max(0, Math.round((1 - outBytes / originalBytes) * 100)) : 0;
    el.metrics.innerHTML = "";
    var rows = [
      [L.original, fmtBytes(originalBytes) + " · " + name],
      [L.compressed, fmtBytes(outBytes) + " · " + result.w + "×" + result.h],
      [L.saved, pct + "% (" + fmtBytes(Math.max(0, originalBytes - outBytes)) + ")"]
    ];
    for (var i = 0; i < rows.length; i++) {
      var d = document.createElement("div");
      d.className = "rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/40 px-3 py-2";
      var lab = document.createElement("div");
      lab.className = "text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-zinc-500";
      lab.textContent = rows[i][0];
      var val = document.createElement("div");
      val.className = "text-sm font-medium text-slate-700 dark:text-zinc-200 break-all";
      val.textContent = rows[i][1];
      d.appendChild(lab); d.appendChild(val);
      el.metrics.appendChild(d);
    }
    current = { name: name, outBytes: outBytes, dataUrl: result.dataUrl, w: result.w, h: result.h };
    setStatus('<span class="text-slate-400 dark:text-zinc-500">' + L.compressed + ": " + fmtBytes(outBytes) + (pct > 0 ? " · " + L.saved + " " + pct + "%" : "") + "</span>");
  }

  el.drop.addEventListener("dragover", function (e) { e.preventDefault(); el.drop.classList.add("border-brand-400"); });
  el.drop.addEventListener("dragleave", function () { el.drop.classList.remove("border-brand-400"); });
  el.quality.addEventListener("input", function () {
    el.qval.textContent = el.quality.value;
    if (current && current.img) renderCompressed();
  });
  el.width.addEventListener("input", function () {
    el.wval.textContent = el.width.value;
    if (current && current.img) renderCompressed();
  });
  el.fmt.addEventListener("change", function () {
    if (current && current.img) renderCompressed();
  });

  var lastImg = null;
  function renderCompressed() {
    if (!lastImg) return;
    try { render(compress(lastImg), current.originalBytes, current.name); }
    catch (e) { setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + e.message + "</span>"); }
  }
  // hook into handleFile to remember raw Image + bytes
  var origHandle = handleFile;
  handleFile = function (file) {
    if (!file) return;
    if (!/^image\//.test(file.type)) { setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + L.notImage + "</span>"); return; }
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        lastImg = img;
        current = current || {};
        current.originalBytes = file.size;
        current.name = file.name;
        current.img = img;
        try { render(compress(img), file.size, file.name); }
        catch (err) { setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + err.message + "</span>"); }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  el.file.addEventListener("change", function () { handleFile(el.file.files[0]); });
  el.drop.addEventListener("drop", function (e) {
    e.preventDefault();
    el.drop.classList.remove("border-brand-400");
    var f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) handleFile(f);
  });

  el.download.addEventListener("click", function () {
    if (!current) return;
    var a = document.createElement("a");
    var ext = el.fmt.value === "image/png" ? "png" : (el.fmt.value === "image/webp" ? "webp" : "jpg");
    var base = (current.name || "image").replace(/\.[^.]+$/, "");
    a.href = current.dataUrl;
    a.download = base + "-compressed." + ext;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("imgc-stacked", stacked);
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

  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);
  initResizer();
  setStatus('<span class="text-slate-400 dark:text-zinc-500">' + L.ready + "</span>");
})();

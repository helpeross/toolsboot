var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  results: z ? " 个结果" : " results",
  localRun: z ? "本地查询，不联网" : "Local lookup, no network",
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFail: z ? "复制失败" : "Copy failed",
  zh: z
}; })();

(function () {
  "use strict";
  var el = {
    q: document.getElementById("mime-q"),
    cats: document.getElementById("mime-cats"),
    list: document.getElementById("mime-list"),
    copy: document.getElementById("mime-copy"),
    status: document.getElementById("mime-status"),
    resizer: document.getElementById("mime-resizer"),
    left: document.getElementById("mime-left"),
    right: document.getElementById("mime-right"),
    panels: document.getElementById("mime-panels"),
    layout: document.getElementById("mime-layout"),
    layoutStack: document.getElementById("mime-layout-stack"),
    layoutCol: document.getElementById("mime-layout-col"),
    tool: document.getElementById("mime-tool"),
    fullscreen: document.getElementById("mime-fullscreen"),
    fsEnter: document.getElementById("mime-fs-enter"),
    fsExit: document.getElementById("mime-fs-exit")
  };

  // [ext, mime, description, category]
  var DATA = [
    ["txt", "text/plain", "Plain text", "text"],
    ["html", "text/html", "HTML document", "text"],
    ["htm", "text/html", "HTML document", "text"],
    ["css", "text/css", "Cascading Style Sheets", "text"],
    ["csv", "text/csv", "Comma-separated values", "text"],
    ["js", "text/javascript", "JavaScript source", "text"],
    ["mjs", "text/javascript", "ES module JavaScript", "text"],
    ["md", "text/markdown", "Markdown document", "text"],
    ["xml", "text/xml", "Extensible Markup Language", "text"],
    ["ics", "text/calendar", "iCalendar event data", "text"],
    ["vcf", "text/vcard", "vCard contact data", "text"],
    ["json", "application/json", "JavaScript Object Notation", "application"],
    ["jsonl", "application/jsonl", "JSON Lines", "application"],
    ["yaml", "application/yaml", "YAML data serialization", "application"],
    ["yml", "application/yaml", "YAML data serialization", "application"],
    ["toml", "application/toml", "TOML configuration", "application"],
    ["ini", "text/plain", "Configuration file", "text"],
    ["log", "text/plain", "Log file", "text"],
    ["pdf", "application/pdf", "Portable Document Format", "application"],
    ["zip", "application/zip", "ZIP archive", "application"],
    ["gz", "application/gzip", "Gzip compressed archive", "application"],
    ["tar", "application/x-tar", "Tape archive", "application"],
    ["7z", "application/x-7z-compressed", "7-Zip archive", "application"],
    ["rar", "application/vnd.rar", "RAR archive", "application"],
    ["bz2", "application/x-bzip2", "Bzip2 compressed archive", "application"],
    ["xz", "application/x-xz", "XZ compressed archive", "application"],
    ["doc", "application/msword", "Microsoft Word document", "application"],
    ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "Microsoft Word (OOXML)", "application"],
    ["xls", "application/vnd.ms-excel", "Microsoft Excel spreadsheet", "application"],
    ["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Microsoft Excel (OOXML)", "application"],
    ["ppt", "application/vnd.ms-powerpoint", "Microsoft PowerPoint", "application"],
    ["pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "Microsoft PowerPoint (OOXML)", "application"],
    ["odt", "application/vnd.oasis.opendocument.text", "OpenDocument text", "application"],
    ["ods", "application/vnd.oasis.opendocument.spreadsheet", "OpenDocument spreadsheet", "application"],
    ["odp", "application/vnd.oasis.opendocument.presentation", "OpenDocument presentation", "application"],
    ["rtf", "application/rtf", "Rich Text Format", "application"],
    ["epub", "application/epub+zip", "EPUB ebook", "application"],
    ["exe", "application/vnd.microsoft.portable-executable", "Windows executable", "application"],
    ["msi", "application/x-msi", "Windows installer package", "application"],
    ["dll", "application/vnd.microsoft.portable-executable", "Windows dynamic library", "application"],
    ["bat", "application/bat", "Windows batch script", "application"],
    ["sh", "application/x-sh", "Unix shell script", "application"],
    ["jar", "application/java-archive", "Java archive", "application"],
    ["class", "application/java-vm", "Java class file", "application"],
    ["apk", "application/vnd.android.package-archive", "Android application package", "application"],
    ["wasm", "application/wasm", "WebAssembly binary", "application"],
    ["sqlite", "application/vnd.sqlite3", "SQLite database", "application"],
    ["sqlite3", "application/vnd.sqlite3", "SQLite database", "application"],
    ["bin", "application/octet-stream", "Generic binary data", "application"],
    ["dat", "application/octet-stream", "Generic data file", "application"],
    ["iso", "application/x-iso9660-image", "Optical disc image", "application"],
    ["torrent", "application/x-bittorrent", "BitTorrent metainfo", "application"],
    ["psd", "image/vnd.adobe.photoshop", "Adobe Photoshop document", "image"],
    ["ai", "application/postscript", "Adobe Illustrator", "application"],
    ["swf", "application/x-shockwave-flash", "Adobe Flash animation", "application"],
    ["woff", "font/woff", "Web Open Font Format", "application"],
    ["woff2", "font/woff2", "Web Open Font Format 2", "application"],
    ["ttf", "font/ttf", "TrueType font", "application"],
    ["otf", "font/otf", "OpenType font", "application"],
    ["eot", "application/vnd.ms-fontobject", "Embedded OpenType font", "application"],
    ["png", "image/png", "Portable Network Graphics", "image"],
    ["jpg", "image/jpeg", "JPEG image", "image"],
    ["jpeg", "image/jpeg", "JPEG image", "image"],
    ["gif", "image/gif", "Graphics Interchange Format", "image"],
    ["webp", "image/webp", "WebP image", "image"],
    ["svg", "image/svg+xml", "Scalable Vector Graphics", "image"],
    ["ico", "image/x-icon", "Icon file", "image"],
    ["bmp", "image/bmp", "Bitmap image", "image"],
    ["avif", "image/avif", "AV1 Image File Format", "image"],
    ["tiff", "image/tiff", "Tagged Image File Format", "image"],
    ["heic", "image/heic", "High Efficiency Image Format", "image"],
    ["mp3", "audio/mpeg", "MPEG audio layer 3", "audio"],
    ["wav", "audio/wav", "Waveform audio", "audio"],
    ["ogg", "audio/ogg", "Ogg audio", "audio"],
    ["oga", "audio/ogg", "Ogg audio", "audio"],
    ["aac", "audio/aac", "Advanced Audio Coding", "audio"],
    ["m4a", "audio/mp4", "MPEG-4 audio", "audio"],
    ["flac", "audio/flac", "Free Lossless Audio Codec", "audio"],
    ["opus", "audio/opus", "Opus audio", "audio"],
    ["mid", "audio/midi", "MIDI sequence", "audio"],
    ["midi", "audio/midi", "MIDI sequence", "audio"],
    ["mp4", "video/mp4", "MPEG-4 video", "video"],
    ["m4v", "video/mp4", "MPEG-4 video", "video"],
    ["webm", "video/webm", "WebM video", "video"],
    ["mov", "video/quicktime", "QuickTime movie", "video"],
    ["avi", "video/x-msvideo", "Audio Video Interleave", "video"],
    ["mkv", "video/x-matroska", "Matroska video", "video"],
    ["mpeg", "video/mpeg", "MPEG video", "video"],
    ["mpg", "video/mpeg", "MPEG video", "video"],
    ["wmv", "video/x-ms-wmv", "Windows Media Video", "video"],
    ["flv", "video/x-flv", "Flash video", "video"],
    ["3gp", "video/3gpp", "3GPP multimedia", "video"]
  ];

  var cat = "all";
  var catBtns = {};

  function render() {
    var q = el.q.value.trim().toLowerCase();
    var html = "";
    var count = 0;
    for (var i = 0; i < DATA.length; i++) {
      var d = DATA[i];
      if (cat !== "all" && d[3] !== cat) continue;
      if (q) {
        var hay = d[0].toLowerCase() + " " + d[1].toLowerCase() + " " + d[2].toLowerCase();
        if (hay.indexOf(q) < 0) continue;
      }
      count++;
      html +=
        '<div class="rounded-lg border border-slate-100 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-900/80 px-3 py-2.5 transition-colors hover:border-brand-200 dark:hover:border-brand-500/40">' +
        '<div class="flex items-baseline gap-2.5">' +
        '<span class="shrink-0 rounded-md bg-slate-200/70 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-slate-600 dark:text-zinc-300">.' + esc(d[0]) + "</span>" +
        '<span class="font-mono text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400 break-all">' + esc(d[1]) + "</span>" +
        '<span class="ml-auto shrink-0 font-mono text-[11px] text-slate-400 dark:text-zinc-500">' + esc(d[3]) + "</span>" +
        "</div>" +
        '<p class="mt-1 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">' + esc(d[2]) + "</p>" +
        "</div>";
    }
    el.list.innerHTML = html;
    setStatus(
      '<span class="text-slate-400 dark:text-zinc-500">' + count + L.results + "</span>" +
      ' <span class="text-slate-300 dark:text-zinc-600">|</span> <span class="text-slate-400 dark:text-zinc-500">' + L.localRun + "</span>"
    );
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function copyList() {
    var q = el.q.value.trim().toLowerCase();
    var lines = [];
    for (var i = 0; i < DATA.length; i++) {
      var d = DATA[i];
      if (cat !== "all" && d[3] !== cat) continue;
      if (q) {
        var hay = d[0].toLowerCase() + " " + d[1].toLowerCase() + " " + d[2].toLowerCase();
        if (hay.indexOf(q) < 0) continue;
      }
      lines.push("." + d[0] + "\t" + d[1] + "\t" + d[2]);
    }
    copyText(lines.join("\n"));
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { flashStatus(L.copied); })
        .catch(function () { setStatus(L.copyFail); });
    } else {
      var ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); flashStatus(L.copied); } catch (e) { setStatus(L.copyFail); }
      document.body.removeChild(ta);
    }
  }
  var statusTimer = null;
  function flashStatus(msg) {
    var prev = el.status.innerHTML;
    setStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + msg + "</span>");
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { el.status.innerHTML = prev; }, 2000);
  }

  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("mime-stacked", stacked);
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

  var btns = el.cats.querySelectorAll("button[data-cat]");
  for (var i = 0; i < btns.length; i++) {
    (function (b) {
      b.addEventListener("click", function () {
        cat = b.getAttribute("data-cat");
        for (var j = 0; j < btns.length; j++) btns[j].classList.toggle("active", btns[j] === b);
        render();
      });
    })(btns[i]);
  }

  el.q.addEventListener("input", render);
  el.copy.addEventListener("click", copyList);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);
  initResizer();
  render();
})();

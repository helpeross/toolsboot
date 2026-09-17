var L=(function(){var z=document.documentElement.lang==="zh-cn";return {
copied:z?"已复制 URL":"Copied URL",
copyFailed:z?"复制失败":"Copy failed",
downloaded:z?"已下载 ":"Downloaded ",
emptyDomain:z?"请输入域名":"Please enter a domain",
badDomain:z?"域名格式无效（示例：example.com）":"Invalid domain format (e.g. example.com)",
loading:z?"正在获取图标…":"Fetching icons...",
noteNet:z?"提示：此工具需要联网获取目标网站的图标。":"Note: this tool fetches the target site's icon over the network.",
google:z?"Google 缓存":"Google cache",
direct:z?"站点直连":"Site direct",
ddg:z?"DuckDuckGo":"DuckDuckGo",
copyUrl:z?"复制 URL":"Copy URL",
download:z?"下载":"Download"
,
zh:z
};})();

/*!
 * Favicon Finder - ToolsBoot
 * Shows a website's favicon via several public endpoints and lets you
 * preview, copy or download it.
 */
/* __TB_I18N__ */
var TB_L = (document.documentElement.lang === "zh-cn") ? {
  copiedOk: '<span class="text-emerald-600 dark:text-emerald-400 font-medium">已复制 URL</span>',
  copyFail: '<span class="text-red-500 dark:text-red-400 font-medium">复制失败</span>'
} : {
  copiedOk: '<span class="text-emerald-600 dark:text-emerald-400 font-medium">Copied URL</span>',
  copyFail: '<span class="text-red-500 dark:text-red-400 font-medium">Copy failed</span>'
};
(function () {
  "use strict";

  var el = {
    domain: document.getElementById("fav-domain"),
    go: document.getElementById("fav-go"),
    google: document.getElementById("fav-google"),
    list: document.getElementById("fav-list"),
    status: document.getElementById("fav-status"),
    copy: document.getElementById("fav-copy"),
    resizer: document.getElementById("fav-resizer"),
    left: document.getElementById("fav-left"),
    right: document.getElementById("fav-right"),
    panels: document.getElementById("fav-panels"),
    layout: document.getElementById("fav-layout"),
    layoutStack: document.getElementById("fav-layout-stack"),
    layoutCol: document.getElementById("fav-layout-col"),
    tool: document.getElementById("fav-tool"),
    fullscreen: document.getElementById("fav-fullscreen"),
    fsEnter: document.getElementById("fav-fs-enter"),
    fsExit: document.getElementById("fav-fs-exit")
  };

  var lastUrls = [];

  function cleanDomain(raw) {
    var d = raw.trim().toLowerCase();
    d = d.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");
    d = d.split(":")[0];
    return d;
  }

  function find() {
    var domain = cleanDomain(el.domain.value);
    if (!domain) {
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.emptyDomain) + "</span>");
      return;
    }
    if (!/^([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(domain)) {
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.badDomain) + "</span>");
      return;
    }
    setStatus('<span class="text-slate-400 dark:text-zinc-500">' + esc(L.loading) + "</span>");
    var sizes = [16, 32, 64, 128, 256];
    var urls = [];
    if (el.google.checked) {
      for (var i = 0; i < sizes.length; i++) {
        urls.push({ src: "https://www.google.com/s2/favicons?domain=" + domain + "&sz=" + sizes[i], label: "Google · " + sizes[i] + "px", kind: L.google });
      }
    }
    urls.push({ src: "https://" + domain + "/favicon.ico", label: "/favicon.ico", kind: L.direct });
    urls.push({ src: "https://icons.duckduckgo.com/ip3/" + domain + ".ico", label: "ip3 · 64px", kind: L.ddg });
    lastUrls = urls;

    var html = "";
    for (var j = 0; j < urls.length; j++) {
      html +=
        '<div class="flex flex-col items-center gap-2 rounded-xl border border-slate-100 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-900/80 p-3 transition-colors hover:border-brand-200 dark:hover:border-brand-500/40">' +
        '<img src="' + escAttr(urls[j].src) + '" alt="favicon" class="w-12 h-12 object-contain rounded-lg border border-slate-100 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-1" loading="lazy" onerror="this.style.opacity=0.25">' +
        '<span class="text-xs font-medium text-slate-600 dark:text-zinc-300 truncate w-full text-center" title="' + escAttr(urls[j].src) + '">' + esc(urls[j].label) + "</span>" +
        '<span class="text-[10px] uppercase tracking-wide text-slate-400 dark:text-zinc-500">' + esc(urls[j].kind) + "</span>" +
        '<div class="flex items-center gap-1.5">' +
        '<button type="button" data-url="' + escAttr(urls[j].src) + '" class="fav-cp jt-icon-btn" title="' + esc(L.copyUrl) + '">' +
        '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg></button>' +
        '<button type="button" data-url="' + escAttr(urls[j].src) + '" class="fav-dl jt-icon-btn" title="' + esc(L.download) + '">' +
        '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/></svg></button>' +
        "</div></div>";
    }
    el.list.innerHTML = html;
    el.list.querySelectorAll(".fav-cp").forEach(function (btn) {
      btn.addEventListener("click", function () { copyUrl(btn.dataset.url); });
    });
    el.list.querySelectorAll(".fav-dl").forEach(function (btn) {
      btn.addEventListener("click", function () { download(btn.dataset.url); });
    });
    setStatus(
      '<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + domain + "</span>" +
      ' <span class="text-slate-300 dark:text-zinc-600">|</span> <span class="text-slate-400 dark:text-zinc-500">' + L.noteNet + "</span>"
    );
  }

  function copyUrl(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () {
        flashStatus(TB_L.copiedOk);
      }).catch(function () { flashStatus(TB_L.copyFail); });
    } else { flashStatus(TB_L.copyFail); }
  }

  function download(url) {
    var a = document.createElement("a");
    a.href = url;
    var ext = url.indexOf(".ico") >= 0 ? "ico" : "png";
    a.download = "favicon." + ext;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    flashStatus('<span class="text-emerald-600 dark:text-emerald-400 font-medium">' + L.downloaded + "</span>");
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function escAttr(v) {
    return esc(v).replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function copyAll() {
    if (!lastUrls.length) return;
    var text = lastUrls.map(function (u) { return u.src; }).join("\n");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
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
    el.tool.classList.toggle("fav-stacked", stacked);
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
  el.go.addEventListener("click", function () {
    el.go.classList.remove("jt-pop");
    void el.go.offsetWidth;
    el.go.classList.add("jt-pop");
    find();
  });
  el.domain.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); find(); }
  });
  el.copy.addEventListener("click", copyAll);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  initResizer();
  setStatus('<span class="text-slate-400 dark:text-zinc-500">' + L.noteNet + "</span>");
})();

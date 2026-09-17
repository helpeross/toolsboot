var L=(function(){var z=document.documentElement.lang==="zh-cn";return {
copied:z?"已复制列表":"Copied list",
copyFailed:z?"复制失败":"Copy failed",
results:z?" 个结果":" results",
localRun:z?"数据内置在页面中，无需联网。":"Data is bundled in the page - no network needed."
,
zh:z
};})();

/*!
 * Public DNS Servers - ToolsBoot
 * A bundled quick-reference of public DNS providers. No network needed.
 */
/* __TB_I18N__ */
var TB_L = (document.documentElement.lang === "zh-cn") ? {
  copiedOk: '<span class="text-emerald-600 dark:text-emerald-400 font-medium">已复制列表</span>',
  copyFail: '<span class="text-red-500 dark:text-red-400 font-medium">复制失败</span>'
} : {
  copiedOk: '<span class="text-emerald-600 dark:text-emerald-400 font-medium">Copied list</span>',
  copyFail: '<span class="text-red-500 dark:text-red-400 font-medium">Copy failed</span>'
};
(function () {
  "use strict";

  var el = {
    q: document.getElementById("dns-q"),
    v6: document.getElementById("dns-v6"),
    doh: document.getElementById("dns-doh"),
    list: document.getElementById("dns-list"),
    status: document.getElementById("dns-status"),
    copy: document.getElementById("dns-copy"),
    resizer: document.getElementById("dns-resizer"),
    left: document.getElementById("dns-left"),
    right: document.getElementById("dns-right"),
    panels: document.getElementById("dns-panels"),
    layout: document.getElementById("dns-layout"),
    layoutStack: document.getElementById("dns-layout-stack"),
    layoutCol: document.getElementById("dns-layout-col"),
    tool: document.getElementById("dns-tool"),
    fullscreen: document.getElementById("dns-fullscreen"),
    fsEnter: document.getElementById("dns-fs-enter"),
    fsExit: document.getElementById("dns-fs-exit")
  };

  var DATA = [
    { provider: "Cloudflare", v4: ["1.1.1.1", "1.0.0.1"], v6: ["2606:4700:4700::1111", "2606:4700:4700::1001"], secure: true, note: "Fast, privacy-first. DoH/DoT at cloudflare-dns.com" },
    { provider: "Google Public DNS", v4: ["8.8.8.8", "8.8.4.4"], v6: ["2001:4860:4860::8888", "2001:4860:4860::8844"], secure: true, note: "Reliable global service. DoH at dns.google" },
    { provider: "Quad9", v4: ["9.9.9.9", "149.112.112.112"], v6: ["2620:fe::fe", "2620:fe::9"], secure: true, note: "Blocks malicious domains using threat intelligence" },
    { provider: "OpenDNS", v4: ["208.67.222.222", "208.67.220.220"], v6: ["2620:119:35::35", "2620:119:53::53"], secure: false, note: "Cisco-owned, includes content filtering options" },
    { provider: "Comodo Secure DNS", v4: ["8.26.56.26", "8.20.247.20"], v6: [], secure: false, note: "Free and public with malware filtering" },
    { provider: "Norton ConnectSafe", v4: ["199.85.126.10", "199.85.127.10"], v6: [], secure: false, note: "Includes security / family filtering tiers" },
    { provider: "AdGuard DNS", v4: ["94.140.14.14", "94.140.15.15"], v6: ["2a10:50c0::ad1:ff", "2a10:50c0::ad2:ff"], secure: true, note: "Blocks ads, trackers and malware. DoH at dns.adguard-dns.com" },
    { provider: "Neustar DNS", v4: ["156.154.70.1", "156.154.71.1"], v6: ["2610:a1:1018::1", "2610:a1:1019::1"], secure: false, note: "UltraDNS with threat protection plans" },
    { provider: "Level3", v4: ["4.2.2.1", "4.2.2.2"], v6: [], secure: false, note: "Public resolver historically run by CenturyLink/Lumen" },
    { provider: "Verisign Public DNS", v4: ["64.6.64.6", "64.6.65.6"], v6: ["2620:74:1b::1:1", "2620:74:1c::2:2"], secure: false, note: "Privacy-focused, no logs" },
    { provider: "DNS.WATCH", v4: ["84.200.69.80", "84.200.70.40"], v6: ["2001:1608:10:25::1c04:b12f", "2001:1608:10:25::9249:d69b"], secure: false, note: "Non-profit, no logging" },
    { provider: "CleanBrowsing", v4: ["185.228.168.9", "185.228.169.9"], v6: ["2a0d:2a00:1::2", "2a0d:2a00:2::2"], secure: true, note: "Family-safety filtering tiers. DoH supported" },
    { provider: "Yandex DNS", v4: ["77.88.8.8", "77.88.8.1"], v6: ["2a02:6b8::feed:0ff", "2a02:6b8:0:1::feed:0ff"], secure: false, note: "Free with basic / safe / family modes" }
  ];

  function render() {
    var q = el.q.value.trim().toLowerCase();
    var showV6 = el.v6.checked;
    var dohOnly = el.doh.checked;
    var html = "";
    var count = 0;
    for (var i = 0; i < DATA.length; i++) {
      var d = DATA[i];
      if (dohOnly && !d.secure) continue;
      if (q) {
        var hay = (d.provider + " " + d.v4.join(" ") + " " + d.v6.join(" ") + " " + d.note).toLowerCase();
        if (hay.indexOf(q) < 0) continue;
      }
      count++;
      var v4 = d.v4.map(function (ip) { return '<code class="text-brand-600 dark:text-brand-400">' + esc(ip) + "</code>"; }).join(" / ");
      var v6 = showV6 && d.v6.length
        ? '<div class="mt-1"><span class="text-xs text-slate-400 dark:text-zinc-500">IPv6:</span> ' + d.v6.map(function (ip) { return '<code class="text-xs text-slate-500 dark:text-zinc-400">' + esc(ip) + "</code>"; }).join(" / ") + "</div>"
        : "";
      html +=
        '<div class="rounded-lg border border-slate-100 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-900/80 px-3 py-2.5 transition-colors hover:border-brand-200 dark:hover:border-brand-500/40">' +
        '<div class="flex items-center gap-2 flex-wrap">' +
        '<span class="text-sm font-semibold text-slate-700 dark:text-zinc-200">' + esc(d.provider) + "</span>" +
        (d.secure ? '<span class="text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 rounded px-1.5 py-0.5">DoH/DoT</span>' : "") +
        "</div>" +
        '<div class="mt-1.5 font-mono text-sm">' + v4 + "</div>" + v6 +
        '<p class="mt-1 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">' + esc(d.note) + "</p>" +
        "</div>";
    }
    el.list.innerHTML = html;
    setStatus('<span class="text-slate-400 dark:text-zinc-500">' + count + L.results + "</span>");
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function copyList() {
    var q = el.q.value.trim().toLowerCase();
    var showV6 = el.v6.checked;
    var lines = [];
    for (var i = 0; i < DATA.length; i++) {
      var d = DATA[i];
      if (q) {
        var hay = (d.provider + " " + d.v4.join(" ") + " " + d.v6.join(" ") + " " + d.note).toLowerCase();
        if (hay.indexOf(q) < 0) continue;
      }
      var line = d.provider + ": " + d.v4.join(", ");
      if (showV6 && d.v6.length) line += " / IPv6: " + d.v6.join(", ");
      lines.push(line);
    }
    if (!lines.length) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(lines.join("\n")).then(function () {
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
    el.tool.classList.toggle("dns-stacked", stacked);
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
  el.q.addEventListener("input", render);
  el.v6.addEventListener("change", render);
  el.doh.addEventListener("change", render);
  el.copy.addEventListener("click", copyList);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  initResizer();
  render();
})();

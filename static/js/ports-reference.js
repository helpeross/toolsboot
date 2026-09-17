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
    q: document.getElementById("ports-q"),
    cats: document.getElementById("ports-cats"),
    list: document.getElementById("ports-list"),
    copy: document.getElementById("ports-copy"),
    status: document.getElementById("ports-status"),
    resizer: document.getElementById("ports-resizer"),
    left: document.getElementById("ports-left"),
    right: document.getElementById("ports-right"),
    panels: document.getElementById("ports-panels"),
    layout: document.getElementById("ports-layout"),
    layoutStack: document.getElementById("ports-layout-stack"),
    layoutCol: document.getElementById("ports-layout-col"),
    tool: document.getElementById("ports-tool"),
    fullscreen: document.getElementById("ports-fullscreen"),
    fsEnter: document.getElementById("ports-fs-enter"),
    fsExit: document.getElementById("ports-fs-exit")
  };

  // [port, protocol(tcp|udp|both), service, description]
  var DATA = [
    [20, "tcp", "FTP Data", "File Transfer Protocol data transfer"],
    [21, "tcp", "FTP", "File Transfer Protocol control"],
    [22, "tcp", "SSH", "Secure Shell remote login"],
    [23, "tcp", "Telnet", "Unencrypted remote terminal"],
    [25, "tcp", "SMTP", "Simple Mail Transfer Protocol"],
    [53, "both", "DNS", "Domain Name System"],
    [67, "udp", "DHCP Server", "Dynamic Host Configuration Protocol"],
    [68, "udp", "DHCP Client", "Dynamic Host Configuration Protocol"],
    [69, "udp", "TFTP", "Trivial File Transfer Protocol"],
    [80, "tcp", "HTTP", "HyperText Transfer Protocol"],
    [110, "tcp", "POP3", "Post Office Protocol v3"],
    [123, "udp", "NTP", "Network Time Protocol"],
    [135, "both", "RPC", "Windows RPC / DCOM"],
    [137, "both", "NetBIOS NS", "NetBIOS name service"],
    [138, "udp", "NetBIOS DGM", "NetBIOS datagram service"],
    [139, "tcp", "NetBIOS SS", "NetBIOS session service"],
    [143, "tcp", "IMAP", "Internet Message Access Protocol"],
    [161, "udp", "SNMP", "Simple Network Management Protocol"],
    [162, "udp", "SNMP Trap", "SNMP trap notifications"],
    [179, "tcp", "BGP", "Border Gateway Protocol"],
    [194, "tcp", "IRC", "Internet Relay Chat"],
    [443, "tcp", "HTTPS", "HTTP over TLS"],
    [445, "tcp", "SMB", "Server Message Block / CIFS"],
    [465, "tcp", "SMTPS", "SMTP over TLS"],
    [514, "udp", "Syslog", "System logging"],
    [587, "tcp", "SMTP Submit", "Mail submission (STARTTLS)"],
    [636, "tcp", "LDAPS", "LDAP over TLS"],
    [873, "tcp", "rsync", "File sync protocol"],
    [993, "tcp", "IMAPS", "IMAP over TLS"],
    [995, "tcp", "POP3S", "POP3 over TLS"],
    [1080, "tcp", "SOCKS", "SOCKS proxy"],
    [1194, "both", "OpenVPN", "OpenVPN tunnel"],
    [1433, "tcp", "MSSQL", "Microsoft SQL Server"],
    [1521, "tcp", "Oracle DB", "Oracle database listener"],
    [1701, "udp", "L2TP", "Layer 2 Tunneling Protocol"],
    [1723, "tcp", "PPTP", "Point-to-Point Tunneling Protocol"],
    [1812, "udp", "RADIUS Auth", "RADIUS authentication"],
    [1813, "udp", "RADIUS Acct", "RADIUS accounting"],
    [2049, "both", "NFS", "Network File System"],
    [2181, "tcp", "ZooKeeper", "Apache ZooKeeper"],
    [2375, "tcp", "Docker", "Docker REST API (plain)"],
    [2376, "tcp", "Docker TLS", "Docker REST API (TLS)"],
    [3000, "tcp", "Dev Server", "Common development server"],
    [3306, "tcp", "MySQL", "MySQL database"],
    [3389, "tcp", "RDP", "Remote Desktop Protocol"],
    [3690, "tcp", "SVN", "Subversion version control"],
    [4000, "tcp", "Dev Server", "Common development server"],
    [5000, "tcp", "Dev Server", "Common development server"],
    [5060, "both", "SIP", "Session Initiation Protocol"],
    [5061, "tcp", "SIPS", "SIP over TLS"],
    [5222, "tcp", "XMPP", "Extensible Messaging and Presence Protocol"],
    [5432, "tcp", "PostgreSQL", "PostgreSQL database"],
    [5672, "tcp", "AMQP", "RabbitMQ / AMQP messaging"],
    [5900, "tcp", "VNC", "Virtual Network Computing"],
    [5984, "tcp", "CouchDB", "CouchDB database"],
    [6379, "tcp", "Redis", "Redis key-value store"],
    [6443, "tcp", "K8s API", "Kubernetes API server"],
    [8000, "tcp", "Dev Server", "Common development server"],
    [8080, "tcp", "HTTP Alt", "Common HTTP alternate port"],
    [8081, "tcp", "HTTP Alt", "Common HTTP alternate port"],
    [8443, "tcp", "HTTPS Alt", "Common HTTPS alternate port"],
    [8888, "tcp", "Dev Server", "Common development server"],
    [9000, "tcp", "Dev Server", "Common development server"],
    [9092, "tcp", "Kafka", "Apache Kafka broker"],
    [9200, "tcp", "Elasticsearch", "Elasticsearch HTTP API"],
    [9300, "tcp", "Elasticsearch", "Elasticsearch transport"],
    [9418, "tcp", "Git", "Git smart HTTP / daemon"],
    [11211, "tcp", "Memcached", "Memcached cache daemon"],
    [15672, "tcp", "RabbitMQ UI", "RabbitMQ management UI"],
    [27017, "tcp", "MongoDB", "MongoDB database"],
    [50000, "tcp", "SAP", "SAP application server"]
  ];

  var cat = "all";
  var btns = [];

  function matchesCat(proto) {
    if (cat === "all") return true;
    if (cat === proto) return true;
    return proto === "both";
  }

  function render() {
    var q = el.q.value.trim().toLowerCase();
    var html = "";
    var count = 0;
    for (var i = 0; i < DATA.length; i++) {
      var d = DATA[i];
      if (!matchesCat(d[1])) continue;
      if (q) {
        var hay = d[0] + " " + d[2].toLowerCase() + " " + d[3].toLowerCase();
        if (hay.indexOf(q) < 0) continue;
      }
      count++;
      html +=
        '<div class="rounded-lg border border-slate-100 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-900/80 px-3 py-2.5 transition-colors hover:border-brand-200 dark:hover:border-brand-500/40">' +
        '<div class="flex items-baseline gap-2.5">' +
        '<span class="shrink-0 font-mono text-sm font-bold text-brand-600 dark:text-brand-400">' + d[0] + "</span>" +
        '<span class="text-sm font-semibold text-slate-700 dark:text-zinc-200">' + esc(d[2]) + "</span>" +
        '<span class="ml-auto shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[11px] ' +
        (d[1] === "tcp" ? "bg-sky-100 dark:bg-sky-500/15 text-sky-700 dark:text-sky-400" :
          d[1] === "udp" ? "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400" :
            "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400") +
        '">' + d[1].toUpperCase() + "</span>" +
        "</div>" +
        '<p class="mt-1 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">' + esc(d[3]) + "</p>" +
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
      if (!matchesCat(d[1])) continue;
      if (q) {
        var hay = d[0] + " " + d[2].toLowerCase() + " " + d[3].toLowerCase();
        if (hay.indexOf(q) < 0) continue;
      }
      lines.push(d[0] + "\t" + d[1].toUpperCase() + "\t" + d[2] + "\t" + d[3]);
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
    el.tool.classList.toggle("ports-stacked", stacked);
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

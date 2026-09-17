var L=(function(){var z=document.documentElement.lang==="zh-cn";return {
copied:z?"已复制列表":"Copied list",
copyFailed:z?"复制失败":"Copy failed",
results:z?" 个结果":" results",
localRun:z?"数据内置在页面中，无需联网。":"Data is bundled in the page - no network needed."
,
zh:z,
all:z?"全部":"All"
};})();

/*!
 * HTTP Status Codes - ToolsBoot
 * A bundled reference of common HTTP status codes (RFC 9110 + extensions).
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
    q: document.getElementById("http-q"),
    cats: document.getElementById("http-cats"),
    list: document.getElementById("http-list"),
    status: document.getElementById("http-status"),
    copy: document.getElementById("http-copy"),
    resizer: document.getElementById("http-resizer"),
    left: document.getElementById("http-left"),
    right: document.getElementById("http-right"),
    panels: document.getElementById("http-panels"),
    layout: document.getElementById("http-layout"),
    layoutStack: document.getElementById("http-layout-stack"),
    layoutCol: document.getElementById("http-layout-col"),
    tool: document.getElementById("http-tool"),
    fullscreen: document.getElementById("http-fullscreen"),
    fsEnter: document.getElementById("http-fs-enter"),
    fsExit: document.getElementById("http-fs-exit")
  };

  // code: [phrase, description, category]
  var DATA = {
    100: ["Continue", "The server has received the request headers and the client should proceed to send the body.", "1xx"],
    101: ["Switching Protocols", "The requester has asked the server to switch protocols.", "1xx"],
    102: ["Processing", "The server has received and is processing the request, but no response is available yet (WebDAV).", "1xx"],
    103: ["Early Hints", "Used to send some response headers before the final HTTP message.", "1xx"],
    200: ["OK", "The request succeeded.", "2xx"],
    201: ["Created", "The request succeeded and a new resource was created.", "2xx"],
    202: ["Accepted", "The request has been received but not yet acted upon.", "2xx"],
    203: ["Non-Authoritative Information", "The returned metadata is not exactly the set available from the origin server.", "2xx"],
    204: ["No Content", "The request succeeded but there is no content to send in the response body.", "2xx"],
    205: ["Reset Content", "Tells the client to reset the document view.", "2xx"],
    206: ["Partial Content", "The server is delivering only part of the resource (range request).", "2xx"],
    207: ["Multi-Status", "Carries status for multiple independent operations (WebDAV).", "2xx"],
    208: ["Already Reported", "Members of a DAV binding have already been enumerated (WebDAV).", "2xx"],
    226: ["IM Used", "The server has fulfilled a request for an instance-manipulation.", "2xx"],
    300: ["Multiple Choices", "The request has more than one possible response.", "3xx"],
    301: ["Moved Permanently", "The URL has been permanently moved; redirect to the new URL.", "3xx"],
    302: ["Found", "The URL was found at a different location temporarily.", "3xx"],
    303: ["See Other", "The response can be found at another URI using GET.", "3xx"],
    304: ["Not Modified", "The cached copy is still valid; no body is returned.", "3xx"],
    305: ["Use Proxy", "The requested resource must be accessed through a proxy (deprecated).", "3xx"],
    307: ["Temporary Redirect", "Redirect temporarily, keeping the method and body.", "3xx"],
    308: ["Permanent Redirect", "Redirect permanently, keeping the method and body.", "3xx"],
    400: ["Bad Request", "The server cannot process the request due to a client error.", "4xx"],
    401: ["Unauthorized", "Authentication is required and has failed or not been provided.", "4xx"],
    402: ["Payment Required", "Reserved for future use (originally for digital payments).", "4xx"],
    403: ["Forbidden", "The client is authenticated but does not have permission.", "4xx"],
    404: ["Not Found", "The requested resource could not be found.", "4xx"],
    405: ["Method Not Allowed", "The request method is not supported for the target resource.", "4xx"],
    406: ["Not Acceptable", "The resource cannot produce a response matching the Accept headers.", "4xx"],
    407: ["Proxy Authentication Required", "Authentication is required via a proxy.", "4xx"],
    408: ["Request Timeout", "The server did not receive the complete request in time.", "4xx"],
    409: ["Conflict", "The request conflicts with the current state of the resource.", "4xx"],
    410: ["Gone", "The resource is no longer available and will not be again.", "4xx"],
    411: ["Length Required", "The Content-Length header is required.", "4xx"],
    412: ["Precondition Failed", "A precondition in the request headers evaluated to false.", "4xx"],
    413: ["Payload Too Large", "The request body is larger than the server is willing to process.", "4xx"],
    414: ["URI Too Long", "The request URI is longer than the server can interpret.", "4xx"],
    415: ["Unsupported Media Type", "The media type of the request body is not supported.", "4xx"],
    416: ["Range Not Satisfiable", "The Range header cannot be satisfied.", "4xx"],
    417: ["Expectation Failed", "The Expect header expectation cannot be met.", "4xx"],
    418: ["I'm a teapot", "A fun response defined in RFC 2324 (Hyper Text Coffee Pot Control Protocol).", "4xx"],
    421: ["Misdirected Request", "The request was directed at a server that cannot respond.", "4xx"],
    422: ["Unprocessable Content", "The request is well-formed but semantically invalid (WebDAV).", "4xx"],
    423: ["Locked", "The resource is locked (WebDAV).", "4xx"],
    424: ["Failed Dependency", "The request failed because a previous request failed (WebDAV).", "4xx"],
    425: ["Too Early", "The server is unwilling to risk processing a request that might be replayed.", "4xx"],
    426: ["Upgrade Required", "The client should switch to a different protocol.", "4xx"],
    428: ["Precondition Required", "The request lacks the required If-Match precondition.", "4xx"],
    429: ["Too Many Requests", "The client has sent too many requests in a given time.", "4xx"],
    431: ["Request Header Fields Too Large", "The request headers are too large.", "4xx"],
    451: ["Unavailable For Legal Reasons", "The resource is unavailable for legal reasons.", "4xx"],
    500: ["Internal Server Error", "An unexpected condition prevented the server from fulfilling the request.", "5xx"],
    501: ["Not Implemented", "The server does not support the functionality required.", "5xx"],
    502: ["Bad Gateway", "An upstream server returned an invalid response.", "5xx"],
    503: ["Service Unavailable", "The server is not ready to handle the request (overloaded or down).", "5xx"],
    504: ["Gateway Timeout", "An upstream server did not respond in time.", "5xx"],
    505: ["HTTP Version Not Supported", "The HTTP protocol version used is not supported.", "5xx"],
    506: ["Variant Also Negotiates", "Internal server configuration error during content negotiation.", "5xx"],
    507: ["Insufficient Storage", "The server cannot store the representation needed (WebDAV).", "5xx"],
    508: ["Loop Detected", "The server detected an infinite loop while processing (WebDAV).", "5xx"],
    510: ["Not Extended", "Further extensions to the request are required.", "5xx"],
    511: ["Network Authentication Required", "Network access requires authentication.", "5xx"]
  };

  var cat = "all";
  var catBtns = {};

  function render() {
    var q = el.q.value.trim().toLowerCase();
    var codes = Object.keys(DATA).map(Number).sort(function (a, b) { return a - b; });
    var html = "";
    var count = 0;
    for (var i = 0; i < codes.length; i++) {
      var code = codes[i];
      var d = DATA[code];
      if (cat !== "all" && d[2] !== cat) continue;
      if (q) {
        var hay = String(code) + " " + d[0].toLowerCase() + " " + d[1].toLowerCase();
        if (hay.indexOf(q) < 0) continue;
      }
      count++;
      html +=
        '<div class="rounded-lg border border-slate-100 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-900/80 px-3 py-2.5 transition-colors hover:border-brand-200 dark:hover:border-brand-500/40">' +
        '<div class="flex items-baseline gap-3">' +
        '<span class="font-mono text-sm font-bold ' + colorClass(code) + '">' + code + "</span>" +
        '<span class="text-sm font-semibold text-slate-700 dark:text-zinc-200">' + esc(d[0]) + "</span>" +
        '<span class="ml-auto font-mono text-xs text-slate-400 dark:text-zinc-500">' + d[2] + "</span>" +
        "</div>" +
        '<p class="mt-1 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">' + esc(d[1]) + "</p>" +
        "</div>";
    }
    el.list.innerHTML = html;
    setStatus(
      '<span class="text-slate-400 dark:text-zinc-500">' + count + L.results + "</span>" +
      ' <span class="text-slate-300 dark:text-zinc-600">|</span> <span class="text-slate-400 dark:text-zinc-500">' + L.localRun + "</span>"
    );
  }

  function colorClass(code) {
    if (code < 200) return "text-slate-500 dark:text-zinc-400";
    if (code < 300) return "text-emerald-600 dark:text-emerald-400";
    if (code < 400) return "text-sky-600 dark:text-sky-400";
    if (code < 500) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function copyList() {
    var q = el.q.value.trim().toLowerCase();
    var lines = [];
    Object.keys(DATA).map(Number).sort(function (a, b) { return a - b; }).forEach(function (code) {
      var d = DATA[code];
      if (cat !== "all" && d[2] !== cat) return;
      if (q) {
        var hay = String(code) + " " + d[0].toLowerCase() + " " + d[1].toLowerCase();
        if (hay.indexOf(q) < 0) return;
      }
      lines.push(code + " " + d[0] + " - " + d[1]);
    });
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
    el.tool.classList.toggle("http-stacked", stacked);
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
  el.cats.querySelectorAll("button").forEach(function (btn) {
    catBtns[btn.dataset.cat] = btn;
    btn.addEventListener("click", function () {
      cat = btn.dataset.cat;
      Object.keys(catBtns).forEach(function (k) {
        catBtns[k].classList.toggle("active", k === cat);
      });
      btn.classList.remove("jt-pop");
      void btn.offsetWidth;
      btn.classList.add("jt-pop");
      render();
    });
  });
  el.copy.addEventListener("click", copyList);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  initResizer();
  render();
})();

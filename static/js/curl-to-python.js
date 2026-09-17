var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  clipUnavail: z ? "剪贴板不可用" : "Clipboard unavailable",
  pasteBlocked: z ? "剪贴板读取被阻止——请按 Ctrl+V 粘贴" : "Clipboard read blocked - press Ctrl+V instead",
  pasteUnavail: z ? "剪贴板 API 不可用——请按 Ctrl+V 粘贴" : "Clipboard API unavailable - press Ctrl+V instead",
  pasted: z ? "已从剪贴板粘贴" : "Pasted from clipboard",
  emptyInput: z ? "输入为空" : "Empty input",
  parseFail: z ? "无法解析该 cURL 命令" : "Could not parse this cURL command",
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
    input: document.getElementById("c2py-input"),
    output: document.getElementById("c2py-output"),
    status: document.getElementById("c2py-status"),
    pyBtn: document.getElementById("c2py-py"),
    jsBtn: document.getElementById("c2py-js"),
    copy: document.getElementById("c2py-copy"),
    clear: document.getElementById("c2py-clear"),
    resizer: document.getElementById("c2py-resizer"),
    left: document.getElementById("c2py-left"),
    right: document.getElementById("c2py-right"),
    panels: document.getElementById("c2py-panels"),
    layout: document.getElementById("c2py-layout"),
    layoutStack: document.getElementById("c2py-layout-stack"),
    layoutCol: document.getElementById("c2py-layout-col"),
    tool: document.getElementById("c2py-tool"),
    fullscreen: document.getElementById("c2py-fullscreen"),
    fsEnter: document.getElementById("c2py-fs-enter"),
    fsExit: document.getElementById("c2py-fs-exit")
  };
  var target = "py";

  function tokenize(curl) {
    var tokens = [];
    var s = String(curl).trim();
    var i = 0;
    while (i < s.length) {
      var c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      if (c === "'" || c === '"') {
        var quote = c, start = ++i, out = "";
        while (i < s.length && s[i] !== quote) {
          if (s[i] === "\\" && i + 1 < s.length && quote === '"') { i++; out += s[i]; i++; continue; }
          out += s[i]; i++;
        }
        i++; tokens.push(out);
      } else {
        var start2 = i;
        while (i < s.length && !/\s/.test(s[i])) i++;
        tokens.push(s.slice(start2, i));
      }
    }
    return tokens;
  }

  function parse(tokens) {
    var req = { method: "GET", url: "", headers: {}, data: null };
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      if (t === "curl") continue;
      if (t === "-X" || t === "--request") { req.method = (tokens[++i] || "GET").toUpperCase(); }
      else if (t === "-H" || t === "--header") {
        var h = tokens[++i] || "";
        var idx = h.indexOf(":");
        if (idx > 0) { var k = h.slice(0, idx).trim(); var v = h.slice(idx + 1).trim(); req.headers[k] = v; }
      }
      else if (t === "-d" || t === "--data" || t === "--data-raw" || t === "--data-binary") {
        req.data = tokens[++i] || "";
        if (req.method === "GET") req.method = "POST";
      }
      else if (t === "-F" || t === "--form") { req.form = (req.form || []).concat([tokens[++i] || ""]); }
      else if (t === "-u" || t === "--user") { req.auth = tokens[++i] || ""; }
      else if (t === "-A" || t === "--user-agent") { req.headers["User-Agent"] = tokens[++i] || ""; }
      else if (t === "-b" || t === "--cookie") { req.headers["Cookie"] = tokens[++i] || ""; }
      else if (t === "-L" || t === "--location") { req.follow = true; }
      else if (t === "-k" || t === "--insecure") { req.insecure = true; }
      else if (!t.startsWith("-")) { req.url = t; }
    }
    return req;
  }

  function jsStr(v) {
    return JSON.stringify(String(v))
      .replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
  }
  function pyStr(v) {
    return "'" + String(v).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n") + "'";
  }
  function prettyJson(v) {
    try { return JSON.stringify(JSON.parse(v), null, 2); } catch (e) { return v; }
  }

  function toPython(req) {
    var lines = [];
    lines.push("import requests");
    lines.push("");
    lines.push("url = " + pyStr(req.url));
    if (req.auth) lines.push("auth = " + pyStr(req.auth));
    if (Object.keys(req.headers).length) {
      lines.push("headers = {");
      var keys = Object.keys(req.headers);
      for (var i = 0; i < keys.length; i++) lines.push("    " + pyStr(keys[i]) + ": " + pyStr(req.headers[keys[i]]) + (i < keys.length - 1 ? "," : ""));
      lines.push("}");
    }
    var dataArg = "";
    if (req.form) {
      dataArg = "files = {";
      var fk = [];
      for (var j = 0; j < req.form.length; j++) { var parts = req.form[j].split("=", 2); fk.push("    " + pyStr(parts[0]) + ": open(" + pyStr(parts[1] || "") + ", 'rb')"); }
      dataArg = fk.join(",\n") + "\n}";
      lines.push(dataArg);
      lines.push("response = requests.request(\"" + req.method + "\", url, headers=headers, files=files)");
    } else if (req.data !== null) {
      if (Object.keys(req.headers).some(function (k) { return /content-type/i.test(k) && req.headers[k].indexOf("json") >= 0; })) {
        lines.push("payload = " + jsStr(prettyJson(req.data)));
        lines.push("response = requests.request(\"" + req.method + "\", url, headers=headers, json=json.loads(payload))");
        lines.unshift("import json");
      } else {
        lines.push("payload = " + pyStr(req.data));
        lines.push("response = requests.request(\"" + req.method + "\", url, headers=headers, data=payload)");
      }
    } else {
      lines.push("response = requests.request(\"" + req.method + "\", url, headers=headers)");
    }
    if (req.insecure) lines.push("response = requests.request(\"" + req.method + "\", url, headers=headers, verify=False)");
    lines.push("print(response.status_code)");
    lines.push("print(response.text)");
    return lines.join("\n");
  }

  function toJs(req) {
    var lines = [];
    lines.push("const url = " + jsStr(req.url) + ";");
    if (Object.keys(req.headers).length) {
      lines.push("const headers = {");
      var keys = Object.keys(req.headers);
      for (var i = 0; i < keys.length; i++) lines.push("  " + jsStr(keys[i]) + ": " + jsStr(req.headers[keys[i]]) + (i < keys.length - 1 ? "," : ""));
      lines.push("};");
    }
    var body = "";
    if (req.data !== null) body = ", body: " + jsStr(req.data);
    var hdr = Object.keys(req.headers).length ? ", headers" : "";
    lines.push("fetch(url, { method: " + jsStr(req.method) + hdr + body + " })");
    lines.push("  .then((res) => res.text())");
    lines.push("  .then((text) => console.log(text))");
    lines.push("  .catch((err) => console.error(err));");
    return lines.join("\n");
  }

  function update() {
    var raw = el.input.value;
    if (!raw) { el.output.value = ""; setStatus(""); return; }
    try {
      var tokens = tokenize(raw);
      if (!tokens.length || tokens[0] !== "curl") throw new Error();
      var req = parse(tokens);
      if (!req.url) throw new Error();
      el.output.value = target === "py" ? toPython(req) : toJs(req);
      setStatus('<span class="text-slate-400 dark:text-zinc-500">' + req.method + " " + req.url.replace(/^https?:\/\//, "") + "</span>");
    } catch (e) {
      el.output.value = "";
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.parseFail) + "</span>");
    }
  }

  function setTarget(t) {
    target = t;
    el.pyBtn.classList.toggle("active", t === "py");
    el.jsBtn.classList.toggle("active", t === "js");
    update();
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) { return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function copyOutput() {
    if (!el.output.value) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(el.output.value).then(function () { flashStatus(TB_L.copiedOk); })
        .catch(function () { fallbackCopy(); });
    } else { fallbackCopy(); }
  }
  function fallbackCopy() {
    el.output.select();
    try { document.execCommand("copy"); flashStatus(TB_L.copiedOk); }
    catch (e) { setStatus(TB_L.copyFail); }
  }
  var statusTimer = null;
  function flashStatus(html) {
    var prev = el.status.innerHTML;
    setStatus(html);
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { setStatus(prev); }, 2000);
  }
  function clearAll() {
    el.input.value = ""; el.output.value = ""; setStatus(""); el.input.focus();
  }

  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("c2py-stacked", stacked);
    el.layoutStack.classList.toggle("hidden", stacked);
    el.layoutCol.classList.toggle("hidden", !stacked);
    syncHeight();
  }
  function toggleFullscreen() {
    el.tool.classList.toggle("page-fs");
    var isFs = el.tool.classList.contains("page-fs");
    if (isFs) { el.output.style.height = ""; } else { syncHeight(); }
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
  function syncHeight() {
    if (window.innerWidth < 1024) return;
    if (el.tool.classList.contains("page-fs")) return;
    el.output.style.height = el.input.offsetHeight + "px";
  }

  el.input.addEventListener("input", update);
  el.pyBtn.addEventListener("click", function () { setTarget("py"); });
  el.jsBtn.addEventListener("click", function () { setTarget("js"); });
  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("c2py-paste");
  function pasteIntoInput() {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function (t) {
        if (t == null) return;
        el.input.value = t;
        el.input.dispatchEvent(new Event("input", { bubbles: true }));
        flashStatus(TB_L.pastedOk);
      }).catch(function () { setStatus(TB_L.clipBlocked); });
    } else { setStatus(TB_L.clipNoApi); }
  }
  pasteBtn.addEventListener("click", pasteIntoInput);

  el.input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); update(); }
  });

  if (window.ResizeObserver) new ResizeObserver(syncHeight).observe(el.input);
  window.addEventListener("resize", syncHeight);
  initResizer();
  update();
})();

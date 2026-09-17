var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  emptyInput: z ? "输入为空" : "Empty input",
  invalidXML: z ? "无法解析：XML 结构不完整（标签未闭合或匹配错误）" : "Cannot parse: incomplete XML (unclosed or mismatched tags)",
  invalidJSON: z ? "无法解析：不是有效的 JSON" : "Cannot parse: not valid JSON",
  jsonNotObject: z ? "无法转换：JSON 根必须是对象" : "Cannot convert: JSON root must be an object",
  bytesOut: z ? "字节" : "bytes",
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
    input: document.getElementById("xj-input"),
    output: document.getElementById("xj-output"),
    status: document.getElementById("xj-status"),
    live: document.getElementById("xj-live"),
    copy: document.getElementById("xj-copy"),
    clear: document.getElementById("xj-clear"),
    tojsonBtn: document.getElementById("xj-tojson"),
    toxmlBtn: document.getElementById("xj-toxml"),
    resizer: document.getElementById("xj-resizer"),
    left: document.getElementById("xj-left"),
    right: document.getElementById("xj-right"),
    panels: document.getElementById("xj-panels"),
    layout: document.getElementById("xj-layout"),
    layoutStack: document.getElementById("xj-layout-stack"),
    layoutCol: document.getElementById("xj-layout-col"),
    tool: document.getElementById("xj-tool"),
    fullscreen: document.getElementById("xj-fullscreen"),
    fsEnter: document.getElementById("xj-fs-enter"),
    fsExit: document.getElementById("xj-fs-exit")
  };
  var mode = "tojson";

  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function escXml(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function pad(n) { var s = ""; for (var i = 0; i < n; i++) s += "  "; return s; }

  function parseXML(xml) {
    var pos = 0, n = xml.length;
    function skipWs() { while (pos < n && /\s/.test(xml[pos])) pos++; }
    function parseAttrs(s) {
      var attrs = {}, re = /([^\s=]+)\s*=\s*("([^"]*)"|'([^']*)')/g, m;
      while ((m = re.exec(s))) attrs[m[1]] = m[3] !== undefined ? m[3] : m[4];
      return attrs;
    }
    function parseNode() {
      skipWs();
      if (pos >= n) return { text: "" };
      if (xml.startsWith("<?", pos)) {
        var pe = xml.indexOf("?>", pos);
        if (pe < 0) throw new Error(L.invalidXML);
        pos = pe + 2; return null;
      }
      if (xml.startsWith("<!--", pos)) {
        var ce = xml.indexOf("-->", pos);
        if (ce < 0) throw new Error(L.invalidXML);
        pos = ce + 3; return null;
      }
      if (xml.startsWith("<![CDATA[", pos)) {
        var de = xml.indexOf("]]>", pos);
        if (de < 0) throw new Error(L.invalidXML);
        var txt = xml.slice(pos + 9, de);
        pos = de + 3; return { text: txt };
      }
      if (xml[pos] === "<") {
        var m = /^<([a-zA-Z][\w.-]*)([^>]*?)>/.exec(xml.slice(pos));
        if (!m) throw new Error(L.invalidXML);
        var name = m[1], attrsStr = m[2];
        pos += m[0].length;
        var node = { name: name, attrs: parseAttrs(attrsStr), children: [], text: "" };
        if (/\/\s*$/.test(attrsStr)) return node;
        var closeRe = new RegExp("^</\\s*" + escRe(name) + "\\s*>");
        while (pos < n) {
          if (xml.startsWith("</", pos)) {
            var cm = closeRe.exec(xml.slice(pos));
            if (!cm) throw new Error(L.invalidXML);
            pos += cm[0].length;
            return node;
          }
          var child = parseNode();
          if (child === null) continue;
          if (child.name) node.children.push(child);
          else node.text += child.text;
        }
        throw new Error(L.invalidXML);
      }
      var e = xml.indexOf("<", pos);
      var text = (e < 0 ? xml.slice(pos) : xml.slice(pos, e));
      pos = (e < 0 ? n : e);
      return { text: text };
    }
    var root = parseNode();
    if (!root || !root.name) throw new Error(L.invalidXML);
    return root;
  }

  function nodeToObj(node) {
    var obj = {}, has = false;
    for (var k in node.attrs) { obj["@" + k] = node.attrs[k]; has = true; }
    for (var i = 0; i < node.children.length; i++) {
      var c = node.children[i], cv = nodeToObj(c);
      if (obj[c.name] !== undefined) {
        if (!Array.isArray(obj[c.name])) obj[c.name] = [obj[c.name]];
        obj[c.name].push(cv);
      } else { obj[c.name] = cv; }
      has = true;
    }
    var text = node.text.trim();
    if (text) {
      if (!has) return text;
      obj["#text"] = text;
    }
    return obj;
  }

  function xmlToJson(xml) {
    var root = parseXML(xml);
    return JSON.stringify(nodeToObj(root), null, 2);
  }

  function jsonToXml(obj, name, indent) {
    if (obj === null || obj === undefined) return "";
    var isArr = Array.isArray(obj);
    if (typeof obj !== "object" || isArr) {
      if (isArr) {
        return obj.map(function (item) { return jsonToXml(item, name, indent); }).join("\n");
      }
      return pad(indent) + "<" + name + ">" + escXml(obj) + "</" + name + ">";
    }
    var lines = [pad(indent) + "<" + name + ">"];
    var inner = [], textVal = "", attrs = "";
    var hasChild = false;
    for (var k in obj) {
      if (k.charAt(0) === "@" && k.length > 1) {
        attrs += " " + k.slice(1) + '="' + String(obj[k]).replace(/&/g, "&amp;").replace(/"/g, "&quot;") + '"';
        continue;
      }
      if (k === "@") { continue; }
      if (k === "#text") { textVal = String(obj[k]); hasChild = true; continue; }
      var v = obj[k];
      var sub = jsonToXml(v, k, indent + 1);
      if (sub) { inner.push(sub); hasChild = true; }
    }
    if (attrs) lines[0] = pad(indent) + "<" + name + attrs + ">";
    if (textVal && !inner.length) {
      lines[0] = pad(indent) + "<" + name + attrs + ">" + escXml(textVal) + "</" + name + ">";
      return lines[0];
    }
    if (textVal) inner.push(pad(indent + 1) + escXml(textVal));
    if (!inner.length) return pad(indent) + "<" + name + attrs + "/>";
    lines.push(inner.join("\n"));
    lines.push(pad(indent) + "</" + name + ">");
    return lines.join("\n");
  }

  function jsonToXmlFull(input) {
    var obj;
    try { obj = JSON.parse(input); }
    catch (e) { throw new Error(L.invalidJSON); }
    if (obj === null || typeof obj !== "object" || Array.isArray(obj)) throw new Error(L.jsonNotObject);
    var rootName = "root";
    var keys = Object.keys(obj);
    if (keys.length === 1) { rootName = /^[a-zA-Z_][\w.-]*$/.test(keys[0]) ? keys[0] : "root"; }
    return jsonToXml(obj, rootName, 0);
  }

  function update() {
    var raw = el.input.value;
    if (!raw) { el.output.value = ""; setStatus(""); return; }
    try {
      var res = mode === "tojson" ? xmlToJson(raw) : jsonToXmlFull(raw);
      el.output.value = res;
      setStatus('<span class="text-slate-400 dark:text-zinc-500">' + L.bytesOut + ": " + new TextEncoder().encode(res).length + "</span>");
    } catch (e) {
      el.output.value = "";
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(e.message) + "</span>");
    }
  }

  function setMode(m) {
    mode = m;
    el.tojsonBtn.classList.toggle("active", m === "tojson");
    el.toxmlBtn.classList.toggle("active", m === "toxml");
    if (el.live.checked) update();
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
    el.tool.classList.toggle("xj-stacked", stacked);
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

  el.input.addEventListener("input", function () { if (el.live.checked) update(); });
  el.live.addEventListener("change", function () { if (el.live.checked) update(); });
  el.tojsonBtn.addEventListener("click", function () { setMode("tojson"); });
  el.toxmlBtn.addEventListener("click", function () { setMode("toxml"); });
  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("xj-paste");
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

  if (window.ResizeObserver) new ResizeObserver(syncHeight).observe(el.input);
  window.addEventListener("resize", syncHeight);
  initResizer();
  update();
})();

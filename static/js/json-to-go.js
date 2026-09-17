var L=(function(){var z=document.documentElement.lang==="zh-cn";return {
inBytes:z?"输入 ":"In: ",
outBytes:z?"输出 ":"Out: ",
copied:z?"已复制到剪贴板":"Copied to clipboard",
copyFailed:z?"复制失败":"Copy failed",
clipUnavail:z?"剪贴板不可用":"Clipboard unavailable",
pasteBlocked:z?"剪贴板读取被阻止——请按 Ctrl+V 粘贴":"Clipboard read blocked - press Ctrl+V instead",
pasteUnavail:z?"剪贴板 API 不可用——请按 Ctrl+V 粘贴":"Clipboard API unavailable - press Ctrl+V instead",
pasted:z?"已从剪贴板粘贴":"Pasted from clipboard",
emptyInput:z?"输入为空":"Empty input",
badJson:z?"输入不是有效的 JSON":"Input is not valid JSON",
notObj:z?"JSON 顶层必须是对象或数组":"JSON top-level must be an object or an array",
localRun:z?"所有转换均在浏览器本地完成。":"All conversion runs locally in your browser.",
structName:z?"结构体名":"Struct name"
,
zh:z
};})();

/*!
 * JSON to Go Struct - ToolsBoot
 * Generates a typed Go struct from a JSON sample. No libraries.
 */
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
    input: document.getElementById("j2g-input"),
    output: document.getElementById("j2g-output"),
    status: document.getElementById("j2g-status"),
    live: document.getElementById("j2g-live"),
    copy: document.getElementById("j2g-copy"),
    clear: document.getElementById("j2g-clear"),
    resizer: document.getElementById("j2g-resizer"),
    left: document.getElementById("j2g-left"),
    right: document.getElementById("j2g-right"),
    panels: document.getElementById("j2g-panels"),
    layout: document.getElementById("j2g-layout"),
    layoutStack: document.getElementById("j2g-layout-stack"),
    layoutCol: document.getElementById("j2g-layout-col"),
    tool: document.getElementById("j2g-tool"),
    fullscreen: document.getElementById("j2g-fullscreen"),
    fsEnter: document.getElementById("j2g-fs-enter"),
    fsExit: document.getElementById("j2g-fs-exit")
  };

  // ---- Go field naming ----
  function toPascal(name) {
    var parts = name.split(/[^A-Za-z0-9]+/).filter(function (p) { return p.length > 0; });
    var out = parts.map(function (p) {
      return p.charAt(0).toUpperCase() + p.slice(1);
    }).join("");
    if (!out) out = "Field";
    // Guard against Go keywords colliding with type names
    if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(out) === false) out = "Field";
    return out;
  }

  function jsonType(v) {
    if (v === null) return "interface{}";
    if (Array.isArray(v)) return "array";
    switch (typeof v) {
      case "string": return "string";
      case "boolean": return "bool";
      case "number": return Number.isInteger(v) ? "int" : "float64";
      case "object": return "object";
      default: return "interface{}";
    }
  }

  var structs = [];       // collected struct definitions
  var usedNames = {};

  function uniqueTypeName(base) {
    var name = base;
    var i = 2;
    while (usedNames[name]) { name = base + i; i++; }
    usedNames[name] = true;
    return name;
  }

  // Returns Go type expression for value v; appends nested structs to structs[]
  function goType(v, defaultName) {
    var t = jsonType(v);
    if (t === "array") {
      if (v.length === 0) return "[]interface{}";
      // Merge object element types
      var elem = v[0];
      for (var i = 1; i < v.length; i++) {
        if (jsonType(elem) !== jsonType(v[i])) { elem = null; break; }
      }
      if (elem === null) return "[]interface{}";
      return "[]" + goType(elem, defaultName + "Item");
    }
    if (t === "object") {
      var name = uniqueTypeName(defaultName);
      structs.push({ name: name, obj: v });
      return name;
    }
    return t;
  }

  function buildStruct(name, obj) {
    var lines = [];
    lines.push("type " + name + " struct {");
    var keys = Object.keys(obj);
    if (keys.length === 0) {
      lines.push("}");
      return lines.join("\n");
    }
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var fieldName = toPascal(k);
      var type = goType(obj[k], fieldName);
      lines.push("\t" + fieldName + " " + type + " `json:\"" + k + "\"`");
    }
    lines.push("}");
    return lines.join("\n");
  }

  function generate(json) {
    structs = [];
    usedNames = {};
    if (Array.isArray(json)) {
      if (json.length === 0) return "[]interface{}";
      // treat first element as the root
      var root = json[0];
      if (root !== null && typeof root === "object") {
        goType(root, "AutoGenerated");
      } else {
        return "type AutoGenerated []" + goType(root, "AutoGeneratedItem") + "\n";
      }
    } else if (json !== null && typeof json === "object") {
      goType(json, "AutoGenerated");
    } else {
      throw new Error(L.notObj);
    }
    // Expand structs breadth-first (nested first is fine since goType runs on demand)
    var out = [];
    for (var i = 0; i < structs.length; i++) {
      out.push(buildStruct(structs[i].name, structs[i].obj));
    }
    return out.join("\n\n") + "\n";
  }

  var debounceTimer = null;
  function update() {
    var raw = el.input.value;
    if (!raw) {
      el.output.value = "";
      setStatus("");
      return;
    }
    try {
      var parsed = JSON.parse(raw);
      var out = generate(parsed);
      el.output.value = out;
      var inBytes = new TextEncoder().encode(raw).length;
      var outBytes = new TextEncoder().encode(out).length;
      setStatus(
        '<span class="text-slate-400 dark:text-zinc-500">' + L.inBytes + inBytes + "</span>" +
        ' <span class="text-slate-300 dark:text-zinc-600">|</span> ' +
        '<span class="text-slate-400 dark:text-zinc-500">' + L.outBytes + outBytes + "</span>"
      );
    } catch (e) {
      el.output.value = "";
      var msg = e.message === L.notObj ? L.notObj : L.badJson;
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(msg) + "</span>");
    }
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
      }).catch(function () { fallbackCopy(); });
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
    el.input.value = "";
    el.output.value = "";
    setStatus("");
    el.input.focus();
  }

  // ---- Layout / fullscreen / resizer ----
  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("j2g-stacked", stacked);
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
      if (dragging) {
        dragging = false;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    });
  }

  function syncHeight() {
    if (window.innerWidth < 1024) return;
    if (el.tool.classList.contains("page-fs")) return;
    el.output.style.height = el.input.offsetHeight + "px";
  }

  // ---- Events ----
  el.input.addEventListener("input", function () {
    if (el.live.checked) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(update, 200);
    }
  });
  el.live.addEventListener("change", function () { if (el.live.checked) update(); });
  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () {
    stacked = !stacked;
    applyLayout();
  });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("j2g-paste");
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

  if (window.ResizeObserver) {
    new ResizeObserver(syncHeight).observe(el.input);
  }
  window.addEventListener("resize", syncHeight);

  el.input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      update();
    }
  });

  initResizer();
  update();
})();

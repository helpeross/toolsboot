var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  clipUnavail: z ? "剪贴板不可用" : "Clipboard unavailable",
  pasteBlocked: z ? "剪贴板读取被阻止——请按 Ctrl+V 粘贴" : "Clipboard read blocked - press Ctrl+V instead",
  pasteUnavail: z ? "剪贴板 API 不可用——请按 Ctrl+V 粘贴" : "Clipboard API unavailable - press Ctrl+V instead",
  pasted: z ? "已从剪贴板粘贴" : "Pasted from clipboard",
  emptyInput: z ? "输入为空" : "Empty input",
  invalidJson: z ? "不是有效的 JSON" : "Not valid JSON",
  generated: z ? "个类已生成" : "classes generated",
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
    input: document.getElementById("j2cs-input"),
    output: document.getElementById("j2cs-output"),
    status: document.getElementById("j2cs-status"),
    live: document.getElementById("j2cs-live"),
    copy: document.getElementById("j2cs-copy"),
    clear: document.getElementById("j2cs-clear"),
    resizer: document.getElementById("j2cs-resizer"),
    left: document.getElementById("j2cs-left"),
    right: document.getElementById("j2cs-right"),
    panels: document.getElementById("j2cs-panels"),
    layout: document.getElementById("j2cs-layout"),
    layoutStack: document.getElementById("j2cs-layout-stack"),
    layoutCol: document.getElementById("j2cs-layout-col"),
    tool: document.getElementById("j2cs-tool"),
    fullscreen: document.getElementById("j2cs-fullscreen"),
    fsEnter: document.getElementById("j2cs-fs-enter"),
    fsExit: document.getElementById("j2cs-fs-exit")
  };
  var rootName = "RootObject";
  var usedNames = {};

  function pascal(name) {
    var s = String(name).replace(/[^A-Za-z0-9_]/g, "_");
    s = s.replace(/(^|_)([a-z0-9])/g, function (m, p, c) { return c.toUpperCase(); });
    if (!/^[A-Za-z_]/.test(s)) s = "_" + s;
    return s;
  }
  function uniqueName(base) {
    var b = pascal(base || "Item");
    var name = b, i = 2;
    while (usedNames[name]) name = b + i++;
    usedNames[name] = true;
    return name;
  }
  function csType(v, name) {
    if (v === null) return "object";
    if (Array.isArray(v)) {
      var inner = v.length ? v[0] : {};
      var t = csType(inner, name);
      return t.indexOf("[]") >= 0 ? t : (t === "object" ? "object[]" : t + "[]");
    }
    switch (typeof v) {
      case "string": return "string";
      case "number": return Number.isInteger(v) ? "long" : "double";
      case "boolean": return "bool";
      case "object": return uniqueName(name);
      default: return "object";
    }
  }
  function buildClass(obj, name) {
    var lines = [];
    var own = uniqueName(name);
    var props = Object.keys(obj);
    lines.push("public class " + own);
    lines.push("{");
    for (var i = 0; i < props.length; i++) {
      var key = props[i];
      var val = obj[key];
      var propName = pascal(key);
      var innerName = propName;
      if (val !== null && typeof val === "object") {
        if (Array.isArray(val)) {
          if (val.length && typeof val[0] === "object" && val[0] !== null) {
            lines = lines.concat(buildClass(val[0], innerName));
          }
        } else {
          lines = lines.concat(buildClass(val, innerName));
        }
      }
      var pt = csType(val, innerName);
      lines.push("    public " + pt + " " + propName + " { get; set; }");
    }
    lines.push("}");
    lines.push("");
    return lines;
  }

  function update() {
    var raw = el.input.value.trim();
    if (!raw) { el.output.value = ""; setStatus(""); return; }
    try {
      var obj = JSON.parse(raw);
      usedNames = {};
      var lines = buildClass(obj, rootName);
      el.output.value = "using System;\nusing System.Collections.Generic;\n\n" + lines.join("\n").replace(/\n\n$/, "\n");
      setStatus('<span class="text-slate-400 dark:text-zinc-500">' + Object.keys(usedNames).length + " " + L.generated + "</span>");
    } catch (e) {
      el.output.value = "";
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.invalidJson) + "</span>");
    }
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
    el.tool.classList.toggle("j2cs-stacked", stacked);
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
  el.copy.addEventListener("click", copyOutput);
  el.clear.addEventListener("click", clearAll);
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  var pasteBtn = document.getElementById("j2cs-paste");
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

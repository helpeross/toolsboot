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
noQuery:z?"URL 中未找到查询参数":"No query parameters found in the URL",
badJson:z?"输入不是有效的 JSON 对象":"Input is not a valid JSON object",
badJsonArr:z?"JSON 顶层必须是对象或数组":"JSON top-level must be an object or array",
localRun:z?"所有转换均在浏览器本地完成。":"All conversions run locally in your browser."
,
zh:z,
url2json:z?"URL → JSON":"URL → JSON",
json2url:z?"JSON → URL":"JSON → URL"
};})();

/*!
 * URL Params to JSON - ToolsBoot
 * Query string <-> JSON conversion. No libraries.
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
    input: document.getElementById("upj-input"),
    output: document.getElementById("upj-output"),
    status: document.getElementById("upj-status"),
    modeEnc: document.getElementById("upj-mode-enc"),
    modeDec: document.getElementById("upj-mode-dec"),
    live: document.getElementById("upj-live"),
    copy: document.getElementById("upj-copy"),
    clear: document.getElementById("upj-clear"),
    resizer: document.getElementById("upj-resizer"),
    left: document.getElementById("upj-left"),
    right: document.getElementById("upj-right"),
    panels: document.getElementById("upj-panels"),
    layout: document.getElementById("upj-layout"),
    layoutStack: document.getElementById("upj-layout-stack"),
    layoutCol: document.getElementById("upj-layout-col"),
    tool: document.getElementById("upj-tool"),
    fullscreen: document.getElementById("upj-fullscreen"),
    fsEnter: document.getElementById("upj-fs-enter"),
    fsExit: document.getElementById("upj-fs-exit")
  };

  var mode = "enc";

  // URL / query string -> object. Repeated keys become arrays.
  function parseQuery(input) {
    var q = input.trim();
    if (!q) return null;
    var qi = q.indexOf("?");
    var query = qi >= 0 ? q.slice(qi + 1) : q;
    // Strip hash fragment
    var hi = query.indexOf("#");
    if (hi >= 0) query = query.slice(0, hi);
    if (!query) return null;
    var out = {};
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];
      if (!pair) continue;
      var eq = pair.indexOf("=");
      var key, val;
      if (eq >= 0) {
        key = decodeURIComponent(pair.slice(0, eq).replace(/\+/g, " "));
        val = decodeURIComponent(pair.slice(eq + 1).replace(/\+/g, " "));
      } else {
        key = decodeURIComponent(pair.replace(/\+/g, " "));
        val = "";
      }
      if (Object.prototype.hasOwnProperty.call(out, key)) {
        if (Array.isArray(out[key])) out[key].push(val);
        else out[key] = [out[key], val];
      } else {
        out[key] = val;
      }
    }
    return out;
  }

  // JSON -> query string (object or array of pairs)
  function toQuery(obj) {
    var pairs = [];
    function push(key, val) {
      var s = String(val);
      pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(s));
    }
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        var item = obj[i];
        if (item && typeof item === "object" && !Array.isArray(item)) {
          for (var k in item) {
            if (Object.prototype.hasOwnProperty.call(item, k)) push(k, item[k]);
          }
        }
      }
    } else {
      for (var k2 in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, k2)) continue;
        var v = obj[k2];
        if (Array.isArray(v)) {
          for (var j = 0; j < v.length; j++) push(k2, v[j]);
        } else if (v !== null && typeof v === "object") {
          push(k2, JSON.stringify(v));
        } else {
          push(k2, v === null || v === undefined ? "" : v);
        }
      }
    }
    return pairs.join("&");
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
      var result;
      if (mode === "enc") {
        var obj = parseQuery(raw);
        if (!obj) {
          el.output.value = "";
          setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.noQuery) + "</span>");
          return;
        }
        result = JSON.stringify(obj, null, 2);
      } else {
        var parsed = JSON.parse(raw);
        if (parsed === null || typeof parsed !== "object") throw new Error("bad");
        result = toQuery(parsed);
      }
      el.output.value = result;
      var inBytes = new TextEncoder().encode(raw).length;
      var outBytes = new TextEncoder().encode(result).length;
      setStatus(
        '<span class="text-slate-400 dark:text-zinc-500">' + L.inBytes + inBytes + "</span>" +
        ' <span class="text-slate-300 dark:text-zinc-600">|</span> ' +
        '<span class="text-slate-400 dark:text-zinc-500">' + L.outBytes + outBytes + "</span>"
      );
    } catch (e) {
      el.output.value = "";
      setStatus('<span class="text-red-500 dark:text-red-400 font-medium">' + esc(L.badJson) + "</span>");
    }
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function setMode(m) {
    mode = m;
    var isEnc = m === "enc";
    el.modeEnc.classList.toggle("active", isEnc);
    el.modeDec.classList.toggle("active", !isEnc);
    var activeBtn = isEnc ? el.modeEnc : el.modeDec;
    activeBtn.classList.remove("jt-pop");
    void activeBtn.offsetWidth;
    activeBtn.classList.add("jt-pop");
    update();
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
    el.tool.classList.toggle("upj-stacked", stacked);
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
  el.modeEnc.addEventListener("click", function () { setMode("enc"); });
  el.modeDec.addEventListener("click", function () { setMode("dec"); });
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

  var pasteBtn = document.getElementById("upj-paste");
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
  setMode("enc");
})();

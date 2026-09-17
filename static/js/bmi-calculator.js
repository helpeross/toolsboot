var L = (function () { var z = document.documentElement.lang === "zh-cn"; return {
  copied: z ? "已复制到剪贴板" : "Copied to clipboard",
  copyFailed: z ? "复制失败" : "Copy failed",
  clipUnavail: z ? "剪贴板不可用" : "Clipboard unavailable",
  pasteBlocked: z ? "剪贴板读取被阻止——请按 Ctrl+V 粘贴" : "Clipboard read blocked - press Ctrl+V instead",
  pasteUnavail: z ? "剪贴板 API 不可用——请按 Ctrl+V 粘贴" : "Clipboard API unavailable - press Ctrl+V instead",
  pasted: z ? "已从剪贴板粘贴" : "Pasted from clipboard",
  waiting: z ? "等待输入…" : "Waiting for input...",
  underweight: z ? "体重过轻" : "Underweight",
  normal: z ? "正常" : "Normal",
  overweight: z ? "超重" : "Overweight",
  obese1: z ? "肥胖 I 级" : "Obese Class I",
  obese2: z ? "肥胖 II 级" : "Obese Class II",
  obese3: z ? "肥胖 III 级" : "Obese Class III",
  ideal: z ? "理想体重" : "Ideal weight",
  range: z ? "正常 BMI 对应体重" : "Weight for normal BMI",
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
    height: document.getElementById("bmi-height"),
    heightRange: document.getElementById("bmi-height-range"),
    weight: document.getElementById("bmi-weight"),
    weightRange: document.getElementById("bmi-weight-range"),
    metric: document.getElementById("bmi-metric"),
    value: document.getElementById("bmi-value"),
    label: document.getElementById("bmi-label"),
    marker: document.getElementById("bmi-marker"),
    ideal: document.getElementById("bmi-ideal"),
    prim: document.getElementById("bmi-prim"),
    status: document.getElementById("bmi-status"),
    resizer: document.getElementById("bmi-resizer"),
    left: document.getElementById("bmi-left"),
    right: document.getElementById("bmi-right"),
    panels: document.getElementById("bmi-panels"),
    layout: document.getElementById("bmi-layout"),
    layoutStack: document.getElementById("bmi-layout-stack"),
    layoutCol: document.getElementById("bmi-layout-col"),
    tool: document.getElementById("bmi-tool"),
    fullscreen: document.getElementById("bmi-fullscreen"),
    fsEnter: document.getElementById("bmi-fs-enter"),
    fsExit: document.getElementById("bmi-fs-exit")
  };

  function update() {
    var h = parseFloat(el.height.value);
    var w = parseFloat(el.weight.value);
    if (!h || !w || h < 1 || w < 1) {
      el.value.textContent = "—";
      el.label.textContent = L.waiting;
      el.marker.style.display = "none";
      el.ideal.textContent = "—";
      el.prim.textContent = "—";
      return;
    }
    var hM = h / 100;
    var bmi = w / (hM * hM);
    el.value.textContent = bmi.toFixed(1);
    var cat;
    if (bmi < 18.5) cat = L.underweight;
    else if (bmi < 25) cat = L.normal;
    else if (bmi < 30) cat = L.overweight;
    else if (bmi < 35) cat = L.obese1;
    else if (bmi < 40) cat = L.obese2;
    else cat = L.obese3;
    el.label.textContent = cat;
    var pct = Math.min(100, Math.max(0, (bmi - 14) / (42 - 14) * 100));
    el.marker.style.display = "block";
    el.marker.style.left = pct + "%";
    var idealLow = 18.5 * hM * hM;
    var idealHigh = 24.9 * hM * hM;
    var mid = (18.5 + 24.9) / 2 * hM * hM;
    el.ideal.textContent = Math.round(mid) + " kg";
    el.prim.textContent = Math.round(idealLow) + "–" + Math.round(idealHigh) + " kg";
    setStatus('<span class="text-slate-400 dark:text-zinc-500">BMI = ' + bmi.toFixed(1) + " kg/m²</span>");
  }

  function setStatus(html) { el.status.innerHTML = html; }
  function esc(v) { return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  var stacked = false;
  function applyLayout() {
    el.tool.classList.toggle("bmi-stacked", stacked);
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

  el.height.addEventListener("input", function () {
    var v = Math.min(220, Math.max(120, parseFloat(el.height.value) || 175));
    el.heightRange.value = v;
    update();
  });
  el.heightRange.addEventListener("input", function () {
    el.height.value = el.heightRange.value;
    update();
  });
  el.weight.addEventListener("input", function () {
    var v = Math.min(200, Math.max(30, parseFloat(el.weight.value) || 70));
    el.weightRange.value = v;
    update();
  });
  el.weightRange.addEventListener("input", function () {
    el.weight.value = el.weightRange.value;
    update();
  });
  el.layout.addEventListener("click", function () { stacked = !stacked; applyLayout(); });
  el.fullscreen.addEventListener("click", toggleFullscreen);

  initResizer();
  update();
})();

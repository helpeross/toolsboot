var L=(function(){var z=document.documentElement.lang==="zh-cn";return {
copied:z?"已复制列表":"Copied list",
copyFailed:z?"复制失败":"Copy failed",
results:z?" 个结果":" results",
localRun:z?"数据内置在页面中，无需联网。":"Data is bundled in the page - no network needed.",
country:z?"国家":"Country",
capital:z?"首都":"Capital",
region:z?"地区":"Region"
,
zh:z
};})();

/*!
 * World Capitals - ToolsBoot
 * A bundled reference of countries and their capitals. No network needed.
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
    q: document.getElementById("cap-q"),
    cats: document.getElementById("cap-list"),
    list: document.getElementById("cap-list"),
    status: document.getElementById("cap-status"),
    copy: document.getElementById("cap-copy"),
    resizer: document.getElementById("cap-resizer"),
    left: document.getElementById("cap-left"),
    right: document.getElementById("cap-right"),
    panels: document.getElementById("cap-panels"),
    layout: document.getElementById("cap-layout"),
    layoutStack: document.getElementById("cap-layout-stack"),
    layoutCol: document.getElementById("cap-layout-col"),
    tool: document.getElementById("cap-tool"),
    fullscreen: document.getElementById("cap-fullscreen"),
    fsEnter: document.getElementById("cap-fs-enter"),
    fsExit: document.getElementById("cap-fs-exit")
  };

  // [country, capital, region]
  var DATA = [
    ["China", "Beijing", "asia"], ["Japan", "Tokyo", "asia"], ["South Korea", "Seoul", "asia"],
    ["India", "New Delhi", "asia"], ["Indonesia", "Jakarta", "asia"], ["Thailand", "Bangkok", "asia"],
    ["Vietnam", "Hanoi", "asia"], ["Philippines", "Manila", "asia"], ["Malaysia", "Kuala Lumpur", "asia"],
    ["Singapore", "Singapore", "asia"], ["Pakistan", "Islamabad", "asia"], ["Bangladesh", "Dhaka", "asia"],
    ["Sri Lanka", "Sri Jayawardenepura Kotte", "asia"], ["Nepal", "Kathmandu", "asia"], ["Myanmar", "Naypyidaw", "asia"],
    ["Cambodia", "Phnom Penh", "asia"], ["Laos", "Vientiane", "asia"], ["Mongolia", "Ulaanbaatar", "asia"],
    ["Kazakhstan", "Astana", "asia"], ["Uzbekistan", "Tashkent", "asia"], ["Afghanistan", "Kabul", "asia"],
    ["Iran", "Tehran", "asia"], ["Iraq", "Baghdad", "asia"], ["Saudi Arabia", "Riyadh", "asia"],
    ["Israel", "Jerusalem", "asia"], ["United Arab Emirates", "Abu Dhabi", "asia"], ["Qatar", "Doha", "asia"],
    ["Turkey", "Ankara", "asia"], ["Syria", "Damascus", "asia"], ["Jordan", "Amman", "asia"],
    ["Kuwait", "Kuwait City", "asia"], ["Oman", "Muscat", "asia"], ["Yemen", "Sana'a", "asia"],
    ["Lebanon", "Beirut", "asia"], ["Azerbaijan", "Baku", "asia"], ["Georgia", "Tbilisi", "asia"],
    ["Armenia", "Yerevan", "asia"], ["Kyrgyzstan", "Bishkek", "asia"], ["Tajikistan", "Dushanbe", "asia"],
    ["Turkmenistan", "Ashgabat", "asia"], ["North Korea", "Pyongyang", "asia"], ["Taiwan", "Taipei", "asia"],
    ["Hong Kong", "Hong Kong", "asia"],

    ["United Kingdom", "London", "europe"], ["France", "Paris", "europe"], ["Germany", "Berlin", "europe"],
    ["Italy", "Rome", "europe"], ["Spain", "Madrid", "europe"], ["Portugal", "Lisbon", "europe"],
    ["Netherlands", "Amsterdam", "europe"], ["Belgium", "Brussels", "europe"], ["Switzerland", "Bern", "europe"],
    ["Austria", "Vienna", "europe"], ["Sweden", "Stockholm", "europe"], ["Norway", "Oslo", "europe"],
    ["Denmark", "Copenhagen", "europe"], ["Finland", "Helsinki", "europe"], ["Ireland", "Dublin", "europe"],
    ["Poland", "Warsaw", "europe"], ["Czech Republic", "Prague", "europe"], ["Slovakia", "Bratislava", "europe"],
    ["Hungary", "Budapest", "europe"], ["Romania", "Bucharest", "europe"], ["Bulgaria", "Sofia", "europe"],
    ["Greece", "Athens", "europe"], ["Croatia", "Zagreb", "europe"], ["Serbia", "Belgrade", "europe"],
    ["Ukraine", "Kyiv", "europe"], ["Russia", "Moscow", "europe"], ["Belarus", "Minsk", "europe"],
    ["Iceland", "Reykjavik", "europe"], ["Luxembourg", "Luxembourg", "europe"], ["Monaco", "Monaco", "europe"],
    ["Estonia", "Tallinn", "europe"], ["Latvia", "Riga", "europe"], ["Lithuania", "Vilnius", "europe"],
    ["Slovenia", "Ljubljana", "europe"], ["Bosnia and Herzegovina", "Sarajevo", "europe"], ["Macedonia", "Skopje", "europe"],
    ["Albania", "Tirana", "europe"], ["Malta", "Valletta", "europe"], ["Cyprus", "Nicosia", "europe"],
    ["Moldova", "Chisinau", "europe"], ["Montenegro", "Podgorica", "europe"],

    ["United States", "Washington, D.C.", "americas"], ["Canada", "Ottawa", "americas"], ["Mexico", "Mexico City", "americas"],
    ["Brazil", "Brasilia", "americas"], ["Argentina", "Buenos Aires", "americas"], ["Chile", "Santiago", "americas"],
    ["Peru", "Lima", "americas"], ["Colombia", "Bogota", "americas"], ["Venezuela", "Caracas", "americas"],
    ["Ecuador", "Quito", "americas"], ["Bolivia", "Sucre", "americas"], ["Paraguay", "Asuncion", "americas"],
    ["Uruguay", "Montevideo", "americas"], ["Cuba", "Havana", "americas"], ["Guatemala", "Guatemala City", "americas"],
    ["Panama", "Panama City", "americas"], ["Costa Rica", "San Jose", "americas"], ["Dominican Republic", "Santo Domingo", "americas"],
    ["Jamaica", "Kingston", "americas"], ["Haiti", "Port-au-Prince", "americas"], ["Honduras", "Tegucigalpa", "americas"],
    ["Nicaragua", "Managua", "americas"], ["El Salvador", "San Salvador", "americas"],

    ["Egypt", "Cairo", "africa"], ["Nigeria", "Abuja", "africa"], ["South Africa", "Pretoria", "africa"],
    ["Kenya", "Nairobi", "africa"], ["Ethiopia", "Addis Ababa", "africa"], ["Morocco", "Rabat", "africa"],
    ["Algeria", "Algiers", "africa"], ["Tunisia", "Tunis", "africa"], ["Libya", "Tripoli", "africa"],
    ["Sudan", "Khartoum", "africa"], ["Ghana", "Accra", "africa"], ["Tanzania", "Dodoma", "africa"],
    ["Uganda", "Kampala", "africa"], ["Senegal", "Dakar", "africa"], ["Cameroon", "Yaounde", "africa"],
    ["Ivory Coast", "Yamoussoukro", "africa"], ["Angola", "Luanda", "africa"], ["Mozambique", "Maputo", "africa"],
    ["Zambia", "Lusaka", "africa"], ["Zimbabwe", "Harare", "africa"], ["Somalia", "Mogadishu", "africa"],
    ["DR Congo", "Kinshasa", "africa"], ["Madagascar", "Antananarivo", "africa"], ["Rwanda", "Kigali", "africa"],

    ["Australia", "Canberra", "oceania"], ["New Zealand", "Wellington", "oceania"], ["Papua New Guinea", "Port Moresby", "oceania"],
    ["Fiji", "Suva", "oceania"], ["Samoa", "Apia", "oceania"], ["Tonga", "Nuku'alofa", "oceania"],
    ["Solomon Islands", "Honiara", "oceania"], ["Vanuatu", "Port Vila", "oceania"]
  ];

  var reg = "all";
  var regBtns = {};

  function render() {
    var q = el.q.value.trim().toLowerCase();
    var html = "";
    var count = 0;
    for (var i = 0; i < DATA.length; i++) {
      var d = DATA[i];
      if (reg !== "all" && d[2] !== reg) continue;
      if (q) {
        var hay = (d[0] + " " + d[1]).toLowerCase();
        if (hay.indexOf(q) < 0) continue;
      }
      count++;
      html +=
        '<div class="rounded-lg border border-slate-100 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-900/80 px-3 py-2 transition-colors hover:border-brand-200 dark:hover:border-brand-500/40">' +
        '<div class="flex items-center gap-3">' +
        '<span class="text-sm font-semibold text-slate-700 dark:text-zinc-200 flex-1">' + esc(d[0]) + "</span>" +
        '<span class="text-sm text-slate-500 dark:text-zinc-400">' + esc(d[1]) + "</span>" +
        '<span class="font-mono text-[10px] uppercase tracking-wide text-slate-400 dark:text-zinc-500">' + esc(d[2]) + "</span>" +
        "</div></div>";
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
    var lines = [];
    for (var i = 0; i < DATA.length; i++) {
      var d = DATA[i];
      if (reg !== "all" && d[2] !== reg) continue;
      if (q) {
        var hay = (d[0] + " " + d[1]).toLowerCase();
        if (hay.indexOf(q) < 0) continue;
      }
      lines.push(d[0] + " - " + d[1]);
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
    el.tool.classList.toggle("cap-stacked", stacked);
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
  document.querySelectorAll("button[data-reg]").forEach(function (btn) {
    regBtns[btn.dataset.reg] = btn;
    btn.addEventListener("click", function () {
      reg = btn.dataset.reg;
      Object.keys(regBtns).forEach(function (k) {
        regBtns[k].classList.toggle("active", k === reg);
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

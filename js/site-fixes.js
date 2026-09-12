(function () {
  var HERO_FALLBACK =
    "/wp-content/uploads/2024/02/Disability-to-Ability-SA-Featured-Image-White-Background-Mobile-1.jpg";

  function applyBackgrounds() {
    document.querySelectorAll("[data-bg]").forEach(function (el) {
      var bg = el.getAttribute("data-bg");
      if (!bg) return;
      var gradient = el.getAttribute("data-bg-gradient") || "";
      var img = 'url("' + bg + '")';
      el.style.backgroundImage = gradient ? gradient + "," + img : img;
      el.style.backgroundSize = el.style.backgroundSize || "cover";
      el.style.backgroundPosition = el.style.backgroundPosition || "center top";

      if (bg.indexOf("Featured-Image-Adelaide") !== -1) {
        var test = new Image();
        test.onerror = function () {
          var fallback = 'url("' + HERO_FALLBACK + '")';
          el.style.backgroundImage = gradient ? gradient + "," + fallback : fallback;
          el.setAttribute("data-bg", HERO_FALLBACK);
        };
        test.src = bg;
      }
    });
  }

  function syncMenus() {
    document.querySelectorAll(".awb-menu[data-breakpoint]").forEach(function (nav) {
      var breakpoint = parseInt(nav.getAttribute("data-breakpoint"), 10) || 1280;
      var collapsed = window.innerWidth <= breakpoint;
      nav.classList.remove("loading", "mega-menu-loading");
      nav.classList.toggle("collapse-enabled", collapsed);
      nav.classList.toggle("awb-menu_desktop", !collapsed);
      if (!collapsed) {
        nav.classList.remove("expanded");
        var toggle = nav.querySelector(".awb-menu__m-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function bindMenus() {
    document.addEventListener("click", function (event) {
      var toggle = event.target.closest(".awb-menu__m-toggle");
      if (toggle) {
        event.preventDefault();
        var nav = toggle.closest(".awb-menu");
        if (!nav) return;
        var open = nav.classList.toggle("expanded");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }

      var sub = event.target.closest(".awb-menu__open-nav-submenu_mobile");
      if (sub) {
        event.preventDefault();
        var item = sub.closest("li");
        if (!item) return;
        var expanded = sub.getAttribute("aria-expanded") === "true";
        sub.setAttribute("aria-expanded", expanded ? "false" : "true");
        item.classList.toggle("expanded", !expanded);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyBackgrounds();
    syncMenus();
    bindMenus();
  });

  window.addEventListener("resize", syncMenus);
})();

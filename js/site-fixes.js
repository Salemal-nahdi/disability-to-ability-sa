(function () {
  // Avada paints section backgrounds from data-bg via LiteSpeed's lazy loader,
  // which only targets elements still carrying the "lazyload" class. The saved
  // pages have that class stripped, so apply those backgrounds directly.
  function applyBackgrounds() {
    document.querySelectorAll("[data-bg]").forEach(function (el) {
      var bg = el.getAttribute("data-bg");
      if (!bg) return;
      var gradient = el.getAttribute("data-bg-gradient") || "";
      var img = 'url("' + bg + '")';
      el.style.backgroundImage = gradient ? gradient + "," + img : img;
      el.style.backgroundSize = el.style.backgroundSize || "cover";
      el.style.backgroundPosition = el.style.backgroundPosition || "center top";
    });
  }

  document.addEventListener("DOMContentLoaded", applyBackgrounds);
})();

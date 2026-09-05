(function () {
  function isNetlifyForm(form) {
    return !!(form && form.getAttribute && form.getAttribute("data-netlify") === "true");
  }

  document.addEventListener(
    "submit",
    function (event) {
      var form = event.target;
      if (!isNetlifyForm(form)) return;
      event.stopImmediatePropagation();
    },
    true
  );

  window.nfForms = [];
})();

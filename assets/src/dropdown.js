document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.querySelector(".dropdown");
  const recetasBtn = document.querySelector(".recetas-btn");
  // if (!dropdown || !recetasBtn) return;

  recetasBtn.addEventListener("click", function (e) {
    const isDesktop = window.matchMedia("(min-width: 769px)").matches;

    if (isDesktop) {
      e.preventDefault();
      dropdown.classList.toggle("open");
    }
  });

  document.addEventListener("click", function (e) {
    const isDesktop = window.matchMedia("(min-width: 769px)").matches;

    if (isDesktop && !dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });
});

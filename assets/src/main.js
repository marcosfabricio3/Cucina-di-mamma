//===============   MENU HAMBURGUESA   ===============
const btnHamburguesa = document.querySelector(".hamburguesa");
const mainListNav = document.querySelector(".mainListNav");

if (btnHamburguesa && mainListNav) {
  btnHamburguesa.addEventListener("click", (e) => {
    e.stopPropagation();
    mainListNav.classList.toggle("activo");
  });

  document.addEventListener("click", (e) => {
    if (!mainListNav.contains(e.target) && !btnHamburguesa.contains(e.target)) {
      mainListNav.classList.remove("activo");
    }
  });

  document.querySelectorAll(".mainListNav a").forEach((link) => {
    link.addEventListener("click", () => {
      mainListNav.classList.remove("activo");
    });
  });
}

//===============   TRANSICIÓN ITALIA LINE   ===============
const navLinks = document.querySelectorAll(".mainListNav a, .subListNav a");
const italiaLine = document.querySelector(".italiaLine");

if (italiaLine && navLinks.length) {
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetUrl = this.getAttribute("href");
      const isDesktop = window.matchMedia("(min-width: 769px)").matches;

      if (isDesktop && this.classList.contains("recetas-btn")) {
        return;
      }

      e.preventDefault();

      italiaLine.classList.add("expand");

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 600);
    });
  });

  window.addEventListener("load", () => {
    italiaLine.classList.remove("expand");
  });
}

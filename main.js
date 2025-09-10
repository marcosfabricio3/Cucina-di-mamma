try {

  //===============   MENU HAMBURGESA   ===============
const btnHamburguesa = document.querySelector(".hamburguesa");
const mainListNav = document.querySelector(".mainListNav");
const linkEspecial = document.querySelector("#enlaceSubmenu");

const hrefOriginal = "#";
const hrefAlternativo = "../HTML/recetas.html";

// Mostrar/ocultar menu principal
btnHamburguesa.addEventListener("click", (e) => {
  e.stopPropagation();
  mainListNav.classList.toggle("activo");

    if (mainListNav.classList.contains("activo")) {
    linkEspecial.setAttribute("href", hrefAlternativo);
  } else {
    linkEspecial.setAttribute("href", hrefOriginal);
  }
});

// Cerrar menus al hacer click fuera
document.addEventListener("click", (e) => {
  if (!mainListNav.contains(e.target) && !btnHamburguesa.contains(e.target)
  ) {
    mainListNav.classList.remove("activo");
  }

});

// Cerrar menus si se toca cualquier link dentro de ellos
document.querySelectorAll(".mainListNav a").forEach((link) => {
  link.addEventListener("click", () => {
    mainListNav.classList.remove("activo");
  });
});

} catch (error) {
  console.log('no se pudo ejecutar el menu de hamburgesa')
}
// --------------------------------------------------------------
try {
  
  //===============   CARRUSEL   ===============
let imagenIndex = 0;
const imagenes = document.querySelectorAll(".imagenCarrusel");
const puntos = document.querySelectorAll(".punto");

function mostrarImagen(index) {
    for (let i = 0; i < imagenes.length; i++) {
        imagenes[i].classList.remove("activo");
        puntos[i].classList.remove("active");
    }
    imagenes[index].classList.add("activo");
    puntos[index].classList.add("active");
    imagenIndex = index;
}

mostrarImagen(imagenIndex);

// Boton previo
document.querySelector(".prev").addEventListener("click", function() {
    imagenIndex = imagenIndex - 1;
    if (imagenIndex < 0) {
        imagenIndex = imagenes.length - 1;
    }
    mostrarImagen(imagenIndex);
});

// Boton siguiente
document.querySelector(".next").addEventListener("click", function() {
    imagenIndex = imagenIndex + 1;
    if (imagenIndex >= imagenes.length) {
        imagenIndex = 0;
    }
    mostrarImagen(imagenIndex);
});

// DESPLASAMIENTO AUTOMATICO DEL CARRUSEL
setInterval(function() {
    imagenIndex = imagenIndex + 1;
    if (imagenIndex >= imagenes.length) {
        imagenIndex = 0;
    }
    mostrarImagen(imagenIndex);
}, 8000);

} catch (error) {
  console.log('no se pudo ejecutar el carrusel')
  
}

// ---------------------------------------------------------------

try {
  
  //===============   BOTON DE RECETAS   ===============
const botones = document.getElementsByClassName("botonReceta");
for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", () => {
        const contenido = document.getElementsByClassName("contenido")[i];
        contenido.classList.toggle("inactivo");

    });
}

} catch (error) {
  console.log('no se pudo ejecutar el boton de receta')
  
}
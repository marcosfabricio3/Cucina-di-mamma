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
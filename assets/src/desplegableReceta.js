//===============   BOTON DE RECETAS   ===============
const botones = document.getElementsByClassName("botonReceta");
for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", () => {
        const contenido = document.getElementsByClassName("contenido")[i];
        contenido.classList.toggle("inactivo");

    });
}
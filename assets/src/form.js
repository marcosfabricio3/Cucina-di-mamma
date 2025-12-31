document.getElementById('form-contacto')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const btn  = form.querySelector('button[type="submit"]');
  const fb   = document.getElementById('form-feedback');

  const nombre  = form.nombre.value.trim();
  const email   = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();

  const setFB = (msg, ok = false) => {
    fb.style.display = 'block';
    fb.style.color   = ok ? 'green' : 'crimson';
    fb.textContent   = msg;
  };

  if (nombre.length < 3) {
    setFB("Nombre inválido (mínimo 3 caracteres)");
    return;
  }

  if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
    setFB("Correo electrónico inválido");
    return;
  }

  if (mensaje.length < 10) {
    setFB("El mensaje debe tener al menos 10 caracteres");
    return;
  }

  btn.disabled = true;
  const original = btn.textContent;
  btn.textContent = "Enviando...";

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form)
    });

    const data = await res.json();

    if (data.ok) {
      setFB("¡Gracias! Tu mensaje fue enviado.", true);
      form.reset();
    } else {
      setFB(data.msg || "No se pudo enviar.");
    }

  } catch (err) {
    setFB("Error de red. Revisá la conexión o el servidor.");
  } finally {
    btn.disabled = false;
    btn.textContent = original;
  }
});

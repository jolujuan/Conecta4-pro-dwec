export { popup, showPopup };

function popup(type) {
  const format = (type) => {
    switch (type) {
      case "menu":
        return "<p>Inicia sesión para mostrar menu.</p>";
        break;
      case "register":
        return "<p>Usuario registrado exitosamente. Por favor revisa tu correo.</p>";
        break;
      case "perfil":
        return "<p>Inicia sesión para mostrar el perfil.</p>";
        break;
      case "expira":
        return "<p> La sesión ha expirado. Por favor, vuelve a iniciar sesión. </p>";
      default:
        break;
    }
  };

  const divPopup = document.createElement("div");
  divPopup.innerHTML = `<div id="popup" class="popup" style="display:none;">
        <div class="popup-content">
            <span class="close-btn">&times;</span>
            ${format(type)}
        </div>
  </div>`;

  // Agrega el manejador de eventos para el botón de cerrar
  const closeButton = divPopup.querySelector(".close-btn");
  closeButton.addEventListener("click", closePopup);

  return divPopup;
}

function showPopup() {
  document.getElementById("popup").style.display = "block";
}
/* Enviar a login cuando cierras pop up */
function closePopup() {
  window.location.hash = "#/login";
  document.getElementById("popup").style.display = "none";
}

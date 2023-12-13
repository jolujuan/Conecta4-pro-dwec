export { registerForm };
import {  registerUser } from "../services/users.js";
import { popup, showPopup } from "./showPopup.js";
function registerForm() {
  const divRegister = document.createElement("div");

  divRegister.innerHTML = `<div class="recuadro">
    <h1 class="form-title">Registrar</h1>

    <form action="action_page.php" name="formulariRegistro" method="get">

      <input type="email" id="usuario" name="usuario" placeholder="Email">
      <input type="password" id="contraRegistre1" placeholder="Password">
      <input type="password" id="contraRegistre2" placeholder="Repeat Password">

      <div class="divLinea">
        <input type="submit" value="Registrar">

        <label id="mensaje" for="mensaje"></label>

      </div>
    </form>
    </div>`;

  let form = divRegister.querySelector("form");

  let buttonSubmit = form.querySelector('[type~="submit"');
  buttonSubmit.addEventListener('click', async (event) => {
    event.preventDefault();

    let passForm = false;

    let user = form.querySelector("#usuario");
    let passwd = form.querySelector("#contraRegistre1");
    let passwd2 = form.querySelector("#contraRegistre2");

    let mensajeErrores = form.querySelector("#mensaje");

    if (user.value === "" || passwd.value === "" || passwd2.value === "") {
      mensajeErrores.innerHTML = "Introduce los campos";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.value)) {
      mensajeErrores.innerHTML = "Introduce un correo electrónico válido";
    } else if (passwd.value.length < 8 && passwd2.value.length < 8) {
      mensajeErrores.innerHTML = "Contraseña mínimo 8 caracteres";
    } else if (passwd.value === passwd2.value) {
      mensajeErrores.innerHTML = "";
      passForm = true;
    } else {
      mensajeErrores.innerHTML = "Las contraseñas no coinciden";
    }
    if (passForm) {
      //Registrar, añadir campo y redireccionar formulario

      const dataLogin = await registerUser(user.value, passwd.value);
      if (dataLogin) {
        showPopup();
      }
    }
  });
  
  //Añadir popup
  divRegister.appendChild(popup('register'));
  return divRegister;
}



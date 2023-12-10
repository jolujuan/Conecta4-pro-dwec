import { loginUser } from "../services/users.js";
export { loginForm };

function loginForm() {

    const divLogin = document.createElement('div');

    divLogin.innerHTML = `
    <style>
        #container {
        }
    </style>
     <div class="recuadro">
    <h1 class="form-title">Inicio de sesión</h1>

    <form action="action_page.php"  >
      <input type="email" id="usuario" name="usuario" placeholder="Email" >

      <input type="password" id="contrasena" name="contrasena" placeholder="Password">

      <div class="divLinea">
        <input  type="submit"  value="Login">
        
        <label id="mensaje" for="mensaje"></label>
        
      </div>
      <a id="link" href="#/register">Si no tienes usuario, Registrate</a>
    </form>
  </div>`;

    let form = divLogin.querySelector('form');

    let buttonSubmit = form.querySelector('[type~="submit"');
    buttonSubmit.addEventListener("click", (event) => {
        event.preventDefault();

        let passForm = false;

        let user = form.querySelector('#usuario');
        let passwd = form.querySelector('#contrasena');

        let mensajeErrores = form.querySelector('#mensaje');

        //alert(user.value + "  " + passwd.value);
        /*if (user.value === '' || passwd.value === '') {
            mensajeErrores.innerHTML = "Introduce los campos";
        } else {
            //Reseteamos mensaje
            mensajeErrores.innerHTML = "";

            if (user.value === 'jose') {

                if (passwd.value === '1234') {
                    passForm = true;

                } else {
                    mensajeErrores.innerHTML = "Contraseña incorrecta"
                }
            } else {
                mensajeErrores.innerHTML = "Usuario incorrecto"
            }
        }*/


        /* Ahora hacemos la comprobaciones mediante los servicios */
        loginUser(user.value, passwd.value).then((status) => {
            if (status.success) window.location.hash = '#/menu';
            else {
                mensajeErrores.innerHTML = status.errorText;
            }
        });
    });
    return divLogin;
}
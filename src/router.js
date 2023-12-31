//LLamar a game view haciendo un switch de lasn rutas
import { home } from "./views/home.js";
import { menu } from "./views/menu.js";
import { loginForm } from "./views/login.js";
import { registerForm } from "./views/register.js";
import { createNewGame, generateGame, generateGameList } from "./gameViews/gameViews.js";
import { getBoardTemplate } from "./gameViews/templates.js";
import { logout } from "./services/users.js";
import { popup, showPopup } from "./views/showPopup.js";
import { copyright } from "./views/copyright.js";
import { mostrarData } from "./js/data.js";
import { profileForm, restablecerEstilos } from "./views/profile.js";
import { estadisticas } from "./views/estadisticas.js";

export { route };

function route(ruta) {
  /* console.log(ruta); */
  let params = ruta.split('?')[1];
  params = params ? new Map(params.split('&').map((param) => {
    const paramArray = param.split('=');
    return [paramArray[0], paramArray[1]];
  })) : new Map();

  /* console.log({ params }); */
  ruta = ruta.split("?")[0];

  const main = document.querySelector("#container");
  const body = document.body;

  // Restablecemos el estilo por defecto si no estamos en el perfil
  if (ruta !== "#/profile") {
    restablecerEstilos();
  }

  switch (ruta) {
    case "#/":
      main.innerHTML = "";
      main.append(home());
      break;
    case "#/login":
      //Añadirlo al body para nueva pagina
      main.innerHTML = "";
      main.append(loginForm());
      break;
    case "#/register":
      main.innerHTML = "";
      main.append(registerForm());
      break;
    case '#/menu':
      localStorage.removeItem('gameId');
      const uid = localStorage.getItem("uid");
      if (uid) {
        main.innerHTML = "";
        main.append(menu());
      } else {
        main.append(popup('menu'));
        showPopup();
      }
      break;
    case "#/game":
      //No actualizar la BD si existe
      const idParams = params.get('id');
      const idLocal = localStorage.getItem('gameId');

      if (idParams) {
        //Iniciar el juego con el id que nos interesa
        generateGame(main, idParams);
      } else if (idLocal) {
        window.location.hash = `#/game?id=${idLocal}`;
      } else {
        //Guardar en la BD si no existe
        createNewGame();
      }
      break;
    case "#/allgames":
      main.innerHTML = '';
      main.append(generateGameList());
      break;
    case "#/profile":
      const uidProfile = localStorage.getItem("uid");
      if (uidProfile) {
        main.innerHTML = "";
        main.append(profileForm());
      } else {
        main.append(popup('perfil'));
        showPopup();
      }
      break;
    case '#/estadisticas':
      main.innerHTML = "";
      main.append(estadisticas());
      break;
    case "#/logout":
      logout();
      window.location.hash = '#/';
      break;
    case "#/copyright":
      main.innerHTML = '';
      main.append(copyright());
      mostrarData();
      break;
  }
}

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

export { route };

function route(ruta) {
  console.log(ruta);
  let params = ruta.split('?')[1];
  params = params ? new Map(params.split('&').map((param) => {
    const paramArray = param.split('=');
    return [paramArray[0], paramArray[1]];
  })) : new Map();

  console.log({ params });
  ruta = ruta.split("?")[0];

  const main = document.querySelector("#container");
  const body = document.body;

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
      const uid=localStorage.getItem("uid");
      if (uid) {
        main.innerHTML = "";
        main.append(menu());
      }else{
        main.append(popup('menu'));
        showPopup();
      }
      break;
    case "#/game":
      //No actualizar la BD si existe
      const idParams = params.get('id');
      const idLocal = localStorage.getItem('gameId');

      if (idParams) {
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
      main.innerHTML = '';
      //   main.append(profileForm());
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

/* esto ira en view para inicializar el juego
import Juego from "./js/game.js";
import { initDom } from "./js/dom.js";

document.addEventListener("DOMContentLoaded", () => {
  const juegoPrincipal = new Juego();
  initDom(juegoPrincipal);
});
*/
/* inner.html menu() -> para añadir menu */


import { route } from "./router.js";
import { menuSuperior } from "./views/menuSuperior.js";
import { footer } from "./views/footer.js";


document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('#menu').innerHTML = menuSuperior();
  document.querySelector('#footer').innerHTML = footer();

  if (!window.location.hash) {
    window.location.hash = '#/'; // Establecer el hash por defecto
  }

  route(window.location.hash);

  window.addEventListener('hashchange', () => {
    route(window.location.hash);
  });
});
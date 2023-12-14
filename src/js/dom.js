import { STATE } from "./game.js";
import { updateGame } from "../services/conectahttp.js";

//Logica del DOM para crearlo en html
export function initDom(juego) {
  crearTableroDom();
  agregarEventosACeldas(juego);

  function crearTableroDom() {
    const TABLA_PRINCIPAL = document.querySelector("#tabla");

    for (let i = 0; i < 6; i++) {
      const fila = document.createElement("tr"); //Filas

      for (let j = 0; j < 7; j++) {
        const celda = document.createElement("td"); //cols
        celda.id = `fila-${i}-col-${j}`; //Guardar el id
        fila.appendChild(celda); // Agregar celda a fila
      }
      TABLA_PRINCIPAL.appendChild(fila); //Agregar la fila a la tabla
    }
  }

  function agregarEventosACeldas(juego) {
    const celdas = document.querySelectorAll("td");

    celdas.forEach((celda) => {
      celda.addEventListener("click", manejarClickCelda);
    });
  }

  //Mientras no haya ganadores actualizar el tablero
  function manejarClickCelda() {
    const idParts = this.id.split("-");
    const fila = parseInt(idParts[1]);
    const col = parseInt(idParts[3]);

    if (STATE.currentStatus !== "WON") {
      juego.actualizarTablero(fila, col);

      //Llamamos a pintar solo si el estado sigue siendo "PLAYING"
      juego.pintarTablero();

      //Actualizar el estado del juego
      updateGame(STATE, localStorage.getItem('gameId'));
      
      //Marcar fichas ganadoras despues de ganar y repintar
      if (STATE.jugadorHaGanado) {
        juego.marcarFichasGanadoras(STATE.coordenadas);
      }
    } else {
      //Volver a jugar cuando clicka alguna ficha de color
      if (this.classList.contains("yellow") || this.classList.contains("red")) {
        console.log("estado del juego ", STATE.tablero);

        juego.reiniciar();
      }
    }
  }

  /* function removerEventosDeCeldas() {
         const celdas = document.querySelectorAll("td");
         celdas.forEach((celda) => {
             // Esto asume que ya tienes un manejador de eventos definido anteriormente. 
             // Si no es así, simplemente puedes establecer el atributo 'onclick' a null.
             celda.removeEventListener('click', manejarClickCelda);
         });
     }*/
}

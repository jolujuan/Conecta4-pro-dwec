import { STATE } from "./game.js";
import { updateGame } from "../services/conectahttp.js";


//Logica del DOM para crearlo en html
export function initDom(juego) {
  crearTableroDom();
  agregarEventosACeldas(juego);

  let turnoActual;

  function mostrarFichaFantasma(columna, color) {
    ocultarFichaFantasma();
    // Crear el elemento div para la ficha fantasma
    const ficha = document.createElement("div");
    ficha.classList.add("ficha-fantasma", color);

    const anchoCelda = 50;
    ficha.style.left = `${columna * (anchoCelda + 2)}px`;

    // Añadir la ficha al contenedor
    document.querySelector("#container").appendChild(ficha);
  }

  function ocultarFichaFantasma() {
    const fichaFantasma = document.querySelector(".ficha-fantasma");
    if (fichaFantasma) {
      fichaFantasma.remove();
    }
  }

  function crearTableroDom() {
    const TABLA_PRINCIPAL = document.querySelector("#tabla");

    for (let i = 0; i < 6; i++) {
      const fila = document.createElement("tr"); //Filas

      for (let j = 0; j < 7; j++) {

        const celda = document.createElement("td"); //cols
        celda.id = `fila-${i}-col-${j}`; //Guardar el id
        fila.appendChild(celda); // Agregar celda a fila

        celda.addEventListener('mouseover', () => {
          turnoActual = juego.actualizarDOMConTurnoActual();
          mostrarFichaFantasma(j, turnoActual);
        }); celda.addEventListener('mouseout', ocultarFichaFantasma);
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

    } else {
      //Volver a jugar cuando clicka alguna ficha de color
      if (this.classList.contains("yellow") || this.classList.contains("red")) {
        console.log("estado del juego ", STATE.tablero);

        juego.reiniciar();
      }
    }
  }

}

//Game view se encargara de devolver las funciones para inicializar el juego
//Crear funcion para llamar dependiendo la pagina a la que se haga click

import Juego, { STATE } from "../js/game.js";
import { initDom } from "../js/dom.js";

import { getBoardTemplate } from "./templates.js";
import { downloadGame, obtainAllGames, saveGame } from "../services/conectahttp.js";
export { generateGame, createNewGame, generateGameList,drawGameBoard };


const generateGame = (container, gameId) => {
  container.innerHTML = "";
  container.append(getBoardTemplate());

  let juegoPrincipal;
  /* Devolvemos el estado del juego con el id descargado */
  drawGameBoard(gameId).then(newState => {

    if (newState) {
      /* Si el juego esta iniciado cargarlo de nuevo */
      if (juegoPrincipal) {
        // Inicialización del juego principal con estado
        juegoPrincipal = new Juego(newState);
        initDom(juegoPrincipal);


      } else {
        /* Si no hay juego, cargarlo y crearlo en el dom */
        juegoPrincipal = new Juego(newState);
        // Inicializar el DOM con el juego actualizado
        initDom(juegoPrincipal);
      }

      // Llamar a pintarTablero para actualizar el tablero
      juegoPrincipal.pintarTablero();
      //LLamar para actualizar contadores
      juegoPrincipal.actualizarMarcadorBase();
      //Comprobar si ha ganado una vez se actualize el juego 
      verificarGanador(juegoPrincipal); 

    } else {

      // Si no hay un juego guardado, inicializa un juego nuevo
      juegoPrincipal = new Juego();
      initDom(juegoPrincipal);
    }
  });
};

export function verificarGanador(juego) {
  // Verificar la victoria
  if (STATE.jugadorHaGanado) {
    juego.marcarFichasGanadoras(STATE.coordenadas);
  }
}

function resetState() {
  Object.assign(STATE, {
    PLAYERS: ["yellow", "red"],
    indiceJugadorActual: 0,
    currentStatus: "PLAYING",
    coordenadas: null,
    jugadorHaGanado: false,
    tablero: null,
    partidasGanadas: {
      red: 0,
      yellow: 0
    },
  });
}

function createNewGame() {
  /* Asegurarse de que el estado ha sido reiniciado antes de guardar por primera vez */
  resetState();

  let uid = localStorage.getItem('uid')
  if (uid) {
    saveGame(STATE, uid)
      .then(response => {
        //Obtener el id de la respuesta
        const newGameId = response[0].id;
        localStorage.setItem('gameId', newGameId);
        window.location.hash = `#/game?id=${newGameId}`;

      })
      .catch(error => {
        console.error('Error al crear un nuevo juego:', error);
      });
  }
}
/* Pasamos el id del juego para descargar el que nos interesa */
async function drawGameBoard(gameId) {
  try {
    const state = await downloadGame(gameId);
    if (state && state.length > 0) {
      console.log("el estado es ", state[0].game_state);
      const newState = state[0].game_state;

      return newState;
    } else {
      // Manejar el caso en que el estado no se encuentra o es inválido
      console.error('Estado del juego no encontrado o inválido');
      return null;
    }
  } catch (error) {
    console.error('Error al descargar un nuevo juego:', error);
    return null;
  }
}

const generateGameList = () => {
  const containerDiv = document.createElement('div');

  const titleDiv = document.createElement('div');
  titleDiv.innerHTML = `<h2 class="games-title">Tus partidas</h2>`;
  containerDiv.appendChild(titleDiv);

  const gameListTable = document.createElement('table');
  gameListTable.classList.add('games-table');
  containerDiv.appendChild(gameListTable);

  /* Aqui pasamos el juego ya descargado */
  const generateTable = (games) => {
    gameListTable.innerHTML += games.map((game) => {
      // Convertir el objeto 'game_state' a una cadena JSON para visualización

      return `<tr class="games-row">
        <td>
          <pre>${formatoFecha(game.created_at)}</pre>
        </td>
        <td class="games-cell">
          <pre>${game.id}</pre>
        </td>
        <td class="login-btn-play"><button class="play" id="play_${game.id}">Play</button></td>
      </tr>`;
    }).join('');
    gameListTable.addEventListener('click', (event) => {
      const button = event.target;
      if (button.tagName === 'BUTTON') {
        const gameId = button.id.split('_')[1];
        /* Actualizar el id y volver a enviar el juego para repintar */
        localStorage.setItem('gameId', gameId);
        window.location.hash = `#/game?id=${gameId}`;
      }
    });
  };

  const formatoFecha = (fecha) => {
    /* Formatear la fecha con T*/
    const dias = fecha.split("T")[0].split("-");
    const horas = fecha.split("T")[1].split(":");
    return `Fecha: ${dias[2]}/${dias[1]}/${dias[0]} - Hora: ${+horas[0] + 1}:${horas[1]}`;
  };
  const userId = localStorage.getItem('uid');

  /* Cargar los juegos leidos para enviarlos a generar */
  if (userId) {
    obtainAllGames(userId).then((games) => {
      generateTable(games);
    });
  }
  return containerDiv;
}
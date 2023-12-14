
let gameStatus = {

    players: ["yellow", "red"],
    indiceJugadorActual: 0,
    currentStatus: "PLAYING",
    coordenadas: null,
    jugadorHaGanado: false,
    tablero: null,
    partidasGanadas: {
        red: 0,
        yellow: 0
    },
};// hacerla estatica y pasarla a una constante
export let STATE = gameStatus;
import GameFunctions from "./functions.js";

// Lógica del Juego
export default class Juego {
    constructor(newState) {

        if (newState) {
            // Si newState.tablero es null inicializa el tablero
            if (!newState.tablero) {
                newState.tablero = this.inicializarTablero();
            }
            STATE = newState;
            this.jugadorActual = newState && newState.indiceJugadorActual != null ? newState.indiceJugadorActual : 0;

        } else {
            // Si newState no está disponible nicializa el tablero
            STATE.tablero = this.inicializarTablero();
            this.jugadorActual = 0;
        }
        gameStatus = STATE;

        // Inicializa las propiedades adicionales del juego
        this.funciones = new GameFunctions(STATE.tablero);
        this.proximoJugadorInicial = (this.jugadorActual + 1) % 2;
    }

    /* getJugadorGanador() {
         for (let jugador of STATE.players) {
             if (this.haGanado(jugador)) {
                 return jugador; // Retorna el jugador que ha ganado
             }
         }
         return null; // Si ninguno ha ganado, devuelve null
     }*/

    inicializarTablero() {// Inicializamos el array bidimensional.
        let localTablero = new Array(6); // Array principal que contendrá las filas.
        for (let i = 0; i < 6; i++) {
            localTablero[i] = new Array(7).fill(null);
        }
        return localTablero;
    }

    reiniciar() { //Restablecemos valores y volvemos a iniciar todo
        STATE.jugadorHaGanado = false;
        STATE.coordenadas = null;
        STATE.tablero = null;
        STATE.clasesCSS = null,
            STATE.currentStatus = "PLAYING";
        this.borrarTablero();
        STATE.tablero = this.inicializarTablero();
        this.funciones = new GameFunctions(STATE.tablero);

        this.jugadorActual = this.proximoJugadorInicial;
        //Alternaremos para que empieze el siguiente jugador
        this.proximoJugadorInicial = (this.proximoJugadorInicial + 1) % 2;
    }

    actualizarTablero(fila, col) {
        // Si la celda clicada ya está ocupada, no hacemos nada
        if (STATE.tablero[fila][col] != null) {
            return;
        }
        //Si no ha sido pintada pasará
        for (let i = 5; i >= 0; i--) {
            if (STATE.tablero[i][col] === null) {
                //Iniciamos con el primer jugador
                STATE.tablero[i][col] = STATE.players[this.jugadorActual];

                //1- Antes de cambiar de jugador comprobamos si ha ganado 
                //pasandole el jugador al metodo. 2- Cambiamos el estado
                if (this.haGanado(STATE.players[this.jugadorActual])) {

                    alert(`${STATE.players[this.jugadorActual]} ha ganado!`);
                    //El estado cambiara
                    STATE.currentStatus = "WON";
                    //Incrementamos el marcador
                    this.actualizarMarcador(STATE.players[this.jugadorActual]);

                    STATE.jugadorHaGanado = true;
                }  // Alternar cada jugador independientemente si ha ganado
                this.jugadorActual = (this.jugadorActual + 1) % 2;
                STATE.indiceJugadorActual = this.jugadorActual;  // Actualiza el estado

                return i; // Retorna la fila donde se hizo click
            }
        }
    }

    pintarTablero() {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                const celdaParaPintar = document.getElementById(
                    `fila-${i}-col-${j}`
                );

                celdaParaPintar.className = ''; // Limpia todas las clases previas
                if (STATE.tablero[i][j] === STATE.players[0]) {
                    celdaParaPintar.classList.add("yellow");

                } else if (STATE.tablero[i][j] === STATE.players[1]) {
                    celdaParaPintar.classList.add("red");
                }
            }
        }
    }

    borrarTablero() { //Lo borramos del dom y del interno
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                const celdaParaPintar = document.getElementById(
                    `fila-${i}-col-${j}`
                );
                celdaParaPintar.className = '';
            }
        }
    }

    actualizarMarcador(jugador) {
        if (jugador === "yellow") {
            const j1 = document.querySelector('.j1');
            j1.innerHTML = parseInt(j1.innerHTML) + 1;
            STATE.partidasGanadas.yellow++; //Actualizar contador estado
        } else if (jugador === "red") {
            const j2 = document.querySelector('.j2');
            j2.innerHTML = parseInt(j2.innerHTML) + 1;
            STATE.partidasGanadas.red++;
        }
    }

    actualizarMarcadorBase() {
        /* Lo utilizaremos para volver actualizar el estado cuando se lee de la base */
        for (const jugador in STATE.partidasGanadas) {
            const partidasGanadas = STATE.partidasGanadas[jugador];
            if (jugador === "yellow") {
                const j1 = document.querySelector('.j1');
                j1.innerHTML = partidasGanadas;

            } else if (jugador === "red") {
                const j2 = document.querySelector('.j2');
                j2.innerHTML = partidasGanadas;
            }
        }
    }


    marcarFichasGanadoras(coordenadas) {
        //Separamos las filas (i) de las columnas (i) de las coordenadas
        // para concatenar. Y obtenemos el id de las fichas que coinciden
        let coordenadasCeldas = "";
        for (let i = 0; i < coordenadas.length; i++) {
            if (i % 2 === 0) {
                coordenadasCeldas = `fila-${coordenadas[i]}`;

            } else if (i % 2 === 1) {
                coordenadasCeldas += `-col-${coordenadas[i]}`;
                const celdaParaPintar = document.getElementById(coordenadasCeldas);
                celdaParaPintar.classList.add("fichasGanadas")
            }
        }
    }

    haGanado(jugador) { //Guardamos las coordenadas que devolvera cuando encuentre el 4 raya
        const coordenadasGanadoras = this.funciones.comprobarLineaHorizontal(jugador)
            || this.funciones.comprobarLineaVertical(jugador)
            || this.funciones.comprobarLineasDiagonales(jugador);
        //Guardamos la posició de las fichas que han hehcho 4 en raya
        if (coordenadasGanadoras) {
            STATE.coordenadas = coordenadasGanadoras;
            return true
        }
        return false; // Si no se cumple ninguna de las condiciones anteriores, no ha ganado
    }
}
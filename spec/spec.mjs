import GameFunctions from "../src/js/functions.js";
import Juego from "../src/js/game.js";
import { STATE } from "../src/js/game.js";

describe('Juego', function () {
    let juego;
    /* crear la instancia para todas las pruebas */
    beforeEach(() => {
        juego = new Juego(); // Inicializa una nueva instancia para cada prueba
        STATE.players = ['Jugador1', 'Jugador2'];
        juego.jugadorActual = 0; // Empezar con el Jugador1

    });
    describe('inicializar tablero', function () {
        it('inicializar un array de 6x7 vacio', function () {
            const tablero = juego.inicializarTablero();
            // Verifica que el tablero se inicializa correctamente
            expect(tablero).toEqual([
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null]
            ]);
        });
    });

    describe('actualizar tablero', function () {
        it('no debe hacer nada si la celda esta ocupada', function () {
            STATE.tablero[0][0] = 'Jugador1'; // La celda esta ocupada
            const resultado = juego.actualizarTablero(0, 0);
            expect(resultado).toBeUndefined();
        });
        it('debe actualizar el tablero si la celda esta vacia', () => {
            const fila = juego.actualizarTablero(0, 0);
            expect(STATE.tablero[fila][0]).toBe('Jugador1');
        });
        it('debe alternar el jugador actual despues de la actualización', () => {
            juego.actualizarTablero(0, 0);
            expect(juego.jugadorActual).toBe(1);
        });
    });

    describe('funciones', function () {
        it('comprobar linea horizontal', () => {
            const tablero = [
                ['X', 'X', 'X', 'X'],
                ['O', 'O', 'O', 'O'],
                ['O', 'O', 'O', 'O'],
                ['O', 'O', 'O', 'O'],
                ['O', 'O', 'O', 'O'],
                ['O', 'O', 'O', 'O']
            ];
            const gameFunctions = new GameFunctions(tablero);
            const result = gameFunctions.comprobarLineaHorizontal('X');
            expect(result).toEqual([[0], [0], [0], [1], [0], [2], [0], [3]]);
        });
        it('comprobar linea vertical', () => {
            const tablero = [
                ['X', 'O', 'O', 'O'],
                ['X', 'O', 'O', 'O'],
                ['X', 'O', 'O', 'O'],
                ['X', 'O', 'O', 'O'],
                ['O', 'O', 'O', 'O'],
                ['O', 'O', 'O', 'O']
            ];
            const gameFunctions = new GameFunctions(tablero);
            const result = gameFunctions.comprobarLineaVertical('X');
            expect(result).toEqual([[0], [0], [1], [0], [2], [0], [3], [0]]);
        });
        it('comprobar linea diagonal de izquierda a derecha', () => {
            const tablero = [
                ['O', 'O', 'O', 'O'],
                ['O', 'O', 'O', 'O'],
                ['O', 'O', 'O', 'X'],
                ['O', 'O', 'X', 'O'],
                ['O', 'X', 'O', 'O'],
                ['X', 'O', 'O', 'O']
            ];
            const gameFunctions = new GameFunctions(tablero);
            const jugador = 'X';
            const expectedCoordinates = [
              [5], [0],
              [4], [1],
              [3], [2],
              [2], [3]
            ];
            const result = gameFunctions.comprobarLineasDiagonales(jugador);
            expect(result).toEqual(expectedCoordinates);
        });
        it('comprobar linea diagonal de derecha a izquierda', () => {
            const tablero = [
                ['O', 'O', 'O', 'O','0','0','0'],
                ['O', 'O', 'O', 'O','0','0','0'],
                ['O', 'O', 'O', 'X','0','0','0'],
                ['O', 'O', 'O', 'O','X','0','0'],
                ['O', 'O', 'O', 'O','0','X','0'],
                ['O', 'O', 'O', 'O','0','0','X']
            ];
            const gameFunctions = new GameFunctions(tablero);
            const jugador = 'X';
            const expectedCoordinates = [
                [5], [6],
                [4], [5],
                [3], [4],
                [2], [3]
            ];
            const result = gameFunctions.comprobarLineasDiagonales(jugador);
            expect(result).toEqual(expectedCoordinates);
        });
    });
});

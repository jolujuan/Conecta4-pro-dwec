import GameFunctions from "../src/js/functions.js";
import Juego from "../src/js/game.js";

describe('Juego', function () {
    describe('inicializarTablero', function () {
        it('inicializar un array de 6x7 vacio', function () {
            const juego = new Juego();
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
});

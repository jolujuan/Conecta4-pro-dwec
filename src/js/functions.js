export default class GameFunctions {

    constructor(tablero) {
        this.tablero = tablero;
    }


    comprobarLineaHorizontal(jugador) {
        let contador = 0;
        for (let i = 0; i < 6; i++) {
            contador = 0; // Restablecer el contador para cada nueva fila
            for (let j = 0; j < 4; j++) {
                if (this.tablero[i][j] === jugador &&
                    this.tablero[i][j + 1] === jugador &&
                    this.tablero[i][j + 2] === jugador &&
                    this.tablero[i][j + 3] === jugador) {

                    return [
                        [i], [j],
                        [i], [j + 1],
                        [i], [j + 2],
                        [i], [j + 3]
                    ]; // Retorna las coordenadas de las 4 fichas en línea
                }
            }
        }
        return null;
    }

    comprobarLineaVertical(jugador) {
        //Lo mismo pero invertimos
        let contador = 0;
        for (let j = 0; j < 7; j++) {
            contador = 0; // Restablecer el contador para cada nueva columna
            for (let i = 0; i < 3; i++) {
                if (this.tablero[i][j] === jugador &&
                    this.tablero[i + 1][j] === jugador &&
                    this.tablero[i + 2][j] === jugador &&
                    this.tablero[i + 3][j] === jugador) {

                    return [
                        [i], [j],
                        [i + 1], [j],
                        [i + 2], [j],
                        [i + 3], [j],
                    ];
                }
            }
        }
        return null;
    }

    comprobarLineasDiagonales(jugador) {
        // de izquierda a derecha
        //Comienza desde la fila donde puede formarse una diagonal y va hacia arriba y hacia la derecha
        for (let i = 3; i < 6; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.tablero[i][j] === jugador &&
                    this.tablero[i - 1][j + 1] === jugador &&
                    this.tablero[i - 2][j + 2] === jugador &&
                    this.tablero[i - 3][j + 3] === jugador) {

                    return [
                        [i], [j],
                        [i - 1], [j + 1],
                        [i - 2], [j + 2],
                        [i - 3], [j + 3]
                    ]; // Retorna las coordenadas de las 4 fichas en línea

                }
            }
        }
        // de derecha a izquierda
        //Comienza desde el extremo superior derecho y va hacia la izquierda y hacia abajo
        for (let i = 3; i < 6; i++) {
            for (let j = 6; j >= 3; j--) {
                if (this.tablero[i][j] === jugador &&
                    this.tablero[i - 1][j - 1] === jugador &&
                    this.tablero[i - 2][j - 2] === jugador &&
                    this.tablero[i - 3][j - 3] === jugador) {

                    return [
                        [i], [j],
                        [i - 1], [j - 1],
                        [i - 2], [j - 2],
                        [i - 3], [j - 3]
                    ]; // Retorna las coordenadas de las 4 fichas en línea                
                }
            }
        }
        return null; // No encontramos 4 en línea en ninguna diagonal descendente
    }
}
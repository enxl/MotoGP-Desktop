/*
    Juego de memoria con cartas.
    Autor: Enol Monte Soto
    Versión: 1
*/
class Memoria {
    constructor() {

    }

    voltearCarta(carta) {
        carta.dataset.estado = "revelada";
    }
}
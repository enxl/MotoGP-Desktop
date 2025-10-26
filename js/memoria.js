/*
    Juego de memoria con cartas.
    Autor: Enol Monte Soto
    Versión: 1
*/
class Memoria {
    constructor() {
        
    }

    flipCard(card) {
        card.dataset.state = "flip";
    }
}
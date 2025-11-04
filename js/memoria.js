/*
    Juego de memoria con cartas.
    Autor: Enol Monte Soto
    Versión: 1
*/
class Memoria {
    
    constructor() {
        this.tablero_bloqueado = true;
        this.primera_carta = null;
        this.segunda_carta = null;
        this.barajarCartas();
        this.tablero_bloqueado = false;
        this.cronometro = new Cronometro();
        this.cronometro.arrancar();
    }

    voltearCarta(carta) {
        if (!(this.tablero_bloqueado || carta.dataset.estado === "volteada" || carta.dataset.estado === "revelada")) {
            carta.dataset.estado = "volteada";
            if (!this.primera_carta) {
                this.primera_carta = carta;
                return;
            }
            this.segunda_carta = carta;
            this.comprobarPareja();
        }
    }

    barajarCartas() {
        const main = document.querySelector("main");
        const cartas = Array.from(document.querySelectorAll("main > article"));

        for (let i = cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
        }

        for (var i = 0; i < cartas.length; i++) {
            main.appendChild(cartas[i]);
        }
    }

    reiniciarAtributos() {
        this.comprobarJuego()
        this.tablero_bloqueado = false;
        this.primera_carta = null;
        this.segunda_carta = null;
    }

    deshabilitarCartas() {
        this.primera_carta.dataset.estado = "revelada";
        this.segunda_carta.dataset.estado = "revelada";
        this.reiniciarAtributos();
    }

    comprobarJuego() {
        var cartas = document.querySelectorAll("main > article");
        var completado = true;

        for (var i = 0; i < cartas.length; i++) {
            if (cartas[i].dataset.estado !== "revelada") {
                completado = false;
                return;
            }
        }

        this.cronometro.parar();
    }

    cubrirCartas() {
        this.tablero_bloqueado = true;
        setTimeout(function () {
            this.primera_carta.removeAttribute("data-estado");
            this.segunda_carta.removeAttribute("data-estado");
            this.reiniciarAtributos();
        }.bind(this), 1500);
    }

    comprobarPareja() {
        const primeraCartaSrc = this.primera_carta.children[1].getAttribute("src");
        const segundaCartaSrc = this.segunda_carta.children[1].getAttribute("src");
        primeraCartaSrc === segundaCartaSrc ? this.deshabilitarCartas() : this.cubrirCartas();
    }
}
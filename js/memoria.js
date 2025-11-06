/*
    Juego de memoria con cartas.
    Autor: Enol Monte Soto
    Versión: 3
*/
class Memoria {

    #tablero_bloqueado;
    #primera_carta;
    #segunda_carta;
    #cronometro;

    constructor() {
        this.#tablero_bloqueado = true;
        this.#primera_carta = null;
        this.#segunda_carta = null;
        this.#barajarCartas();
        this.#tablero_bloqueado = false;
        this.#cronometro = new Cronometro();
        this.#cronometro.arrancar();
    }

    voltearCarta(carta) {
        if (!(this.#tablero_bloqueado || carta.dataset.estado === "volteada" || carta.dataset.estado === "revelada")) {
            carta.dataset.estado = "volteada";
            if (!this.#primera_carta) {
                this.#primera_carta = carta;
                return;
            }
            this.#segunda_carta = carta;
            this.#comprobarPareja();
        }
    }

    #barajarCartas() {
        const main = document.querySelector("main");
        const cartas = Array.from(document.querySelectorAll("main > article"));
        for (let i = cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
        }
        for (let i = 0; i < cartas.length; i++) {
            main.appendChild(cartas[i]);
            cartas[i].addEventListener("click", this.voltearCarta.bind(this, cartas[i]));
        }
    }

    #reiniciarAtributos() {
        this.#comprobarJuego();
        this.#tablero_bloqueado = false;
        this.#primera_carta = null;
        this.#segunda_carta = null;
    }

    #deshabilitarCartas() {
        this.#primera_carta.dataset.estado = "revelada";
        this.#segunda_carta.dataset.estado = "revelada";
        this.#reiniciarAtributos();
    }

    #comprobarJuego() {
        const cartas = document.querySelectorAll("main > article");
        for (let i = 0; i < cartas.length; i++) {
            if (cartas[i].dataset.estado !== "revelada") return;
        }
        this.#cronometro.parar();
    }

    #cubrirCartas() {
        this.#tablero_bloqueado = true;
        setTimeout(() => {
            this.#primera_carta.removeAttribute("data-estado");
            this.#segunda_carta.removeAttribute("data-estado");
            this.#reiniciarAtributos();
        }, 1500);
    }

    #comprobarPareja() {
        const primeraCartaSrc = this.#primera_carta.children[1].getAttribute("src");
        const segundaCartaSrc = this.#segunda_carta.children[1].getAttribute("src");
        primeraCartaSrc === segundaCartaSrc ? this.#deshabilitarCartas() : this.#cubrirCartas();
    }
}
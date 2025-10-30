/*
    Clase para el cronómetro.
    Autor: Enol Monte Soto
    Versión: 1
*/
class Cronometro {

    constructor() {
        this.tiempo = 0;
    }

    arrancar() {
        try {
            if (typeof Temporal === 'undefined') {
                throw new Error("Objeto Temporal no disponible");
            }
            this.inicio = Temporal.Now.instant();
        } catch(error) {
            this.inicio = new Date();
        }
        this.corriendo = setInterval(this.actualizar.bind(this), 100);
    }

    actualizar() {
        let actual;
        try {
            if (typeof Temporal === 'undefined') {
                throw new Error("Objeto Temporal no disponible");
            }
            actual = Temporal.Now.instant();
            this.tiempo = actual.epochMilliseconds - this.inicio.epochMilliseconds;
        } catch(error) {
            actual = new Date();
            this.tiempo = actual.getTime() - this.inicio.getTime();
        }
        this.mostrar();
    }

    parar() {
        clearInterval(this.corriendo);
    }

    reiniciar() {
        clearInterval(this.corriendo);
        this.tiempo = 0;
        this.mostrar();
    }

    mostrar() {
        let parrafo = document.querySelector('main p');
        let msTotales = this.tiempo;
        let minutos = parseInt(msTotales / 60000);           
        let segundos = parseInt((msTotales % 60000) / 1000); 
        let decimas = parseInt((msTotales % 1000) / 100);
        let minDosDigitos = String(minutos).padStart(2, '0');
        let secDosDigitos = String(segundos).padStart(2, '0');
        parrafo.textContent = minDosDigitos + ":" +  secDosDigitos + "." + decimas;
    }
}

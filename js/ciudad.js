/*
    Clase que representa a una ciudad.
    Autor: Enol Monte Soto
    Versión: 1
*/
class Ciudad {

    constructor(nombre, pais, gentilicio) {
        this.nombre = nombre;
        this.pais = pais;
        this.gentilicio = gentilicio;
    }

    rellenarDatos(poblacion, longitud, latitud) {
        this.poblacion = poblacion;
        this.longitud = longitud;
        this.latitud = latitud;
    }

    getNombreCiudad() {
        return this.nombre;
    }

    getPais() {
        return this.pais;
    }

    getInfoSecundaria() {
        const lista = document.createElement("ul");
        const liGentilicio = document.createElement("li");
        liGentilicio.textContent = "Gentilicio: " + this.gentilicio;
        const liPoblacion = document.createElement("li");
        liPoblacion.textContent = "Población: " + this.poblacion + " habitantes";
        lista.appendChild(liGentilicio);
        lista.appendChild(liPoblacion);
        document.body.appendChild(lista);
    }

    getCoordenadas() {
        const parrafo = document.createElement("p");
        parrafo.textContent = "Coordenadas: (" + this.latitud + ", " + this.longitud + ")";
        document.body.appendChild(parrafo);
    }

}
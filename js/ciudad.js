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
        const lista = "<ul>" +
                "   <li> Gentilicio: " + this.gentilicio + "</li>" +
                "   <li> Población: " + this.poblacion + " habitantes</li>" +
                "</ul>";
        return lista;
    }

    getCoordenadas() {
        document.write("<p>Coordenadas: (" + this.latitud + ", " + this.longitud +  ")</p>");
    }

}
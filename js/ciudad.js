/*
    Clase que representa a una ciudad.
    Autor: Enol Monte Soto
    Versión: 2
*/
class Ciudad {

    #nombre;
    #pais;
    #gentilicio;
    #poblacion;
    #longitud;
    #latitud;
    #jsonAPI;
    #jsonPRO;
    #jsonAPIEntrenos;
    #jsonPROEntrenos;

    constructor(nombre, pais, gentilicio) {
        this.#nombre = nombre;
        this.#pais = pais;
        this.#gentilicio = gentilicio;
    }

    rellenarDatos(poblacion, longitud, latitud) {
        this.#poblacion = poblacion;
        this.#longitud = longitud;
        this.#latitud = latitud;
    }

    getNombreCiudad() {
        return this.#nombre;
    }

    getPais() {
        return this.#pais;
    }

    getInfoSecundaria() {
        const lista = document.createElement("ul");
        const liGentilicio = document.createElement("li");
        liGentilicio.textContent = "Gentilicio: " + this.#gentilicio;
        const liPoblacion = document.createElement("li");
        liPoblacion.textContent = "Población: " + this.#poblacion + " habitantes";
        lista.appendChild(liGentilicio);
        lista.appendChild(liPoblacion);
        document.body.appendChild(lista);
    }

    getCoordenadas() {
        const parrafo = document.createElement("p");
        parrafo.textContent = "Coordenadas: (" + this.#latitud + ", " + this.#longitud + ")";
        document.body.appendChild(parrafo);
    }

    getMeteorologiaCarrera(callback) {
        const url = "https://archive-api.open-meteo.com/v1/archive";
        const lat = 50.789;
        const lon = 12.688;
        const fecha = "2024-07-07";

        $.ajax({
            url: url,
            method: "GET",
            data: {
                latitude: lat,
                longitude: lon,
                start_date: fecha,
                end_date: fecha,
                hourly: "temperature_2m,apparent_temperature,rain,relative_humidity_2m,wind_speed_10m,wind_direction_10m",
                daily: "sunrise,sunset",
                timezone: "Europe/Berlin"
            },
            success: (data) => {
                const resultado = {
                    dia: fecha,
                    horas: {
                        hora: data.hourly.time,
                        temperatura: data.hourly.temperature_2m,
                        sensacion_termica: data.hourly.apparent_temperature,
                        lluvia: data.hourly.rain,
                        humedad: data.hourly.relative_humidity_2m,
                        viento_velocidad: data.hourly.wind_speed_10m,
                        viento_direccion: data.hourly.wind_direction_10m
                    },
                    diario: {
                        salida_sol: data.daily.sunrise[0],
                        puesta_sol: data.daily.sunset[0]
                    }
                };
                this.#jsonAPI = resultado;
                if (callback) callback(resultado);
            },
            error: () => {
                console.error("Error al obtener la meteorología del circuito.");
            }
        });
    }

    procesarJSONCarrera() {
        if (!this.#jsonAPI) {
            console.error("No hay datos meteorológicos para procesar.");
            return;
        }
        const datos = this.#jsonAPI;
        let resultado = {
            fecha: datos.dia,
            horas: datos.horas.hora,
            temperatura: datos.horas.temperatura,
            sensacion_termica: datos.horas.sensacion_termica,
            lluvia: datos.horas.lluvia,
            humedad: datos.horas.humedad,
            viento_velocidad: datos.horas.viento_velocidad,
            viento_direccion: datos.horas.viento_direccion,
            salida_sol: datos.diario.salida_sol,
            puesta_sol: datos.diario.puesta_sol
        };

        this.#jsonPRO = resultado;
        return resultado;
    }

    verMeteoCarrera() {
        const datos = this.#jsonPRO;
        $("main").append($("<h3>").text("Meteorología del día de la carrera: " + datos.fecha));
        let diario = $("<section>");
        diario.append($("<h4>").text("Datos diarios"));
        diario.append($("<p>").text("Salida del sol: " + datos.salida_sol));
        diario.append($("<p>").text("Puesta del sol: " + datos.puesta_sol));
        $("main").append(diario);

        let seccionHoras = $("<section>");
        seccionHoras.append($("<h4>").text("Datos por horas"));
        $("main").append(seccionHoras);

        for (let i = 0; i < datos.horas.length; i++) {
            let art = $("<article>");
            art.append($("<h5>").text(datos.horas[i]));
            let lista = $("<ul>");
            lista.append($("<li>").text("Temperatura: " + datos.temperatura[i] + " °C"));
            lista.append($("<li>").text("Sensación térmica: " + datos.sensacion_termica[i] + " °C"));
            lista.append($("<li>").text("Lluvia: " + datos.lluvia[i] + " mm"));
            lista.append($("<li>").text("Humedad: " + datos.humedad[i] + " %"));
            lista.append($("<li>").text("Viento: " + datos.viento_velocidad[i] + " km/h"));
            lista.append($("<li>").text("Dirección viento: " + datos.viento_direccion[i] + "°"));
            art.append(lista);
            seccionHoras.append(art);
        }
    }

    getMeteorologiaEntrenos(callback) {
        const url = "https://archive-api.open-meteo.com/v1/archive";
        const lat = 50.789;
        const lon = 12.688;
        const fechaInicio = "2024-07-04";
        const fechaFin = "2024-07-06";

        $.ajax({
            url: url,
            method: "GET",
            data: {
                latitude: lat,
                longitude: lon,
                start_date: fechaInicio,
                end_date: fechaFin,
                hourly: "temperature_2m,rain,relative_humidity_2m,wind_speed_10m",
                timezone: "Europe/Berlin"
            },
            success: (data) => {
                this.#jsonAPIEntrenos = data;
                if (callback) callback(data);
            },
            error: () => {
                console.error("Error al obtener la meteorología de entrenamientos.");
            }
        });
    }


    procesarJSONEntrenos() {
        if (!this.#jsonAPIEntrenos) {
            console.error("No hay datos meteorológicos de entrenamientos para procesar.");
            return;
        }

        const datos = this.#jsonAPIEntrenos;
        const dias = {};

        for (let i = 0; i < datos.hourly.time.length; i++) {
            const fechaHora = datos.hourly.time[i].split("T")[0];
            if (!dias[fechaHora]) {
                dias[fechaHora] = {
                    temperatura: [],
                    lluvia: [],
                    humedad: [],
                    viento: []
                };
            }
            dias[fechaHora].temperatura.push(datos.hourly.temperature_2m[i]);
            dias[fechaHora].lluvia.push(datos.hourly.rain[i]);
            dias[fechaHora].humedad.push(datos.hourly.relative_humidity_2m[i]);
            dias[fechaHora].viento.push(datos.hourly.wind_speed_10m[i]);
        }

        const resultado = {};
        for (const dia in dias) {
            let sumaTemperatura = 0;
            let sumaLluvia = 0;
            let sumaHumedad = 0;
            let sumaViento = 0;

            for (let i = 0; i < dias[dia].temperatura.length; i++) {
                sumaTemperatura += dias[dia].temperatura[i];
            }
            for (let i = 0; i < dias[dia].lluvia.length; i++) {
                sumaLluvia += dias[dia].lluvia[i];
            }
            for (let i = 0; i < dias[dia].humedad.length; i++) {
                sumaHumedad += dias[dia].humedad[i];
            }
            for (let i = 0; i < dias[dia].viento.length; i++) {
                sumaViento += dias[dia].viento[i];
            }

            resultado[dia] = {
                temperatura: (sumaTemperatura / dias[dia].temperatura.length).toFixed(2),
                lluvia: (sumaLluvia / dias[dia].lluvia.length).toFixed(2),
                humedad: (sumaHumedad / dias[dia].humedad.length).toFixed(2),
                viento: (sumaViento / dias[dia].viento.length).toFixed(2)
            };
        }

        this.#jsonPROEntrenos = resultado;
        return resultado;
    }

    verMeteoEntrenos() {
        const datos = this.#jsonPROEntrenos;
        $("main").append($("<h3>").text("Meteorología de los días de entrenamientos"));

        for (const dia in datos) {
            const seccion = $("<section>");
            seccion.append($("<h4>").text("Día: " + dia));
            seccion.append($("<p>").text("Temperatura media: " + datos[dia].temperatura + " °C"));
            seccion.append($("<p>").text("Lluvia media: " + datos[dia].lluvia + " mm"));
            seccion.append($("<p>").text("Humedad media: " + datos[dia].humedad + " %"));
            seccion.append($("<p>").text("Velocidad media del viento: " + datos[dia].viento + " km/h"));
            $("main").append(seccion);
        }
    }
}

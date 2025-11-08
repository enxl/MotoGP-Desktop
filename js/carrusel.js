class Carrusel {

    #fotosJSON;       
    #jsonProcesado;   
    #maximo;

    constructor() {
        this.#fotosJSON = null;
        this.#jsonProcesado = null;
        this.#maximo = 5;
    }

    // Obtener fotos desde la API y guardarlas en #fotosJSON
    getFotografias() {
        return new Promise((resolve, reject) => {
            const flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

            $.getJSON(flickrAPI, {
                tags: "sachsenring,motogp",
                tagmode: "any",
                format: "json"
            })
                .done((data) => {
                    this.#fotosJSON = data;       
                    this.procesarJSONFotografias(); 
                    resolve(this.#jsonProcesado);
                })
                .fail((error) => {
                    reject(error);
                });
        });
    }

    procesarJSONFotografias() {
        if (!this.#fotosJSON) {
            console.error("No se ha obtenido el JSON.");
            return;
        }
        let resultado = { imagenes: [] };
        for (let i = 0; i < this.#fotosJSON.items.length && i < this.#maximo; i++) {
            let item = this.#fotosJSON.items[i];
            resultado.imagenes.push({
                url: item.media.m.replace("_m.", "_z."),
                titulo: item.title
            });
        }

        this.#jsonProcesado = resultado;

        // Esto debe ser un carrusel
        $("p").html(`Procesadas ${this.#jsonProcesado.imagenes.length} fotografías.`);
        $("pre").text(JSON.stringify(this.#jsonProcesado, null, 2));
    }
}
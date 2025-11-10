class Noticias {
    #busqueda;
    #url;
    #apiToken = "zU1AObywJGoylVOplHw0uOFONijhq9ng8KtMQexL"
    #jsonAPI;

    constructor() {
        this.#busqueda = "";
        this.#url = "https://api.thenewsapi.com/v1/news/";

    }

    async buscar(apiToken) {
        const busquedaAPI = this.#busqueda.value.trim();
        if (!busquedaAPI) {
            // Incluir mensaje de error.
            return;
        }

        const url = `${this.urlBase}?api_token=${apiToken}&search=${encodeURIComponent(busquedaAPI)}&language=es`;

        try {
            const respuesta = await fetch(url);
            if (!respuesta.ok) {
                throw new Error('No se han obtenido noticias.');
            }
            this.#jsonAPI = await respuesta.json();

        } catch (error) {
            // Incluir mensaje de error.
        }
    }


}
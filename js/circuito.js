/*
    Clase para cargar información, altimetría y planimetría del circuito.
    Autor: Enol Monte Soto
    Versión: 1
*/
class Circuito {

    constructor() {
        this.#comprobarAPIFile;
    }

    #comprobarAPIFile() {
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            const parrafo = document.createElement("p");
            parrafo.textContent = "Este navegador no soporta API File;";
            document.body.appendChild(parrafo);
        }
    }

    leerArchivoHTML(archivo) {
        var tipoTexto = /text.*/;
        if (archivo && archivo.type.match(tipoTexto)) {
            var lector = new FileReader();
            lector.onload = function () {

                var resultado = lector.result;
                var parser = new DOMParser();
                var docExt = parser.parseFromString(resultado, "text/html");
                var main = document.getElementsByTagName("main")[0];
                var section = document.createElement("section");
                var contentMain = docExt.getElementsByTagName("main")[0];

                while (contentMain.firstChild) {
                    section.appendChild(contentMain.firstChild);
                }

                main.appendChild(section);
            };
            lector.readAsText(archivo);
        } else {
            console.error("Archivo inválido.");
        }
    }

    #mostrarError(mensaje) {
        var pError = document.createElement("p");
        pError.textContent = mensaje;
        document.body.appendChild(pError);
    }
}

class CargadorSVG {

    leerArchivoSVG(archivo) {
        if (archivo && archivo.type === "image/svg+xml") {
            const lector = new FileReader();
            lector.onload = function () {
                this.#insertarArchivoSVG(lector.result);
            }.bind(this);
            lector.readAsText(archivo);
        } else {
            console.error("Archivo inválido.");
        }
    }

    #insertarArchivoSVG(svg) {
        const parser = new DOMParser();
        var documentoSVG = parser.parseFromString(svg, 'image/svg+xml');
        var main = document.getElementsByTagName("main")[0];
        var elementoSVG = documentoSVG.documentElement;
        main.appendChild(elementoSVG);
    }

    #mostrarError(mensaje) {
        var pError = document.createElement("p");
        pError.textContent = mensaje;
        document.body.appendChild(pError);
    }
}
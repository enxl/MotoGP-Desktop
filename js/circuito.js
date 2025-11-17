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

                // Crear sección en este documento!!
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
            errorArchivo.innerText = "Archivo no válido";
        }
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
            console.error("Archivo no SVG o inválido.");
        }
    }

    #insertarArchivoSVG(svg) {
        const parser = new DOMParser();
        const documentoSVG = parser.parseFromString(svg, 'image/svg+xml');
        var main = document.getElementsByTagName("main")[0];
        const elementoSVG = documentoSVG.documentElement;
        main.appendChild(elementoSVG);
    }
}
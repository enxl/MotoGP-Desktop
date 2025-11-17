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
                main.appendChild(section);

                // Obtención de títulos de nivel H3.
                var titulosH3 = docExt.getElementsByTagName("h3");
                var h3DatosGenerales = titulosH3[0];
                var h3Galeria = titulosH3[1];
                var h3Videos = titulosH3[2];
                var h3Clasificados = titulosH3[3];
                var h3Vencedor = titulosH3[4];
                var h3Referencias = titulosH3[5];


                var h2 = docExt.getElementsByTagName("h2")[0];
                section.appendChild(h2);

                section.appendChild(h3DatosGenerales);

                var parrafos = docExt.getElementsByTagName("p");
                for (var i = 0; i < parrafos.length; i++) {
                    var p = document.createElement("p");
                    p.textContent = parrafos[i].textContent;
                    section.appendChild(p);
                }

                section.appendChild(h3Galeria);

                var imagenes = docExt.getElementsByTagName("img");
                for (var i = 0; i < imagenes.length; i++) {
                    var img = document.createElement("img");
                    img.src = imagenes[i].src;
                    img.alt = imagenes[i].alt;
                    section.appendChild(img);
                }

                section.appendChild(h3Videos);

                var videos = docExt.getElementsByTagName("video");
                for (var i = 0; i < videos.length; i++) {
                    var video = document.createElement("video");
                    video.src = videos[i].src;
                    video.alt = videos[i].alt;
                    section.appendChild(video);
                }

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
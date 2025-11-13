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
        if (archivo.type.match(tipoTexto)) {
            var lector = new FileReader();
            lector.onload = function () {
                var resultado = lector.result;
                var parser = new DOMParser();
                var doc = parser.parseFromString(resultado, "text/html");


                var titulo = doc.getElementsByTagName("title")[0].textContent;

                var main = document.getElementsByTagName("main")[0];
                var section = document.createElement("section");
                main.appendChild(section);

                var h2 = document.createElement("h2");
                h2.textContent = titulo;
                section.appendChild(h2);

                var parrafos = doc.getElementsByTagName("p");
                for (var i = 0; i < parrafos.length; i++) {
                    var p = document.createElement("p");
                    p.textContent = parrafos[i].textContent;
                    section.appendChild(p);
                }

                var imagenes = doc.getElementsByTagName("img");
                for (var i = 0; i < imagenes.length; i++) {
                    var img = document.createElement("img");
                    img.src = imagenes[i].src;
                    img.alt = imagenes[i].alt;
                    section.appendChild(img);
                }
            };
            lector.readAsText(archivo);
        } else {
            errorArchivo.innerText = "Archivo no válido";
        }
    }

}
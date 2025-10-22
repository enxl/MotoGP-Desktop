import xml.etree.ElementTree as ET

class Html(object):

    def __init__(self):
        # Generación de la declaración html, cabecera y etiqueta body.
        self.html= ET.Element('html', attrib={'lang': 'es'})
        self.head = ET.SubElement(self.html, 'head')
        self.doc = ET.SubElement(self.raiz,'Document')
        ET.SubElement(self.head, 'meta', charset='UTF-8')
        ET.SubElement(self.head, 'title').text = 'Circuito de Sachsenring'
        ET.SubElement(self.head, 'link', rel='stylesheet', href='estilo/estilo.css')
        self.body = ET.SubElement(self.html, 'body')
        self.main = ET.SubElement(self.body, 'main')

    # Añade al main un título h1-h6 según se indique.
    def addTitle(self, content, level):
        title = ET.SubElement(self.main, f'h{level}')
        title.text = content

    # Añade un parrafo <p> al bloque main.
    def addParagraph(self, content):
        p = ET.SubElement(self.main, 'p')
        p.text = content;

    # Añade una lista con elementos dados.
    def addList(self, items):
        ul = ET.SubElement(self.main, 'ul')
        for item in items:
            ET.SubElement(ul, 'li').text = item

    # Añade un enlace, indicando la URL.
    def addLink(self, href):
        a = ET.SubElement(self.main, 'a', href=href.strip(), target="_blank")
        a.text = href.strip()

     # Añade una imagen. Se pasa la ruta y el texto alternativo.
    def addImage(self, src, alt_text):
        ET.SubElement(self.main, 'img', src=src.strip(), alt=alt_text)

    # Añade un video
    def addVideo(self, src):
        ET.SubElement(self.main, 'video', src=src.strip(), controls='controls')


    def escribir(self, nombreArchivoHTML):
        arbol = ET.ElementTree(self.html)
        ET.indent(arbol)
        arbol.write(nombreArchivoHTML, encoding='utf-8', method='html')

# Sección que transforma el código de circuitoEsquema.xml en documento HTML.

import xml.etree.ElementTree as ET

# Espacio de nombres XML
namespace = {
    'ns': 'http://tempuri.org/rutas'
}

# Analizar el archivo XML
tree = ET.parse('rutasEsquema.xml')
root = tree.getroot()

# Crear una lista de rutas
rutas = root.findall('.//ns:ruta', namespaces=namespace)

for i, ruta in enumerate(rutas):
    svgFilename = f"perfil{i + 1}.svg"

    # Extrae los hitos de la ruta
    hitos = ruta.findall('.//ns:hito', namespaces=namespace)

    # Inicializa listas para altitudes y distancias
    altitudes = []
    distancias = []

    for hito in hitos:
        # Obtiene la altimetría y distancia de cada hito
        altimetry = float(hito.find('.//ns:altitud', namespaces=namespace).text)
        distance = float(hito.find('.//ns:distancia', namespaces=namespace).text)

        altitudes.append(altimetry)
        distancias.append(distance)



    # Crea el contenido del archivo SVG
    svgContent = f'<?xml version="1.0" encoding="UTF-8"?>\n'
    svgContent += f'<svg xmlns="http://www.w3.org/2000/svg" width="350" height="300">\n'
    svgContent += f'<polyline points="'

    for x, y in zip(distancias, altitudes):
        svgContent += f'{x * 12}, { y * 1.3 } '


    svgContent += f'" fill="red" stroke="blue" stroke-width="4" />\n'
    svgContent += f'</svg>'

    # Guarda el contenido en el archivo SVG
    with open(svgFilename, 'w') as svgFile:
        svgFile.write(svgContent)

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

    # Ajusta el tamaño y las coordenadas del perfil
    maxDistance = max(distancias)
    maxAltitude = max(altitudes)
    scaleFactor = 800 / maxDistance  # Escala el perfil al ancho de 800 unidades
    altitudes = [altitude * 400 / maxAltitude for altitude in altitudes]

    # Crea el contenido del archivo SVG
    svgContent = f'<?xml version="1.0" encoding="UTF-8"?>\n'
    svgContent += f'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400">\n'
    svgContent += f'<polyline points="'

    for x, y in zip(distancias, altitudes):
        svgContent += f'{x * scaleFactor}, {400 - y} '

    svgContent += f'" fill="none" stroke="blue" stroke-width="4" />\n'
    svgContent += f'</svg>'

    # Guarda el contenido en el archivo SVG
    with open(svgFilename, 'w') as svgFile:
        svgFile.write(svgContent)

import xml.etree.ElementTree as ET

namespace = {
    'ns': 'http://tempuri.org/rutas'
}

# Analizar el archivo XML
tree = ET.parse('rutasEsquema.xml')
root = tree.getroot()

# Recorrer las rutas y crear archivos KML
for i, route in enumerate(root.findall('.//ns:ruta', namespaces=namespace)):
    kmlFilename = f"ruta{i + 1}.kml"

    with open(kmlFilename, 'w') as kmlFile:
        kmlFile.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        kmlFile.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
        kmlFile.write('<Document>\n')

        # Extraer el nombre de la ruta
        route_name = route.find('./ns:nombre', namespaces=namespace).text

        kmlFile.write('<Placemark>\n')
        kmlFile.write(f'<name>{route_name}</name>\n')
        kmlFile.write('<LineString>\n')
        kmlFile.write('<coordinates>\n')

        # Extraer y escribir las coordenadas de los hitos
        hitos = route.findall('./ns:hitos/ns:hito', namespaces=namespace)
        for h in hitos:
            h_name = h.find('./ns:nombre', namespaces=namespace).text
            h_coordinates = h.find('./ns:coordenadas', namespaces=namespace)
            h_lat = h_coordinates.find('./ns:latitud', namespaces=namespace).text
            h_lon = h_coordinates.find('./ns:longitud', namespaces=namespace).text
            kmlFile.write(f"{h_lon},{h_lat},0.0\n")

        kmlFile.write('</coordinates>\n')
        kmlFile.write('</LineString>\n')
        kmlFile.write('<Style> id="lineaRoja">\n')
        kmlFile.write('<LineStyle>\n')
        kmlFile.write('<color>#ff0000ff</color>\n')
        kmlFile.write('<width>5</width>\n')
        kmlFile.write('</LineStyle>\n')
        kmlFile.write('</Style>\n')
        kmlFile.write('<altitudeMode>relativeToGround</altitudeMode>\n')
        kmlFile.write('</Placemark>\n')
        kmlFile.write('</Document>\n')
        kmlFile.write('</kml>\n')

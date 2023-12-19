"use strict";

class Viajes {
  constructor() {
    navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    this.curSlide = 9;
  }

  getPosicion(posicion) {
    this.longitud = posicion.coords.longitude;
    this.latitud = posicion.coords.latitude;
    this.precision = posicion.coords.accuracy;
    this.altitud = posicion.coords.altitude;
    this.precisionAltitud = posicion.coords.altitudeAccuracy;
    this.rumbo = posicion.coords.heading;
    this.velocidad = posicion.coords.speed;
  }

  verErrores(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.mensaje = "El usuario no permite la petición de geolocalización"
        break;
      case error.POSITION_UNAVAILABLE:
        this.mensaje = "Información de geolocalización no disponible"
        break;
      case error.TIMEOUT:
        this.mensaje = "La petición de geolocalización ha caducado"
        break;
      case error.UNKNOWN_ERROR:
        this.mensaje = "Se ha producido un error desconocido"
        break;
    }
  }

  getMapaEstaticoGoogle(dondeVerlo) {
    var ubicacion = document.querySelector("body section:nth-of-type(2)");
    var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
    var url = "https://maps.googleapis.com/maps/api/staticmap?";
    var centro = "center=" + this.latitud + "," + this.longitud;
    var zoom = "&zoom=15";
    var tamaño = "&size=800x600";
    var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
    var sensor = "&sensor=false";

    this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
    ubicacion.innerHTML = "<h3> Mapa Estático </h3>";
    ubicacion.innerHTML += "<img src='" + this.imagenMapa + "' alt='mapa estático google' />";

   
    if (this.mensaje != undefined){
      var h4 = $("<h4></h4>")
      h4.text(this.mensaje.toString());
      $("section[id='estatico']").append(h4)
    }
  }

  initMap() {
    var mapaGeoposicionado = new google.maps.Map(document.querySelector("body section:nth-of-type(3)"), {
      zoom: 8,
      center: { lat: 43.3672702, lng: -5.8502461 },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });


    var infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Posición del usuario');
        infoWindow.open(mapaGeoposicionado);
        mapaGeoposicionado.setCenter(pos);
      }, function () {
        this.handleLocationError(true, infoWindow, mapaGeoposicionado.getCenter(),mapaGeoposicionado);
      }.bind(this));
    } else {
      this.handleLocationError(false, infoWindow, mapaGeoposicionado.getCenter(), mapaGeoposicionado);
    }

    var h3 = document.createElement("h3");
    h3.textContent = "Mapa";
    document.querySelector("body section:nth-of-type(3)").append(h3);
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos, mapaGeoposicionado) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: Ha fallado la geolocalización' :
      'Error: Su navegador no soporta geolocalización');
    infoWindow.open(mapaGeoposicionado);
  }

  leerArchivo(files) {
    var archivo = files[0];

    var lector = new FileReader();
    lector.onload = function (evento) {
      var rutas = $("ruta", lector.result)
      rutas.each(function () {
        var article = $("<article></article>");

        var h5 = $("<h5></h5>");
        h5.text(this.children[0].innerHTML)

        var nombre = $("<p></p>");
        nombre.text("Nombre: " + this.children[0].innerHTML);

        var tipo = $("<p></p>");
        tipo.text("Tipo: " + this.children[1].innerHTML);

        var transporte = $("<p></p>");
        transporte.text("Transporte: " + this.children[2].innerHTML);

        var fechaInicio = $("<p></p>");
        fechaInicio.text("Fecha Inicio: " + this.children[3].innerHTML);

        var horaInicio = $("<p></p>");
        horaInicio.text("Hora Inicio: " + this.children[4].innerHTML);

        var duracion = $("<p></p>");
        duracion.text("Duracion: " + this.children[5].innerHTML);

        var agencia = $("<p></p>");
        agencia.text("Agencia: " + this.children[6].innerHTML);

        var descripcion = $("<p></p>");
        descripcion.text("Descripcion: " + this.children[7].innerHTML);

        var tipoPersona = $("<p></p>");
        tipoPersona.text("Tipo persona: " + this.children[8].innerHTML);

        var lugarInicio = $("<p></p>");
        lugarInicio.text("Lugar Inicio: " + this.children[9].innerHTML);

        var direccionInicio = $("<p></p>");
        direccionInicio.text("Direccion Inicio: " + this.children[10].innerHTML);

        var coordenadas = $("<p></p>");
        coordenadas.text("Coordenadas(long,lat,alt): " + this.children[11].children[0].innerText
          + ", " + this.children[11].children[1].innerText
          + ", " + this.children[11].children[2].innerText);

        var referencias = $("<p></p>");
        var referencia = $(this.children[12].children);
        referencias.text("Referencias: ");

        referencia.each(function () {
          if (this == referencia[0]) {
            referencias.text(referencias.text() + this.innerText);
          } else {
            referencias.text(referencias.text() + ", " + this.innerText);
          }

        })

        var notaRecomendacion = $("<p></p>");
        notaRecomendacion.text("Nota recomendación: " + this.children[13].innerHTML);

        var hitos = $("<article></article>");
        hitos.text("Hitos: ");

        var hito = $(this.children[14].children)

        hito.each(function () {
          
          
          var nombre = $("<h6></h6>")
          nombre.text("Nombre: " + this.children[0].innerText)

          var coordenadas = $("<p></p>")
          coordenadas.text( "Coordenadas(long,lat,alt): " + this.children[1].children[0].innerText
            + ", " + this.children[1].children[1].innerText
            + ", " + this.children[1].children[2].innerText)

          var distancia = $("<p></p>")  
          distancia.text("Distancia: " + this.children[2].innerText + this.children[2].attributes[0].nodeValue)

          var fotografias = $("<p></p>")  
          fotografias.text("Fotografias: ")

          hitos.append(nombre);
          hitos.append(coordenadas);
          hitos.append(distancia);
          hitos.append(fotografias);
          
          var picture = $("<picture></picture>")
          var fotografia = $(this.children[3].children)
          fotografia.each(function () {
            var nombreFoto = this.innerText.trim().split(".")[0];
            var sourceMovil = $("<source/>")
            sourceMovil.attr("srcset","/multimedia/imagenes/" + nombreFoto + "_movil.png");
            sourceMovil.attr("media","(max-width: 465px)");

            var sourceTablet = $("<source/>")
            sourceTablet.attr("srcset","/multimedia/imagenes/" + nombreFoto + "_tablet.png");
            sourceTablet.attr("media","(max-width: 799px)");

            var img = $("<img/>")
            img.attr("src","/multimedia/imagenes/" + nombreFoto + ".png");
            img.attr("alt",nombreFoto);

            picture.append(sourceMovil);
            picture.append(sourceTablet);
            picture.append(img);

            hitos.append(picture);
            
          })
          

          var videos =  $("<p></p>") ;
          videos.text("Videos: ");

          hitos.append(videos);

          if (this.children.length > 4) { // los videos son opcionales, no todas las rutas tienen

            var video = $(this.children[4].children)
            video.each(function () {
              var nombreVideo = this.innerText.trim().split(".")[0];
              
              var videoElement = $("<video></video>")
              videoElement.attr("controls",true);
              videoElement.attr("preload","auto");

              var sourceMp4 = $("<source/>")
              sourceMp4.attr("src","/multimedia/videos/" + nombreVideo + ".mp4");
              sourceMp4.attr("type","video/mp4");

              var sourceWebM = $("<source/>")
              sourceWebM.attr("src","/multimedia/videos/" + nombreVideo + ".webm");
              sourceWebM.attr("type","video/webm");

              videoElement.append(sourceMp4);
              videoElement.append(sourceWebM);

              hitos.append(videoElement)

            })
          }

        })


        article.append(h5);
        article.append(nombre);
        article.append(tipo);
        article.append(transporte);
        article.append(fechaInicio);
        article.append(horaInicio);
        article.append(duracion);
        article.append(agencia);
        article.append(descripcion);
        article.append(tipoPersona);
        article.append(lugarInicio);
        article.append(direccionInicio);
        article.append(coordenadas);
        article.append(referencias);
        article.append(notaRecomendacion);
        article.append(hitos);

        $("section[data-name='rutas']").append(article)

      })

    }
    lector.readAsText(archivo);

  }


  leerKMLs(files) {
    // Inicializar mapa
    var mapaGeoposicionado = new google.maps.Map(document.querySelector("body section:nth-of-type(3)"), {
      zoom: 7,
      center: { lat: 53.33306, lng: -6.24889 },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    for (var index = 0; index < files.length; index++) {
      var lector = new FileReader();
      lector.onloadend = function (evento) {
        if (evento.target.readyState === FileReader.DONE) {
          var kml = $(evento.target.result)[2];
          var placeMark = kml.children[0].children[0];
          var nombre = placeMark.children[0].innerText;
          var lineString = placeMark.children[1];
          var coordinates = lineString.children[0];
          var dataCoordinates = coordinates.childNodes[0].data.trim().split("\n");

          // Pasar a coordenadas LatLng de google maps
          var puntosLatLng = dataCoordinates.map(coord => {
            var [lng, lat] = coord.split(',').map(parseFloat);
            return new google.maps.LatLng(lat, lng);
          });

          var linea = new google.maps.Data.Feature({
            geometry: new google.maps.Data.LineString(puntosLatLng)

          });
          linea.setProperty('nombre', nombre);

          //Asignar estilo a las lineas
          mapaGeoposicionado.data.setStyle({
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 5
          });

          // Añadir la linea al mapa
          mapaGeoposicionado.data.add(linea);


        }
      };

      lector.readAsText(files[index]);
    }

    // Agregar evento a cada linea para "centrar" el mapa en ella
    // al hacer click y mostrar una infoWindow con el nombre de la ruta
    mapaGeoposicionado.data.addListener('click', function (event) {
      var nombreLinea = event.feature.getProperty('nombre');

      // Obtener los límites de la línea
      var bounds = new google.maps.LatLngBounds();
      event.feature.getGeometry().forEachLatLng(function (latlng) {
        bounds.extend(latlng);
      });
      mapaGeoposicionado.fitBounds(bounds);

      var infoWindow = new google.maps.InfoWindow({
        content: nombreLinea
      });
      infoWindow.setPosition(event.latLng);
      infoWindow.open(mapaGeoposicionado);
    });

    // Añadir encabezado a la section del mapa
    var h3 = document.createElement("h3");
    h3.textContent = "Mapa";
    document.querySelector("body section:nth-of-type(3)").append(h3);
  }

  leerSVGs(files) {
    for (var index = 0; index < files.length; index++) {
      var fileName = files[index];
      var lector = new FileReader();
      lector.fileName = fileName;
      lector.onloadend = function (evento) {
        if (evento.target.readyState === FileReader.DONE) {
          
          var article = $("<article></article>");

          var h5 = $("<h5></h5>");
          h5.text("Perfil " + evento.target.fileName.name[6]);

          var svgContent = $(evento.target.result)[2];
         

          article.append(h5);
          article.append(svgContent);
          
          $("section[data-name='altimetrias']").append(article);        }
      };

      lector.readAsText(files[index]);
    }
  }

  nextFoto(){
    var slides = document.querySelectorAll('body > article img');
    var maxSlide = slides.length - 1;

    if (this.curSlide === maxSlide) {
      this.curSlide = 0;
    } else {
      this.curSlide++;
    }

      slides.forEach((slide, indx) => {
      var trans = 100 * (indx - this.curSlide);
      $(slide).css('transform', 'translateX(' + trans + '%)')
    });

  }

  prevFoto(){
    var slides = document.querySelectorAll('body > article img');
    var maxSlide = slides.length - 1;

    if (this.curSlide === 0) {
      this.curSlide = maxSlide;
    } else {
      this.curSlide--;
    }
  
    //   move slide by 100%
    slides.forEach((slide, indx) => {
      var trans = 100 * (indx - this.curSlide);
      $(slide).css('transform', 'translateX(' + trans + '%)')
    });
    
  }
}


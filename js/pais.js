"use strict";
class Pais{
    constructor(nombrePais,nombreCapital
        ,poblacion,){

            this.nombrePais = nombrePais;
            this.nombreCapital = nombreCapital;
            this.poblacion = poblacion;
            
    }

    fillSecondaryFields(tipoGobierno,latitudCapital,longitudCapital,religionMayoritaria){
        this.tipoGobierno = tipoGobierno;
        this.latitudCapital = latitudCapital;
        this.longitudCapital = longitudCapital;
        this.religionMayoritaria = religionMayoritaria;
    }

    getNombrePais(){
        return this.nombrePais;
    }

    getNombreCapital(){
        return this.nombreCapital;
    }

    getSecondaryFields(){
        var res = "<ul> \n";
        res += "    <li>Poblacion: " + this.poblacion  +           "</li> "
        res += "    <li>Tipo Gobierno: " + this.tipoGobierno  +        "</li> "
        res += "    <li>Religion Mayoritaria: " + this.religionMayoritaria  + "</li> "
        res += "</ul>"

        return res;
    }

    writeCoordinates(){
        document.write("<p> Coordenadas(en grados decimales): "+this.latitudCapital + ", " + this.longitudCapital + "</p>");
    }

    consultWeather(){
        var apiKey = "ac29a4dc2890c4e82980936f6ad4e38e"
        var url = "https://api.openweathermap.org/data/2.5/forecast?lat="+this.latitudCapital+"&lon="+this.longitudCapital
        + "&appid="+apiKey + "&units=metric";

        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: function(datos){
                var datosDiarios = datos.list.filter(function(instancia){
                    var fechaHora = new Date(instancia.dt_txt);

                    return fechaHora.getHours() == 12;
                })
                console.log(datos)
                console.log(datosDiarios)

                for(var i = 0; i < datosDiarios.length;i++){
                    var fechaActual = datosDiarios[i].dt_txt.split(" ")[0];

                    // Filtra las instancias solo para el día actual
                    var instanciasDelDia = datos.list.filter(function (item) {
                        var fechaItem = item.dt_txt.split(" ")[0]
                        return fechaItem === fechaActual;
                    });

                    // Calcula temperaturas máximas y mínimas para el dia actual
                    var maxTemp = Math.max(...instanciasDelDia.map(item => item.main.temp_max));
                    var minTemp = Math.min(...instanciasDelDia.map(item => item.main.temp_min));
                    var article = $("<article></article>")
                    article.attr("data-name","meteo")

                    var list = $("<ul></ul>")

                    var fecha = $("<li></li>")
                    fecha.text(datosDiarios[i].dt_txt.replace("12:00:00","") )

                    var temp = $("<li></li>")
                    temp.text(maxTemp.toFixed(1) +"°/" + minTemp.toFixed(1) + "°")

                    var humidity = $("<li></li>")
                    humidity.text("Humedad:" +datosDiarios[i].main.humidity +"%")

                    var img = $("<img/>")
                    var altImagen = datosDiarios[i].weather[0].description
                    var codigoImagen = datosDiarios[i].weather[0].icon
                    var urlImagen = "https://openweathermap.org/img/w/" + codigoImagen + ".png"

                    img.attr("src",urlImagen);
                    img.attr("alt",altImagen);

                    list.append(fecha)
                    list.append(temp)
                    list.append(humidity)

                    article.append(list)
                    article.append(img)

                    $("section[data-name='meteo']").append(article);
                }

            }
        })
    }

}
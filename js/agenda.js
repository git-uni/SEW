"use strict";
class Agenda{

    constructor(){
        this.baseURL = "https://ergast.com/api/f1";

        
        this.racesURL = this.baseURL + "/current.xml";

        this.last_api_call = null;
        this.last_api_result = null;
    }

    consultRaces(){
        //Comprobacion temporal
        var now = new Date();

        var timeDifference = now - this.last_api_call
        var minutesDifference = timeDifference / (1000*60);
        var url = this.racesURL
        

        if(minutesDifference >= 5 || this.last_api_call == null ){
            $.ajax({
                dataType:"xml",
                url:url,
                method: "GET",
                success: function(datos){
                    this.last_api_result = datos;
                    this.last_api_call = new Date();

                    // Creamos e introducimos los parrafos que serviran de header

                    var raceNameHeader = $("<p></p>");
                    raceNameHeader.text("Carrera");

                    var circuitNameHeader = $("<p></p>");
                    circuitNameHeader.text("Circuito");

                    var longitudeHeader = $("<p></p>");
                    longitudeHeader.text("Longitud");

                    var latitudeHeader = $("<p></p>");
                    latitudeHeader.text("Latitud");

                    var raceDateTimeHeader = $("<p></p>");
                    raceDateTimeHeader.text("Fecha y Hora");

                    $("article").append(raceNameHeader);
                    $("article").append(circuitNameHeader);
                    $("article").append(longitudeHeader);
                    $("article").append(latitudeHeader);
                    $("article").append(raceDateTimeHeader);

                    var races = $("RaceTable Race",datos)

                    races.each(function(){
                        // Creamos e introducimos los parrafos que representan la informacion de cada carrera
                        var raceNameText = $("RaceName", this).text();
                        var circuitNameText = $("Circuit CircuitName", this).text();
                        var longitudeText = $("Circuit Location", this).attr("long");
                        var latitudeText = $("Circuit Location ", this).attr("lat");
                        var raceDateTimeText = $("Race > Date", this).text() + " " + $("Race > Time", this).text();

                        var raceName = $("<p></p>");
                        raceName.text(raceNameText);

                        var circuitName = $("<p></p>");
                        circuitName.text(circuitNameText);

                        var longitude = $("<p></p>");
                        longitude.text(longitudeText);

                        var latitude = $("<p></p>");
                        latitude.text(latitudeText);

                        var raceDateTime = $("<p></p>");
                        raceDateTime.text(raceDateTimeText);

                        $("article").append(raceName);
                        $("article").append(circuitName);
                        $("article").append(longitude);
                        $("article").append(latitude);
                        $("article").append(raceDateTime);

                    })
                }.bind(this),
                error: function(){
    
                }
            });
        }else{
            return this.last_api_result
        }

       
    }

}
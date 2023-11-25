"use strict";
class Fondo{

    constructor(nombrePais, nombreCapital, latitud, longitud){
        this.nombrePais = nombrePais;
        this.nombreCapital = nombreCapital;
        this.latitud = latitud;
        this.longitud = longitud;
    }

    consultFlicker(){
        var  flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickrAPI, 
            {
                tags: "Dublín",
                tagmode: "any",
                format: "json"
            }).done(function(data) {
               var item = data.items[0];

               var mediumUrl = item.media.m;

               var largeUrl = mediumUrl.replace('_m.jpg', '_b.jpg');

               $("body").css('background-image', 'url(' + largeUrl + ')')
               .css("background-size","cover")               
            });
    }

}
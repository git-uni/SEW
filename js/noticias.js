"use strict";

class Noticias{
    constructor(){

        if(window.File && window.FileReader && window.FileList && window.Blob){

        }

    }

    readInputFile(files){
        var archivo = files[0];
        var tipoTexto = /text.*/;
        if(archivo.type.match(tipoTexto)){
            var lector = new FileReader();

            lector.onload = function(evento){
                var lines = lector.result.split("\n")
                lines.forEach(function(line){
                    var elements = line.split("_");
                    var article = $("<article></article>")

                    var title = $("<h3></h3>").text(elements[0]);
                    var entry = $("<p></p>").text(elements[1]);
                    var content = $("<p></p>").text(elements[2]);
                    var author = $("<p></p>").text(elements[3]);

                    article.append(title);
                    article.append(entry);
                    article.append(content);
                    article.append(author);

                    $("section").append(article);


                });
            }

            lector.readAsText(archivo);
        }else{
            alert("Error : ¡¡¡ Archivo no válido !!!");
        }

    }
}
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

}
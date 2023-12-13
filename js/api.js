"use strict";

class Canvas{

    constructor(){
        this.painting= false;
        this.color="#000000";
    }

    startPosition(e) {
        this.painting = true;
        this.draw(e);
    }

    endPosition() {
        var canvas = document.querySelector("canvas");
        var context = canvas.getContext("2d");

        this.painting = false;
        context.beginPath();
    }


    draw(e) {
        if (!this.painting) 
        return;

        var canvas = document.querySelector("canvas");
        var context = canvas.getContext("2d");

        context.lineWidth = 5;
        context.lineCap = 'round';
        context.strokeStyle = this.color;

        context.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    }

    clearCanvas(){
        var canvas = document.querySelector("canvas");
        var context = canvas.getContext("2d")
        
        context.clearRect(0, 0, canvas.width, canvas.height);;
    }

    changeColor(color){
        this.color = color
    }
}
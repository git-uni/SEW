"use strict";

class Canvas{

    constructor(){
        this.painting= false;
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
        context.strokeStyle = 'black';

        context.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    }
}
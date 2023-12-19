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

    importCanvas(file){
        var canvas = document.querySelector("canvas");
        var context = canvas.getContext("2d")

        if (file) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var img = new Image();
                img.onload = function () {
                    context.clearRect(0, 0, canvas.width, canvas.height);

                    context.drawImage(img, 0, 0);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }

    }

    exportCanvas(){
        var canvas = document.querySelector("canvas");
        var dataURL = canvas.toDataURL('image/png');

        var a = document.createElement('a');
        a.href = dataURL;
        a.download = 'canvas_image.png';
        a.click();
    }

    adjustCanvas(){
        var canvas = document.querySelector("canvas");

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
}
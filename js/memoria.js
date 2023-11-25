"use strict";
class Memoria{

    constructor(){
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;

        this.elements = [
            { element: "HTML5", source: "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg" },
            { element: "HTML5", source: "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg" },
            { element: "CSS3", source: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" },
            { element: "CSS3", source: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" },
            { element: "JS", source: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg" },
            { element: "JS", source: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg" },
            { element: "PHP", source: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" },
            { element: "PHP", source: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" },
            { element: "SVG", source: "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg" },
            { element: "SVG", source: "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg" },
            { element: "W3C", source: "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg" },
            { element: "W3C", source: "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg" }
          ];

        this.shuffleElements();
        this.createElements();
        this.addEventListeners();  
    }

    shuffleElements() {
        for (let i = this.elements.length - 1; i > 0; i--) {
            // Generar un índice aleatorio entre 0 e i
            const j = Math.floor(Math.random() * (i + 1));

            // Intercambio de objetos en el array
            const temp = this.elements[i];
            this.elements[i] = this.elements[j];
            this.elements[j] = temp;
        }
    }

    unflipCards(){
        this.lockBoard = true;

        var cards = document.querySelectorAll("article");

        for (var i = 0; i < cards.length; i++) {
            if(cards[i] .getAttribute("data-state") ==  "flip"){
                cards[i].setAttribute('data-state', "unflip");
            }
        }

        setTimeout(this.resetBoard(),100);
    }

    resetBoard(){
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
    }

    

    checkForMatch(){
        (this.firstCard.getAttribute("data-element") == this.secondCard.getAttribute("data-element"))? 
        this.disableCards() : this.unflipCards();
    }

    createElements(){
        var container = document.querySelectorAll('section')[1]; 
        for (let i = 0; i < this.elements.length; i++) {
            var element = this.elements[i].element;
            var imagen = this.elements[i].source;
            
            var article = document.createElement('article');
            article.setAttribute('data-element', element);

            var h3 = document.createElement('h3');
            h3.textContent = 'Tarjeta de memoria';

            var img = document.createElement('img');
            img.src = imagen;
            img.alt = element;

            article.appendChild(h3);
            article.appendChild(img);

            container.appendChild(article);
        }
    }

    flipCard(game){
        if(this.getAttribute("data-state") == "revealed"){ 
            return;
        }
        if(game.lockBoard){ 
            return;
        }
        if(this === game.firstCard){
            return ;
        }

        this.setAttribute('data-state', 'flip');

        if(game.hasFlippedCard){
            game.secondCard = this;
            game.checkForMatch();
        }else{
            game.hasFlippedCard = true;
            game.firstCard = this;

        }
    }

    addEventListeners(){
        var cards = document.querySelectorAll("article");

        for (var i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", this.flipCard.bind(cards[i],this));
        }

    }

    disableCards(){
        this.firstCard.setAttribute("data-state","revealed")
        this.secondCard.setAttribute("data-state","revealed")
        this.resetBoard()
    }

}
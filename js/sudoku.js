"use strict";

class Sudoku{

    constructor(){

        this.boardString = "3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6";
        this.nRows = 9;
        this.nColumns = 9;

        this.boardArray = new Array(this.nRows).fill(null).map(() => new Array(this.nColumns).fill(null));

        this.start()
    }

    start(){
        var stringIndex = 0;

        for (let i = 0; i < this.nRows; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                var value = this.boardString[stringIndex];
                stringIndex++;
                
                this.boardArray[i][j] = isNaN(value)? 0 : parseInt(value);
            }
        }
            
    }

    createStructure(){
        var container = document.querySelector("main"); 

        for (let i = 0; i < this.nRows; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                var elemento = this.boardArray[i][j];
                if(parseInt(elemento) == 0){
                    var p = document.createElement("p");
                    p.addEventListener("click", this.setClicked.bind(this,p) );
                    p.setAttribute("row",i);
                    p.setAttribute("column",j);

                }else{
                    var p = document.createElement("p");
                    p.textContent = elemento;
                    p.setAttribute("data-state","blocked")
                }
                container.appendChild(p)                                               
            }
        }    

    }

    paintSudoku(){
        this.createStructure();

    }

    setClicked(p){

      var allClicked = document.querySelectorAll('p[data-state="clicked"]');
      
      allClicked.forEach(function(element) {
        element.setAttribute('data-state', '');
      });

      p.setAttribute("data-state","clicked");
    }

    introduceNumber(pressedKey){
        var selectedCell = document.querySelector('p[data-state="clicked"]');
        var row = selectedCell.getAttribute("row");
        var column = selectedCell.getAttribute("column");

        if (this.isValidPlacement(row, column, pressedKey)) {
            selectedCell.removeEventListener('click', this.setClicked);
          
            selectedCell.setAttribute('data-state', 'correct');

            selectedCell.textContent = pressedKey;

            this.boardArray[row][column] = parseInt(pressedKey);
      
            if (this.isSudokuCompleted()) {
              alert('¡Sudoku completado!');
            }
          }else{
            alert("El numero introducido no es valido para esta casilla")
          } 
    }

    isValidPlacement(row, column, number) {
        // Comprobar en la fila
        if (this.boardArray[row].includes(parseInt(number))) {
          return false;
        }
    
        // Comprobar en la columna
        if (this.boardArray.some(rowArray => rowArray[column] === parseInt(number))) {
          return false;
        }
    
        // Comprobar en la sub-cuadrícula de 3x3
        var subgridRowStart = Math.floor(row / 3) * 3;
        var subgridColumnStart = Math.floor(column / 3) * 3;
    
        for (var i = subgridRowStart; i < subgridRowStart + 3; i++) {
          for (var j = subgridColumnStart; j < subgridColumnStart + 3; j++) {
            console.log(this.boardArray[i][j])
            if (this.boardArray[i][j] === parseInt(number)) {
              return false;
            }
          }
        }
    
        return true;
    }

    isSudokuCompleted() {
        // Comprobar si todas las celdas están rellenas
        return this.boardArray.every(row => row.every(cell => cell !== 0));
      }

    
}
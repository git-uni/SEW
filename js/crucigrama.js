"use strict";
class Crucigrama{
    constructor(){
        var boardA = "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-,.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-,#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16";
        var boardB = "12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-,.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-,#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32";
        var boardC = "4,.,.,=,36,#,#,#,25,#,#,*,#,.,#,#,#,.,.,-,.,=,.,#,15,#,.,*,#,=,#,=,#,.,#,=,.,#,18,#,6,*,.,=,30,=,#,#,#,#,#,=,#,#,56,#,9,-,.,=,3,#,.,#,#,*,#,+,#,#,#,*,20,.,.,=,18,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,18,#,24,.,.,=,72";
        var boards = [boardA, boardB, boardC];

        this.randomIndex = Math.floor(Math.random() * boards.length);

        this.board = boards[this.randomIndex];
        this.nRows = 11;
        this.nColumns = 9;
        this.init_time = null;
        this.end_time = null;
        this.boardArray = new Array(this.nRows).fill(null).map(() => new Array(this.nColumns).fill(null));

        this.start();
    }

    start(){
        var stringIndex = 0;

        this.board = this.board.split(",")

        for (let i = 0; i < this.nRows; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                var value = this.board[stringIndex];
                stringIndex++;

                if(!isNaN(value)){
                    this.boardArray[i][j] = parseInt(value);
                }else if (value == "."){
                    this.boardArray[i][j] = 0;
                }else if(value == "#"){
                    this.boardArray[i][j] = -1;
                }else{
                    this.boardArray[i][j] = value
                }
            }
        }
            
    }

    paintMathword(){
        var main = $("main");

        for (let i = 0; i < this.nRows; i++) {
            for (let j = 0; j < this.nColumns; j++) {
                var elemento = this.boardArray[i][j];
                if(parseInt(elemento) == 0){
                    var p = $("<p></p>")
                    p.click(this.setClicked.bind(p))
                    p.attr("data-row",i)
                    p.attr("data-column",j)
                }else if(elemento == -1){
                    var p = $("<p></p>")
                    p.attr("data-state","empty")
                }else{
                    var p = $("<p></p>")
                    p.text(elemento)
                    p.attr("data-state","blocked")
                }
                main.append(p);
            }
        }
        this.init_time = new Date();
    }

    setClicked(){
        var allClicked = $("p[data-state='clicked']").attr("data-state","");

        this.attr("data-state","clicked");
    }

    check_win_condition(){
        if(this.boardArray.every(row => row.every(cell => cell !== 0))){
            this.end_time = new Date();
            return true;
        }
        return false;
    }

    calculate_date_difference(){
        var difference = this.end_time - this.init_time;

        this.totalSeconds = Math.floor(difference / 1000); 


        var hours = Math.floor(difference / 3600000); // 1 hora = 3600000 milisegundos
        var minutes = Math.floor((difference % 3600000) / 60000); // 1 minuto = 60000 milisegundos
        var seconds = Math.floor((difference % 60000) / 1000); // 1 segundo = 1000 milisegundos

        var formattedDifference = hours + ":" + minutes + ":"+ seconds;
        return formattedDifference;
    }

    introduceElement(pressedKey){
        var expression_row = true;
        var expression_col = true;

        var selectedCell = $("p[data-state='clicked']");
        var row = parseInt(selectedCell.attr("data-row"));
        var column = parseInt(selectedCell.attr("data-column"));

        this.boardArray[row][column] = pressedKey;

        //Vertiente horizontal
        for(var i = column +1 ; i < this.nColumns;i++){
            if(parseInt(this.boardArray[row][i]) == -1){
                break;
            }
            if(this.boardArray[row][i] == "="){
                var first_number = this.boardArray[row][i-3]
                var second_number = this.boardArray[row][i-1]
                var expression = this.boardArray[row][i-2]
                var result = this.boardArray[row][i+1]

                if(first_number != 0 && second_number != 0 
                    && expression != 0 && result != 0){
                        var expArray = [first_number,expression,second_number]
                        var expString = expArray.join(" ");
                        var evalRes = eval(expString);
                        if(evalRes != result){
                            expression_row = false;
                        }
                    }

            }

        }

        //Vertiente vertical
        for(var j = row+1; j < this.nRows ; j++){
           
            if(parseInt(this.boardArray[j][column]) == -1){
                break;
            }

            if(this.boardArray[j][column] == "="){
                var first_number = this.boardArray[j-3][column];
                var second_number = this.boardArray[j-1][column];
                var expression = this.boardArray[j-2][column];
                var result = this.boardArray[j+1][column];

                if(first_number != 0 && second_number != 0 
                    && expression != 0 && result != 0){
                        var expArray = [first_number,expression,second_number]
                        var expString = expArray.join(" ");
                        var evalRes = eval(expString);
                        if(evalRes != result){
                            expression_col = false;
                        }
                    }
            }
        }
        if(expression_col && expression_row){
            selectedCell.text(pressedKey);
            selectedCell.attr("data-state","correct")
        }else{
            this.boardArray[row][column] = 0
            selectedCell.attr("data-state","")
            alert("El elemento introducido no es valido para esta casilla.")
        }
        
        if(this.check_win_condition()){
            this.end_time = new Date();
            var totalTime = this.calculate_date_difference();

            alert("Ha completado el crucigrama en: " + totalTime)
            this.createRecordForm();
        }
    }

   

    createRecordForm(){
        var article = $("<article></article>")

        var h3=$("<h3></h3>")
        h3.text("Formulario de records")

        var form = $("<form></form>");
        form.attr("action","#");
        form.attr("method","post");
        form.attr("name","record");

        var labelNombre=$("<label></label");
        labelNombre.attr("for","nombre");
        labelNombre.text("Nombre:");

        var nombre = $("<input/>")
        nombre.attr("type","text");
        nombre.attr("placeholder","Nombre")
        nombre.attr("name","nombre");
        nombre.attr("id","nombre");

        var labelApellidos=$("<label></label");
        labelApellidos.attr("for","apellidos");
        labelApellidos.text("Apellidos:")

        var apellidos = $("<input/>")
        apellidos.attr("type","text");
        apellidos.attr("placeholder","Apellidos")
        apellidos.attr("name","apellidos");
        apellidos.attr("id","apellidos");


        var labelNivel=$("<label></label");
        labelNivel.attr("for","nivel");
        labelNivel.text("Nivel:");

        var nivel = $("<input/>")
        nivel.attr("type","text");
        nivel.attr("value",this.nivelString());
        nivel.attr("readonly",true);
        nivel.attr("name","nivel");
        nivel.attr("id","nivel");


        var labelTiempo=$("<label></label");
        labelTiempo.attr("for","tiempo");
        labelTiempo.text("Tiempo:");

        var tiempo = $("<input/>")
        tiempo.attr("type","text");
        tiempo.attr("value",this.totalSeconds + " segundos");
        tiempo.attr("readonly",true);
        tiempo.attr("name","tiempo");
        tiempo.attr("id","tiempo");

        var enviar = $("<input/>");
        enviar.attr("type","submit");
        enviar.attr("value","Enviar")

        form.append(labelNombre);
        form.append(nombre)

        form.append(labelApellidos);
        form.append(apellidos)

        form.append(labelNivel);
        form.append(nivel)

        form.append(labelTiempo);
        form.append(tiempo)
        
        form.append(enviar)

        article.append(h3);
        article.append(form);

        $("main").after(article)

        
    }

    nivelString(){
        switch (this.randomIndex){
            case 0:
                return "FÁCIL";
            case 1:
                return "INTERMEDIO"
            case 2:
                return "DIFICIL";        
        }
    }


}
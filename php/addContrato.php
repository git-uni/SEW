<!-- Datos Personales : Daniel Uria Edroso UO282813 -->
<!DOCTYPE HTML>
<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>EscritorioVirtual: Añadir Contrato</title>
    <meta name="author" content="Daniel Uria" />
    <meta name="description" content="Formulario para creacion de nuevo Contrato en BD" />
    <meta name="keywords" content="Añadir, Contratos, BD" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="/estilo/estilo.css" />
    <link rel="icon" href="/multimedia/imagenes/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="/estilo/layout.css" />

</head>

<body>
    <?php
    require("gestor.php");

    
    if(count($_POST)> 0){
        try {
            $salario = $_POST["salario"];
            $horas = $_POST["horas"];
            $nombrePelicula = trim($_POST["nombrePelicula"]);
            $dniActor = trim($_POST["dniActor"]);
    
            $mysqli = new mysqli($gestor->getServer(), $gestor->getUser(), $gestor->getPass(), $gestor->getDbName());
    
            $sql = "INSERT INTO contrato (salario, horas, nombrePelicula, dniActor)VALUES (?, ?, ?, ?)";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param("iiss", $salario, $horas, $nombrePelicula, $dniActor);
    
            $success = $stmt->execute();
    
            $stmt->close();
            $mysqli->close();
    
        } catch (mysqli_sql_exception $e) {
            $success = null;
        }
    }
   
    ?>
    <!-- Datos con el contenido que aparece en el navegador -->
    <header>
        <h1> EscritorioVirtual </h1>

        <nav>
            <a href="/index.html" accesskey="I" tabindex="1"> Indice </a>
            <a href="/sobremi.html" accesskey="S" tabindex="2"> Sobre mi </a>
            <a href="/noticias.html" accesskey="N" tabindex="3"> Noticias </a>
            <a href="/agenda.html" accesskey="A" tabindex="4"> Agenda </a>
            <a href="/meteorologia.html" accesskey="M" tabindex="5"> Meteorologia </a>
            <a href="/viajes.php" accesskey="V" tabindex="6"> Viajes </a>
            <a href="/juegos.html" accesskey="J" tabindex="7"> Juegos </a>
        </nav>

    </header>

    <section>
        <h2> Menu de acceso </h2>

        <p> <a href="/memoria.html"> Juego de memoria</a> </p>
        <p> <a href="/sudoku.html"> Sudoku</a> </p>
        <p> <a href="/crucigrama.php"> Crucigrama</a> </p>
        <p> <a href="/api.html"> Canvas interactivo </a> </p>
        <p> <a href="/php/gestorPeliculas.php"> Gestor Peliculas </a> </p>

    </section>

    <main>
        <h3> Formulario inserción de Contrato</h3>

        <form action="#" method="post" name="addContrato">
            <p><label for="salario"> Salario: </label></p>
            <p><input id="salario" name="salario" type="number" step="0.01" placeholder="Salario en $" /></p>

            <p><label for="horas"> Horas: </label></p>
            <p><input id="horas" name="horas" type="number" placeholder="Horas del contrato" /></p>

            <p><label for="nombrePelicula"> Nombre Pelicula: </label></p>
            <p><input id="nombrePelicula" name="nombrePelicula" type="text" placeholder="Nombre pelicula" /></p>

            <p><label for="dniActor"> DNI Actor: </label></p>
            <p><input id="dniActor" name="dniActor" type="text" placeholder="DNI Actor" /></p>

            <p><input type="submit" value="Añadir Contrato" /></p>
        </form>

    </main>

    <?php 
    if (count($_POST) > 0) {
        if ($success != null) {
            
            echo "<p> Inserción exitosa. </p>";
        } else {
            echo "<p> Error en la inserción: " . $stmt->error . "</p>";
        }
    }
    ?>




</body>

</html>
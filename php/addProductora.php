<!-- Datos Personales : Daniel Uria Edroso UO282813 -->
<!DOCTYPE HTML>
<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>EscritorioVirtual: Añadir Productora</title>
    <meta name="author" content="Daniel Uria" />
    <meta name="description" content="Formulario para creacion de nueva Productora en BD" />
    <meta name="keywords" content="Añadir, Productora, BD" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="/estilo/estilo.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="/estilo/layout.css" />

</head>

<body>
    <?php
    require("gestor.php");


    if (count($_POST) > 0) {
        try {
            $nombre = trim($_POST["nombre"]);
            $pais = $_POST["pais"];
            $añoFundacion = $_POST["añoFundacion"];

            $mysqli = new mysqli($gestor->getServer(), $gestor->getUser(), $gestor->getPass(), $gestor->getDbName());

            $sql = "INSERT INTO productora (nombre, pais, añoFundacion) VALUES (?, ?, ?)";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param("ssi", $nombre, $pais, $añoFundacion);

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
        <h3> Formulario inserción de Productora</h3>

        <form action="#" method="post" name="addProductora">
            <p><label for="nombre"> Nombre: </label></p>
            <p><input id="nombre" name="nombre" type="text" placeholder="Nombre" /></p>

            <p><label for="pais"> Pais: </label></p>
            <p><input id="pais" name="pais" type="text" placeholder="Pais" /></p>

            <p><label for="añoFundacion"> Año Fundacion: </label></p>
            <p><input id="añoFundacion" name="añoFundacion" type="number" placeholder="Año Fundación" /></p>


            <p><input type="submit" value="Añadir Productora" /></p>
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
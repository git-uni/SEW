<!-- Datos Personales : Daniel Uria Edroso UO282813 -->
<!DOCTYPE HTML>
<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>EscritorioVirtual: Gestor Peliculas</title>
    <meta name="author" content="Daniel Uria" />
    <meta name="description" content="Gestor de peliculas que permite la importacion y exportacion en csv" />
    <meta name="keywords" content="Peliculas, Gestion, csv" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="/estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="/estilo/gestorPeliculas.css" />
    <link rel="icon" href="/multimedia/imagenes/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="/estilo/layout.css" />

</head>

<body>
    <?php
    include("gestor.php");
    $gestor = new Gestor();
    if (count($_POST) > 0) {
        if (isset($_POST['resetButton'])) {
            $gestor->resetBD();
        }
        
        if (isset($_POST['actorExportButton'])) {
            $gestor->export("actor");
        }

        if (isset($_POST['contractExportButton'])) {
            $gestor->export("contrato");
        }

        if (isset($_POST['criticaExportButton'])) {
            $gestor->export("critica");
        }

        if (isset($_POST['movieExportButton'])) {
            $gestor->export("pelicula");
        }

        if (isset($_POST['productoraExportButton'])) {
            $gestor->export("productora");
        }
    }


    if ($_FILES) {
        $csvFilePath = $_FILES['csv_file']['tmp_name'];
        $gestor->importFromCSV($csvFilePath);
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

    <article>
        <h3>Resetear base de datos al estado inicial</h3>
        <form action="#" method="post" name="reset">
            <input type="submit" name="resetButton" value="Reset" />
        </form>
    </article>

    <article>
        <h3>Importar información desde CSV</h3>

        <p> 
            IMPORTANTE: Para importar información de tablas con registros que contengan claves foráneas, se deberan importar primero dichos registros
        </p>

        <form action="#" method="post" name="import" enctype="multipart/form-data">
            <input type="file" name="csv_file" />
            <input type="submit" value="Importar" />
        </form>

    </article>

    <section>
        <h3> Exportar información </h3>

        <article>
            <h4> Exportar Actores </h4>
            <form action="#" method="post" name="actorExport">
                <input type="submit" name="actorExportButton" value="Exportar Actores" />
            </form>
        </article>

        <article>
            <h4> Exportar Contratos </h4>
            <form action="#" method="post" name="contractExport">
                <input type="submit" name="contractExportButton" value="Exportar Contratos" />
            </form>
        </article>

        <article>
            <h4> Exportar Críticas </h4>
            <form action="#" method="post" name="criticaExport">
                <input type="submit" name="criticaExportButton" value="Exportar Críticas" />
            </form>
        </article>

        <article>
            <h4> Exportar Películas </h4>
            <form action="#" method="post" name="movieExport">
                <input type="submit" name="movieExportButton" value="Exportar Películas" />
            </form>
        </article>

        <article>
            <h4> Exportar Productoras </h4>
            <form action="#" method="post" name="productoraExport">
                <input type="submit" name="productoraExportButton" value="Exportar Productoras" />
            </form>
        </article>



    </section>


    <section>
        <h3> Listar Información</h3>

        <ul>
            <li>
                <a href="/php/listActors.php"> Listar Actores</a>
            </li>

            <li>
                <a href="/php/listContratos.php"> Listar Contratos</a>
            </li>

            <li>
                <a href="/php/listCriticas.php"> Listar Criticas</a>
            </li>

            <li>
                <a href="/php/listPeliculas.php"> Listar Peliculas</a>
            </li>

            <li>
                <a href="/php/listProductoras.php"> Listar Productoras</a>
            </li>
        </ul>
    </section>









</body>

</html>
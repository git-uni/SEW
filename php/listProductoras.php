<!-- Datos Personales : Daniel Uria Edroso UO282813 -->
<!DOCTYPE HTML>
<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>EscritorioVirtual: Listado Productoras</title>
    <meta name="author" content="Daniel Uria" />
    <meta name="description" content="Listado con las productoras que figuran en la BD" />
    <meta name="keywords" content="Lista, Productoras, BD" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="/estilo/estilo.css" />
    <link rel="icon" href="/multimedia/imagenes/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="/estilo/layout.css" />

</head>

<body>
    <?php 
    require("gestor.php");
    $gestor = new Gestor();

    $productoras = $gestor->getTableInfo("productora");
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


    <?php if (!empty($productoras)): ?>
    <article>
       
        <h3> Listado Productoras </h3>

        <ul>

            <?php foreach ($productoras as $productora): ?>
                <li>
                    <?php echo "Nombre: " . $productora["nombre"] . ", Pais: " . $productora["pais"] . ", Año Fundacion:  " . $productora["añoFundacion"]  ?>
                </li>
            <?php endforeach; ?>

        </ul>

    </article>
    <?php endif; ?>

    <?php if (empty($productoras)): ?>
    <article>
       
        <h3> Listado Productoras </h3>

        <p> No hay productoras en la base de datos en estos momentos </p>

    </article>
    <?php endif; ?>





</body>

</html>
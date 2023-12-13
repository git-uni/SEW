<!-- Datos Personales : Daniel Uria Edroso UO282813 -->
<!DOCTYPE HTML>
<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>EscritorioVirtual: Crucigrama</title>
    <meta name="author" content="Daniel Uria" />
    <meta name="description" content="Crucigrama matematico interactivo" />
    <meta name="keywords" content="Juego, Crucigrama, Interactivo" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/crucigrama.css" />
    <script src="js/crucigrama.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>


</head>

<body>
    <?php
    class Record
    {
        private $server;
        private $user;
        private $pass;
        private $dbname;

        public function __construct()
        {
            $this->server = "localhost";
            $this->user = "DBUSER2023";
            $this->pass = "DBPSWD2023";
            $this->dbname = "records";
        }

        public function getServer()
        {
            return $this->server;
        }

        public function getUser()
        {
            return $this->user;
        }

        public function getPass()
        {
            return $this->pass;
        }

        public function getDbName()
        {
            return $this->dbname;
        }

        public function getTopRecords($nivel)
        {
            $mysqli = new mysqli($this->getServer(), $this->getUser(), $this->getPass(), $this->getDbName());

            $sql = "SELECT nombre, apellidos, tiempo FROM registro WHERE nivel = ? ORDER BY tiempo LIMIT 10";

            $stmt = $mysqli->prepare($sql);

            $stmt->bind_param("s", $nivel);

            $stmt->execute();

            $result = $stmt->get_result();

            $records = $result->fetch_all(MYSQLI_ASSOC);

            $records = array_map(function ($record) {
            $record['tiempo'] = $this->formatSecondsToString($record['tiempo']);

            return $record;
        }, $records);

            $stmt->close();
            $mysqli->close();

            return $records;
        }


        public function formatSecondsToString($seconds)
        {
            $hours = floor($seconds / 3600);
            $minutes = floor(($seconds % 3600) / 60);
            $seconds = $seconds % 60;

            return sprintf("%02d:%02d:%02d", $hours, $minutes, $seconds);
        }



    }
    $record = new Record();

    if (count($_POST) > 0) {
        $nombre = $_POST["nombre"];
        $apellidos = $_POST["apellidos"];
        $nivel = $_POST["nivel"];

        $tiempo = $_POST["tiempo"];
        $partes = explode(" ", $tiempo);
        $segundos = $partes[0];

        $mysqli = new mysqli($record->getServer(), $record->getUser(), $record->getPass(), $record->getDbName());

        $sql = "INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (?, ?, ?, ?)";
        $stmt = $mysqli->prepare($sql);

        $stmt->bind_param("sssi", $nombre, $apellidos, $nivel, $segundos);

        $stmt->execute();

        $topRecords = $record->getTopRecords($nivel);

        $stmt->close();
        $mysqli->close();
    }
    ?>
    <header>
        <h1> EscritorioVirtual </h1>

        <nav>
            <a href="index.html" accesskey="I" tabindex="1"> Indice </a>
            <a href="sobremi.html" accesskey="S" tabindex="2"> Sobre mi </a>
            <a href="noticias.html" accesskey="N" tabindex="3"> Noticias </a>
            <a href="agenda.html" accesskey="A" tabindex="4"> Agenda </a>
            <a href="meteorologia.html" accesskey="M" tabindex="5"> Meteorologia </a>
            <a href="viajes.php" accesskey="V" tabindex="6"> Viajes </a>
            <a href="juegos.html" accesskey="J" tabindex="7"> Juegos </a>
        </nav>

    </header>

    <section>
        <h2> Menu de acceso </h2>

        <p> <a href="memoria.html"> Juego de memoria</a> </p>
        <p> <a href="sudoku.html"> Sudoku</a> </p>
        <p> <a href="crucigrama.php"> Crucigrama</a> </p>

    </section>


    <main>

    </main>

    <?php if (!empty($topRecords)): ?>
    <article>
       
        <h3> Top 10 Records - Nivel: <?php echo $nivel ?> </h3>

        <ul>

            <?php foreach ($topRecords as $record): ?>
                <li>
                    <?php echo $record["nombre"] . " " . $record["apellidos"] . " - " . $record["tiempo"] ; ?>
                </li>
            <?php endforeach; ?>



        </ul>

    </article>
    <?php endif; ?>



    <section data-type="botonera">
        <h2>Botonera</h2>
        <button onclick="crucigrama.introduceElement(1)">1</button>
        <button onclick="crucigrama.introduceElement(2)">2</button>
        <button onclick="crucigrama.introduceElement(3)">3</button>
        <button onclick="crucigrama.introduceElement(4)">4</button>
        <button onclick="crucigrama.introduceElement(5)">5</button>
        <button onclick="crucigrama.introduceElement(6)">6</button>
        <button onclick="crucigrama.introduceElement(7)">7</button>
        <button onclick="crucigrama.introduceElement(8)">8</button>
        <button onclick="crucigrama.introduceElement(9)">9</button>
        <button onclick="crucigrama.introduceElement('*')">*</button>
        <button onclick="crucigrama.introduceElement('+')">+</button>
        <button onclick="crucigrama.introduceElement('-')">-</button>
        <button onclick="crucigrama.introduceElement('/')">/</button>
    </section>

    <script>
        var crucigrama = new Crucigrama();
        crucigrama.paintMathword();

        document.addEventListener("keydown", function (event) {
            var selectedCell = $('p[data-state="clicked"]');

            if (selectedCell.length > 0) {
                var pressedKey = event.key;

                if ((pressedKey >= 1 && pressedKey <= 9) || pressedKey == "+"
                    || pressedKey == "-" || pressedKey == "*" || pressedKey == "/") {
                    crucigrama.introduceElement(pressedKey);

                } else if (event.shiftKey) {

                } else {
                    alert('Valor introducido no valido, Por favor introduzca un numero entre 1 y 9 o un operador aritmetico (+,-,*,/)');

                }
            } else {

            }
        });
    </script>


</body>

</html>
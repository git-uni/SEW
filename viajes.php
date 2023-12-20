 <!-- Datos Personales : Daniel Uria Edroso UO282813 -->
<!DOCTYPE HTML>
<html lang="es">
<head>
 <!-- Datos que describen el documento -->
 <meta charset="UTF-8"  />
 <title>EscritorioVirtual: Viajes</title>
 <meta name ="author" content ="Daniel Uria" />
 <meta name ="description" content ="Viajes" />
 <meta name ="keywords" content ="Viajes,Escapadas" />
 <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
 <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
 <link rel="icon" href="multimedia/imagenes/favicon.ico" />
 <link rel="stylesheet" type="text/css" href="estilo/layout.css"/>
 <link rel="stylesheet" type="text/css" href="estilo/viajes.css"/>
 <script src ="js/viajes.js"></script>
 <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

 
 </head>
<body>
    <?php

    class Moneda{

        private $localCurrency;
        private $changeCurrency;

        public function __construct($localCurrency,$changeCurrency){
            $this->localCurrency = $localCurrency;
            $this->changeCurrency = $changeCurrency;
        }

        public function getChangeRate(){
            $url = "https://api.exchangerate-api.com/v4/latest/" . $this->localCurrency;

            $respuesta = file_get_contents($url);

            $datos = json_decode($respuesta,true);

            return $datos['rates'][$this->changeCurrency];
        }

        public function getLocalCurrency(){
            return $this->localCurrency;
        }

        public function getChangeCurrency(){
            return $this->changeCurrency;
        }

    }
    class Carrusel{
        private $nombreCapital;
        private $nombrePais;

        private $perPage;

        private $photos;

        public function __construct($nombrePais,$nombreCapital)
        {
            $this-> nombreCapital = $nombreCapital;
            $this-> nombrePais = $nombrePais;
            $this-> perPage = 10;
            
        }

        public function consultFlicker(){
            $url = 'http://api.flickr.com/services/feeds/photos_public.gne?';
            $tags = urlencode($this->nombreCapital . ", " . $this->nombrePais);
    
            

            $url.= '&tags='.$tags;
            $url.= '&per_page='. $this-> perPage;
            $url.= '&format=json';
            $url.= '&nojsoncallback=1';


            $response = file_get_contents($url);

            $data = json_decode($response);

            $this-> photos = $data->items;

        }

        public function getPerPage(){
            return $this->perPage;
        }
        public function getPhotos(){
            return $this->photos;
        }
    }
    $carrusel = new Carrusel("Irlanda","Dublín");
    $carrusel->consultFlicker();

    $moneda = new Moneda("USD","EUR");

    ?>
    <header>
        <h1> EscritorioVirtual </h1>
        
        <nav>
            <a href="index.html" accesskey="I" tabindex="1"> Indice </a>
            <a href="sobremi.html" accesskey="S" tabindex="2"> Sobre mi </a>
            <a href="noticias.html" accesskey="N" tabindex="3" > Noticias </a>
            <a href="agenda.html" accesskey="A" tabindex="4"> Agenda </a> 
            <a href="meteorologia.html" accesskey="M" tabindex="5"> Meteorologia </a>
            <a href="viajes.php" accesskey="V" tabindex="6"> Viajes </a>
            <a href="juegos.html" accesskey="J" tabindex="7"> Juegos </a>
        </nav>
        
    </header>

    <h2>    Viajes  </h2>

    <script>
        var mapa = new Viajes();
    </script>

    <section>
        <h3> Tipo de cambio </h3>
        <?php 
            $tipoCambio = $moneda->getChangeRate();
            $localCurrency = $moneda->getLocalCurrency();
            $changeCurrency = $moneda->getChangeCurrency();
            echo "<p>  El tipo de cambio actual es: 1 {$localCurrency} = {$tipoCambio} {$changeCurrency}     </p>"
        ?>
    </section>

    <article>
        <h3>Carrusel de Imágenes</h3>


        <?php 
            for($i=0;$i<$carrusel->getPerPage();$i++) {
                $titulo = $carrusel->getPhotos()[$i]->title;
                $URLfoto = $carrusel->getPhotos()[$i]->media->m;  
                echo "<img alt='" . $titulo . "' src='" . $URLfoto . "' />" ;
            }
        ?>
        <!-- Control buttons -->
        <button data-action="next" onClick="mapa.nextFoto()"> > </button>
        <button data-action="prev" onClick="mapa.prevFoto()"> < </button>
    </article>
  
    
    <section id="estatico">
    <h3> Mapa Estático </h3>
        <input type="button" value="Obtener mapa estático" onClick = "mapa.getMapaEstaticoGoogle('estatico');"/>
    </section>


    <h3> Mapa Dinámico </h3>
    <section id="dinamico">
        <h4>Mapa</h4>
        
    </section>

    

    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzOttLyv0_kRRFD7GBtB8BPdMxqg6ajGw&callback=mapa.initMap"></script>

    <h3> Procesado archivo XML </h3>

    <p><input type="file" onchange="mapa.leerArchivo(this.files);"></p>

    <section data-name="rutas">
        <h4>Rutas </h4>

    </section>

    <h3> Procesado archivos planimetría </h3>

    <p><input type="file"  onchange="mapa.leerKMLs(this.files);" multiple></p>

    
    <h3> Procesado archivos altimetría </h3>

    <p><input type="file"  onchange="mapa.leerSVGs(this.files);" multiple></p>

    <section data-name="altimetrias"> 
        <h4>Altimetrias</h4>
        
    </section>


</body>
</html>
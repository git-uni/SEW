<?php 
 class Gestor
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
         $this->dbname = "gestionpeliculas";
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

     public function resetBD()
     {
         $mysqli = new mysqli($this->getServer(), $this->getUser(), $this->getPass(), $this->getDbName());

         $sqlCritica = "delete from critica";

         $sqlPelicula = "delete from pelicula";

         $sqlContrato = "delete from contrato";

         $sqlActor = "delete from actor";

         $sqlProductora = "delete from productora";

         $mysqli->query($sqlCritica);
         $mysqli->query($sqlPelicula);
         $mysqli->query($sqlContrato);
         $mysqli->query($sqlActor);
         $mysqli->query($sqlProductora);

         $mysqli->close();
     }

     public function importFromCSV($csvFilePath)
     {
         $mysqli = new mysqli($this->getServer(), $this->getUser(), $this->getPass(), $this->getDbName());

         $file = fopen($csvFilePath, 'r');
         // Leer la primera línea para obtener el nombre de la tabla
         $tableName = fgetcsv($file, 1000, ',')[0];
         while (($data = fgetcsv($file, 1000, ',')) !== FALSE) {
             switch ($tableName) {
                 case 'actor':
                     $sql = "INSERT INTO actor (dni, nombre, apellidos, oscars) VALUES ('$data[0]', '$data[1]', '$data[2]', $data[3])";
                     break;
                 case 'contrato':
                     $sql = "INSERT INTO contrato (idContrato, salario, horas, nombrePelicula, dniActor) VALUES ($data[0], $data[1], $data[2], '$data[3]', '$data[4]')";
                     break;
                 case 'critica':
                     $sql = "INSERT INTO critica (id, puntuacion, comentario, nombrePelicula) VALUES ($data[0], $data[1], '$data[2]', '$data[3]')";
                     break;
                 case 'pelicula':
                     $sql = "INSERT INTO pelicula (nombre, añoEstreno, genero, ganancias, nombreProductora) VALUES ('$data[0]', $data[1], '$data[2]', $data[3], '$data[4]')";
                     break;
                 case 'productora':
                     $sql = "INSERT INTO productora (nombre, pais, añoFundacion) VALUES ('$data[0]', '$data[1]', $data[2])";
                     break;
             }

             if (!empty($sql)) {
                 $mysqli->query($sql);
             }
         }
         fclose($file);
         $mysqli->close();
     }

     public function export($nombreTabla)
     {
         ob_end_clean();

         $mysqli = new mysqli($this->getServer(), $this->getUser(), $this->getPass(), $this->getDbName());

         $result = $mysqli->query("SELECT * FROM $nombreTabla");
         $data = [];

         header('Content-Type: text/csv');
         header('Content-Disposition: attachment; filename="' . $nombreTabla . '.csv"');
         header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
         header('Expires: 0');
         header('Pragma: public');

         // Abrir el archivo de salida en modo escritura
         $output = fopen('php://output', 'w');

         // Agregar el nombre de la tabla como la primera fila
         fputcsv($output, array($nombreTabla));

         // Escribir los datos en el archivo CSV
         while ($row = $result->fetch_assoc()) {
             fputcsv($output, $row);
         }

         fclose($output);
         $mysqli->close();
         exit;
     }

     public function getTableInfo($nombreTabla){
         $mysqli = new mysqli($this->getServer(), $this->getUser(), $this->getPass(), $this->getDbName());

         $result = $mysqli->query("SELECT * FROM $nombreTabla");

         $data = $result->fetch_all(MYSQLI_ASSOC);

         return $data;
     }
 }
?>

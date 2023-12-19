SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `gestionpeliculas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `gestionpeliculas`;

CREATE TABLE `actor` (
  `dni` varchar(9) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `oscars` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `contrato` (
  `idContrato` int(11) NOT NULL,
  `salario` float NOT NULL,
  `horas` int(11) NOT NULL,
  `nombrePelicula` varchar(30) NOT NULL,
  `dniActor` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `critica` (
  `id` int(11) NOT NULL,
  `puntuacion` int(11) NOT NULL,
  `comentario` varchar(50) NOT NULL,
  `nombrePelicula` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `pelicula` (
  `nombre` varchar(30) NOT NULL,
  `añoEstreno` year(4) NOT NULL,
  `genero` text NOT NULL,
  `ganancias` float NOT NULL,
  `nombreProductora` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `productora` (
  `nombre` varchar(30) NOT NULL,
  `pais` varchar(30) NOT NULL,
  `añoFundacion` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `actor`
  ADD PRIMARY KEY (`dni`);

ALTER TABLE `contrato`
  ADD PRIMARY KEY (`idContrato`),
  ADD KEY `nombrePelicula` (`nombrePelicula`),
  ADD KEY `dniActor` (`dniActor`);

ALTER TABLE `critica`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nombrePelicula` (`nombrePelicula`);

ALTER TABLE `pelicula`
  ADD PRIMARY KEY (`nombre`),
  ADD KEY `nombreProductora` (`nombreProductora`);

ALTER TABLE `productora`
  ADD PRIMARY KEY (`nombre`);


ALTER TABLE `contrato`
  MODIFY `idContrato` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `critica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `contrato`
  ADD CONSTRAINT `contrato_ibfk_1` FOREIGN KEY (`nombrePelicula`) REFERENCES `pelicula` (`nombre`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contrato_ibfk_2` FOREIGN KEY (`dniActor`) REFERENCES `actor` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `critica`
  ADD CONSTRAINT `critica_ibfk_1` FOREIGN KEY (`nombrePelicula`) REFERENCES `pelicula` (`nombre`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `pelicula`
  ADD CONSTRAINT `pelicula_ibfk_1` FOREIGN KEY (`nombreProductora`) REFERENCES `productora` (`nombre`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

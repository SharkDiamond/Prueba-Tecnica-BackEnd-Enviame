-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: Prueba_Tecnica
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Entregas`
--

DROP TABLE IF EXISTS `Entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Entregas` (
  `tracking_number` bigint NOT NULL AUTO_INCREMENT,
  `foreing_order_id` bigint NOT NULL,
  `sku_Producto` bigint NOT NULL,
  `nombre_Producto` varchar(80) NOT NULL,
  `cantidad_Producto` bigint NOT NULL,
  `direccion_origen` varchar(45) NOT NULL,
  `direccion_destino` varchar(45) NOT NULL,
  `nombre_Cliente` varchar(90) NOT NULL,
  `estado` varchar(70) NOT NULL DEFAULT 'LISTO_PARA_RECOLECCIÓN',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`tracking_number`),
  KEY `foreing_order_id` (`foreing_order_id`),
  CONSTRAINT `foreing_order_id` FOREIGN KEY (`foreing_order_id`) REFERENCES `Pedidos` (`IdPedido`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Entregas`
--

LOCK TABLES `Entregas` WRITE;
/*!40000 ALTER TABLE `Entregas` DISABLE KEYS */;
/*!40000 ALTER TABLE `Entregas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pedidos`
--

DROP TABLE IF EXISTS `Pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pedidos` (
  `IdPedido` bigint NOT NULL AUTO_INCREMENT,
  `Sku` bigint NOT NULL,
  `VendedorId` bigint NOT NULL,
  `UsuarioMercadoId` bigint NOT NULL,
  `Estado` varchar(45) DEFAULT 'creado',
  `createdAt` timestamp NULL DEFAULT NULL,
  `cantidad` bigint DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`IdPedido`),
  KEY `Sku_idx` (`Sku`),
  KEY `VendedorId_idx` (`VendedorId`),
  KEY `UsuarioMercadoId_idx` (`UsuarioMercadoId`),
  CONSTRAINT `Sku` FOREIGN KEY (`Sku`) REFERENCES `productos` (`IdProducto`),
  CONSTRAINT `UsuarioMercadoId` FOREIGN KEY (`UsuarioMercadoId`) REFERENCES `mercadoUsuarios` (`IdUsuarioMercado`),
  CONSTRAINT `VendedorId` FOREIGN KEY (`VendedorId`) REFERENCES `vendedores` (`IdVendedor`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pedidos`
--

LOCK TABLES `Pedidos` WRITE;
/*!40000 ALTER TABLE `Pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mercadoUsuarios`
--

DROP TABLE IF EXISTS `mercadoUsuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mercadoUsuarios` (
  `IdUsuarioMercado` bigint NOT NULL AUTO_INCREMENT,
  `Correo` varchar(40) NOT NULL,
  `Direccion_De_Envio` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `Estado` tinyint(1) DEFAULT '1',
  `Nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`IdUsuarioMercado`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mercadoUsuarios`
--

LOCK TABLES `mercadoUsuarios` WRITE;
/*!40000 ALTER TABLE `mercadoUsuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `mercadoUsuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `IdProducto` bigint NOT NULL AUTO_INCREMENT,
  `IdVendedor` bigint NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Cantidad` bigint NOT NULL,
  `Descripcion` varchar(30) NOT NULL,
  `Estado` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`IdProducto`),
  KEY `VendedorId` (`IdVendedor`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`IdVendedor`) REFERENCES `vendedores` (`IdVendedor`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendedores`
--

DROP TABLE IF EXISTS `vendedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendedores` (
  `IdVendedor` bigint NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` varchar(30) NOT NULL,
  `Username` varchar(15) NOT NULL,
  `Estado` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `DireccionAlmacen` varchar(100) NOT NULL,
  PRIMARY KEY (`IdVendedor`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendedores`
--

LOCK TABLES `vendedores` WRITE;
/*!40000 ALTER TABLE `vendedores` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendedores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-14  9:32:48

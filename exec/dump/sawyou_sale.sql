-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: sawyou.kro.kr    Database: sawyou
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sale`
--

DROP TABLE IF EXISTS `sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale` (
  `sale_seq` bigint NOT NULL AUTO_INCREMENT,
  `nft_seq` bigint NOT NULL,
  `sale_price` bigint NOT NULL,
  `sale_start_date` datetime NOT NULL,
  `sale_end_date` datetime NOT NULL,
  `sale_contract_address` varchar(100) NOT NULL,
  `is_sold` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`sale_seq`),
  KEY `FK_nft_TO_sale_1` (`nft_seq`),
  CONSTRAINT `FK_nft_TO_sale_1` FOREIGN KEY (`nft_seq`) REFERENCES `nft` (`nft_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale`
--

LOCK TABLES `sale` WRITE;
/*!40000 ALTER TABLE `sale` DISABLE KEYS */;
INSERT INTO `sale` VALUES (42,60,50,'2022-04-08 09:30:31','2022-04-11 09:30:31','0x53A885b39DfCa134EdACaA12f9671F311623dCec',1),(43,58,12,'2022-04-08 09:30:32','2022-04-11 09:30:32','0x53A885b39DfCa134EdACaA12f9671F311623dCec',0),(44,57,100,'2022-04-08 09:31:16','2022-04-11 09:31:16','0xCF43cD21149E745518EA7317e312376106E1592C',0),(45,61,10,'2022-04-08 09:31:34','2022-04-11 09:31:34','0xCF43cD21149E745518EA7317e312376106E1592C',0),(46,59,150,'2022-04-08 09:32:16','2022-04-11 09:32:16','0x3D59BDceaDBeC0DE2b5a9663c7DF5b678fd60469',0),(47,62,22,'2022-04-08 09:40:06','2022-04-11 09:40:06','0xF51d782Ba92283B02eD035e513eADdd9E4bD6B99',0),(48,63,15,'2022-04-08 09:41:12','2022-04-11 09:41:12','0xC19fA215B1bce602a1aB1BD33A1D72d2204Aa88a',1);
/*!40000 ALTER TABLE `sale` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 10:00:05

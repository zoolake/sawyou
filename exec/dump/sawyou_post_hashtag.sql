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
-- Table structure for table `post_hashtag`
--

DROP TABLE IF EXISTS `post_hashtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_hashtag` (
  `post_hashtag_seq` bigint NOT NULL AUTO_INCREMENT,
  `post_seq` bigint NOT NULL,
  `hashtag_seq` bigint NOT NULL,
  PRIMARY KEY (`post_hashtag_seq`),
  KEY `FK_post_TO_post_hashtag_1` (`post_seq`),
  KEY `FK_hashtag_TO_post_hashtag_1` (`hashtag_seq`),
  CONSTRAINT `FK_hashtag_TO_post_hashtag_1` FOREIGN KEY (`hashtag_seq`) REFERENCES `hashtag` (`hashtag_seq`),
  CONSTRAINT `FK_post_TO_post_hashtag_1` FOREIGN KEY (`post_seq`) REFERENCES `post` (`post_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_hashtag`
--

LOCK TABLES `post_hashtag` WRITE;
/*!40000 ALTER TABLE `post_hashtag` DISABLE KEYS */;
INSERT INTO `post_hashtag` VALUES (43,133,16),(44,134,16),(45,135,17),(46,135,18),(47,135,19),(48,136,16),(49,136,20),(50,136,21),(51,137,17),(52,137,18),(53,137,22),(54,138,17),(55,138,18),(56,138,19),(57,139,17),(58,139,18),(59,139,19),(60,140,16),(61,141,23),(62,141,24),(63,141,19),(64,142,23),(65,142,25),(66,143,26),(67,143,27),(68,143,28),(69,144,26),(70,144,27),(71,144,29),(72,145,30),(73,145,23),(74,145,31),(75,145,32),(76,145,33),(77,146,26),(78,146,27),(79,146,34),(80,147,26),(81,147,27),(82,147,35),(83,148,26),(84,148,27),(85,148,36),(86,149,26),(87,149,27),(88,149,37),(89,150,23),(90,150,38),(91,150,39),(92,150,40),(93,151,23),(94,151,41),(95,151,42),(96,151,43),(97,151,44),(98,152,26),(99,152,45),(100,152,46);
/*!40000 ALTER TABLE `post_hashtag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 10:00:04

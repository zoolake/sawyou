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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `user_pwd` varchar(100) NOT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `user_desc` text,
  `user_profile` varchar(200) DEFAULT NULL,
  `user_is_delete` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_seq`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (76,'zoolake','$2a$10$VOMIQavj3vrElvvfOQzyDeMvJ7ykdTsBR5jeH6ZuSeroO0s3TheHi','K-인디아나존스','junhomoon224@naver.com',NULL,'https://sawyou.kro.kr/upload/user/76/userImage.jpg',0),(77,'clsrn5004','$2a$10$f.3JnjHS/JSPq9I7/2/tVOp/LmxVq4TdrUZKkfdPmVzCFmwZUoPfC','아트홀릭','wjdgur778@gmail.com','안녕하세요. 신인작가 \"아트홀릭\"입니다!!','https://sawyou.kro.kr/upload/user/77/userImage.png',0),(78,'sw200362','$2a$10$WeQgU6jV/N5LA9wF3jBd3.81vzHcBkcQ/5t49wosFCOO/FSP.dUQi','bongdal2','sw200362@naver.com',NULL,'https://sawyou.kro.kr/upload/user/78/userImage.PNG',0),(79,'abcdef','$2a$10$UZGnIWkioxsb8pcYPqIbaOGoNq9Gw9Iccy8QSEn71wNMp740B3lUe','소유 (I saw you)','cjcm1525@naver.com','서울 4반 401 NFT팀입니다!','https://sawyou.kro.kr/upload/user/79/userImage.jpg',0),(80,'mebomebo','$2a$10$8I2XwzQGu7StA4liO0eKmuRU82qHYWO5T22Om0bCLXfhpTbgtgpIq','박건우','mebo@gmail.com',NULL,'https://sawyou.kro.kr/upload/user/80/userImage.jpeg',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 10:00:06

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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_seq` bigint NOT NULL AUTO_INCREMENT,
  `post_seq` bigint NOT NULL,
  `user_seq` bigint NOT NULL,
  `comment_content` text,
  `comment_writing_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `comment_is_delete` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`comment_seq`),
  KEY `FK_post_TO_comment_1` (`post_seq`),
  KEY `FK_user_TO_comment_1` (`user_seq`),
  CONSTRAINT `FK_post_TO_comment_1` FOREIGN KEY (`post_seq`) REFERENCES `post` (`post_seq`),
  CONSTRAINT `FK_user_TO_comment_1` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (195,151,77,'우와... 너무 멋있어요','2022-04-08 09:33:43',0),(196,152,78,'아주 귀여운 마스코트네요','2022-04-08 09:34:57',0),(197,140,78,'잔잔하니 분위기있네요','2022-04-08 09:35:12',0),(198,134,78,'느낌있고 좋네요','2022-04-08 09:35:31',0),(199,133,78,'현대판 피카소?','2022-04-08 09:35:40',0),(200,151,78,'석양이... 진..다','2022-04-08 09:35:47',0),(201,142,78,'석양보다 앞의 꽃들이 ','2022-04-08 09:36:07',0),(202,138,76,'나도 졸리다 봉달아 ㅠㅠ','2022-04-08 09:41:40',0),(203,135,76,'굉장히 귀엽다 너!!!','2022-04-08 09:42:06',0),(204,152,76,'사슴 눈망울...','2022-04-08 09:43:25',0),(205,144,76,'저도 이름이 문준혼데 ㅎ...','2022-04-08 09:44:17',0);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
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

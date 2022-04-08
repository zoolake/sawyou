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
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_seq` bigint NOT NULL,
  `post_content` text,
  `post_picture_link` varchar(200) DEFAULT 'https://sawyou.kro.kr/upload/post/dummy.jpeg',
  `post_writing_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `post_is_delete` tinyint NOT NULL DEFAULT '0',
  `post_is_nft` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`post_seq`),
  KEY `FK_user_TO_post_1` (`user_seq`),
  CONSTRAINT `FK_user_TO_post_1` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (133,77,'모던함이 느껴지지 않나요? #아트','https://sawyou.kro.kr/upload/post/133/postImage.jpg','2022-04-08 09:17:55',0,0),(134,77,'아름다운 여인 #아트','https://sawyou.kro.kr/upload/post/134/postImage.jpg','2022-04-08 09:19:29',0,1),(135,78,'봉달이 어렸을때 추억의 사진 #봉달이 #강아지 #일상','https://sawyou.kro.kr/upload/post/135/postImage.PNG','2022-04-08 09:20:03',0,1),(136,77,'#아트 #사람 #캠핑','https://sawyou.kro.kr/upload/post/136/postImage.jpg','2022-04-08 09:20:14',0,0),(137,78,'봉달이 수술하던 날...\r\n#봉달이 #강아지 #병원','https://sawyou.kro.kr/upload/post/137/postImage.PNG','2022-04-08 09:20:25',0,0),(138,78,'봉달이 졸려요.. #봉달이 #강아지 #일상','https://sawyou.kro.kr/upload/post/138/postImage.PNG','2022-04-08 09:20:55',0,1),(139,78,'형아 혼자 뭐먹어?????? #봉달이 #강아지 #일상','https://sawyou.kro.kr/upload/post/139/postImage.PNG','2022-04-08 09:21:35',0,1),(140,77,'세월을 낚는 사람 #아트','https://sawyou.kro.kr/upload/post/140/postImage.jpg','2022-04-08 09:22:02',0,1),(141,76,'나무위에 걸린 구름 #풍경 #구름 #일상','https://sawyou.kro.kr/upload/post/141/postImage.jpg','2022-04-08 09:22:18',0,1),(142,76,'석양이 진다...#풍경 #핑크빛','https://sawyou.kro.kr/upload/post/142/postImage.jpg','2022-04-08 09:23:58',0,0),(143,79,'#소유 #NFT #정혁\r\n안녕하세요~ NFT팀 팀장 김정혁입니다!','https://sawyou.kro.kr/upload/post/143/postImage.png','2022-04-08 09:24:28',0,0),(144,79,'#소유 #NFT #준호\r\n안녕하세요~ NFT팀 문준호입니다!\r\n','https://sawyou.kro.kr/upload/post/144/postImage.png','2022-04-08 09:25:08',0,0),(145,76,'파도가 치는 어느 여름날 #파도 #풍경 #여행 #동해 #바다','https://sawyou.kro.kr/upload/post/145/postImage.jpg','2022-04-08 09:25:23',0,0),(146,79,'#소유 #NFT #상원\r\n안녕하세요~ NFT팀 이상원입니다!\r\n','https://sawyou.kro.kr/upload/post/146/postImage.png','2022-04-08 09:25:32',0,0),(147,79,'#소유 #NFT #영후\r\n안녕하세요~ NFT팀 김영후입니다!\r\n','https://sawyou.kro.kr/upload/post/147/postImage.png','2022-04-08 09:25:55',0,0),(148,79,'#소유 #NFT #건우\r\n안녕하세요~ NFT팀 박건우입니다!\r\n','https://sawyou.kro.kr/upload/post/148/postImage.png','2022-04-08 09:26:10',0,0),(149,79,'#소유 #NFT #나연\r\n안녕하세요~ NFT팀 오나연입니다!\r\n','https://sawyou.kro.kr/upload/post/149/postImage.png','2022-04-08 09:26:28',0,0),(150,76,'옐로우스톤 국립공원에서 한 컷...#풍경 #옐로우스톤 #국립공원 #호수','https://sawyou.kro.kr/upload/post/150/postImage.jpg','2022-04-08 09:26:29',0,0),(151,76,'아마존에서... #풍경 #아마존 #눈 #앞에 #악어가','https://sawyou.kro.kr/upload/post/151/postImage.png','2022-04-08 09:27:21',0,1),(152,79,'#소유 #로고 #동그리\r\n우리의 마스코트 동그리입니다!','https://sawyou.kro.kr/upload/post/152/postImage.png','2022-04-08 09:28:42',0,0);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
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

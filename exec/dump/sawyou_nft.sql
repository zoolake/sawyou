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
-- Table structure for table `nft`
--

DROP TABLE IF EXISTS `nft`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nft` (
  `nft_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_seq` bigint NOT NULL,
  `post_seq` bigint NOT NULL,
  `nft_author_name` varchar(50) NOT NULL,
  `nft_title` varchar(50) NOT NULL,
  `nft_desc` text NOT NULL,
  `nft_owner_address` varchar(100) NOT NULL,
  `nft_token_id` bigint NOT NULL,
  `nft_created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `nft_picture_link` varchar(200) NOT NULL,
  `nft_for_sale` tinyint DEFAULT '0',
  PRIMARY KEY (`nft_seq`),
  UNIQUE KEY `post_seq` (`post_seq`),
  KEY `FK_user_TO_nft_1` (`user_seq`),
  CONSTRAINT `FK_post_TO_nft_1` FOREIGN KEY (`post_seq`) REFERENCES `post` (`post_seq`),
  CONSTRAINT `FK_user_TO_nft_1` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nft`
--

LOCK TABLES `nft` WRITE;
/*!40000 ALTER TABLE `nft` DISABLE KEYS */;
INSERT INTO `nft` VALUES (57,78,139,'bongdal2','밥먹는 형아보는 봉달이','봉달이가 식탁을 바라보며 무엇을 먹냐고 물어보는듯한 사진. ','0xc83b8451242a17c6cc3d120919b5a7948144bfcd',129,'2022-04-08 09:26:20','https://sawyou.kro.kr/upload/post/139/postImage.PNG',1),(58,77,140,'아트홀릭','세월을 낚는 자','인생을 즐기고있는 한 여유있는 사람','0x8e0487e890357c4883a0e2371de0a92127d885d2',130,'2022-04-08 09:26:55','https://sawyou.kro.kr/upload/post/140/postImage.jpg',1),(59,78,138,'bongdal2','자기침대에서 자는 봉달이','피곤해서 자기침대에서 누워서 나지막히 주인을 바라보는 귀여운 봉달이','0xc83b8451242a17c6cc3d120919b5a7948144bfcd',131,'2022-04-08 09:26:58','https://sawyou.kro.kr/upload/post/138/postImage.PNG',1),(60,76,135,'bongdal2','어린시절 봉달이 스킨','귀염뽀짝한 봉달이의 어릴적 사진입니다. 귀여운 봉달이의 모습이 더욱 더 부각되는 사진','0x350e1623e4330ffe0ecf345f5983a1a8d660bdad',132,'2022-04-08 09:27:59','https://sawyou.kro.kr/upload/post/135/postImage.PNG',0),(61,77,134,'아트홀릭','눈감은 여인','모던하고 아름다운 여인의 모습','0x8e0487e890357c4883a0e2371de0a92127d885d2',133,'2022-04-08 09:28:07','https://sawyou.kro.kr/upload/post/134/postImage.jpg',1),(62,76,151,'K-인디아나존스','아마존','아마존 탐험 중 한 컷... 발 밑에 악어가 있습니다.','0x350e1623e4330ffe0ecf345f5983a1a8d660bdad',134,'2022-04-08 09:35:50','https://sawyou.kro.kr/upload/post/151/postImage.png',1),(63,77,141,'K-인디아나존스','나무에 걸린 구름','어느 날 오후에 찍은 나무에 걸린 구름','0x8e0487e890357c4883a0e2371de0a92127d885d2',135,'2022-04-08 09:37:09','https://sawyou.kro.kr/upload/post/141/postImage.jpg',0);
/*!40000 ALTER TABLE `nft` ENABLE KEYS */;
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

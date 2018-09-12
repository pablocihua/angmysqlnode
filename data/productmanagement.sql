/*
SQLyog Community v12.01 (64 bit)
MySQL - 5.7.19-0ubuntu0.16.04.1 : Database - productmanagement
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`productmanagement` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `productmanagement`;

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `ProductCategory_FK` int(11) DEFAULT NULL,
  `ProductCost` float NOT NULL,
  `Name` varchar(200) NOT NULL,
  `Description` text,
  `CreatedDt` datetime NOT NULL,
  `IsActive` tinyint(1) NOT NULL,
  `UpdatedDt` datetime DEFAULT NULL,
  `ProductPrice` float NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `FKC_Product_to_ProductCategory_idx` (`Id`,`ProductCategory_FK`),
  KEY `FKC_Product_to_ProductCategory` (`ProductCategory_FK`),
  CONSTRAINT `FKC_Product_to_ProductCategory` FOREIGN KEY (`ProductCategory_FK`) REFERENCES `productcategory` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `product` */

/*Table structure for table `productcategory` */

DROP TABLE IF EXISTS `productcategory`;

CREATE TABLE `productcategory` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(100) NOT NULL,
  `Details` varchar(200) DEFAULT NULL,
  `IsValid` tinyint(1) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `ModifiedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `idx_productocategory_CreatedDate` (`CreatedDate`) COMMENT 'Added Index on the createdate'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `productcategory` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

DROP DATABASE IF EXISTS friendy;
CREATE DATABASE friendy;
USE friendy;

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`(
	`id` varchar(256) PRIMARY KEY,
	`nome` varchar(64) UNIQUE NOT NULL,
  `senha` varchar(60) NOT NULL
);

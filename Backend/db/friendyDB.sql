DROP DATABASE IF EXISTS friendy;
CREATE DATABASE friendy;
USE friendy;

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`(
	`id` varchar(256) PRIMARY KEY,
	`nome` varchar(64) UNIQUE NOT NULL,
  `senha` varchar(60) NOT NULL
);

DROP TABLE IF EXISTS `conversa`;
CREATE TABLE `conversa`(
	`id` varchar(256) PRIMARY KEY,
	`destinatario` varchar(256) NOT NULL,
	`remetente` varchar(256) NOT NULL
);

DROP TABLE IF EXISTS `mensagem`;
CREATE TABLE `mensagem`(
	`id` varchar(256) PRIMARY KEY,
	`remetente_id` varchar(256) NOT NULL,
	`remetente_nome` varchar(256) NOT NULL,
  	`texto` varchar(256) NOT NULL,
	`conversa_id` varchar(256),
	`created_at` DATETIME,
	CONSTRAINT fk_conversaId FOREIGN KEY (conversa_id) REFERENCES conversa (id)
);
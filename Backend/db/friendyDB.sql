DROP DATABASE IF EXISTS friendy;
CREATE DATABASE friendy;
USE friendy;

DROP TABLE IF EXISTS `usuario`;
DROP TABLE IF EXISTS `conversa`;
DROP TABLE IF EXISTS `mensagem`;

CREATE TABLE `usuario`(
	`id` varchar(256) PRIMARY KEY,
	`nome` varchar(64) UNIQUE NOT NULL,
  `senha` varchar(60) NOT NULL
);

CREATE TABLE `conversa`(
	`id` varchar(256) PRIMARY KEY,
	`destinatario` varchar(256) NOT NULL,
	`remetente` varchar(256) NOT NULL
);

CREATE TABLE `mensagem`(
	`id` varchar(256) PRIMARY KEY,
	`destinatario` varchar(256) NOT NULL,
  	`texto` varchar(256) NOT NULL,
	`conversa_id` varchar(256),
	FOREIGN KEY (conversa_id) REFERENCES Conversa(id)
);




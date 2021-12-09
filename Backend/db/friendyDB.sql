DROP DATABASE IF EXISTS friendy;
CREATE DATABASE friendy;
USE friendy;

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`(
	`id` varchar(256) PRIMARY KEY,
	`nome` varchar(64) UNIQUE NOT NULL,
        `senha` varchar(60) NOT NULL,
	`descricao` varchar(256),
	`facebook` varchar(256),
	`instagram` varchar(256),
	`created_at` DATETIME
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
	`destinatario_id` varchar(256) NOT NULL,
	`remetente_id` varchar(256) NOT NULL,
	`remetente_nome` varchar(256) NOT NULL,
  	`texto` varchar(256) NOT NULL,
	`conversa_id` varchar(256),
	`created_at` DATETIME,
	CONSTRAINT fk_conversaId FOREIGN KEY (conversa_id) REFERENCES conversa (id)
);

DROP TABLE IF EXISTS `usuario_segue_usuario`;
CREATE TABLE `usuario_segue_usuario`(
	`id` varchar(256) PRIMARY KEY,
	`usuario` varchar(256) NOT NULL,
	`segue` varchar(256) NOT NULL,
	CONSTRAINT fk_usuario FOREIGN KEY (usuario) REFERENCES usuario (id) ON DELETE CASCADE,
	CONSTRAINT fk_segue FOREIGN KEY (segue) REFERENCES usuario (id) ON DELETE CASCADE
);

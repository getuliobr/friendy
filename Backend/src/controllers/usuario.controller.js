const { compareToHash } = require('../utils/hash');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
require('dotenv').config();

exports.login = async (req, res) => {
  try {
    const { nome, senha } = req.body;
    
    const dados = await Usuario.scope('login').findOne({
      where: { nome }
    });

    const { senha: senhaUsuario } = dados;
    const usuario = {
      id: dados.id,
      nome: dados.nome,
    };

    if(!usuario) {
      return res.status(401).send({
        message: 'Usuário ou senha incorretos/não existem!'
      });
    }
    

    const isValid = compareToHash(senha, senhaUsuario);

    if(!isValid) {
      return res.status(401).send({
        message: 'Usuário ou senha incorretos/não existem!'
      });
    }

    const { id } = usuario;

    const token = jwt.sign({
      id,
      nome,
    }, process.env.SECRET, {
      expiresIn: '14d'
    });

    res.status(200).send({
      token,
      usuario
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

exports.create = async (req, res) => {
  try {
    const { nome, senha } = req.body;

    const usuario = await Usuario.create({
      nome,
      senha
    });

    const { id } = usuario;

    const token = jwt.sign({
      id,
      nome,
    }, process.env.SECRET, {
      expiresIn: '14d'
    });
    
    res.status(200).send({
      usuario: {
        id,
        nome
      },
      token
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

exports.findByID = async (req, res) => {
  try{
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    res.status(200).send(usuario || {});
  } catch (error) { 
    res.status(500).send({
      message: error.message
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const usuario = await Usuario.findAll();
    res.status(200).send(usuario);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};
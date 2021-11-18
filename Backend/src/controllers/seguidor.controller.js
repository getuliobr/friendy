const UsuarioSegueUsuario = require('../models/usuarioSegueUsuario.model');
const Usuario = require('../models/usuario.model');
require('dotenv').config();


// USUARIO SEGUE ALGUEM

exports.seguirDeseguir = async (req, res) => {
  try {
    const { id } = req.body;
    const { id: usuario } = req.usuario;

    if (id === usuario) {
      return res.status(400).send({
        message: 'Você não pode seguir você mesmo.',
      });
    }

    const seguir = await Usuario.findOne({
      where: { id }
    });

    if(!seguir) {
      return res.status(400).send({
        message: 'Usuário não encontrado'
      });
    }

    const usuarioSegueUsuario = await UsuarioSegueUsuario.findOne({
      where: {
        usuario,
        segue: id,
      }
    });

    if (usuarioSegueUsuario) {
      await usuarioSegueUsuario.destroy();
      return res.status(200).send({
        message: `Você parou de seguir ${seguir.nome} com sucesso`
      });
    }

    await UsuarioSegueUsuario.create({
      usuario,
      segue: id,
    });

    res.status(200).send({
      message: `Agora você segue ${seguir.nome}`
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

exports.listarSeguidores = async (req, res) => {
  try {
    const { id } = req.usuario;
    const seguidores = await UsuarioSegueUsuario.findAll({
      where: {
        segue: id,
      },
      include: [{
        model: Usuario,
        as: 'seguidor',
      }],
    });

    res.status(200).send(seguidores);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

exports.listarSeguindo = async (req, res) => {
  try {
    const { id } = req.usuario;
    const seguidores = await UsuarioSegueUsuario.findAll({
      where: {
        usuario: id,
      },
      include: [{
        model: Usuario,
        as: 'seguindo',
      }],
    });

    res.status(200).send(seguidores);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}
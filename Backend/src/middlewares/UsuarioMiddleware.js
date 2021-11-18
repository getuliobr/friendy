const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const { SECRET } = process.env;
    const token = req.headers.authorization;
    const user = jwt.verify(token, SECRET);
    const usuario = await Usuario.findByPk(user.id);
    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: 'Sua autenticação falhou!'
    });
  }
}
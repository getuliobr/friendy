const Usuario = require('../controllers/usuario.controller');
module.exports = (app) => {
  // Autentica usuario
  app.post('/usuario/login', Usuario.login);
  // Cria usuario
  app.post('/usuario/cadastrar', Usuario.create);
  // Procura Usuario
  app.get('/usuario/:id', Usuario.findByID);
  // Procura Usuarios
  app.get('/usuario', Usuario.findAll);
}
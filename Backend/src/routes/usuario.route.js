const Usuario = require('../controllers/usuario.controller');
const UserMiddleware = require('../middlewares/UsuarioMiddleware');

module.exports = (app) => {
  // Autentica usuario
  app.post('/usuario/login', Usuario.login);
  // Cria usuario
  app.post('/usuario/cadastrar', Usuario.create);
  // Atualiza usuario
  app.patch('/usuario/atualizar', UserMiddleware, Usuario.update);
  // Procura Usuario
  app.get('/usuario/:id', UserMiddleware, Usuario.findByID);
  // Procura Usuarios
  app.get('/usuario', UserMiddleware, Usuario.findAll);
}
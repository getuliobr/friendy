const UserMiddleware = require('../middlewares/UsuarioMiddleware');
const Seguidor = require('../controllers/seguidor.controller');

module.exports = (app) => {
  app.post('/seguir', UserMiddleware, Seguidor.seguirDeseguir);
  app.get('/seguidores', UserMiddleware, Seguidor.listarSeguidores);
  app.get('/seguindo', UserMiddleware, Seguidor.listarSeguindo);
}
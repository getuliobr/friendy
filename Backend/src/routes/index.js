const UsuarioRoute = require('./usuario.route');

module.exports = (app) => {
   app.get('/', (req, res) => {
      res.send({ success: true });
   });
   UsuarioRoute(app)
}
const UsuarioRoute = require('./usuario.route');
const ConversaRoute = require('./conversa.route');
const MensagemRoute = require('./mensagem.route');

module.exports = (app) => {
   app.get('/', (req, res) => {
      res.send({ success: true });
   });
   UsuarioRoute(app)
   ConversaRoute(app)
   MensagemRoute(app)
}
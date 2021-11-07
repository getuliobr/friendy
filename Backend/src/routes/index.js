const UsuarioRoute = require('./usuario.route');
const ConversaRoute = require('./conversa.route');
const MensagemRoute = require('./mensagem.route');

module.exports = (app) => {
   UsuarioRoute(app)
   ConversaRoute(app)
   MensagemRoute(app)
}
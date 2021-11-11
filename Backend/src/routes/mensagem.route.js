const Mensagem = require('../controllers/mensagem.controller');

module.exports = (app) => {
    app.post('/mensagem/enviar', Mensagem.sendMessage);
    app.get('/mensagens/:id', Mensagem.getMessages);
}
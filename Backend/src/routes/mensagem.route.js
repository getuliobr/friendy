const Mensagem = require('../controllers/mensagem.controller');

module.exports = (app) => {
    app.post('/mensagem/enviar', Mensagem.sendMessage);
    app.get('/mensagem/:id', Mensagem.getMessage);
}
const Conversa = require('../controllers/conversa.controller');

module.exports = (app) => {
    app.post('/conversa/criar', Conversa.createConversation);
    app.post('/conversa/:id', Conversa.getConversation);
}
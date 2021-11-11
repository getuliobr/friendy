const Conversa = require('../controllers/conversa.controller');

module.exports = (app) => {
    app.post('/conversa/criar', Conversa.createConversation);
    app.get('/conversa/id/:id', Conversa.getConversation);
}
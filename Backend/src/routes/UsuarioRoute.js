const Usuario = require('../controllers/usuario.controller');
module.exports = (app) => {

   // Cria usuario
   app.post('/usuario/:nome/:senha', Usuario.create);
   // Procura Usuario
   app.get('/usuario/:id', Usuario.findByID);
   // Procura Usuarios
   app.get('/usuarios/', Usuario.findAll);
}
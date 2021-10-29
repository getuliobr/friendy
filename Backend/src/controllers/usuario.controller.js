const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario.model');


exports.create = async (req, res) => {
   const nome = req.params.nome;
   const senhaSemHash = req.params.senha;

   let senhaHash;
   bcrypt.hash(senhaSemHash, 10, function(err, hash){
      senha = hash
   });

   try {
      const usuario = await Usuario.create({
        nome,
        senha
      });
      
      res.send(
         `Usuario ${usuario.nome} cadastrado.\n`
      )
    } catch (err) {
      res.status(500).send(`Error -> ${err}`);
    }
};

exports.findByID = async (req, res) => {
   try{
      const usuario = await Usuario.FindByID();
      res.status(200).send(usuario);
   } catch (error) { 
      res.status(500).send(error);
   }
};

exports.findAll = async (req, res) => {
   try {
     const usuario = await Usuario.findAll();
     res.status(200).send(usuario); // Retorna um Json para a Pagina da API
   } catch (error) {
     res.status(500).send(error);
   }
 };
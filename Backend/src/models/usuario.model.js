const Sequelize = require('sequelize');
const database = require('./database');
const { hash } = require('../utils/hash');

const Usuario = database.define('usuario', {
    id : {
      type : Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement : true,
      allowNull : false,
      primaryKey : true,
      field : "id",
    },
    nome : {
      type : Sequelize.STRING,
      allowNull : false,
      field : "nome",
    },
    senha : {
      type : Sequelize.STRING,
      allowNull : false,
      field : "senha",
    },
  },
  {
    tableName: 'usuario',
    timestamps: false,
    createdAt: false,
    defaultScope: {
      attributes: { exclude: ['senha'] },
    },
    scopes: { // Criar um escopo para o login, onde vai retornar todos os atributos, isso é feito porque o escopo normal não retorna a senha.
      login: {
        attributes: {},
      }
    },
    setterMethods: {
      senha(value) {
        if (value) this.setDataValue('senha', hash(value));
      },
    }
  },
);

module.exports = Usuario;
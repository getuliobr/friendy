const Sequelize = require('sequelize');
const database = require('./database.js');

const Usuario = database.define('usuario',{
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
        // Isso serve para não recriar a tabela e impedir de recriar esses atributos setados como false(timestamps,createdAt)
        tableName: 'usuario',
        timestamps: false,
        createdAt: false,
    }
);

module.exports = Usuario;
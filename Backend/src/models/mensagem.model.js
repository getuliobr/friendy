const Sequelize = require('sequelize');
const database = require('./database');

const Mensagem = database.define('mensagem', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
            field: "id",
        },
        conversaId: {
            type: Sequelize.UUID,
            allowNull: false,
            field: "conversa_id",
        },
        destinatario: {
            type: Sequelize.UUID,
            allowNull: false,
            field: "destinatario",
        },
        texto: {
            type: Sequelize.STRING,
            allowNull: false,
            field: "texto",
        },
    },
    {
        tableName: 'mensagem',
        timestamps: false,
        createdAt: false,
        scopes: {
            mensagem: {
              attributes: {},
            }
        },
    }
);

module.exports = Mensagem;
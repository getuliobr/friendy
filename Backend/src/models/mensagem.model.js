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
        destinatarioId: {
            type: Sequelize.UUID,
            allowNull: false,
            field: "destinatario_id",
        },
        remetenteId: {
            type: Sequelize.UUID,
            allowNull: false,
            field: "remetente_id",
        },
        remetenteNome: {
            type: Sequelize.STRING,
            allowNull: false,
            field: "remetente_nome",
        },
        texto: {
            type: Sequelize.STRING,
            allowNull: false,
            field: "texto",
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            field: 'created_at',
        },
    },
    {
        tableName: 'mensagem',
        timestamps: false,
        createdAt: true,
        scopes: {
            mensagem: {
              attributes: {},
            }
        },
    }
);

module.exports = Mensagem;
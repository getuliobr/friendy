const Sequelize = require('sequelize');
const database = require('./database');

const Conversa = database.define('conversa', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        field: "id",
    },
    destinatario: {
        type: Sequelize.UUID,
        allowNull: false,
        field: "destinatario",
    },
    remetente: {
        type: Sequelize.UUID,
        allowNull: false,
        field: "remetente",
    },
}, {
    tableName: 'conversa',
    timestamps: false,
    createdAt: false,
    scopes: {
        conversa: {
          attributes: {},
        }
    },
});

module.exports = Conversa;
const Sequelize = require('sequelize');
const database = require('./database');

const UsuarioSegueUsuario = database.define('UsuarioSegueUsuario', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        field: "id",
    },
    usuario: {
        type: Sequelize.UUID,
        allowNull: false,
        field: "usuario",
        references: {
          model: 'usuario',
          key: 'id'
        }
    },
    segue: {
      type: Sequelize.UUID,
      allowNull: false,
      field: "segue",
      references: {
        model: 'usuario',
        key: 'id'
      }
    },
}, {
    tableName: 'usuario_segue_usuario',
    timestamps: false,
    createdAt: false,
    scopes: {
        seguidos: {
          attributes: {},
        }
    },
});

module.exports = UsuarioSegueUsuario;
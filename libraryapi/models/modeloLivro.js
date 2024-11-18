var { DataTypes } = require('sequelize');
var { sequelize } = require('../config/database');

var Livro = sequelize.define('Livro', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    anoPublicacao: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    disponibilidade: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'Livros',
    timestamps: false
});

module.exports = Livro;
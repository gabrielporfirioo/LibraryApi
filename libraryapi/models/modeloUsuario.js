var { DataTypes, Sequelize } = require('sequelize');
var { sequelize } = require('../config/database');

var Usuario = sequelize.define('Usuario', {
    id:{
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false   
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuario;
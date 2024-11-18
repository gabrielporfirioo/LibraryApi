var { DataTypes } = require('sequelize');
var { sequelize } = require('../config/database');
var Usuario = require('./modeloUsuario');
var Livro = require('./modeloLivro');

var Emprestimo = sequelize.define('Emprestimo', {
    usuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    livroId: {
        type: DataTypes.INTEGER,
        references: {
            model: Livro,
            key: 'id'
        }
    },
    emprestimoData: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    devolucaoData: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.ENUM('alugado', 'devolvido'),
        defaultValue: 'alugado'
    }
}, {
    tableName: 'emprestimos',
    timestamps: false
});

Usuario.hasMany(Emprestimo, { foreignKey: 'usuarioId' });
Livro.hasMany(Emprestimo, { foreignKey: 'livroId' });
Emprestimo.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Emprestimo.belongsTo(Livro, { foreignKey: 'livroId' });

module.exports = Emprestimo;
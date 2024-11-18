const { sequelize } = require('../config/database');
const Emprestimo = require('../models/modeloEmprestimo');
const Livro = require('../models/modeloLivro');
const Usuario = require('../models/modeloUsuario')

exports.livrosMaisEmprestados = async (req, res) => {
    try {
        const livros = await Emprestimo.findAll({
            attributes: [
                'livroId',
                [sequelize.fn('COUNT', sequelize.col('livroId')), 'totalEmprestimos']
            ],
            include: [{ model: Livro, attributes: ['titulo'] }],
            group: ['livroId', 'Livro.id'],
            order: [[sequelize.fn('COUNT', sequelize.col('livroId')), 'DESC']],
            limit: 10 // Retorna os 10 mais emprestados
        });

        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao gerar relatório', error });
    }
};

const { Op } = require('sequelize');

exports.emprestimosAtrasados = async (req, res) => {
    try {
        const emprestimos = await Emprestimo.findAll({
            where: {
                devolucaoData: {
                    [Op.lt]: new Date() // Data de devolução menor que hoje
                },
                status: 'alugado' // Status ainda não devolvido
            },
            include: [
                { model: Usuario, attributes: ['nome'] },
                { model: Livro, attributes: ['titulo'] }
            ]
        });

        res.status(200).json(emprestimos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao gerar relatório', error });
    }
};

//a+

exports.resumoGeral = async (req, res) => {
    try {
        const totalUsuarios = await Usuario.count();
        const totalLivros = await Livro.count();
        const totalEmprestimos = await Emprestimo.count();

        res.status(200).json({
            totalUsuarios,
            totalLivros,
            totalEmprestimos
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao gerar relatório', error });
    }
};
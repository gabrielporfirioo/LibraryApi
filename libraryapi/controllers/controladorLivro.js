var Livro = require('../models/modeloLivro');

exports.criarLivro = async (req, res) => {
    try {
        var livro = await Livro.create(req.body);
        res.status(201).json(livro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.buscarLivros = async (req, res) => {
    try {
        var livros = await Livro.findAll();
        res.status(200).json(livros);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.buscarIdLivro = async (req, res) => {
    try {
        var livro = await Livro.findByPk(req.params.id);
        if (!livro) return res.status(404).json({ message: 'Livro não encontrado!' });
        res.status(200).json(livro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.atualizarLivro = async (req, res) => {
    try {
        var [atualizado] = await Livro.update(req.body, { where: { id: req.params.id } });
        if (atualizado) {
            var livroAtualizado = await Livro.findByPk(req.params.id);
            res.status(200).json(livroAtualizado);
        } else {
            res.status(404).json({ message: 'Livro não encontrado!' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removerLivro = async (req, res) => {
    try {
        var removido = await Livro.destroy({ where: { id: req.params.id } });
        if (removido) {
            res.status(200).json({ message: 'Livro removido!' });
        } else {
            res.status(404).json({ message: 'Livro não encontrado!' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
var Livro = require('../models/modeloLivro'); // Importa o modelo livros

exports.criarLivro = async (req, res) => { // Cria um novo livro
    try {
       var livro = await Livro.create({
            titulo: req.body.titulo,
            autor: req.body.autor,
            genero: req.body.genero,
            anoPublicacao: req.body.anoPublicacao,
            disponibilidade: req.body.disponibilidade
        })
        res.status(201).json(livro)
    } catch (error) {
        res.status(400).json({message:'Erro ao cadastrar o livro. Por favor, confira se os campos foram preenchidos corretamente. Detalhes do erro: ' +error.message})
    }
};

exports.buscarLivros = async (req, res) => { // Busca por todos os livros
    try {
        var livros = await Livro.findAll()
        res.status(200).json(livros)
    } catch (error) {
        res.status(400).json({message:  'Erro ao buscar os livros. Detalhes do erro: ' +error.message });
    }
    
};

exports.buscarIdLivro = async (req, res) => { // Busca um livro pelo Id
    try {
        var livro = await Livro.findByPk(req.params.id);
        if (!livro) return res.status(404).json({ message: 'Livro não encontrado!'});
        res.status(200).json(livro);
    } catch (error) {
        res.status(400).json({message: 'Erro ao buscar o livro. Detalhes do erro: '+ error.message});
    }
};

exports.atualizarLivro = async (req, res) => { // Atualiza um livro pelo Id
    try {
        var atualizado = await Livro.update({ 
            titulo: req.body.titulo,
            autor: req.body.autor,
            genero: req.body.genero,
            anoPublicacao: req.body.anoPublicacao
        },
        {
            where: {
                id: req.params.id
            }
        })
        if(atualizado){
            var livroAtualizado = await Livro.findByPk(req.params.id)
            res.status(200).json(livroAtualizado)
        }else(res.status(404).json({ message: 'Livro não encontrado!' }))
        
    } catch (error) {
        res.status(400).json({message:'Erro ao atualizar o livro. Por favor, confira se os campos foram preenchidos corretamente. Detalhes do erro: ' +error.message});
    }
};

exports.removerLivro = async (req, res) => { // Remove um livro pelo Id
    try {
        var removido = await Livro.destroy({ where: { id: req.params.id } });
        if (removido) {
            res.status(200).json({ message: 'Livro removido!' });
        } else {
            res.status(404).json({ message: 'Livro não encontrado!' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Erro ao remover o livro. Detalhes do erro: '+error.message});
    }
};
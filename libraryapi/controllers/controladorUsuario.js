var Usuario = require('../models/modeloUsuario');

exports.criarUsuario = async (req, res) => {
    // //FORMA APENAS BACK:
    try {
        var usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    // //FORMA VISUAL:
    // try {
    //     await Usuario.create(req.body);
    //     res.render('sucesso'); // Renderiza uma página de sucesso
    //   } catch (error) {
    //     res.status(400).send('Erro ao criar usuário');
    //   }
};

exports.buscarUsuarios = async (req, res) => {
    //FORMA APENAS BACK:
    try {
        var usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

    // //FORMA VISUAL: 
    // try {
    //     const usuarios = await Usuario.findAll();
    //     res.render('usuario', { usuarios }); // Renderiza a página com os dados
    //   } catch (error) {
    //     res.status(500).send('Erro ao carregar os usuários');
    //   }
};

exports.buscarIdUsuario = async (req, res) => {
    try {
        var usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado!' });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.atualizarUsuario = async (req, res) => {
    try {
        var [atualizado] = await Usuario.update(req.body, { where: { id: req.params.id } });
        if (atualizado) {
            var usuarioAtualizado = await Usuario.findByPk(req.params.id);
            res.status(200).json(usuarioAtualizado);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado!' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removerUsuario = async (req, res) => {
    try {
        var removido = await Usuario.destroy({ where: { id: req.params.id } });
        if (removido) {
            res.status(200).json({ message: 'Usuário removido!' });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado!' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
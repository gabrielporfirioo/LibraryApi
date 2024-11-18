var Livro = require('../models/modeloLivro')
var Usuario = require('../models/modeloUsuario')
var Emprestimo = require('../models/modeloEmprestimo')

exports.criarEmprestimo = async (req, res) => {
  try {
      const { usuarioId, livroId } = req.body;
      const emprestimosAtivos = await Emprestimo.count({
          where: {
              usuarioId,
              status: 'alugado'
          }
      });
      if (emprestimosAtivos >= 3) {
          return res.status(400).json({
              message: `O usuário já possui ${emprestimosAtivos} empréstimos ativos. Limite máximo é de 3 livros.`
          });
      }
      const novoEmprestimo = await Emprestimo.create({ usuarioId, livroId });
      res.status(201).json(novoEmprestimo);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

exports.buscarEmprestimos = async (req,res) =>{
    try {
        const emprestimos = await Emprestimo.findAll({
          include: [
            { model: Livro },
            { model: Usuario } 
          ]
        });
        res.status(200).json(emprestimos);
      } catch (error) {
        res.status(500).json({error});
      }
}
exports.buscarIdEmprestimo = async(req,res)=>{
    try {
        const { id } = req.params;
        const emprestimo = await Emprestimo.findByPk(id, {
          include: [
            { model: Livro },
            { model: Usuario }
          ]
        });
  
        if (!emprestimo) {
          return res.status(404).json({ error: 'Empréstimo não encontrado' });
        }
  
        res.status(200).json(emprestimo);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o empréstimo' });
      }
}
exports.atualizarEmprestimo = async(req,res)=>{
    try {
        const { id } = req.params;
        const { usuarioId, livroId, emprestimoData, devolucaoData } = req.body;
  
        const emprestimo = await Emprestimo.findByPk(id);
        if (!emprestimo) {
          return res.status(404).json({ error: 'Empréstimo não encontrado' });
        }
  
        await emprestimo.update({ usuarioId, livroId, emprestimoData, devolucaoData });
        res.status(200).json(emprestimo);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar empréstimo' });
      }
}

exports.removerEmprestimo = async(req,res)=>{
    try {
        const { id } = req.params;
        const emprestimo = await Emprestimo.findByPk(id);
  
        if (!emprestimo) {
          return res.status(404).json({ error: 'Empréstimo não encontrado' });
        }
  
        await emprestimo.destroy();
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir empréstimo' });
      }
}
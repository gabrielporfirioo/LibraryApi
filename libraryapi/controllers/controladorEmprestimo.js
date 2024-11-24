var Livro = require('../models/modeloLivro') // IMPORTA o modelo Livro
var Usuario = require('../models/modeloUsuario') // Importa o modelo usuário
var Emprestimo = require('../models/modeloEmprestimo') // Importa o modelo empréstimo

exports.criarEmprestimo = async (req, res) => { //Cria um novo empréstimo
  try {
      var { usuarioId, livroId } = req.body;
      var livro = await Livro.findByPk(livroId);
      var usuario = await Usuario.findByPk(usuarioId)
      var emprestimosAtivos = await Emprestimo.count({
          where: {
              usuarioId,
              status: 'alugado'
          }
      });
      if(!livro){
        return res.status(404).json({
          message: 'Livro não encontrado!'
        })
      }
      if(!usuario){
        return res.status(404).json({
          message: 'Usuário não encontrado'
        })
      }
      if (emprestimosAtivos >= 3) {
          return res.status(400).json({
              message: `O usuário já possui ${emprestimosAtivos} empréstimos ativos. Limite máximo é de 3 livros.`
          });
      }
      if(!livro.disponibilidade){
        return res.status(400).json({
          message: 'O livro não esta disponível no momento!'
        })
      }
      var novoEmprestimo = await Emprestimo.create({ usuarioId, livroId });
      res.status(201).json(novoEmprestimo);
  } catch (error) {
      res.status(400).json({ message: 'Não foi possível criar o empréstimo. Por favor, confira se os campos foram preenchidos corretamente. Detalhes do erro: ' + error.message});
  }
};

exports.buscarEmprestimos = async (req,res) =>{ //Busca por todos os empréstimos
    try {
        var emprestimos = await Emprestimo.findAll({
          include: [
            { model: Livro },
            { model: Usuario } 
          ]
        });
        res.status(200).json(emprestimos);
      } catch (error) {
        res.status(400).json({message:'Erro ao buscar os livros. Detalhes do erro: ' +error.message });
      }
}
exports.buscarIdEmprestimo = async(req,res)=>{ // Busca um empréstimo pelo Id
    try {
        var emprestimo = await Emprestimo.findByPk(req.params.id, {
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
        res.status(400).json({ message:'Erro ao buscar o empréstimo. Detalhes do erro: '+ error.message});
      }
}
exports.atualizarEmprestimo = async(req,res)=>{ // Atualiza um empréstimo pelo Id
    try {
      var atualizado = await Emprestimo.update({
        usuarioId: req.body.usuarioId,
        livroId: req.body.livroId,
        emprestimoData: req.body.emprestimoData,
        devolucaoData: req.body.devolucaoData
      },
      {
        where: {
          id:req.params.id
        }
      }
      )
      if (atualizado) {
        var emprestimoAtualizado = await Emprestimo.findByPk(req.params.id)
        res.status(200).json(emprestimoAtualizado)
      }else {
        res.status(404).json({message:'Empréstimo não encontrado!'})
      }
    } catch (error) {
      res.status(400).json({message:'Erro ao atualizar o empréstimo. Por favor, confira se os campos foram preenchidos corretamente. Detalhes do erro: '+error.message})
    }
}

exports.removerEmprestimo = async(req,res)=>{ // Remove um empréstimo pelo Id
    // try {
    //     var { id } = req.params;
    //     var emprestimo = await Emprestimo.findByPk(id);
  
    //     if (!emprestimo) {
    //       return res.status(404).json({ error: 'Empréstimo não encontrado' });
    //     }
  
    //     await emprestimo.destroy();
    //     res.status(200).send();
    //   } catch (error) {
    //     res.status(400).json({ error: 'Erro ao excluir empréstimo' });
    //   }
    try {
      var removido = await Emprestimo.destroy({where:{id:req.params.id}})
      if(removido){
        res.status(200).json({message:'Empréstimo removido!'})
      }else{
        res.status(404).json({message:'Empréstimo não encontrado!'})
      }
    } catch (error) {
      res.status(400).json({ message: 'Erro ao remover o emprésitmo!'});
    }
}
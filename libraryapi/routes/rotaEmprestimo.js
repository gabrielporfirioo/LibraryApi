var express = require('express');
var router = express.Router();
var controladorEmprestimo = require('../controllers/controladorEmprestimo');

router.post('/', controladorEmprestimo.criarEmprestimo);
router.get('/', controladorEmprestimo.buscarEmprestimos);
router.get('/:id', controladorEmprestimo.buscarIdEmprestimo);
router.put('/:id', controladorEmprestimo.atualizarEmprestimo);
router.delete('/:id', controladorEmprestimo.removerEmprestimo);

module.exports = router;
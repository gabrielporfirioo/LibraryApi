var express = require('express');
var router = express.Router();
var controladorLivro = require('../controllers/controladorLivro');

router.post('/', controladorLivro.criarLivro);
router.get('/', controladorLivro.buscarLivros);
router.get('/:id', controladorLivro.buscarIdLivro);
router.put(':id', controladorLivro.atualizarLivro);
router.delete('/:id', controladorLivro.removerLivro);

module.exports = router;
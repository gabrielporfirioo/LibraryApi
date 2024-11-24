var express = require('express');
var router = express.Router();
var controladorLivro = require('../controllers/controladorUsuario');

router.post('/', controladorLivro.criarUsuario);
router.get('/', controladorLivro.buscarUsuarios);
router.get('/:id', controladorLivro.buscarIdUsuario);
router.put('/:id', controladorLivro.atualizarUsuario);
router.delete('/:id', controladorLivro.removerUsuario);

module.exports = router;
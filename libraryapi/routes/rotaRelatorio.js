const express = require('express');
const router = express.Router();
const controladorRelatorio = require('../controllers/controladorRelatorio');

router.get('/', controladorRelatorio.resumoGeral); // a+
router.get('/mais-emprestados', controladorRelatorio.livrosMaisEmprestados);
router.get('/atrasos', controladorRelatorio.emprestimosAtrasados);

module.exports = router;
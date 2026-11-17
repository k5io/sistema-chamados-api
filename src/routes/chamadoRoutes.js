const express = require('express');
const router = express.Router();
const chamadoController = require('../controllers/chamadoController');

// Como o server.js já adiciona /chamados, aqui usamos apenas /
router.get('/', chamadoController.listarChamados);
router.post('/', chamadoController.criarChamado);
router.put('/:id', chamadoController.atualizarChamado);
router.delete('/:id', chamadoController.deletarChamado);

module.exports = router;
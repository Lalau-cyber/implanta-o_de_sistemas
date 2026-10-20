const express = require('express');
const router = express.Router();

const candidatoController = require('../controllers/candidatoController');
const usuarioController = require('../controllers/usuarioController');

router.post('/candidatos', candidatoController.Criar);
router.get('/candidatos', candidatoController.Listar);
router.post('/usuario', usuarioController.Criar);
router.get('/usuario', usuarioController.Listar);
router.post('/login', usuarioController.login);

module.exports = router;
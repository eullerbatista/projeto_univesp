const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

router.post('/Usuarios', UsuarioController.create);
router.get('/Usuarios', UsuarioController.list);

module.exports = router;
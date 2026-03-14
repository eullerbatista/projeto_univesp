const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const validarUsuario = require('../validators/usuarioValidator');

// CREATE
router.post('/usuarios', validarUsuario, UsuarioController.create);

// READ
router.get('/usuarios', UsuarioController.list);
router.get('/usuarios/:id', UsuarioController.getById);

// UPDATE
router.put('/usuarios/:id', validarUsuario, UsuarioController.update);

// DELETE
router.delete('/usuarios/:id', UsuarioController.delete);

module.exports = router;

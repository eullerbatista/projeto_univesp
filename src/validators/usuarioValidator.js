const { check, validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

const validarUsuario = [
  check('nome')
    .notEmpty().withMessage('O nome é obrigatório')
    .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres'),

  check('email')
    .notEmpty().withMessage('O email é obrigatório')
    .isEmail().withMessage('Formato de email inválido')
    .custom(async (value) => {
      const usuario = await Usuario.findOne({ where: { email: value } });
      if (usuario) {
        throw new Error('Este email já está cadastrado');
      }
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }
    next();
  }
];

module.exports = validarUsuario;

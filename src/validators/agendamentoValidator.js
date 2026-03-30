const { check, validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

const validarAgendamento = [
  check('titulo')
    .notEmpty().withMessage('O título é obrigatório')
    .isLength({ min: 3 }).withMessage('O título deve ter pelo menos 3 caracteres'),

  check('dataHora')
    .notEmpty().withMessage('A data e hora são obrigatórias')
    .isISO8601().withMessage('Formato de data inválido (use padrão ISO 8601)'),

  check('usuarioId')
    .notEmpty().withMessage('O id do usuário é obrigatório')
    .isInt().withMessage('O id do usuário deve ser um número')
    .custom(async (value) => {
      const usuario = await Usuario.findByPk(value);
      if (!usuario) {
        throw new Error('Usuário não encontrado para o id fornecido');
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

module.exports = validarAgendamento;

const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/AgendamentoController');
const validarAgendamento = require('../validators/agendamentoValidator');

// CREATE
router.post('/agendamentos', validarAgendamento, AgendamentoController.create);

// READ
router.get('/agendamentos', AgendamentoController.list);
router.get('/agendamentos/:id', AgendamentoController.getById);
router.get('/usuarios/:usuarioId/agendamentos', AgendamentoController.listByUser);

// UPDATE
router.put('/agendamentos/:id', validarAgendamento, AgendamentoController.update);

// DELETE
router.delete('/agendamentos/:id', AgendamentoController.delete);

module.exports = router;

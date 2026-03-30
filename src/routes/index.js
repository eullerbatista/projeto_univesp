const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');
const Especialidade = require('../models/Especialidade');
const Medico = require('../models/Medico');
const Agendamento = require('../models/Agendamento');

router.get('/api/pacientes', async (req, res) => res.json(await Paciente.findAll()));
router.post('/api/pacientes', async (req, res) => res.status(201).json(await Paciente.create(req.body)));
router.put('/api/pacientes/:id', async (req, res) => {
  const model = await Paciente.findByPk(req.params.id);
  if (!model) return res.status(404).json({ error: 'Paciente não encontrado' });
  await model.update(req.body);
  res.json(model);
});
router.delete('/api/pacientes/:id', async (req, res) => {
  const model = await Paciente.findByPk(req.params.id);
  if (!model) return res.status(404).json({ error: 'Paciente não encontrado' });
  await model.destroy();
  res.status(204).end();
});

router.get('/api/especialidades', async (req, res) => res.json(await Especialidade.findAll()));
router.post('/api/especialidades', async (req, res) => res.status(201).json(await Especialidade.create(req.body)));

router.get('/api/medicos', async (req, res) => res.json(await Medico.findAll({ include: 'especialidade' })));
router.post('/api/medicos', async (req, res) => res.status(201).json(await Medico.create(req.body)));

router.get('/api/agendamentos', async (req, res) => res.json(await Agendamento.findAll({ include: ['paciente', 'medico', 'especialidade'] })));
router.post('/api/agendamentos', async (req, res) => {
  const { paciente_id, medico_id, especialidade_id, data, horario } = req.body;
  if (!await Paciente.findByPk(paciente_id)) return res.status(400).json({ error: 'Paciente não encontrado' });
  if (!await Medico.findByPk(medico_id)) return res.status(400).json({ error: 'Médico não encontrado' });
  if (!await Especialidade.findByPk(especialidade_id)) return res.status(400).json({ error: 'Especialidade não encontrada' });
  const existing = await Agendamento.findOne({ where: { medico_id, data, horario } });
  if (existing) return res.status(409).json({ error: 'Horário já reservado para este médico' });
  const agendamento = await Agendamento.create(req.body);
  res.status(201).json(agendamento);
});
router.put('/api/agendamentos/:id', async (req, res) => {
  const model = await Agendamento.findByPk(req.params.id);
  if (!model) return res.status(404).json({ error: 'Agendamento não encontrado' });
  await model.update(req.body);
  res.json(model);
});
router.delete('/api/agendamentos/:id', async (req, res) => {
  const model = await Agendamento.findByPk(req.params.id);
  if (!model) return res.status(404).json({ error: 'Agendamento não encontrado' });
  await model.destroy();
  res.status(204).end();
});

module.exports = router;
const Agendamento = require('../models/Agendamento');
const Usuario = require('../models/Usuario');

module.exports = {
  async create(req, res) {
    try {
      const { titulo, descricao, dataHora, local, usuarioId } = req.body;

      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

      const agendamento = await Agendamento.create({ titulo, descricao, dataHora, local, usuarioId });
      res.status(201).json(agendamento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async list(req, res) {
    try {
      const agendamentos = await Agendamento.findAll();
      res.status(200).json(agendamentos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const agendamento = await Agendamento.findByPk(id);

      if (!agendamento) return res.status(404).json({ error: 'Agendamento não encontrado' });

      res.status(200).json(agendamento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { titulo, descricao, dataHora, local, usuarioId } = req.body;

      const agendamento = await Agendamento.findByPk(id);
      if (!agendamento) return res.status(404).json({ error: 'Agendamento não encontrado' });

      if (usuarioId) {
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      agendamento.titulo = titulo || agendamento.titulo;
      agendamento.descricao = descricao !== undefined ? descricao : agendamento.descricao;
      agendamento.dataHora = dataHora || agendamento.dataHora;
      agendamento.local = local !== undefined ? local : agendamento.local;
      agendamento.usuarioId = usuarioId || agendamento.usuarioId;

      await agendamento.save();
      res.status(200).json(agendamento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const agendamento = await Agendamento.findByPk(id);
      if (!agendamento) return res.status(404).json({ error: 'Agendamento não encontrado' });

      await agendamento.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async listByUser(req, res) {
    try {
      const { usuarioId } = req.params;
      const agendamentos = await Agendamento.findAll({ where: { usuarioId } });
      res.status(200).json(agendamentos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

const Usuario = require('../models/Usuario');

module.exports = {
  async create(req, res) {
    try {
      const usuario = await Usuario.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async list(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

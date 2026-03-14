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
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      usuario.nome = nome || usuario.nome;
      usuario.email = email || usuario.email;
      await usuario.save();

      res.status(200).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      await usuario.destroy();
      res.status(204).send(); // sem conteúdo
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async getById(req, res) {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

};

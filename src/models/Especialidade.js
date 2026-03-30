const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Especialidade = sequelize.define('Especialidade', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(100), allowNull: false, unique: true }
}, {
  tableName: 'especialidades',
  timestamps: false
});

module.exports = Especialidade;
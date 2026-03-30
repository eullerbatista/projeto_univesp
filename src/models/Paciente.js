const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Paciente = sequelize.define('Paciente', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  telefone: { type: DataTypes.STRING(20) },
  email: { type: DataTypes.STRING(100) }
}, {
  tableName: 'pacientes',
  timestamps: false
});

module.exports = Paciente;
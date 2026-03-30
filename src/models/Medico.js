const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Especialidade = require('./Especialidade');

const Medico = sequelize.define('Medico', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  especialidade_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'medicos',
  timestamps: false
});

Medico.belongsTo(Especialidade, { foreignKey: 'especialidade_id', as: 'especialidade' });

module.exports = Medico;
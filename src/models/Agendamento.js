const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Paciente = require('./Paciente');
const Medico = require('./Medico');
const Especialidade = require('./Especialidade');

const Agendamento = sequelize.define('Agendamento', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  paciente_id: { type: DataTypes.INTEGER, allowNull: false },
  medico_id: { type: DataTypes.INTEGER, allowNull: false },
  especialidade_id: { type: DataTypes.INTEGER, allowNull: false },
  data: { type: DataTypes.DATEONLY, allowNull: false },
  horario: { type: DataTypes.TIME, allowNull: false },
  status: { type: DataTypes.STRING(50), defaultValue: 'Agendado' }
}, {
  tableName: 'agendamentos',
  timestamps: false,
  indexes: [{ unique: true, fields: ['medico_id', 'data', 'horario'] }]
});

Agendamento.belongsTo(Paciente, { foreignKey: 'paciente_id', as: 'paciente' });
Agendamento.belongsTo(Medico, { foreignKey: 'medico_id', as: 'medico' });
Agendamento.belongsTo(Especialidade, { foreignKey: 'especialidade_id', as: 'especialidade' });

module.exports = Agendamento;
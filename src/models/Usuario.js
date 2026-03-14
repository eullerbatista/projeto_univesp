const { Sequelize, DataTypes } = require('sequelize');

// Cria a instância do Sequelize usando SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Define o modelo Usuario
const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

// Sincroniza o modelo com o banco de dados
sequelize.sync();


module.exports = Usuario;

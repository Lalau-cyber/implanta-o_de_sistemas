'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define('usuario', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    perfil: DataTypes.STRING
  }, {
    tableName: 'usuarios', // Garante que o Sequelize procure na tabela minúscula correta
    timestamps: false       // Ajuste para true se tiver colunas createdAt/updatedAt
  });

  return usuario;
};
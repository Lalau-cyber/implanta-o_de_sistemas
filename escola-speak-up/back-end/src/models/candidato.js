'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Candidato extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Candidato.init({
    nome: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    pontuacao: DataTypes.INTEGER,
    nivelResultado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Candidato',
  });
  return Candidato;
};
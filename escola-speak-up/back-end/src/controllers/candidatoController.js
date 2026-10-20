const { Candidato } = require('../models');

module.exports = {
  // Criar candidato
  async Criar(req, res) {
    try {
      console.log("=== DADOS RECEBIDOS DO FRONTEND ===");
      console.log(req.body);

      const { nome, telefone, email, pontuacao, nivelResultado } = req.body;

      // Criação no banco de dados usando o Model do Sequelize
      const novoCandidato = await Candidato.create({
        nome,
        telefone,
        email,
        pontuacao: Number(pontuacao),
        nivelResultado
      });

      console.log("=== CANDIDATO SALVO COM SUCESSO NO BANCO ===");
      console.log(novoCandidato.toJSON());

      return res.status(201).json({
        mensagem: 'Candidato registrado com sucesso!',
        candidato: novoCandidato
      });
    } catch (error) {
      console.error('❌ ERRO DETALHADO AO SALVAR NO POSTGRESQL:', error);
      return res.status(500).json({ 
        erro: 'Erro ao salvar candidato', 
        detalhes: error.message 
      });
    }
  },

  // Listar candidatos
  async Listar(req, res) {
    try {
      const candidatos = await Candidato.findAll();
      return res.status(200).json(candidatos);
    } catch (error) {
      console.error('Erro ao listar candidatos:', error);
      return res.status(500).json({ erro: 'Erro interno ao buscar dados.' });
    }
  }
};
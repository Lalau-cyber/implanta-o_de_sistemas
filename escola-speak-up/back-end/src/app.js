const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const routes = require('./routes/routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Registar rotas com o prefixo /api
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

// Inicialização da base de dados e do servidor
sequelize.authenticate()
  .then(() => {
    console.log('📦 Conectado ao PostgreSQL com sucesso!');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
  });
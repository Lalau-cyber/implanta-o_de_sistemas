const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models'); // Importa a instância configurada pelo Sequelize CLI
const routes = require('./src/routes/routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

const conectarBanco = async () => {
  if (!sequelize.config.password) {
    throw new Error('DB_PASSWORD não está configurada em back-end/.env.');
  }
  await sequelize.authenticate();
};

app.get('/', (req, res) => {
  res.json({ mensagem: 'API da Escola de Idiomas Speak Up rodando com sucesso!' });
});

app.get('/health', async (req, res) => {
  try {
    await conectarBanco();
    return res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    console.error('❌ Banco de dados indisponível:', error.message);
    return res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

conectarBanco()
  .then(() => {
    console.log('📦 Conectado ao PostgreSQL com sucesso!');
  })
  .catch(error => {
    console.error('❌ Não foi possível conectar ao PostgreSQL:', error.message);
    console.error('Configure a senha correta em back-end/.env usando DB_PASSWORD.');
  });
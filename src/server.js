require('dotenv').config();

const express = require('express');
const cors = require('cors');
const chamadoRoutes = require('./routes/chamadoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Rota base de teste
app.get('/', (req, res) => {
  res.json({ mensagem: 'API do Sistema de Chamados de Suporte Técnico está rodando!' });
});

// Registra as rotas de chamados com o prefixo /chamados
app.use('/chamados', chamadoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});
require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const chamadoRoutes = require('./routes/chamadoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Serve os arquivos estáticos da pasta src/public na rota /
app.use(express.static(path.join(__dirname, 'public')));

// Rota de status da API
app.get('/api-status', (req, res) => {
  res.json({ mensagem: 'API do Sistema de Chamados de Suporte Técnico está rodando!' });
});

// Registra as rotas de chamados com o prefixo /chamados
app.use('/chamados', chamadoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});
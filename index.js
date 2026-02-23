const express = require('express');
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Importa as rotas de usuários
const UsuarioRoutes = require('./src/routes/UsuarioRoutes');

// Usa as rotas com o prefixo /api
app.use('/api', UsuarioRoutes);

// Porta do servidor
const PORT = 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


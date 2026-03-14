//NOTA DE DESENVOLVIMENTO:
//CRUD Completo. Falta apenas adicionar alguns campos extras, como senha, data de nascimento, CRM para médicos, etc. 
//E também implementar autenticação e autorização para proteger as rotas. E implementar ENV para configurar o banco de dados e outras variáveis de ambiente. 
//Estou estudando estrutura do código para deixar o mais limpo e organizado possível, seguindo boas práticas de desenvolvimento ensinados
//em cursos do tic em trilhas.

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


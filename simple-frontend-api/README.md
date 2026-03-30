# Sistema de Agendamento Clínico

Este projeto é um sistema completo de agendamento clínico, composto por backend (API REST) e frontend (HTML/CSS/JS), utilizando Node.js, Express, Sequelize e SQLite.

## Funcionalidades

- **Cadastro de Pacientes**: Nome, telefone, email.
- **Cadastro de Especialidades**: Nome único.
- **Cadastro de Médicos**: Nome e especialidade associada.
- **Agendamento de Consultas**: Paciente, médico, especialidade, data e horário.
- **Consulta e Filtros**: Listar agendamentos com filtros por data, médico e pesquisa por nome.
- **Edição e Exclusão**: Editar ou excluir agendamentos existentes.
- **Validações**: Impede agendamentos duplicados no mesmo horário/médico.

## Estrutura do Projeto

```
projeto_univesp/
├── index.js                 # Servidor principal (Express)
├── src/
│   ├── db.js                # Conexão com banco SQLite
│   ├── models/              # Modelos Sequelize
│   │   ├── Paciente.js
│   │   ├── Especialidade.js
│   │   ├── Medico.js
│   │   └── Agendamento.js
│   └── routes/
│       └── index.js         # Rotas da API (CRUD)
├── public/                  # Frontend
│   ├── index.html           # Página inicial
│   ├── cadastros.html       # Cadastros (pacientes, especialidades, médicos)
│   ├── agendamentos.html    # Agendamentos e consultas
│   ├── styles.css           # Estilos CSS
│   ├── app-cadastros.js     # JS para cadastros
│   └── app-agendamentos.js  # JS para agendamentos
├── package.json             # Dependências
├── .gitignore               # Arquivos ignorados no Git
└── database.sqlite          # Banco de dados (ignorado)
```

## Tecnologias

- **Backend**: Node.js, Express.js, Sequelize ORM, SQLite
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Banco**: SQLite (fácil migração para MySQL/PostgreSQL)

## Instalação e Execução

1. **Clone o repositório**:
   ```
   git clone <URL_DO_REPOSITORIO>
   cd projeto_univesp
   ```

2. **Instale as dependências**:
   ```
   npm install
   ```

3. **Execute o servidor**:
   ```
   node index.js
   ```

4. **Acesse no navegador**:
   - Página inicial: `http://localhost:3000`
   - Cadastros: `http://localhost:3000/cadastros.html`
   - Agendamentos: `http://localhost:3000/agendamentos.html`

## API Endpoints

### Pacientes
- `GET /api/pacientes` - Listar todos
- `POST /api/pacientes` - Criar novo
- `PUT /api/pacientes/:id` - Atualizar
- `DELETE /api/pacientes/:id` - Excluir

### Especialidades
- `GET /api/especialidades` - Listar todas
- `POST /api/especialidades` - Criar nova

### Médicos
- `GET /api/medicos` - Listar todos (com especialidade)
- `POST /api/medicos` - Criar novo

### Agendamentos
- `GET /api/agendamentos` - Listar todos (com joins)
- `POST /api/agendamentos` - Criar novo (valida conflitos)
- `PUT /api/agendamentos/:id` - Atualizar
- `DELETE /api/agendamentos/:id` - Excluir

## Validações

- Paciente: Nome obrigatório, email único.
- Especialidade: Nome único.
- Médico: Especialidade obrigatória.
- Agendamento: Todos campos obrigatórios, horário único por médico/data.

## Desenvolvimento

- **Banco**: Reseta automaticamente em desenvolvimento (`sequelize.sync({ alter: true })`).
- **Frontend**: Páginas separadas para melhor organização.
- **Filtros**: Pesquisa em tempo real, filtros combináveis.

## Contribuição

1. Fork o projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`).
4. Push para a branch (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.

## Licença

Este projeto é licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.

## Autor

Desenvolvido como projeto acadêmico (Univesp).

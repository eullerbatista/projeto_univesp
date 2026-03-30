const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./src/db');
const routes = require('./src/routes');

require('./src/models/Paciente');
require('./src/models/Especialidade');
require('./src/models/Medico');
require('./src/models/Agendamento');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.use(routes);

const PORT = 3000;
async function start() {
  await sequelize.sync();
  app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
}
start();
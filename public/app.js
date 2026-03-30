const API = 'http://localhost:3000/api';
const e = id => document.getElementById(id);

async function get(path) { const r = await fetch(`${API}${path}`); return r.json(); }
async function post(path, body) { const r = await fetch(`${API}${path}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) }); return r.json(); }
async function del(path) { await fetch(`${API}${path}`, { method:'DELETE' }); }

let allAgendamentos = []; // Armazenar todos para filtros

async function fillSelects() {
  const [pacientes, especialidades, medicos] = await Promise.all([
    get('/pacientes'), get('/especialidades'), get('/medicos')
  ]);
  e('paciente').innerHTML = pacientes.map(p => `<option value="${p.id}">${p.nome}</option>`).join('');
  e('especialidade').innerHTML = especialidades.map(s => `<option value="${s.id}">${s.nome}</option>`).join('');
  e('medico').innerHTML = medicos.map(m => `<option value="${m.id}">${m.nome}</option>`).join('');
  e('med-especialidade').innerHTML = especialidades.map(s => `<option value="${s.id}">${s.nome}</option>`).join('');
  e('filtro-medico').innerHTML = `<option value="">Todos</option>` + medicos.map(m => `<option value="${m.id}">${m.nome}</option>`).join('');
}

async function loadAgendamentos() {
  allAgendamentos = await get('/agendamentos');
  renderTable(allAgendamentos);
}

function renderTable(agendamentos) {
  const tbody = e('tabela').querySelector('tbody');
  tbody.innerHTML = agendamentos.map(a => `
    <tr>
      <td>${a.id}</td>
      <td>${a.paciente?.nome || a.paciente_id}</td>
      <td>${a.especialidade?.nome || a.especialidade_id}</td>
      <td>${a.medico?.nome || a.medico_id}</td>
      <td>${a.data}</td>
      <td>${a.horario}</td>
      <td>${a.status}</td>
      <td><button onclick="deleteAgendamento(${a.id})">Excluir</button></td>
    </tr>`).join('');
}

async function saveAgendamento() {
  const body = {
    paciente_id: parseInt(e('paciente').value),
    especialidade_id: parseInt(e('especialidade').value),
    medico_id: parseInt(e('medico').value),
    data: e('data').value,
    horario: e('horario').value
  };
  const result = await post('/agendamentos', body);
  if (result.error) e('feedback').innerText = `Erro: ${result.error}`;
  else e('feedback').innerText = 'Agendamento cadastrado com sucesso';
  await loadAgendamentos();
}

async function savePaciente() {
  const body = {
    nome: e('pac-nome').value,
    telefone: e('pac-telefone').value,
    email: e('pac-email').value
  };
  const result = await post('/pacientes', body);
  if (result.error) e('feedback-pac').innerText = `Erro: ${result.error}`;
  else e('feedback-pac').innerText = 'Paciente cadastrado com sucesso';
  await fillSelects();
}

async function saveEspecialidade() {
  const body = { nome: e('esp-nome').value };
  const result = await post('/especialidades', body);
  if (result.error) e('feedback-esp').innerText = `Erro: ${result.error}`;
  else e('feedback-esp').innerText = 'Especialidade cadastrada com sucesso';
  await fillSelects();
}

async function saveMedico() {
  const body = {
    nome: e('med-nome').value,
    especialidade_id: parseInt(e('med-especialidade').value)
  };
  const result = await post('/medicos', body);
  if (result.error) e('feedback-med').innerText = `Erro: ${result.error}`;
  else e('feedback-med').innerText = 'Médico cadastrado com sucesso';
  await fillSelects();
}

function filtrarAgendamentos() {
  const dataFiltro = e('filtro-data').value;
  const medicoFiltro = e('filtro-medico').value;
  let filtered = allAgendamentos;
  if (dataFiltro) filtered = filtered.filter(a => a.data === dataFiltro);
  if (medicoFiltro) filtered = filtered.filter(a => a.medico_id == medicoFiltro);
  renderTable(filtered);
}

function limparFiltros() {
  e('filtro-data').value = '';
  e('filtro-medico').value = '';
  renderTable(allAgendamentos);
}

window.deleteAgendamento = async function(id) {
  await del(`/agendamentos/${id}`);
  await loadAgendamentos();
};

e('btn-salvar').addEventListener('click', saveAgendamento);
e('btn-salvar-pac').addEventListener('click', savePaciente);
e('btn-salvar-esp').addEventListener('click', saveEspecialidade);
e('btn-salvar-med').addEventListener('click', saveMedico);
e('btn-filtrar').addEventListener('click', filtrarAgendamentos);
e('btn-limpar').addEventListener('click', limparFiltros);

window.addEventListener('load', async () => {
  await fillSelects();
  await loadAgendamentos();
});
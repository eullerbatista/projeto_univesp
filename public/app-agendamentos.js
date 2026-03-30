const API = 'http://localhost:3000/api';
const e = id => document.getElementById(id);

async function get(path) { const r = await fetch(`${API}${path}`); return r.json(); }
async function post(path, body) { const r = await fetch(`${API}${path}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) }); return r.json(); }
async function put(path, body) { const r = await fetch(`${API}${path}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) }); return r.json(); }
async function del(path) { await fetch(`${API}${path}`, { method:'DELETE' }); }

let allAgendamentos = [];
let editingId = null; // ID do agendamento sendo editado

async function fillSelects() {
  const [pacientes, especialidades, medicos] = await Promise.all([
    get('/pacientes'), get('/especialidades'), get('/medicos')
  ]);
  e('paciente').innerHTML = `<option value="">Selecione um paciente</option>` + pacientes.map(p => `<option value="${p.id}">${p.nome}</option>`).join('');
  e('especialidade').innerHTML = `<option value="">Selecione uma especialidade</option>` + especialidades.map(s => `<option value="${s.id}">${s.nome}</option>`).join('');
  e('medico').innerHTML = `<option value="">Selecione um médico</option>` + medicos.map(m => `<option value="${m.id}">${m.nome}</option>`).join('');
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
      <td>
        <button onclick="editAgendamento(${a.id})">Editar</button>
        <button onclick="deleteAgendamento(${a.id})">Excluir</button>
      </td>
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
  let result;
  if (editingId) {
    result = await put(`/agendamentos/${editingId}`, body);
  } else {
    result = await post('/agendamentos', body);
  }
  if (result.error) e('feedback').innerText = `Erro: ${result.error}`;
  else {
    e('feedback').innerText = editingId ? 'Agendamento atualizado com sucesso' : 'Agendamento cadastrado com sucesso';
    // Limpar campos
    e('paciente').value = '';
    e('especialidade').value = '';
    e('medico').value = '';
    e('data').value = '';
    e('horario').value = '';
    editingId = null; // Resetar edição
    e('btn-salvar').innerText = 'Salvar';
  }
  await loadAgendamentos();
}

function filtrarAgendamentos() {
  const pesquisa = e('pesquisa').value.toLowerCase();
  const dataFiltro = e('filtro-data').value;
  const medicoFiltro = e('filtro-medico').value;
  let filtered = allAgendamentos;
  if (pesquisa) {
    filtered = filtered.filter(a =>
      (a.paciente?.nome || '').toLowerCase().includes(pesquisa) ||
      (a.medico?.nome || '').toLowerCase().includes(pesquisa)
    );
  }
  if (dataFiltro) filtered = filtered.filter(a => a.data === dataFiltro);
  if (medicoFiltro) filtered = filtered.filter(a => a.medico_id == medicoFiltro);
  renderTable(filtered);
}

function limparFiltros() {
  e('pesquisa').value = '';
  e('filtro-data').value = '';
  e('filtro-medico').value = '';
  renderTable(allAgendamentos);
  // Resetar edição se estiver ativa
  editingId = null;
  e('btn-salvar').innerText = 'Salvar';
  e('paciente').value = '';
  e('especialidade').value = '';
  e('medico').value = '';
  e('data').value = '';
  e('horario').value = '';
  e('feedback').innerText = '';
}

window.deleteAgendamento = async function(id) {
  await del(`/agendamentos/${id}`);
  await loadAgendamentos();
};

window.editAgendamento = async function(id) {
  const agendamento = allAgendamentos.find(a => a.id === id);
  if (agendamento) {
    e('paciente').value = agendamento.paciente_id;
    e('especialidade').value = agendamento.especialidade_id;
    e('medico').value = agendamento.medico_id;
    e('data').value = agendamento.data;
    e('horario').value = agendamento.horario;
    editingId = id;
    e('btn-salvar').innerText = 'Atualizar';
    e('feedback').innerText = 'Editando agendamento...';
  }
};

e('btn-salvar').addEventListener('click', saveAgendamento);
e('btn-filtrar').addEventListener('click', filtrarAgendamentos);
e('btn-limpar').addEventListener('click', limparFiltros);
e('pesquisa').addEventListener('input', filtrarAgendamentos); // Filtrar em tempo real

window.addEventListener('load', async () => {
  await fillSelects();
  await loadAgendamentos();
});
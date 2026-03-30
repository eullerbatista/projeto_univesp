const API = 'http://localhost:3000/api';
const e = id => document.getElementById(id);

async function get(path) { const r = await fetch(`${API}${path}`); return r.json(); }
async function post(path, body) { const r = await fetch(`${API}${path}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) }); return r.json(); }

async function fillEspecialidades() {
  const especialidades = await get('/especialidades');
  e('med-especialidade').innerHTML = `<option value="">Selecione uma especialidade</option>` + especialidades.map(s => `<option value="${s.id}">${s.nome}</option>`).join('');
}

async function savePaciente() {
  const body = {
    nome: e('pac-nome').value,
    telefone: e('pac-telefone').value,
    email: e('pac-email').value
  };
  const result = await post('/pacientes', body);
  if (result.error) e('feedback-pac').innerText = `Erro: ${result.error}`;
  else {
    e('feedback-pac').innerText = 'Paciente cadastrado com sucesso';
    e('pac-nome').value = '';
    e('pac-telefone').value = '';
    e('pac-email').value = '';
  }
}

async function saveEspecialidade() {
  const body = { nome: e('esp-nome').value };
  const result = await post('/especialidades', body);
  if (result.error) e('feedback-esp').innerText = `Erro: ${result.error}`;
  else {
    e('feedback-esp').innerText = 'Especialidade cadastrada com sucesso';
    e('esp-nome').value = '';
  }
  await fillEspecialidades();
}

async function saveMedico() {
  const body = {
    nome: e('med-nome').value,
    especialidade_id: parseInt(e('med-especialidade').value)
  };
  const result = await post('/medicos', body);
  if (result.error) e('feedback-med').innerText = `Erro: ${result.error}`;
  else {
    e('feedback-med').innerText = 'Médico cadastrado com sucesso';
    e('med-nome').value = '';
    e('med-especialidade').value = '';
  }
}

e('btn-salvar-pac').addEventListener('click', savePaciente);
e('btn-salvar-esp').addEventListener('click', saveEspecialidade);
e('btn-salvar-med').addEventListener('click', saveMedico);

window.addEventListener('load', async () => {
  await fillEspecialidades();
});
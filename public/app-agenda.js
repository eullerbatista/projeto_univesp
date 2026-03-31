const API = 'http://localhost:3000/api';
const e = id => document.getElementById(id);

async function get(path) { const r = await fetch(`${API}${path}`); return r.json(); }

let allAgendamentos = [];
let dataSelecionada = null;

async function carregarDados() {
  const [agendamentos, especialidades] = await Promise.all([
    get('/agendamentos'),
    get('/especialidades')
  ]);
  allAgendamentos = agendamentos;
  
  // Preencher select de especialidades
  e('filtro-esp').innerHTML += especialidades.map(e => `<option value="${e.id}">${e.nome}</option>`).join('');
  
  // Definir mês atual
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  e('filtro-mes').value = `${ano}-${mes}`;
  
  renderizarAgenda();
}

function renderizarAgenda() {
  const mesAno = e('filtro-mes').value;
  const [ano, mes] = mesAno.split('-');
  const especialidadeId = e('filtro-esp').value;
  
  // Filtrar agendamentos do mês
  let agendamentosMes = allAgendamentos.filter(a => {
    const dataParts = a.data.split('-');
    return dataParts[0] === ano && dataParts[1] === mes;
  });
  
  if (especialidadeId) {
    agendamentosMes = agendamentosMes.filter(a => a.especialidade_id == especialidadeId);
  }
  
  // Agrupar por data
  const agendadosPorData = {};
  agendamentosMes.forEach(a => {
    if (!agendadosPorData[a.data]) agendadosPorData[a.data] = [];
    agendadosPorData[a.data].push(a);
  });
  
  // Renderizar conteúdo
  let html = '<h2>Agenda do mês</h2>';
  
  const datas = Object.keys(agendadosPorData).sort();
  if (datas.length === 0) {
    html += '<p>Nenhum agendamento neste período.</p>';
  } else {
    datas.forEach(data => {
      const agendamentos = agendadosPorData[data].sort((a, b) => a.horario.localeCompare(b.horario));
      const dataObj = new Date(data + 'T00:00:00');
      const dataFormatada = dataObj.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      
      html += `<div class="agenda-data">
        <h3>${dataFormatada}</h3>`;
      
      agendamentos.forEach(a => {
        html += `<div class="agenda-item">
          <div class="agenda-item-hora">${a.horario}</div>
          <div class="agenda-item-info">
            <strong>Paciente:</strong> ${a.paciente?.nome || a.paciente_id}<br>
            <strong>Médico:</strong> ${a.medico?.nome || a.medico_id}<br>
            <strong>Especialidade:</strong> ${a.especialidade?.nome || a.especialidade_id}
            <div class="agenda-status ${a.status === 'Concluído' ? 'concluido' : 'agendado'}">
              ${a.status}
            </div>
          </div>
        </div>`;
      });
      
      html += '</div>';
    });
  }
  
  e('agenda-content').innerHTML = html;
}

e('btn-aplicar-filtros').addEventListener('click', renderizarAgenda);
e('filtro-esp').addEventListener('change', renderizarAgenda);
e('filtro-mes').addEventListener('change', renderizarAgenda);

window.addEventListener('load', carregarDados);

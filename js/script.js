var schedChart;
var availChart;

var appointments = [
  { hora: "08:30", data: "14/05", nome: "Ana Beatriz Souza", prof: "Dr. Joao Silva", status: "Confirmado", color: "blue", proc: "Consulta Clinica", valor: "R$ 320,00" },
  { hora: "09:00", data: "14/05", nome: "Pedro Henrique Costa", prof: "Dra. Ana Souza", status: "Agendado", color: "gray", proc: "Retorno", valor: "R$ 180,00" },
  { hora: "10:15", data: "14/05", nome: "Juliana Ferreira Lima", prof: "Dr. Joao Silva", status: "Atendido", color: "green", proc: "Check-up", valor: "R$ 450,00" },
  { hora: "11:00", data: "14/05", nome: "Roberto Oliveira", prof: "Dra. Ana Souza", status: "Faltou", color: "red", proc: "Consulta", valor: "R$ 0,00" },
  { hora: "14:30", data: "14/05", nome: "Camila Santos", prof: "Dr. Joao Silva", status: "Confirmado", color: "blue", proc: "Procedimento", valor: "R$ 780,00" }
];

var patients = [
  { nome: "Ana Beatriz Souza", telefone: "(11) 99999-1010", email: "ana@email.com", nascimento: "1992-05-13", plano: "Particular" },
  { nome: "Pedro Henrique Costa", telefone: "(11) 98888-2020", email: "pedro@email.com", nascimento: "1988-08-21", plano: "Convenio" },
  { nome: "Camila Santos", telefone: "(11) 97777-3030", email: "camila@email.com", nascimento: "1995-02-10", plano: "Particular" }
];

var financeItems = [
  { vencimento: "14/05/2026", historico: "Energia Eletrica", nf: "", forma: "BOLETO", centro: "Energia Eletrica", conta: "Santander - 01...", valor: "R$ -500,00", tipo: "Saida" },
  { vencimento: "14/05/2026", historico: "Agua", nf: "", forma: "BOLETO", centro: "Agua e Esgoto", conta: "Santander - 01...", valor: "R$ -1.000,00", tipo: "Saida" }
];

var DATA = {
  today: {
    agendamentos: [8, 14, 3, 2, 12],
    livre: 35,
    ocupado: 65,
    cash: { scheduling: "R$ 4.200,00", received: "+R$ 3.150,00", pending: "-R$ 1.050,00", discount: "-R$ 210,00" },
    ticket: "R$ 320,00",
    commission: "R$ 48,00",
    procs: [
      { name: "Consulta Clinica", count: 12, max: 12 },
      { name: "Retorno", count: 8, max: 12 },
      { name: "Check-up", count: 5, max: 12 },
      { name: "Procedimento", count: 3, max: 12 }
    ],
    rankProc: [
      { name: "Consulta Clinica", qtd: 12, value: "R$ 3.600,00" },
      { name: "Check-up", qtd: 5, value: "R$ 1.500,00" },
      { name: "Retorno", qtd: 8, value: "R$ 800,00" }
    ],
    rankPat: [
      { name: "Ana Beatriz Souza", qtd: 4, value: "R$ 1.200,00" },
      { name: "Pedro Henrique", qtd: 3, value: "R$ 900,00" },
      { name: "Camila Santos", qtd: 2, value: "R$ 600,00" }
    ]
  },
  week: {
    agendamentos: [32, 48, 11, 7, 38],
    livre: 20,
    ocupado: 80,
    cash: { scheduling: "R$ 18.400,00", received: "+R$ 12.300,00", pending: "-R$ 6.100,00", discount: "-R$ 920,00" },
    ticket: "R$ 340,00",
    commission: "R$ 51,00",
    procs: [
      { name: "Consulta Clinica", count: 48, max: 48 },
      { name: "Retorno", count: 32, max: 48 },
      { name: "Check-up", count: 20, max: 48 },
      { name: "Procedimento", count: 12, max: 48 }
    ],
    rankProc: [
      { name: "Consulta Clinica", qtd: 48, value: "R$ 14.400,00" },
      { name: "Check-up", qtd: 20, value: "R$ 6.000,00" },
      { name: "Retorno", qtd: 32, value: "R$ 3.200,00" }
    ],
    rankPat: [
      { name: "Ana Beatriz Souza", qtd: 12, value: "R$ 3.600,00" },
      { name: "Pedro Henrique", qtd: 8, value: "R$ 2.400,00" },
      { name: "Camila Santos", qtd: 6, value: "R$ 1.800,00" }
    ]
  }
};

function content() {
  return document.getElementById("conteudo");
}

function setActive(el) {
  document.querySelectorAll(".btn_menu").forEach(function(btn) {
    btn.classList.remove("active");
  });
  if (el) el.classList.add("active");
}

function setActiveByPage(page) {
  var item = document.querySelector('.btn_menu[onclick*="' + page + '"]');
  setActive(item);
}

function navigateTo(el, page) {
  setActive(el);
  renderPage(page);
}

function navigateQuick(page) {
  setActiveByPage(page);
  renderPage(page);
}
function renderPage(page) {
  if (page === "inicio") return renderInicio();
  if (page === "dashboard") return renderDashboard();
  if (page === "agenda") return renderAgenda();

  if (
    page === "Prontuario" ||
    page === "Prontuarios" ||
    page === "prontuario" ||
    page === "prontuarios"
  ) {
    return renderProntuarios();
  }

  if (page === "paciente") return renderPaciente();
  if (page === "marketing") return renderMarketing();
  if (page === "financeiro") return renderFinanceiro();
  if (page === "whatsapp") return renderWhatsApp();
  if (page === "configuracoes") return renderConfiguracoes();

  return renderPlaceholder(page);
}


function pageShell(title, body, subtitle, actions) {
  return `
    <div class="page-head">
      <div id="barra_titulo">
        <div id="titGeral">${title}</div>
        ${subtitle ? `<p class="page-subtitle">${subtitle}</p>` : ""}
      </div>
      ${actions ? `<div class="page-actions">${actions}</div>` : ""}
    </div>
    ${body}
  `;
}

function renderInicio() {
  content().innerHTML = pageShell(
    "Inicio",
    `
      <section class="inicio-hero">
        <div class="inicio-main">
          <span>MedAgenda</span>
          <h1>Sua clinica organizada desde o primeiro clique.</h1>
          <p>Veja os compromissos do dia, cadastre pacientes, acompanhe caixa e acesse as areas principais sem perder tempo.</p>
          <div class="actions-row">
            <button class="secondary-btn" type="button" onclick="openAppointmentModal()"><i class="fas fa-plus"></i>Novo agendamento</button>
            <button class="secondary-btn" type="button" onclick="navigateQuick('paciente')"><i class="fas fa-user-plus"></i>Novo paciente</button>
          </div>
        </div>

        <aside class="inicio-panel page-card">
          <h2>Agenda de hoje</h2>
          <div class="inicio-list">
            ${appointments.slice(0, 4).map(function(item) {
              return `<div class="inicio-item"><div><strong>${item.hora}</strong><span>${item.nome}</span></div><span>${item.status}</span></div>`;
            }).join("")}
          </div>
        </aside>
      </section>

      <section class="metric-grid">
        <div class="metric-card"><span>Consultas hoje</span><strong>${appointments.length}</strong><p>Agenda com status atualizado.</p></div>
        <div class="metric-card"><span>Pacientes ativos</span><strong>${patients.length}</strong><p>Base pronta para retornos.</p></div>
        <div class="metric-card"><span>Receita prevista</span><strong>R$ 4.200</strong><p>Valores agendados no dia.</p></div>
        <div class="metric-card"><span>Disponibilidade</span><strong>35%</strong><p>Horarios ainda livres.</p></div>
      </section>

      <section class="page-grid">
        <div class="page-card"><h2>Acoes rapidas</h2><div class="actions-row"><button class="primary-btn" onclick="navigateQuick('agenda')">Abrir agenda</button><button class="secondary-btn" onclick="navigateQuick('financeiro')">Ver caixa</button><button class="secondary-btn" onclick="navigateQuick('marketing')">Comunicacao</button></div></div>
        <div class="page-card"><h2>Resumo operacional</h2><p>Dashboard, agenda, pacientes, marketing, financeiro, WhatsApp e configuracoes estao conectados no mesmo menu.</p></div>
      </section>
    `,
    "Resumo limpo da rotina da sua clinica."
  );
}

function renderDashboard() {
  content().innerHTML = pageShell(
    "Dashboard MedAgenda",
    `
      <section class="dashboard-clean">
        <div class="dash-filters">
          <strong>Smart View</strong>
          <label><i class="fas fa-calendar"></i><select id="period" onchange="updateAll()"><option value="today">HOJE</option><option value="week">ESTA SEMANA</option></select></label>
          <span>Filtrar por:</span>
          <label><i class="fas fa-user"></i><select id="professionals"><option>Todos</option><option>Dr. Joao Silva</option><option>Dra. Ana Souza</option></select></label>
        </div>

        <div class="dash-top-grid">
          <section class="dash-card">
            <h3>AGENDAMENTOS</h3>
            <div class="dash-chart-area"><canvas id="graphicScheduling"></canvas></div>
            <div class="dash-legend">
              <span><b class="dot gray-dot"></b>Agendado</span>
              <span><b class="dot blue-dot"></b>Confirmado</span>
              <span><b class="dot gold-dot"></b>Desmarcado</span>
              <span><b class="dot red-dot"></b>Faltou</span>
              <span><b class="dot green-dot"></b>Atendido</span>
            </div>
          </section>

          <section class="dash-card">
            <h3>DISPONIBILIDADE DA AGENDA</h3>
            <div class="dash-donut"><canvas id="myChart"></canvas></div>
            <div class="dash-legend dash-between">
              <span><b class="dot green-dot"></b>Livre <strong id="percentageFree">35%</strong></span>
              <span><b class="dot blue-dot"></b>Ocupado <strong id="percentageOccupied">65%</strong></span>
            </div>
          </section>

          <section class="dash-card dash-cash">
            <h3>FLUXO DE CAIXA</h3>
            <div class="dash-cash-row"><span><i class="fas fa-calendar-check"></i> Agendado</span><strong id="cashScheduling">R$ 0,00</strong></div>
            <div class="dash-cash-row"><span><i class="fas fa-arrow-up"></i> Recebido</span><strong id="cashReceived">+R$ 0,00</strong></div>
            <div class="dash-cash-row"><span><i class="fas fa-arrow-down"></i> Pendente</span><strong id="cashPending">-R$ 0,00</strong></div>
            <div class="dash-cash-row"><span><i class="fas fa-percent"></i> Desconto</span><strong id="cashDiscount">-R$ 0,00</strong></div>
          </section>
        </div>

        <div class="dash-main-grid">
          <section class="dash-card dash-wide">
            <h3>PROXIMOS AGENDAMENTOS</h3>
            <div class="dash-table-wrap"><table class="dash-table"><tbody id="next_scheduling"></tbody></table></div>
          </section>
          <div class="dash-side">
            <section class="dash-card dash-mini"><h3>TICKET MEDIO</h3><p><strong id="average_ticket">R$ 0,00</strong> por agendamento</p></section>
            <section class="dash-card dash-mini"><h3>REPASSE</h3><p><strong id="average_commission">R$ 0,00</strong></p></section>
          </div>
        </div>

        <div class="dash-bottom-grid">
          <section class="dash-card"><h3>PROCEDIMENTOS AGENDADOS</h3><div id="graphic_scheduled_procedures" class="dash-bars"></div></section>
          <section class="dash-card dash-empty-center"><h3>CIRURGIAS AGENDADAS</h3><p>Sem dados</p><div id="graphic_scheduled_surgeries" hidden></div></section>
          <section class="dash-card"><h3>ANIVERSARIANTES DA SEMANA</h3><div class="dash-birthday"><span>14/05 Ana Beatriz</span><div><i class="fas fa-envelope"></i><i class="fab fa-whatsapp"></i></div></div><div class="dash-birthday"><span>14/05 Susan Gray</span><div><i class="fas fa-envelope"></i><i class="fab fa-whatsapp"></i></div></div></section>
        </div>

        <h3 class="dash-ranking-title">Smart Ranking</h3>
        <div class="dash-ranking-grid">
          <section class="dash-card"><table class="mini-table"><thead><tr><th>Procedimento/Cirurgia</th><th>Quantidade</th><th>Faturamento</th></tr></thead><tbody id="ranking_procedures"></tbody></table></section>
          <section class="dash-card"><table class="mini-table"><thead><tr><th>Paciente</th><th>Agendamentos</th><th>Faturamento</th></tr></thead><tbody id="ranking_patient"></tbody></table></section>
        </div>
      </section>
    `,
    "Indicadores essenciais sem poluir a tela."
  );
  updateAll();
}

function renderAgenda() {
  content().innerHTML = `
    <section class="agenda-page">
      <div class="agenda-header">
        <h1>Agenda</h1>
        <button class="agenda-add-btn" onclick="openAppointmentModal()"><i class="fas fa-plus"></i>adicionar</button>
      </div>
      <div class="agenda-toolbar">
        <div class="agenda-date-control">
          <button type="button"><i class="fas fa-arrow-left"></i></button>
          <div class="agenda-day"><strong>QUINTA,</strong><span>14 DE MAIO DE 2026</span></div>
          <button type="button"><i class="fas fa-arrow-right"></i></button>
          <span class="agenda-today">Hoje</span>
          <input type="text" value="14/5/2026" readonly>
        </div>
        <div class="agenda-tabs"><button class="active">Lista</button><button>Mes</button><button>Mult. Dia</button><button>Mult. Semana</button></div>
        <div class="agenda-actions"><button>Configurar agenda</button><i class="fas fa-search"></i><i class="fas fa-print"></i></div>
      </div>
      <div class="agenda-table">
        <div class="agenda-table-head"><span>HORARIO</span><span>PACIENTE</span><span>STATUS</span><span>ATENDIMENTO</span><span>OBSERVACOES</span><span>CHEGADA</span><span>PRONTUARIO</span><span>PAGAMENTO</span></div>
        <div class="agenda-table-body">${renderAgendaRows()}</div>
      </div>
    </section>
  `;
}

function renderAgendaRows() {
  if (!appointments.length) {
    return '<div class="agenda-empty">Voce nao tem nenhum compromisso para esta data. <button onclick="openAppointmentModal()">Para inserir um novo clique aqui</button></div>';
  }
  return appointments.map(function(item) {
    return `
      <div class="agenda-row">
        <span class="agenda-hour">${item.hora || "-"}<small>${item.data || "Hoje"}</small></span>
        <span>${item.nome || "-"}</span>
        <span><b class="dot ${item.color || "gray"}-dot"></b> ${item.status || "Agendado"}</span>
        <span>${item.proc || "Consulta"}</span>
        <span>Sem observacoes</span>
        <span>-</span>
        <span><button class="agenda-small-btn">Abrir</button></span>
        <span>${item.valor || "R$ 0,00"}</span>
      </div>
    `;
  }).join("");
}

function renderPaciente() {
  content().innerHTML = `
    <section class="patient-page">
      <h1>Cadastro de Pacientes</h1>
      <div class="patient-card">
        <div class="patient-photo-area">
          <div class="patient-avatar"><i class="fa-regular fa-user"></i></div>
          <div class="patient-photo-buttons">
            <label class="patient-outline-btn"><i class="fa-solid fa-upload"></i>Carregar Imagem<input type="file" accept="image/*" hidden></label>
            <button class="patient-outline-btn" type="button"><i class="fa-solid fa-camera"></i>Ativar Camera</button>
          </div>
        </div>
        <form class="patient-form" onsubmit="savePatient(event)">
          <h2>Dados obrigatorios</h2>
          <div class="patient-grid">
            <label class="span-2"><strong>Nome *</strong><input id="patientName" type="text" required></label>
            <label class="span-2"><strong>E-mail *</strong><input id="patientEmail" type="email" required></label>
            <label><strong>CPF * <span>(?)</span></strong><input id="patientCpf" type="text" required></label>
            <label><strong>Outro Documento <span>(?)</span></strong><input id="patientDocument" type="text"></label>
            <label><strong>Nascimento *</strong><input id="patientBirth" type="date" required></label>
            <label><strong>Codigo <span>(?)</span></strong><input id="patientCode" type="text"></label>
            <label><strong>Codigo DDI Pais (*)</strong><select id="patientDDI"><option>Brasil (+55)</option><option>Portugal (+351)</option><option>Estados Unidos (+1)</option></select></label>
            <label><strong>Celular (*)</strong><input id="patientPhone" type="tel" required></label>
            <label class="span-2"><strong>Sexo</strong><select id="patientGender"><option></option><option>Feminino</option><option>Masculino</option><option>Outro</option></select></label>
          </div>
          <div class="patient-more-btn-wrap"><button class="patient-more-btn" type="button" onclick="togglePatientMoreInfo()"><i class="fas fa-chevron-up"></i> menos informacoes</button></div>
          <div id="patientMoreInfo" class="patient-more-info open">
            <h3>Contato</h3>
            <div class="patient-grid patient-grid-3">
              <label><strong>Telefone Residencial</strong><input></label><label><strong>Operadora Celular</strong><input></label><label><strong>Telefone Comercial</strong><input></label>
              <label><strong>Preferencia de Contato</strong><select><option></option><option>WhatsApp</option><option>Ligacao</option><option>E-mail</option></select></label><label><strong>Tel. Emergencia</strong><input></label>
            </div>
            <h3>Identificacao</h3>
            <div class="patient-grid patient-grid-3">
              <label><strong>RG</strong><input></label><label><strong>Profissao</strong><input></label><label><strong>Estado Civil</strong><select><option></option><option>Solteiro(a)</option><option>Casado(a)</option></select></label>
              <label><strong>Naturalidade</strong><input></label><label><strong>Conjuge</strong><input></label><label><strong>Convenio Medico</strong><input></label>
              <label><strong>No. Carteira Convenio</strong><input></label><label><strong>Validade Convenio</strong><input type="date"></label><label><strong>Nome do Pai</strong><input></label>
              <label><strong>Nome da Mae</strong><input></label><label><strong>Indicado por</strong><input></label><label><strong>E-mail do indicador</strong><input type="email"></label>
            </div>
            <h3>Endereco</h3>
            <div class="patient-grid patient-grid-3">
              <label><strong>CEP</strong><input></label><label><strong>Endereco</strong><input></label><label><strong>Numero</strong><input></label><label><strong>Complemento</strong><input></label><label><strong>Bairro</strong><input></label><label><strong>Cidade</strong><input></label><label><strong>Estado</strong><select><option></option><option>SP</option><option>RJ</option><option>MG</option></select></label>
            </div>
            <h3>Informacoes adicionais</h3>
            <div class="patient-grid"><label class="span-2"><strong>Cod. Importado (?)</strong><input></label><label class="span-4"><strong>Observacoes</strong><textarea id="patientNote"></textarea></label></div>
          </div>
          <div class="patient-actions"><button class="patient-cancel-btn" type="button" onclick="navigateQuick('inicio')">Cancelar <i class="fas fa-xmark"></i></button><button class="patient-save-btn" type="submit">Salvar <i class="fas fa-check"></i></button></div>
        </form>
      </div>
    </section>
  `;
}

function togglePatientMoreInfo() {
  var box = document.getElementById("patientMoreInfo");
  var btn = document.querySelector(".patient-more-btn");
  if (!box || !btn) return;
  box.classList.toggle("open");
  btn.innerHTML = box.classList.contains("open") ? '<i class="fas fa-chevron-up"></i> menos informacoes' : '<i class="fas fa-chevron-down"></i> mais informacoes';
}

/* PRONTUARIOS */

var prontuarioPatients = [
  { nome: "Alana Beatriz Silveira", telefone: "", celular: "(92) 99274-2376", email: "alana-silveira93@stetnet.com.br", cpf: "116.651.589-30", privado: false },
  { nome: "Alex Karev", telefone: "", celular: "5499999999", email: "alex.karev@mysmartclinic.com", cpf: "775.788.810-78", privado: false },
  { nome: "Bruna Freitas", telefone: "", celular: "(51) 98147-8269", email: "pietrabrunafreitas@bzness.com.br", cpf: "963.726.060-97", privado: false },
  { nome: "Chris Dempsey", telefone: "", celular: "", email: "chris_dempsey@emailfake.com", cpf: "89012345678", privado: false },
  { nome: "Cristina Yang (Paciente Exemplo)", telefone: "(54) 99999-9999", celular: "(54) 99999-9999", email: "cristina.yang@mysmartclinic.com", cpf: "429.868.859-34", privado: false },
  { nome: "Daniela Mariana Gomes", telefone: "", celular: "(51) 99313-6688", email: "daniela-gomes@innovatis.com.br", cpf: "702.564.290-81", privado: false },
  { nome: "Denny Duquette", telefone: "", celular: "", email: "denny_duquette@emailfake.com", cpf: "12345678901", privado: false },
  { nome: "Derek Shepherd (Paciente Exemplo)", telefone: "(54) 99999-9999", celular: "(54) 99999-9999", email: "derek.shepherd@mysmartclinic.com", cpf: "", privado: false },
  { nome: "George O'Malley", telefone: "", celular: "5499999999", email: "george.malley@mysmartclinic.com", cpf: "589.823.830-18", privado: false },
  { nome: "Harold O'Malley", telefone: "", celular: "", email: "harold_omalley@emailfake.com", cpf: "56789012345", privado: false }
];

/* coloque esta linha dentro da function renderPage(page):
   if (page === "prontuarios") return renderProntuarios();
*/

function renderProntuarios() {
  content().innerHTML = `
    <section class="records-page">
      <div class="records-header">
        <h1>Prontuarios</h1>

        <button class="records-add-btn" type="button" onclick="navigateQuick('paciente')">
          <i class="fas fa-plus"></i>
          adicionar paciente
        </button>
      </div>

      <div class="records-toolbar">
        <input id="recordsSearch" type="text" placeholder="Pesquisar...">

        <button type="button" onclick="searchProntuarios()">procurar</button>
        <button type="button" onclick="clearProntuarios()">limpar</button>

        <div class="records-pagination">
          <button type="button"><i class="fas fa-backward"></i></button>
          <button type="button"><i class="fas fa-step-backward"></i></button>

          <span>
            Pagina 1 de 2
            <strong>Total de 30 pacientes</strong>
          </span>

          <button type="button"><i class="fas fa-step-forward"></i></button>
          <button type="button"><i class="fas fa-forward"></i></button>

          <select>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
      </div>

      <div class="records-table">
        <div class="records-head">
          <span>Paciente</span>
          <span>Telefone</span>
          <span>Celular</span>
          <span>E-mail</span>
          <span>CPF</span>
          <span>Saldo</span>
          <span>Editar</span>
          <span>Agendar</span>
          <span>Privado</span>
        </div>

        <div id="recordsRows" class="records-body">
          ${renderProntuarioRows(prontuarioPatients)}
        </div>
      </div>
    </section>
  `;
}

function renderProntuarioRows(list) {
  if (!list.length) {
    return `<div class="records-empty">Nenhum paciente encontrado.</div>`;
  }

  return list.map(function(patient, index) {
    return `
      <div class="records-row">
        <span>${patient.nome || ""}</span>
        <span>${patient.telefone || ""}</span>
        <span>${patient.celular || ""}</span>
        <span>${patient.email || ""}</span>
        <span>${patient.cpf || ""}</span>

        <span>
          <button class="records-icon muted" type="button" title="Saldo">
            <i class="fas fa-dollar-sign"></i>
          </button>
        </span>

        <span>
          <button class="records-icon" type="button" onclick="editProntuario(${index})" title="Editar">
            <i class="far fa-pen-to-square"></i>
          </button>
        </span>

        <span>
          <button class="records-icon" type="button" onclick="scheduleProntuario(${index})" title="Agendar">
            <i class="far fa-calendar"></i>
          </button>
        </span>

        <span>
          <button class="records-toggle ${patient.privado ? "active" : ""}" type="button" onclick="toggleProntuarioPrivate(${index})">
            <i></i>
          </button>
        </span>
      </div>
    `;
  }).join("");
}

function searchProntuarios() {
  var term = document.getElementById("recordsSearch").value.trim().toLowerCase();

  var filtered = prontuarioPatients.filter(function(patient) {
    return (
      patient.nome.toLowerCase().includes(term) ||
      patient.email.toLowerCase().includes(term) ||
      patient.cpf.toLowerCase().includes(term)
    );
  });

  document.getElementById("recordsRows").innerHTML = renderProntuarioRows(filtered);
}

function clearProntuarios() {
  document.getElementById("recordsSearch").value = "";
  document.getElementById("recordsRows").innerHTML = renderProntuarioRows(prontuarioPatients);
}

function toggleProntuarioPrivate(index) {
  prontuarioPatients[index].privado = !prontuarioPatients[index].privado;
  document.getElementById("recordsRows").innerHTML = renderProntuarioRows(prontuarioPatients);
}

function editProntuario(index) {
  alert("Abrir prontuario de " + prontuarioPatients[index].nome);
}

function scheduleProntuario(index) {
  openAppointmentModal();

  setTimeout(function() {
    var select = document.getElementById("appointmentPatient");
    if (select) select.value = prontuarioPatients[index].nome;
  }, 50);
}


function renderMarketing() {
  content().innerHTML = `
    <section class="marketing-page">
      <h1 id="marketingTitle">Comunicacao</h1>
      <div class="marketing-card">
        <div id="marketingChoose" class="marketing-choose">
          <h2>Escolha o tipo de comunicacao que deseja utilizar:</h2>
          <button type="button" onclick="showMarketingDirect()"><i class="fas fa-plus"></i><strong>DIRETA</strong><span>Enviar mensagem para um unico paciente</span></button>
          <button type="button" onclick="showMarketingBatch()"><i class="fas fa-plus"></i><strong>EM LOTE</strong><span>Enviar mensagem para um grupo de pacientes</span></button>
        </div>
        <div id="marketingDirect" class="marketing-panel hidden">
          <div class="marketing-grid">
            <label><strong>Forma de Envio:</strong><select id="directSendType" onchange="changeDirectMessageLabel()"><option>E-MAIL</option><option>SMS/Whatsapp(manual)</option></select></label>
            <label><strong>Paciente:</strong><select id="directPatient"><option value="">nome</option>${patients.map(function(patient) { return '<option>' + patient.nome + '</option>'; }).join("")}</select></label>
            <label class="span-full"><strong>Assunto:</strong><input id="directSubject" type="text"></label>
            <label class="span-full"><strong id="directMessageLabel">Mensagem Email:</strong><div class="fake-editor-toolbar"><b>B</b><i>I</i><u>U</u><s>S</s><span>Estilo</span><span>Fonte</span><span>Tamanho</span><i class="fas fa-align-left"></i><i class="fas fa-align-center"></i><i class="fas fa-align-right"></i></div><textarea id="directMessage"></textarea></label>
          </div>
          <div class="marketing-actions"><button class="marketing-send-btn" type="button" onclick="sendDirectMarketing()">Enviar...</button><button class="marketing-whatsapp-btn" type="button" onclick="sendDirectWhatsapp()"><i class="fab fa-whatsapp"></i></button></div>
        </div>
        <div id="marketingBatch" class="marketing-panel hidden">
          <div class="marketing-grid batch-grid">
            <label><strong>Forma de Envio:</strong><select id="batchSendType"><option>E-mail</option><option>SMS/Whatsapp(manual)</option></select></label>
            <label class="span-3"><strong>Tipo de Envio:</strong><select id="batchType"><option>Lembrete de Agendamento</option><option>Pacientes que realizaram procedimento</option><option>Pacientes que realizaram cirurgia</option><option>Pacientes Aniversariantes</option></select></label>
            <label><strong>De:</strong><input id="batchDateFrom" type="text" value="14/05/2026"></label><label><strong>Ate:</strong><input id="batchDateTo" type="text" value="14/05/2026"></label>
            <label><strong>Procedimento: <span>?</span></strong><select id="batchProcedure" size="4"><option>Consulta Clinica</option><option>Retorno</option><option>Check-up</option><option>Procedimento</option></select></label>
            <label><strong>Cirurgia: <span>?</span></strong><select id="batchSurgery" size="4"><option>Abdominoplastia</option><option>Apendicectomia</option><option>Biopsia de Pele</option><option>Bichectomia</option></select></label>
          </div>
          <div class="marketing-actions"><button class="marketing-send-btn" type="button" onclick="continueBatchMarketing()">Continuar</button></div>
        </div>
      </div>
    </section>
  `;
}

function showMarketingDirect() {
  document.getElementById("marketingTitle").textContent = "Comunicacao Direta";
  document.getElementById("marketingChoose").classList.add("hidden");
  document.getElementById("marketingDirect").classList.remove("hidden");
  document.getElementById("marketingBatch").classList.add("hidden");
}

function showMarketingBatch() {
  document.getElementById("marketingTitle").textContent = "Comunicacao Em Lote";
  document.getElementById("marketingChoose").classList.add("hidden");
  document.getElementById("marketingDirect").classList.add("hidden");
  document.getElementById("marketingBatch").classList.remove("hidden");
}

function changeDirectMessageLabel() {
  var label = document.getElementById("directMessageLabel");
  label.textContent = document.getElementById("directSendType").value === "SMS/Whatsapp(manual)" ? "Mensagem WhatsApp:" : "Mensagem Email:";
}

function sendDirectMarketing() {
  var patient = document.getElementById("directPatient").value;
  var message = document.getElementById("directMessage").value.trim();
  if (!patient) return alert("Selecione um paciente.");
  if (!message) return alert("Digite a mensagem.");
  alert("Mensagem enviada para " + patient + "!");
}

function sendDirectWhatsapp() {
  sendDirectMarketing();
}

function continueBatchMarketing() {
  alert("Comunicacao em lote criada!");
}

function renderFinanceiro() {
  content().innerHTML = `
    <section class="finance-page">
      <div class="finance-header"><h1>Caixa</h1><button class="finance-add-btn" type="button" onclick="openFinanceModal()"><i class="fas fa-plus"></i> adicionar</button></div>
      <div class="finance-filters">
        <label><strong>Inicio</strong><input type="text" value="01/05/2026"></label>
        <label><strong>Fim</strong><input type="text" value="31/05/2026"></label>
        <label><strong>Profissional</strong><select><option>Todos</option><option>Dr. Joao Silva</option></select></label>
        <label><strong>Status</strong><select><option>Todos</option><option>Pago</option><option>Pendente</option></select></label>
        <label><strong>Ordenar por</strong><select><option>Data de Vencimento</option><option>Data da Baixa</option><option>Data do Agendamento</option></select></label>
      </div>
      <div class="finance-period"><span><i class="far fa-clock"></i> RESUMO DO PERIODO</span></div>
      <div class="finance-balance"><strong>SALDO ANTERIOR</strong><span>R$ 0,00</span></div>
      <div class="finance-table-head"><span>Vencimento</span><span>Historico</span><span>NF</span><span>Forma Pagto</span><span>C. Custo</span><span>Conta</span><span>Valor</span><span>Acoes</span></div>
      <div class="finance-list" id="financeList">${renderFinanceRows()}</div>
    </section>
  `;
  installFinanceModal();
}

function renderFinanceRows() {
  return financeItems.map(function(item, index) {
    return `
      <div class="finance-row">
        <span>${item.vencimento}</span><span class="finance-history"><i class="fas fa-exclamation-circle"></i>${item.historico}</span><span>${item.nf || ""}</span><span>${item.forma}</span><span>${item.centro}</span><span>${item.conta}</span><span class="finance-value">${item.valor}</span>
        <span class="finance-actions-wrap"><button class="finance-action-btn" type="button" onclick="toggleFinanceMenu(${index})"><i class="fas fa-pen"></i>Acoes<i class="fas fa-chevron-down"></i></button><div class="finance-actions-menu" id="financeMenu${index}"><button type="button" onclick="openFinanceModal(${index})"><i class="fas fa-pen-to-square"></i>Editar</button><button type="button" onclick="alert('Historico aberto na demo')"><i class="fas fa-list"></i>Historico</button><button type="button" onclick="alert('Nota fiscal emitida na demo')"><i class="far fa-file-lines"></i>Emitir Nota Fiscal</button><button class="delete" type="button" onclick="deleteFinanceItem(${index})"><i class="far fa-trash-can"></i>Deletar</button></div></span>
      </div>
    `;
  }).join("");
}

function toggleFinanceMenu(index) {
  document.querySelectorAll(".finance-actions-menu").forEach(function(menu) {
    if (menu.id !== "financeMenu" + index) menu.classList.remove("open");
  });
  var menu = document.getElementById("financeMenu" + index);
  if (menu) menu.classList.toggle("open");
}

function deleteFinanceItem(index) {
  if (!confirm("Deseja deletar este lancamento?")) return;
  financeItems.splice(index, 1);
  document.getElementById("financeList").innerHTML = renderFinanceRows();
}

function openFinanceModal(index) {
  installFinanceModal();
  var item = financeItems[index] || { vencimento: "14/05/2026", historico: "", nf: "", forma: "BOLETO", centro: "", conta: "", valor: "R$ 0,00", tipo: "Saida" };
  document.getElementById("financeEditIndex").value = index !== undefined ? index : "";
  document.getElementById("financeDate").value = item.vencimento;
  document.getElementById("financeType").value = item.tipo;
  document.getElementById("financeName").value = item.historico;
  document.getElementById("financeNf").value = item.nf;
  document.getElementById("financeValue").value = item.valor.replace("R$ ", "");
  document.getElementById("financePayment").value = item.forma;
  document.getElementById("financeCost").value = item.centro;
  document.getElementById("financeAccount").value = item.conta;
  document.getElementById("financeModal").classList.add("open");
}

function closeFinanceModal() {
  var modal = document.getElementById("financeModal");
  if (modal) modal.classList.remove("open");
}

function saveFinanceItem(event) {
  event.preventDefault();
  var index = document.getElementById("financeEditIndex").value;
  var item = {
    vencimento: document.getElementById("financeDate").value,
    tipo: document.getElementById("financeType").value,
    historico: document.getElementById("financeName").value,
    nf: document.getElementById("financeNf").value,
    valor: "R$ " + document.getElementById("financeValue").value,
    forma: document.getElementById("financePayment").value,
    centro: document.getElementById("financeCost").value,
    conta: document.getElementById("financeAccount").value
  };
  if (index === "") financeItems.unshift(item);
  else financeItems[index] = item;
  closeFinanceModal();
  renderFinanceiro();
}

function installFinanceModal() {
  if (document.getElementById("financeModal")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-overlay" id="financeModal">
      <div class="finance-modal-card">
        <button class="finance-modal-close" type="button" onclick="closeFinanceModal()">x</button>
        <h2>Edicao de Lancamento</h2>
        <form class="finance-modal-form" onsubmit="saveFinanceItem(event)">
          <input id="financeEditIndex" type="hidden">
          <label>Data:<input id="financeDate" type="text"></label>
          <label>Tipo de Lancamento<select id="financeType"><option>Saida</option><option>Entrada</option></select></label>
          <label>Pago para / Recebido de:<input id="financeName" type="text"></label>
          <label>Nota Fiscal:<input id="financeNf" type="text"></label>
          <label class="span-full">Valor<input id="financeValue" type="text"></label>
          <label class="span-full">Forma de Pagamento<select id="financePayment"><option>BOLETO</option><option>PIX</option><option>Cartao</option><option>Dinheiro</option></select></label>
          <label>Centro de Custo<select id="financeCost"><option></option><option>Energia Eletrica</option><option>Agua e Esgoto</option><option>Consultas</option><option>Marketing</option></select></label>
          <label>Conta Corrente<select id="financeAccount"><option></option><option>Santander - 01...</option><option>Caixa - 02...</option></select></label>
          <div class="finance-modal-actions span-full"><button class="finance-cancel-btn" type="button" onclick="closeFinanceModal()">Cancelar</button><button class="finance-save-btn" type="submit">Salvar</button></div>
        </form>
      </div>
    </div>
  `);
}

function renderWhatsApp() {
  content().innerHTML = pageShell("WhatsApp", `
    <div class="page-grid">
      <section class="page-card">
        <h2>Confirmacao automatica</h2>
        <div class="message-box">Ola {{paciente}}, sua consulta com {{profissional}} esta marcada para {{data}} as {{hora}}.</div>
        <div class="actions-row"><button class="primary-btn" onclick="alert('Teste enviado na demo')"><i class="fab fa-whatsapp"></i> Enviar teste</button></div>
      </section>
      <section class="page-card">
        <h2>Lembrete de consulta</h2>
        <div class="message-box">Ola {{paciente}}, passando para lembrar da sua consulta hoje.</div>
        <div class="actions-row"><button class="secondary-btn" onclick="alert('Mensagem editavel na demo')">Editar mensagem</button></div>
      </section>
    </div>
  `, "Mensagens prontas para rotina da clinica.");
}

function renderConfiguracoes() {
  content().innerHTML = pageShell("Configuracoes", `
    <section class="page-card settings-card">
      <h2>Dados da clinica</h2>
      <div class="clinic-settings-layout">
        <div class="clinic-logo-box"><div class="clinic-logo-preview" id="clinicLogoPreview"><span>Logo</span><img id="clinicLogoImage" alt="Logo da clinica"></div><label class="secondary-btn clinic-logo-btn"><i class="fas fa-upload"></i>Adicionar foto<input type="file" accept="image/*" hidden onchange="previewClinicLogo(event)"></label></div>
        <form class="form-grid clinic-form" onsubmit="event.preventDefault(); alert('Configuracoes salvas na demo!')">
          <label>Nome da clinica<input value="Clinica MedAgenda"></label><label>Responsavel<input value="Dr. Joao Silva"></label><label>Telefone<input value="(11) 99999-9999"></label><label>E-mail<input value="contato@medagenda.com"></label><label class="field-full">Endereco<input value="Av. Paulista, 1000 - Sao Paulo/SP"></label><div class="actions-row field-full"><button class="primary-btn" type="submit">Salvar configuracoes</button></div>
        </form>
      </div>
    </section>

    <section class="page-card current-plan-card">
      <div><h2>Plano atual</h2><p>Sua clinica esta usando o plano recomendado para clinicas em crescimento.</p></div>
      <div class="current-plan-box"><span>Ativo</span><strong>Profissional</strong><p>R$ 149/mes</p></div>
    </section>

    <section class="plans-section">
      <div class="plans-heading">
        <span>Planos MedAgenda</span>
        <h2>Escolha o plano certo para a rotina da sua clinica</h2>
        <p>Comece simples, automatize atendimentos e tenha mais controle sobre agenda, pacientes, mensagens e financeiro em um unico lugar.</p>
      </div>
      <div class="plans-grid">
        <article class="plan-card"><h3>Essencial</h3><strong>R$79<span>/mes</span></strong><p>Para profissionais que querem organizar a agenda e manter os pacientes sempre a mao.</p><ul><li>Agenda organizada por dia</li><li>Cadastro completo de pacientes</li><li>Historico basico de atendimento</li><li>Ideal para consultorio individual</li></ul><button type="button">Comecar no Essencial</button></article>
        <article class="plan-card active-plan"><small>Recomendado</small><h3>Profissional</h3><strong>R$149<span>/mes</span></strong><p>O melhor custo-beneficio para clinicas que precisam ganhar tempo e controlar a operacao.</p><ul><li>Tudo do Essencial</li><li>Lembretes e comunicacao por WhatsApp</li><li>Controle financeiro integrado</li><li>Dashboard com indicadores</li><li>Automacoes para reduzir faltas</li></ul><button type="button">Manter Plano Atual</button></article>
        <article class="plan-card"><h3>Clinica+</h3><strong>R$249<span>/mes</span></strong><p>Para equipes em crescimento que precisam de mais gestao, suporte e recursos avancados.</p><ul><li>Tudo do Profissional</li><li>Multiusuarios para a equipe</li><li>Suporte prioritario</li><li>Recursos avancados de gestao</li><li>Preparado para clinicas maiores</li></ul><button type="button">Fazer Upgrade</button></article>
      </div>
    </section>
  `, "Dados, preferencias e assinatura do sistema.");
}

function renderPlaceholder(page) {
  var label = page.charAt(0).toUpperCase() + page.slice(1);
  content().innerHTML = pageShell(label, '<section class="page-card"><div class="empty-note">Essa area ficou preservada no menu. As funcoes principais ja estao ativas.</div></section>');
}

function savePatient(event) {
  event.preventDefault();
  var name = document.getElementById("patientName").value.trim();
  var phone = document.getElementById("patientPhone").value.trim();
  if (!name || !phone) return alert("Preencha nome e celular.");
  patients.unshift({
    nome: name,
    telefone: phone,
    email: document.getElementById("patientEmail").value.trim(),
    nascimento: document.getElementById("patientBirth").value,
    plano: "Particular",
    cpf: document.getElementById("patientCpf").value.trim(),
    note: document.getElementById("patientNote") ? document.getElementById("patientNote").value.trim() : ""
  });
  alert("Paciente cadastrado!");
  renderPaciente();
}

function openAppointmentModal() {
  installAppointmentModal();
  var select = document.getElementById("appointmentPatient");
  select.innerHTML = '<option value="">nome</option>' + patients.map(function(patient) {
    return '<option>' + patient.nome + '</option>';
  }).join("");
  document.getElementById("appointmentModal").classList.add("open");
}

function closeAppointmentModal() {
  var modal = document.getElementById("appointmentModal");
  if (modal) modal.classList.remove("open");
}

function saveAppointment(event) {
  event.preventDefault();
  var selectedPatient = document.getElementById("appointmentPatient").value;
  var typedPatient = document.getElementById("appointmentNewPatientName").value.trim();
  var patient = selectedPatient || typedPatient;
  var hour = document.getElementById("appointmentHour").value;
  var date = document.getElementById("appointmentDate").value;
  var proc = document.getElementById("appointmentProcedure").value || "Consulta";
  var value = document.getElementById("appointmentValue").value || "R$ 320,00";
  if (!patient || !hour) return alert("Preencha paciente e horario.");
  if (typedPatient && !patients.some(function(item) { return item.nome === typedPatient; })) {
    patients.unshift({ nome: typedPatient, telefone: document.getElementById("appointmentPhone").value, email: document.getElementById("appointmentEmail").value, nascimento: document.getElementById("appointmentBirth").value, plano: "Particular" });
  }
  appointments.unshift({ hora: hour, data: date ? formatDateBR(date) : "Hoje", nome: patient, prof: document.getElementById("appointmentDoctor").value, status: "Agendado", color: "gray", proc: proc, valor: value });
  alert("Agendamento salvo!");
  closeAppointmentModal();
  setActiveByPage("agenda");
  renderAgenda();
}

function formatDateBR(dateValue) {
  var parts = dateValue.split("-");
  if (parts.length !== 3) return "Hoje";
  return parts[2] + "/" + parts[1];
}

function buildSchedulingChart(data) {
  var canvas = document.getElementById("graphicScheduling");
  if (!canvas || !window.Chart) return;
  if (schedChart) schedChart.destroy();
  schedChart = new Chart(canvas.getContext("2d"), {
    type: "doughnut",
    data: { labels: ["Agendado", "Confirmado", "Desmarcado", "Faltou", "Atendido"], datasets: [{ data: data, backgroundColor: ["#64748B", "#005F63", "#C7A25B", "#C76F5B", "#047857"], borderWidth: 0 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: "70%" }
  });
}

function buildAvailChart(livre, ocupado) {
  var canvas = document.getElementById("myChart");
  if (!canvas || !window.Chart) return;
  if (availChart) availChart.destroy();
  availChart = new Chart(canvas.getContext("2d"), {
    type: "doughnut",
    data: { labels: ["Livre", "Ocupado"], datasets: [{ data: [livre, ocupado], backgroundColor: ["#047857", "#005F63"], borderWidth: 0 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: "65%" }
  });
  setText("percentageFree", livre + "%");
  setText("percentageOccupied", ocupado + "%");
}

function buildProximos(list) {
  var tbody = document.getElementById("next_scheduling");
  if (!tbody) return;
  tbody.innerHTML = "";
  list.forEach(function(r) {
    var tr = document.createElement("tr");
    tr.innerHTML = '<td><strong>' + r.hora + '</strong><br><small>' + r.data + '</small></td><td>' + r.nome + '</td><td>' + r.prof + '</td><td><span class="status-pill"><b class="dot ' + r.color + '-dot"></b>' + r.status + '</span></td><td>' + r.proc + '</td>';
    tbody.appendChild(tr);
  });
}

function buildProcs(list, id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = "";
  list.forEach(function(p) {
    var pct = Math.round((p.count / p.max) * 100);
    el.innerHTML += '<div class="proc-item"><span class="proc-name">' + p.name + '</span><div class="proc-bar-wrap"><div class="proc-bar" style="width:' + pct + '%"></div></div><span class="proc-count">' + p.count + '</span></div>';
  });
}

function buildRanking(list, id) {
  var tbody = document.getElementById(id);
  if (!tbody) return;
  tbody.innerHTML = "";
  list.forEach(function(r) {
    var tr = document.createElement("tr");
    tr.innerHTML = '<td>' + r.name + '</td><td><strong>' + r.qtd + '</strong></td><td>' + r.value + '</td>';
    tbody.appendChild(tr);
  });
}

function updateAll() {
  var period = document.getElementById("period") ? document.getElementById("period").value : "today";
  var d = DATA[period] || DATA.today;
  buildSchedulingChart(d.agendamentos);
  buildAvailChart(d.livre, d.ocupado);
  setText("cashScheduling", d.cash.scheduling);
  setText("cashReceived", d.cash.received);
  setText("cashPending", d.cash.pending);
  setText("cashDiscount", d.cash.discount);
  setText("average_ticket", d.ticket);
  setText("average_commission", d.commission);
  buildProximos(appointments);
  buildProcs(d.procs, "graphic_scheduled_procedures");
  buildRanking(d.rankProc, "ranking_procedures");
  buildRanking(d.rankPat, "ranking_patient");
}

function installAppointmentModal() {
  if (document.getElementById("appointmentModal")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-overlay" id="appointmentModal">
      <div class="appointment-modal-card">
        <button class="appointment-close" onclick="closeAppointmentModal()">x</button>
        <h2>Agendamento</h2>
        <form class="appointment-form" onsubmit="saveAppointment(event)">
          <div class="appointment-top-grid">
            <label class="span-2">Paciente<select id="appointmentPatient"><option value="">nome</option></select></label>
            <label>Data<input id="appointmentDate" type="date"></label>
            <label>Inicio<input id="appointmentHour" type="time" required></label>
            <label>Fim<input id="appointmentEndHour" type="time"></label>
            <label>Nome<input id="appointmentNewPatientName" type="text"></label>
            <label>E-mail<input id="appointmentEmail" type="email"></label>
            <label>CPF <span>(?)</span><input id="appointmentCpf" type="text"></label>
            <label>Nascimento<input id="appointmentBirth" type="date"></label>
            <label>Codigo DDI Pais (*)<select id="appointmentDDI"><option>Brasil (+55)</option><option>Portugal (+351)</option><option>Estados Unidos (+1)</option></select></label>
            <label>Celular<input id="appointmentPhone" type="tel"></label>
            <label>Telefone<input id="appointmentLandline" type="tel"></label>
          </div>
          <div class="appointment-tabs"><button class="active" type="button">Agendamento</button><button type="button">Historico</button><button type="button">Informacoes Adicionais</button></div>
          <div class="appointment-details-grid"><label>Tipo Compromisso<select id="appointmentProcedure"><option value="">Selecione</option><option>Consulta Clinica</option><option>Retorno</option><option>Check-up</option><option>Procedimento</option></select></label><div class="appointment-packages"><strong>Orcamentos / Pacotes do paciente</strong><div><button type="button">Novos</button><button type="button">Antigos</button></div></div></div>
          <div class="appointment-bottom-grid"><label>Recorrencia<select id="appointmentRecurrence"><option>Nao</option><option>Semanal</option><option>Mensal</option></select></label><label>Fim da recorrencia<input id="appointmentRecurrenceEnd" type="date"></label></div>
          <input id="appointmentDoctor" type="hidden" value="Dr. Joao Silva">
          <input id="appointmentValue" type="hidden" value="R$ 320,00">
          <div class="appointment-footer-actions"><button class="appointment-cancel-btn" type="button" onclick="closeAppointmentModal()">Cancelar</button><button class="appointment-save-btn" type="submit"><i class="fas fa-check"></i>Salvar</button></div>
        </form>
      </div>
    </div>
  `);
}

function previewClinicLogo(event) {
  var file = event.target.files[0];
  var image = document.getElementById("clinicLogoImage");
  var preview = document.getElementById("clinicLogoPreview");
  if (!file || !image || !preview) return;
  image.src = URL.createObjectURL(file);
  preview.classList.add("has-logo");
}

function setText(id, value) {
  var el = document.getElementById(id);
  if (el) el.textContent = value;
}

window.addEventListener("DOMContentLoaded", function() {
  installAppointmentModal();
  installFinanceModal();
  renderInicio();
});

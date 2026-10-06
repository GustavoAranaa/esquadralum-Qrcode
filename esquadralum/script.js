// Base de dados simulada das Esquadrias
const database = {
  "EQ-001": {
    tipo: "Janela de Correr",
    local: "Sala 01",
    etapa: 2,
    status: "Em andamento",
    inicio: "10/06/2025 08:30",
    responsavel: "João Silva"
  },
  "EQ-002": {
    tipo: "Porta de Giro",
    local: "Cozinha",
    etapa: 1,
    status: "Aguardando Corte",
    inicio: "10/06/2025 09:15",
    responsavel: "Carlos Eduardo"
  }
};

// Função para alternar entre as telas
function showScreen(screenName) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  if (screenName === 'scanner') {
    document.getElementById('screen-scanner').classList.add('active');
  } else if (screenName === 'production') {
    document.getElementById('screen-production').classList.add('active');
  }
}

// Simula a leitura de QR Code ao clicar na caixa
function simulateScan(code) {
  loadProductionData(code);
}

// Trata a submissão manual do código
function handleManualSubmit(event) {
  event.preventDefault();
  const inputCode = document.getElementById('code-input').value.trim().toUpperCase();
  
  if (inputCode) {
    loadProductionData(inputCode);
  }
}

// Carrega os dados na Tela de Produção e faz a transição
function loadProductionData(code) {
  const data = database[code] || {
    tipo: "Janela Padronizada",
    local: "Depósito Geral",
    etapa: 1,
    status: "Em andamento",
    inicio: new Date().toLocaleString('pt-BR'),
    responsavel: "Operador Padrão"
  };

  // Preenche as informações na tela
  document.getElementById('prod-code').textContent = code;
  document.getElementById('prod-type').textContent = data.tipo;
  document.getElementById('prod-location').textContent = data.local;
  document.getElementById('prod-status').textContent = data.status;
  document.getElementById('prod-start').textContent = data.inicio;
  document.getElementById('prod-responsible').textContent = data.responsavel;

  // Atualiza visualmente a etapa ativa
  updateTimeline(data.etapa);

  // Exibe a tela de produção
  showScreen('production');
}

// Atualiza o estado da linha do tempo/passos da etapa
function updateTimeline(currentStep) {
  for (let i = 1; i <= 4; i++) {
    const stepEl = document.getElementById(`step-${i}`);
    stepEl.className = 'step';

    if (i < currentStep) {
      stepEl.classList.add('completed');
      stepEl.querySelector('.step-icon').innerHTML = '<i class="fa-solid fa-check"></i>';
    } else if (i === currentStep) {
      stepEl.classList.add('active');
      stepEl.querySelector('.step-icon').textContent = i;
    } else {
      stepEl.querySelector('.step-icon').textContent = i;
    }
  }
}

// Ação de registrar observações
function saveNotes() {
  const noteText = document.getElementById('notes-input').value;
  if (noteText.trim() === '') {
    alert('Por favor, digite alguma observação antes de registrar.');
    return;
  }
  alert('Observação registrada com sucesso!');
  document.getElementById('notes-input').value = '';
}

// Alternar visibilidade no campo de entrada
document.getElementById('toggle-visibility').addEventListener('click', function() {
  const input = document.getElementById('code-input');
  if (input.type === 'password') {
    input.type = 'text';
    this.classList.replace('fa-eye-slash', 'fa-eye');
  } else {
    input.type = 'password';
    this.classList.replace('fa-eye', 'fa-eye-slash');
  }
});
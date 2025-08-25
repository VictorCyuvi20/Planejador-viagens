import { routes } from './modules/routeData.js';

// Pega todos os elementos com ID
const origemSelect = document.getElementById('origemSelect');
const destinoSelect = document.getElementById('destinoSelect');
const resumoDiv = document.getElementById('resumoRota');
const calcularBtn = document.getElementById('calcularBtn');
const limparBtn = document.getElementById('limparBtn');
const resultadosDiv = document.getElementById('resultados');

const consumoInput = document.getElementById('consumo');
const precoInput = document.getElementById('precoCombustivel');
const velocidadeInput = document.getElementById('velocidadeMedia');

const combustivelInfo = document.getElementById('combustivelInfo');
const tempoInfo = document.getElementById('tempoInfo');
const custosInfo = document.getElementById('custosInfo');
const totalInfo = document.getElementById('totalInfo');

// Preenche os selects (ADRIAN)
function preencherSelects() {
  const cidades = [...new Set(routes.map(r => r.origem))];

  cidades.forEach(cidade => {
    const option = new Option(cidade, cidade);
    origemSelect.appendChild(option.cloneNode(true));
    destinoSelect.appendChild(option.cloneNode(true));
  });
}

function exibirResumo() {
  const origem = origemSelect.value;
  const destino = destinoSelect.value;


  // Procura se as rotas de origem e as rotas de destino estão no array de objeto (Adrian)
  const rota = routes.find(r => r.origem === origem && r.destino === destino);
  if (!rota) {
    // Retorna um "Erro" se não encontrar
    resumoDiv.innerHTML = '<p>Rota não encontrada.</p>';
    return;
  }

  // Constrói os elementos html com as informações(Adrian)
  resumoDiv.innerHTML = `
    <p><strong>Distância:</strong> ${rota.distancia} km</p>
    <p><strong>Pedágios:</strong> ${rota.pedagios} praças (R$ ${rota.valorPedagios.toFixed(2)})</p>
    <p><strong>Restaurantes:</strong> ${rota.restaurantes}</p>
    <p><strong>Tempo estimado:</strong> ${rota.tempoEstimado.toFixed(1)}h</p>
    <p><strong>Pontos turísticos:</strong> ${rota.pontosTuristicos.join(', ')}</p>
  `;
}

// Função para cálculos da viagem (Victor)
function calcularViagem() {
  const origem = origemSelect.value;
  const destino = destinoSelect.value;
  // Procura se as rotas de origem e as rotas de destino estão no array de objeto
  const rota = routes.find(r => r.origem === origem && r.destino === destino);
  if (!rota) return alert('Rota inválida');

  const consumo = parseFloat(consumoInput.value);
  const precoCombustivel = parseFloat(precoInput.value);
  const velocidade = parseFloat(velocidadeInput.value);

  // Verifica se todos os campos forão preenchidos
  if (!consumo || !precoCombustivel || !velocidade) {
    // Retorna um "Erro" caso precise
    return alert('Preencha todos os campos do veículo');
  }


  // Contas para calcular(Victor)
  const litros = rota.distancia / consumo;
  const custoCombustivel = litros * precoCombustivel;
  const tempo = rota.distancia / velocidade;

  const custoAlimentacao = rota.custoMedioRefeicao;
  const custoTotal = custoCombustivel + rota.valorPedagios + custoAlimentacao;

  // Constrói os elementos html com as informações(Victor)
  combustivelInfo.textContent = `Litros necessários: ${litros.toFixed(2)} litros\nCusto total: R$ ${custoCombustivel.toFixed(2)}`;
  tempoInfo.textContent = `Tempo estimado: ${tempo.toFixed(1)}h`;
  custosInfo.textContent = `Pedágios: R$ ${rota.valorPedagios.toFixed(2)}\nAlimentação: R$ ${custoAlimentacao.toFixed(2)}`;
  totalInfo.textContent = `Total da viagem: R$ ${custoTotal.toFixed(2)}`;

  resultadosDiv.classList.remove('hidden');
}


// Limpa o formulário (Victor)
function limparFormulario() {
  origemSelect.selectedIndex = 0;
  destinoSelect.selectedIndex = 0;
  consumoInput.value = '';
  precoInput.value = '';
  velocidadeInput.value = '';
  resumoDiv.innerHTML = '';
  resultadosDiv.classList.add('hidden');
}

// Pega os eventos
origemSelect.addEventListener('change', exibirResumo);
destinoSelect.addEventListener('change', exibirResumo);
calcularBtn.addEventListener('click', calcularViagem);
limparBtn.addEventListener('click', limparFormulario);

// Inicialização da funciton de declaração
preencherSelects();

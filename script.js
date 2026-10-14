// Banco de perguntas adequado para o 6º ano (Educação Física)
const perguntas = [
  {
    afirmacao: "O futsal é jogado com 5 jogadores em cada time dentro da quadra.",
    respostaCorreta: true,
    explicacao: "Correto! Cada equipe de futsal entra em quadra com 5 jogadores (4 de linha e 1 goleiro)."
  },
  {
    afirmacao: "Antes de praticar atividades físicas intensas, o alongamento e o aquecimento não são importantes.",
    respostaCorreta: false,
    explicacao: "Falso! Aquecer o corpo prepara os músculos e previne lesões."
  },
  {
    afirmacao: "No basquetebol, a cesta vale sempre 2 pontos, não importa de onde a bola é arremessada.",
    respostaCorreta: false,
    explicacao: "Falso! Arremessos atrás da linha de 3 pontos valem 3 pontos, e lances livres valem 1 ponto."
  },
  {
    afirmacao: "Jogos populares e brincadeiras tradicionais (como queimada e pira-esconde) também fazem parte da Educação Física.",
    respostaCorreta: true,
    explicacao: "Correto! Brincadeiras desenvolvem agilidade, cooperação e coordenação motora."
  },
  {
    afirmacao: "Beber água durante a prática de exercícios ajuda a manter o corpo hidratado e saudável.",
    respostaCorreta: true,
    explicacao: "Correto! A hidratação é fundamental para o bom rendimento físico."
  }
];

// Estado do Jogo
let indicePerguntaAtual = 0;
let pontuacao = 0;
let respondendo = false;

// Seleção de Elementos do DOM
const telaInicial = document.getElementById('tela-inicial');
const telaJogo = document.getElementById('tela-jogo');
const telaFinal = document.getElementById('tela-final');

const btnIniciar = document.getElementById('btn-iniciar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const btnVerdadeiro = document.getElementById('btn-verdadeiro');
const btnFalso = document.getElementById('btn-falso');

const textoPergunta = document.getElementById('texto-pergunta');
const elPontuacao = document.getElementById('pontuacao');
const elNumeroQuestao = document.getElementById('numero-questao');
const elFeedback = document.getElementById('feedback');

const elPontuacaoFinal = document.getElementById('pontuacao-final');
const elMensagemResultado = document.getElementById('mensagem-resultado');
const elIconeResultado = document.getElementById('icone-resultado');

// Eventos de Clique
btnIniciar.addEventListener('click', iniciarJogo);
btnReiniciar.addEventListener('click', reiniciarJogo);

btnVerdadeiro.addEventListener('click', () => verificarResposta(true));
btnFalso.addEventListener('click', () => verificarResposta(false));

// Funções Principais
function iniciarJogo() {
  telaInicial.classList.remove('ativa');
  telaJogo.classList.add('ativa');
  
  indicePerguntaAtual = 0;
  pontuacao = 0;
  
  atualizarHUD();
  carregarPergunta();
}

function carregarPergunta() {
  respondendo = false;
  elFeedback.classList.add('oculto');
  
  const perguntaAtual = perguntas[indicePerguntaAtual];
  textoPergunta.textContent = perguntaAtual.afirmacao;
  
  atualizarHUD();
}

function atualizarHUD() {
  elPontuacao.textContent = pontuacao;
  elNumeroQuestao.textContent = `${indicePerguntaAtual + 1}/${perguntas.length}`;
}

function verificarResposta(respostaUsuario) {
  if (respondendo) return; // Evita múltiplos cliques rápidos
  respondendo = true;

  const perguntaAtual = perguntas[indicePerguntaAtual];
  const acertou = respostaUsuario === perguntaAtual.respostaCorreta;

  if (acertou) {
    pontuacao += 20; // 5 perguntas = total de 100 pontos
    elFeedback.textContent = `🎯 Acertou! ${perguntaAtual.explicacao}`;
    elFeedback.className = "feedback correto";
  } else {
    elFeedback.textContent = `❌ Ops! ${perguntaAtual.explicacao}`;
    elFeedback.className = "feedback incorreto";
  }

  elFeedback.classList.remove('oculto');
  atualizarHUD();

  // Transição automática para a próxima pergunta após 2,5 segundos
  setTimeout(() => {
    indicePerguntaAtual++;
    if (indicePerguntaAtual < perguntas.length) {
      carregarPergunta();
    } else {
      finalizarJogo();
    }
  }, 2500);
}

function finalizarJogo() {
  telaJogo.classList.remove('ativa');
  telaFinal.classList.add('ativa');

  elPontuacaoFinal.textContent = `${pontuacao} pontos`;

  if (pontuacao >= 80) {
    elIconeResultado.textContent = "🏆";
    elMensagemResultado.textContent = "Excelente! Você domina os conceitos da Educação Física!";
  } else if (pontuacao >= 40) {
    elIconeResultado.textContent = "🥇";
    elMensagemResultado.textContent = "Muito bom! Com um pouco mais de treino você fica craque!";
  } else {
    elIconeResultado.textContent = "⚽";
    elMensagemResultado.textContent = "Continue praticando e estudando! Exercício faz bem pra tudo!";
  }
}

function reiniciarJogo() {
  telaFinal.classList.remove('ativa');
  iniciarJogo();
}
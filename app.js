// Inicialização das variáveis
let listaDeNumerosSorteados = []; // Array para armazenar os números já sorteados
let numeroLimite = 10; // Limite máximo do número secreto
let numeroSecreto = gerarNumeroAleatorio(); // Gera o número secreto inicial
let tentativas = 1; // Contador de tentativas

// Função para exibir texto na tela e falar em voz alta
function exibirTextoNaTela(tag, texto) {
  // Seleciona o elemento HTML com a tag especificada
  let campo = document.querySelector(tag);
  // Atualiza o conteúdo do elemento com o novo texto
  campo.innerHTML = texto;
  // Utiliza a biblioteca responsiveVoice para falar o texto em voz alta
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// Função para exibir a mensagem inicial do jogo
function exibirMensagemInicial() {
  exibirTextoNaTela('h1', 'Jogo do número secreto'); // Exibe o título
  exibirTextoNaTela('p', 'Escolha um número entre 1 e 10'); // Exibe a instrução
}

exibirMensagemInicial(); // Chama a função para exibir a mensagem inicial

// Função para verificar o chute do jogador
function verificarChute() {
  let chute = document.querySelector('input').value; // Obtém o valor digitado pelo jogador

  if (chute == numeroSecreto) {
    // Se o chute for igual ao número secreto, o jogador acertou
    exibirTextoNaTela('h1', 'Acertou!');
    // Constrói a mensagem com o número de tentativas
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela('p', mensagemTentativas);
    // Habilita o botão de reiniciar
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    // Se o chute for diferente do número secreto, informa se é maior ou menor
    if (chute > numeroSecreto) {
      exibirTextoNaTela('p', 'O número secreto é menor');
    } else {
      exibirTextoNaTela('p', 'O número secreto é maior');
    }
    // Incrementa o contador de tentativas e limpa o campo de entrada
    tentativas++;
    limparCampo();
  }
}

// Função para gerar um número aleatório único
function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Gera um número aleatório entre 1 e numeroLimite

  // Verifica se a lista de números sorteados está cheia
  if (listaDeNumerosSorteados.length == numeroLimite) {
    listaDeNumerosSorteados = []; // Limpa a lista se estiver cheia
  }
  // Verifica se o número já foi sorteado
  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio(); // Chama a função novamente para gerar outro número
  } else {
    // Adiciona o número à lista e retorna o número
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados); // Imprime a lista de números sorteados no console (para debug)
    return numeroEscolhido;
  }
}

// Função para limpar o campo de entrada
function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  // Gera um novo número secreto, limpa o campo, zera o contador de tentativas e exibe a mensagem inicial
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  // Desabilita o botão de reiniciar (para evitar que seja clicado antes de começar um novo jogo)
  document.getElementById('reiniciar').setAttribute('disabled', true)
}

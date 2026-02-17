// Função para fazer o pedido na página index.html
function fazerPedido(sabor, tamanhoId, precoBase) {
  const tamanho = document.getElementById(tamanhoId).value;
  const quantidade = 1; // pode evoluir para input do usuário

  // Ajuste de preço por tamanho
  let preco = precoBase;
  if (tamanho === "Média") preco += 10;
  if (tamanho === "Grande") preco += 20;

  const total = preco * quantidade;

  // Guardar pedido no localStorage
  localStorage.setItem("pedido", JSON.stringify({ sabor, tamanho, quantidade, total }));

  // Redirecionar para página de pagamento
  window.location.href = "pagamento.html";
}

// Função para carregar resumo do pedido na página pagamento.html
function carregarResumo() {
  const pedido = JSON.parse(localStorage.getItem("pedido"));
  if (pedido) {
    document.getElementById("resumo").innerText =
      `Você escolheu: ${pedido.sabor} (${pedido.tamanho}) x${pedido.quantidade} 
       | Total: R$ ${pedido.total}`;
  }
}

// Função para confirmar o pedido na página pagamento.html
function confirmarPedido(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const pagamento = document.getElementById("pagamento").value;

  const pedido = JSON.parse(localStorage.getItem("pedido"));

  if (pedido && nome && endereco && telefone) {
    // Esconde o formulário e mostra a confirmação
    document.getElementById("formPagamento").style.display = "none";
    const confirmacao = document.getElementById("confirmacao");
    confirmacao.style.display = "block";

    // Mensagem para WhatsApp
    const mensagem = `Olá, sou ${nome}. Meu pedido:\nPizza: ${pedido.sabor} (${pedido.tamanho}) x${pedido.quantidade}\nTotal: R$ ${pedido.total}\nEndereço: ${endereco}\nTelefone: ${telefone}\nPagamento: ${pagamento}`;
    
    // Número da pizzaria (exemplo fictício)
    const numeroPizzaria = "5548999999999"; // formato com DDI + DDD + número
    const link = `https://wa.me/${numeroPizzaria}?text=${encodeURIComponent(mensagem)}`;

    document.getElementById("whatsappLink").href = link;

    // Limpar dados
    localStorage.removeItem("pedido");
  } else {
    alert("Por favor, preencha todos os campos!");
  }
}

// Detecta se estamos na página de pagamento e carrega funções
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("resumo")) {
    carregarResumo();
    document.getElementById("formPagamento").addEventListener("submit", confirmarPedido);
  }
});

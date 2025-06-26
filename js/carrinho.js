// Verifica se há produto enviado via URL
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const nome = params.get("produto");
  const preco = parseFloat(params.get("preco"));
  const imagem = params.get("imagem");

  if (nome && !isNaN(preco) && imagem) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const existente = carrinho.find(p => p.nome === nome);
    if (existente) {
      existente.quantidade += 1;
    } else {
      carrinho.push({ nome, preco, imagem, quantidade: 1 });
    }
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  carregarCarrinho(); // chama função principal
});

// Função para carregar os produtos do carrinho
function carregarCarrinho() {
  const carrinhoItens = document.getElementById("carrinho-itens");
  const totalSpan = document.getElementById("total");
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (carrinho.length === 0) {
    carrinhoItens.innerHTML = "<p>Seu carrinho está vazio.</p>";
    totalSpan.textContent = "0,00";
    return;
  }

  let total = 0;
  carrinhoItens.innerHTML = "";

  carrinho.forEach((item, index) => {
    total += item.preco * item.quantidade;

    const div = document.createElement("div");
    div.className = "item-carrinho";
    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" />
      <div class="info">
        <h4>${item.nome}</h4>
        <p>R$ ${item.preco.toFixed(2)} x ${item.quantidade}</p>
      </div>
      <div class="quantidade">
        <button onclick="alterarQuantidade(${index}, -1)">-</button>
        <span>${item.quantidade}</span>
        <button onclick="alterarQuantidade(${index}, 1)">+</button>
      </div>
      <button onclick="removerItem(${index})">Remover</button>
    `;
    carrinhoItens.appendChild(div);
  });

  totalSpan.textContent = total.toFixed(2);
}

// Altera a quantidade de um item
function alterarQuantidade(index, delta) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho[index].quantidade += delta;
  if (carrinho[index].quantidade <= 0) {
    carrinho.splice(index, 1);
  }
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  carregarCarrinho();
}

// Remove item do carrinho
function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  carregarCarrinho();
}

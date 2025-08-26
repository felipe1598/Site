// Produtos "mockados" (front-end puro, ideal para GitHub Pages)
const PRODUTOS = [
  { id: "vip30", nome: "Acesso VIP 30 dias", preco: 50.0, destaque: "Mais vendido" },
  { id: "vip7",  nome: "Acesso VIP 7 dias",  preco: 20.0, destaque: "Comece agora" }
];

// Renderizar lista de produtos na página produtos.html
function renderProdutos() {
  const el = document.getElementById("listaProdutos");
  if (!el) return;

  el.innerHTML = PRODUTOS.map(p => `
    <article class="card produto-card">
      <span class="badge">${p.destaque}</span>
      <h3>${p.nome}</h3>
      <p class="price">R$ ${p.preco.toFixed(2).replace(".", ",")}</p>
      <a class="btn primary" href="checkout.html?produto=${encodeURIComponent(p.id)}">Comprar</a>
    </article>
  `).join("");
}

// Util: pegar parâmetro da URL
function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// Preencher informações do checkout com base no produto da URL
function preencherCheckout() {
  const id = getParam("produto");
  const titulo = document.getElementById("produtoTitulo");
  const resumo = document.getElementById("produtoResumo");

  if (!titulo || !resumo) return;

  const produto = PRODUTOS.find(p => p.id === id) || PRODUTOS[0];
  titulo.textContent = `Pagamento: ${produto.nome}`;
  resumo.textContent = `Valor: R$ ${produto.preco.toFixed(2).replace(".", ",")}`;
}

// Botão copiar chave Pix
function setupCopiarPix() {
  const copiarBtn = document.getElementById("copiarBtn");
  const pixKey = document.getElementById("pixKey");
  if (!copiarBtn || !pixKey) return;

  copiarBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pixKey.textContent);
      alert("Chave Pix copiada!");
    } catch (e) {
      alert("Não foi possível copiar a chave Pix.");
    }
  });
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderProdutos();
  preencherCheckout();
  setupCopiarPix();
});

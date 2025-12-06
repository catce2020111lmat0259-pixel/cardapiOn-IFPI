// arquivo único. observações gerais:BANCO DE DADOS SEPARADO (BASE)

/* "banco de dados original"
let alimentos = [
    { nome: "Arroz", categoria: "Grãos", unidade: "kg", criado: new Date(), modificado: new Date() },
    { nome: "Feijão", categoria: "Grãos", unidade: "kg", criado: new Date(), modificado: new Date() },
    { nome: "Frango", categoria: "Carnes", unidade: "kg", criado: new Date(), modificado: new Date() },
    { nome: "Farofa", categoria: "Grãos", unidade: "kg", criado: new Date(), modificado: new Date() },
    { nome: "Salada", categoria: "Hortaliças", unidade: "unidade", criado: new Date(), modificado: new Date() },
    { nome: "Fruta", categoria: "Hortaliças", unidade: "unidade", criado: new Date(), modificado: new Date() },
    { nome: "Macarrão", categoria: "Massas", unidade: "kg", criado: new Date(), modificado: new Date() },
    { nome: "Lasanha", categoria: "Massas", unidade: "unidade", criado: new Date(), modificado: new Date() },
    // ... com base nos cardápios que já aparecem.
]; */

let alimentos = [
  // Grãos
  { nome: "Arroz", categoria: "Grãos", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Feijão", categoria: "Grãos", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Farofa", categoria: "Grãos", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Arroz colorido", categoria: "Grãos", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Feijão preto", categoria: "Grãos", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Feijão tropeiro", categoria: "Grãos", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Maria Isabel", categoria: "Grãos", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Baião de dois", categoria: "Grãos", unidade: "kg", criado: new Date(), modificado: new Date() },

  // Carnes
  { nome: "Frango", categoria: "Carnes", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Lombo suíno", categoria: "Carnes", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Estrogonofe de frango", categoria: "Carnes", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Iscas de carne", categoria: "Carnes", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Tábua mista", categoria: "Carnes", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Assado de panela", categoria: "Carnes", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Pernil suíno", categoria: "Carnes", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Creme de galinha", categoria: "Carnes", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Bife com cebolas", categoria: "Carnes", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Picadinho com legumes", categoria: "Carnes", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Chapa mista", categoria: "Carnes", unidade: "kg", criado: new Date(), modificado: new Date() },

  // Hortaliças
  { nome: "Salada", categoria: "Hortaliças", unidade: "unidade", criado: new Date(), modificado: new Date() },
  { nome: "Salada tropical com feijão fradinho", categoria: "Hortaliças", unidade: "unidade", criado: new Date(), modificado: new Date() },

  // Massas
  { nome: "Macarrão", categoria: "Massas", unidade: "kg", criado: new Date(), modificado: new Date() },
  { nome: "Lasanha", categoria: "Massas", unidade: "unidade", criado: new Date(), modificado: new Date() },
  { nome: "Macarrão especial", categoria: "Massas", unidade: "kg", criado: new Date(), modificado: new Date() },

  // Sobremesas
  { nome: "Fruta", categoria: "Sobremesas", unidade: "unidade", criado: new Date(), modificado: new Date() },
  { nome: "Doce", categoria: "Sobremesas", unidade: "unidade", criado: new Date(), modificado: new Date() },
  { nome: "Chocolate quente", categoria: "Sobremesas", unidade: "unidade", criado: new Date(), modificado: new Date() },

  // Outros (Especial)
  { nome: "Cuscuz com ovos/calabresa", categoria: "Outros", unidade: "unidade", criado: new Date(), modificado: new Date() },
  { nome: "Cachorro quente", categoria: "Outros", unidade: "unidade", criado: new Date(), modificado: new Date() },
  { nome: "Batata frita", categoria: "Outros", unidade: "unidade", criado: new Date(), modificado: new Date() },
  { nome: "Sopa", categoria: "Outros", unidade: "unidade", criado: new Date(), modificado: new Date() }
];

// carrega os alimentos
function carregarAlimentos(categoria, refeicao, dia) {
  const container = document.querySelector(
    `.dia-cardapio[data-dia="${dia}"] .refeicao[data-refeicao="${refeicao}"] .checkboxes-categoria`
  );

  if (!container) return;

  container.innerHTML = "";

  const lista = alimentos.filter(a => a.categoria === categoria);

  lista.forEach(alimento => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = alimento.nome;
    input.name = `${categoria}-${refeicao}-${dia}`;

    label.appendChild(input);
    label.appendChild(document.createTextNode(alimento.nome));
    container.appendChild(label);
  });

  // mostra
  const painel = container.closest(".painel-selecao");
  painel.querySelector(".nome-categoria").textContent = categoria;
  painel.style.display = "block";
}

document.querySelectorAll(".categorias button").forEach(botao => {
  botao.addEventListener("click", () => {
    const categoria = botao.dataset.categoria;
    const bloco = botao.closest(".bloco-refeicao");
    const refeicao = bloco.closest(".refeicao").dataset.refeicao;
    const dia = bloco.closest(".dia-cardapio").dataset.dia;

    carregarAlimentos(categoria, refeicao, dia);
  });
});;
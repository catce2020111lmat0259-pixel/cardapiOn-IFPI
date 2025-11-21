// menu lateral
document.querySelectorAll("aside nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const texto = link.innerText.toLowerCase();

        document.querySelectorAll("main section").forEach(sec => sec.classList.remove("ativo"));

        // mostra o módulo
        if (texto.includes("cardápio")) {
            document.getElementById("modulo-cardapio").classList.add("ativo");
        } else if (texto.includes("alimentos")) {
            document.getElementById("modulo-alimentos").classList.add("ativo");
        } else if (texto.includes("avisos")) {
            document.getElementById("modulo-avisos").classList.add("ativo");
        } else if (texto.includes("relatórios")) {
            document.getElementById("modulo-relatorios").classList.add("ativo");
        }
    });
});

// módulo alimentos
const formAlimento = document.getElementById("form-alimento");
const listaAlimentos = document.querySelector(".lista-alimentos");
const filtroBusca = document.querySelector(".filtros-alimentos input");
const filtroCategoria = document.querySelector(".filtros-alimentos select");

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

document.getElementById("ver-banco").addEventListener("click", () => {
    renderizarAlimentos(alimentos);
});

function renderizarAlimentos(dados) {
    const container = document.getElementById("modulo-alimentos");

    // remove blocos antigos
    const antigos = container.querySelector(".blocos-expandido");
    if (antigos) antigos.remove();

    const blocos = document.createElement("div");
    blocos.className = "blocos-expandido";

    const agrupado = {};
    dados.forEach(alimento => {
        if (!agrupado[alimento.categoria]) {
            agrupado[alimento.categoria] = [];
        }
        agrupado[alimento.categoria].push(alimento);
    });

    Object.keys(agrupado).forEach(categoria => {
        const bloco = document.createElement("div");
        bloco.className = "categoria-bloco";

        const titulo = document.createElement("h3");
        titulo.textContent = categoria;
        bloco.appendChild(titulo);

        const lista = document.createElement("ul");
        lista.className = "lista-categoria";

        agrupado[categoria].forEach(alimento => {
            const indexReal = alimentos.indexOf(alimento);
            const item = document.createElement("li");
            item.innerHTML = `
                <span>${alimento.nome} (${alimento.unidade})</span>
                <div>
                <button onclick="editarAlimento(${indexReal})">Editar</button>
                <button onclick="excluirAlimento(${indexReal})">Excluir</button>
                </div>
            `;
            lista.appendChild(item);
        });

        bloco.appendChild(lista);

        const botaoAdd = document.createElement("button");
        botaoAdd.className = "adicionar";
        botaoAdd.textContent = "+ Adicionar alimento";
        bloco.appendChild(botaoAdd);

        blocos.appendChild(bloco);
    });

    container.insertBefore(blocos, container.querySelector(".resumo-estoque"));
    atualizarResumo();
}

// adicionar alimento
formAlimento.addEventListener("submit", e => {
    e.preventDefault();

    const nome = formAlimento.querySelector("input[type='text']").value.trim();
    const categoria = formAlimento.querySelector("select").value;
    const unidade = formAlimento.querySelectorAll("input[type='text']")[1].value.trim();

    if (!nome || !categoria || !unidade) {
        alert("Preencha todos os campos!");
        return;
    }

    // alimentos duplicados
    if (alimentos.some(a => a.nome.toLowerCase() === nome.toLowerCase())) {
        alert("Esse alimento já está cadastrado!");
        return;
    }

    alimentos.push({ nome, categoria, unidade, criado: new Date(), modificado: new Date() });
    renderizarAlimentos(alimentos);
    formAlimento.reset();
});
// + adicionar alimento
document.addEventListener("click", e => {
    if (e.target.classList.contains("adicionar")) {
        const bloco = e.target.closest(".categoria-bloco");
        const categoria = bloco.querySelector("h3").textContent;

        const select = document.querySelector("#form-alimento select");
        select.value = categoria;

        document.getElementById("form-alimento").scrollIntoView({ behavior: "smooth" });

        const form = document.getElementById("form-alimento");
        form.style.boxShadow = "0 0 10px #2e7d32";
        setTimeout(() => {
            form.style.boxShadow = "none";
        }, 1000);
    }
});

// editar alimento
function editarAlimento(index) {
    const alimento = alimentos[index];
    const novoNome = prompt("Editar nome:", alimento.nome);
    const novaCategoria = prompt("Editar categoria:", alimento.categoria);
    const novaUnidade = prompt("Editar unidade:", alimento.unidade);

    if (novoNome && novaCategoria && novaUnidade) {
        alimentos[index] = {
            ...alimento,
            nome: novoNome,
            categoria: novaCategoria,
            unidade: novaUnidade,
            modificado: new Date()
        };
        renderizarAlimentos(alimentos);
    }
}

// excluir alimento
function excluirAlimento(index) {
    if (confirm("Tem certeza que deseja excluir este alimento?")) {
        alimentos.splice(index, 1);
        renderizarAlimentos(alimentos);
    }
}

// filtro de busca
filtroBusca.addEventListener("input", () => {
    const termo = filtroBusca.value.toLowerCase();
    const filtrados = alimentos.filter(a => a.nome.toLowerCase().includes(termo));
    renderizarAlimentos(filtrados);
});

// filtro de categoria
filtroCategoria.addEventListener("change", () => {
    const categoria = filtroCategoria.value;
    const filtrados = categoria ? alimentos.filter(a => a.categoria === categoria) : alimentos;
    renderizarAlimentos(filtrados);
});

// resumo
function atualizarResumo() {
    const resumo = document.querySelector(".resumo-estoque");
    if (!resumo) return;

    resumo.innerHTML = `
    <h3>Resumo do Estoque</h3>
    <p>Total de alimentos cadastrados: ${alimentos.length}</p>
    <p>Última modificação: ${new Date().toLocaleDateString()}</p>
    <p>Cardápios ativos usando esses alimentos: 2</p>
  `;
}
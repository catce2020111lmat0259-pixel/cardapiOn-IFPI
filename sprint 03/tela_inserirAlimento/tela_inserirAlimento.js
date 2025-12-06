// menu lateral
document.querySelectorAll("aside nav a").forEach(link => {
    link.addEventListener("click", e => {
        const texto = link.innerText.toLowerCase();

        if (link.getAttribute("href") !== "#") return;

        e.preventDefault();

        document.querySelectorAll("main section").forEach(sec => sec.classList.remove("ativo"));

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

        document.getElementById("modulo-alimentos").scrollIntoView({ behavior: "smooth", block: "start" });

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
function atualizarResumo(lista = alimentos) {
    const resumo = document.querySelector(".resumo-estoque");
    if (!resumo) return;

    resumo.innerHTML = `
    <h3>Resumo do Estoque</h3>
    <p>Total de alimentos cadastrados: ${alimentos.length}</p>
    <p>Última modificação: ${new Date().toLocaleDateString()}</p>
    <p>Cardápios ativos usando esses alimentos: 2</p>
  `;
}

document.getElementById("modulo-alimentos").classList.add("ativo");

renderizarAlimentos(alimentos);
atualizarResumo();
// simulação
const refeicoes = [
    // Semana 10/11 a 14/11
    // Segunda (10/11)
    { data: "2025-11-10", tipo: "Almoço", cardapio: "Chapa mista, Arroz colorido, Feijão preto, Farofa, Salada, Fruta" },
    { data: "2025-11-10", tipo: "Jantar", cardapio: "Frango assado, Arroz, Feijão com legumes, Farofa, Salada, Fruta" },

    // Terça (11/11)
    { data: "2025-11-11", tipo: "Almoço", cardapio: "Lombo suíno, Arroz, Feijão com legumes, Farofa, Salada, Fruta" },
    { data: "2025-11-11", tipo: "Jantar", cardapio: "Picadinho com legumes, Baião de dois, Macarrão, Salada, Fruta" },

    // Quarta (12/11)
    { data: "2025-11-12", tipo: "Almoço", cardapio: "Estrogonofe de frango, Baião de dois, Macarrão, Salada, Fruta" },
    { data: "2025-11-12", tipo: "Jantar", cardapio: "Filé de frango, Arroz, Feijão com legumes, Farofa, Salada, Fruta" },

    // Quinta (13/11)
    { data: "2025-11-13", tipo: "Almoço", cardapio: "Picadinho com legumes, Baião de dois, Macarrão, Salada, Fruta" },
    { data: "2025-11-13", tipo: "Jantar", cardapio: "Assado de panela, Arroz, Feijão com legumes, Macarrão, Salada, Fruta" },

    // Sexta (14/11)
    { data: "2025-11-14", tipo: "Almoço", cardapio: "Iscas de carne à parmegiana, Arroz, Macarrão, Salada tropical com feijão fradinho, Fruta" },
    { data: "2025-11-14", tipo: "Jantar", cardapio: "Tábua mista, Arroz, Feijão com legumes, Farofa, Salada, Fruta" },

    // Semana 17/11 a 21/11
    // Segunda (17/11)
    { data: "2025-11-17", tipo: "Almoço", cardapio: "Arroz com frango, Feijão com legumes, Macarrão, Salada, Fruta" },
    { data: "2025-11-17", tipo: "Jantar", cardapio: "Pernil suíno, Arroz, Feijão com legumes, Macarrão especial, Salada, Fruta" },

    // Terça (18/11)
    { data: "2025-11-18", tipo: "Almoço", cardapio: "Lombo suíno, Arroz colorido, Feijão preto, Farofa, Salada, Fruta" },
    { data: "2025-11-18", tipo: "Jantar", cardapio: "Frango assado, Arroz, Feijão com legumes, Farofa, Salada, Fruta" },

    // Quarta (19/11)
    { data: "2025-11-19", tipo: "Almoço", cardapio: "Creme de galinha, Maria Isabel, Feijão tropeiro, Salada, Fruta" },
    { data: "2025-11-19", tipo: "Jantar", cardapio: "Bife com cebolas, Arroz, Feijão com legumes, Farofa, Salada, Fruta" },

    // Quinta (20/11) — Feriado
    // Nenhuma refeição

    // Sexta (21/11)
    { data: "2025-11-21", tipo: "Almoço", cardapio: "Assado de panela, Arroz, Feijão com legumes, Farofa, Salada, Fruta" },
    { data: "2025-11-21", tipo: "Jantar", cardapio: "Cuscuz com ovos e calabresa, Chocolate quente" }
];

// elementos
const lista = document.querySelector(".lista-refeicoes");
const mensagemCarregando = document.querySelector(".mensagem-carregando");
const mensagemVazio = document.querySelector(".mensagem-vazio");
const mensagemSemResultado = document.querySelector(".mensagem-sem-resultado");
const botoesFiltro = document.querySelectorAll(".filtro");
const btnAplicar = document.querySelector(".intervalo-personalizado button");

// formatação data
function formatarData(dataStr) {
    const [ano, mes, dia] = dataStr.split("-");
    return `${dia}/${mes}/${ano}`;
}

// refeições na tela
function renderizarLista(dados) {
    lista.innerHTML = "";

    if (dados.length === 0) {
        mensagemVazio.style.display = "none";
        mensagemSemResultado.style.display = "block";
        return;
    }

    mensagemVazio.style.display = "none";
    mensagemSemResultado.style.display = "none";

    dados.sort((a, b) => new Date(b.data) - new Date(a.data));

    dados.forEach(refeicao => {
        const li = document.createElement("li");
        li.className = "refeicao";
        li.innerHTML = `
      <div class="info">
        <strong>📅 ${formatarData(refeicao.data)}</strong>
        <span>🍽️ ${refeicao.tipo}</span>
        <span>Cardápio: ${refeicao.cardapio}</span>
      </div>
      <button class="detalhes">Ver detalhes</button>
    `;
        lista.appendChild(li);
    });
}

// carregamento
function carregarHistorico(filtro) {
    mensagemCarregando.style.display = "block";
    lista.innerHTML = "";
    mensagemVazio.style.display = "none";
    mensagemSemResultado.style.display = "none";

    setTimeout(() => {
        mensagemCarregando.style.display = "none";

        let hoje = new Date();
        let filtradas = [];

        if (filtro === "Hoje") {
            const localHoje = new Date();
            const ano = localHoje.getFullYear();
            const mes = String(localHoje.getMonth() + 1).padStart(2, "0");
            const dia = String(localHoje.getDate()).padStart(2, "0");
            const hojeStr = `${ano}-${mes}-${dia}`;
            filtradas = refeicoes.filter(r => r.data === hojeStr);
        } else if (filtro === "Últimos 7 dias") {
            let seteDiasAtras = new Date();
            seteDiasAtras.setDate(hoje.getDate() - 7);
            filtradas = refeicoes.filter(r => new Date(r.data) >= seteDiasAtras);
        } else if (filtro === "Este mês") {
            filtradas = refeicoes.filter(r => new Date(r.data).getMonth() === hoje.getMonth());
        } else {
            filtradas = refeicoes;
        }

        if (refeicoes.length === 0) {
            mensagemVazio.style.display = "block";
        }

        renderizarLista(filtradas);
    }, 800);
}

// botão de filtro
botoesFiltro.forEach(botao => {
    botao.addEventListener("click", () => {
        botoesFiltro.forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");

        const texto = botao.innerText;
        if (texto !== "Aplicar") {
            carregarHistorico(texto);
        }
    });
});

// intervalo personalizado
btnAplicar.addEventListener("click", () => {
    const inicio = document.getElementById("dataInicio").value;
    const fim = document.getElementById("dataFim").value;

    if (!inicio || !fim) return;

    const filtradas = refeicoes.filter(r => {
        return r.data >= inicio && r.data <= fim;
    });

    renderizarLista(filtradas);
});

// detalhes
document.addEventListener("click", e => {
    if (e.target.classList.contains("detalhes")) {
        const info = e.target.previousElementSibling.innerText;
        alert(`Detalhes da refeição:\n\n${info}`);
    }
});

// exportar
document.querySelectorAll(".exportar button").forEach(botao => {
    botao.addEventListener("click", () => {
        alert(`Exportação foi um sucesso: ${botao.innerText}`);
    });
});

// inicializa com "Hoje"
carregarHistorico("Hoje");
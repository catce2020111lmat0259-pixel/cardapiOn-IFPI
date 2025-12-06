// importa os usuários do arquivo usuarios.js
import usuarios from "../../sprint 02/usuarios/usuarios.js";

const acoes = [
    "Login",
    "Logout",
    "Alteração de senha",
    "Cadastro de usuário",
    "Exclusão de usuário"
];

const status = ["Sucesso", "Falha"];

// IP aleatório
function gerarIP() {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

// gera data/hora aleatória dos últimos 5 dias
function gerarData() {
    const agora = new Date();
    const diasAtras = Math.floor(Math.random() * 5);
    const horas = Math.floor(Math.random() * 24);
    const minutos = Math.floor(Math.random() * 60);
    const segundos = Math.floor(Math.random() * 60);
    const data = new Date(
        agora.getFullYear(),
        agora.getMonth(),
        agora.getDate() - diasAtras,
        horas,
        minutos,
        segundos
    );
    return data.toISOString().replace("T", " ").split(".")[0];
}

function getUsuariosPorTipo(tipo) {
    return usuarios.filter(u => u.tipo === tipo);
}

// registro
function gerarRegistro(tipo) {
    const listaUsuarios = getUsuariosPorTipo(tipo);
    if (listaUsuarios.length === 0) return "";

    const usuarioObj = listaUsuarios[Math.floor(Math.random() * listaUsuarios.length)];
    const acao = acoes[Math.floor(Math.random() * acoes.length)];
    const st = status[Math.floor(Math.random() * status.length)];
    const ip = gerarIP();
    const data = gerarData();

    // se for admin
    const nivelInfo = usuarioObj.nivel ? ` (${usuarioObj.nivel})` : "";

    // cor do status
    const cor = st === "Sucesso" ? "rgb(0, 150, 0)" : "red";

    return `<tr>
          <td class="email">
            <a href="mailto:${usuarioObj.usuario}">
              ${usuarioObj.usuario}${nivelInfo}
            </a>
          </td>
          <td class="data">${data}</td>
          <td>${acao}</td>
          <td style="color:${cor}; font-weight:bold;">${st}</td>
          <td>${ip}</td>
        </tr>`;
}

// histórico
function mostrarHistorico(tipo, quantidade = 20) {
    const tbody = document.querySelector("#tabela-historico tbody");
    if (!tbody) return;

    tbody.innerHTML = "";
    for (let i = 0; i < quantidade; i++) {
        tbody.innerHTML += gerarRegistro(tipo);
    }

    document.querySelector("#historico-acesso").classList.remove("oculto");
    console.log("Exibindo histórico de:", tipo);
}

// eventos
document.querySelectorAll(".btn-historico").forEach(btn => {
    btn.addEventListener("click", () => {
        const tipo = btn.closest(".usuario-card").dataset.tipo; // aluno, funcionario, admin
        mostrarHistorico(tipo);
    });
});
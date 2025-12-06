// importa os usuários
import usuarios from "../../sprint 02/usuarios/usuarios.js";

function getUsuariosPorTipo(tipo) {
    return usuarios.filter(u => u.tipo === tipo);
}

function mostrarHistorico() {
    const historico = document.querySelector("#historico-acesso");
    const login = document.querySelector("#gerenciar-login-container");
    if (!historico || !login) return;

    historico.classList.remove("oculto");
    login.classList.add("oculto");
}

function renderizarLista(tipo, termo = "") {
    const listaUsuarios = getUsuariosPorTipo(tipo);
    const listaContainer = document.querySelector("#lista-usuarios");
    if (!listaContainer) return;

    listaContainer.innerHTML = "";

    listaUsuarios
        .filter(u => u.usuario.toLowerCase().includes(termo.toLowerCase()))
        .forEach(u => {
            listaContainer.innerHTML += `
                <div class="login-card">
                    <p><strong>${u.usuario}</strong></p>
                    <div class="actions">
                        <button class="btn-reset"><i class="fa-solid fa-key"></i> Resetar senha</button>
                        <button class="btn-bloquear"><i class="fa-solid fa-user-lock"></i> Bloquear/Desbloquear</button>
                        <button class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Forçar logout</button>
                    </div>
                </div>
            `;
        });
}

function mostrarGerenciarLogin(tipo) {
    const container = document.querySelector("#gerenciar-login-container");
    if (!container) return;

    // visibilidade
    document.querySelector("#historico-acesso").classList.add("oculto");
    container.classList.remove("oculto");

    container.innerHTML = `
        <h2>Gerenciar Login - ${tipo}</h2>
        <div class="search">
            <input type="text" id="campoBusca" placeholder="Buscar..." />
        </div>
        <div id="lista-usuarios"></div>
    `;

    renderizarLista(tipo);

    // busca
    const input = container.querySelector("#campoBusca");
    input.addEventListener("input", e => {
        renderizarLista(tipo, e.target.value);
    });

    console.log("Gerenciando login de:", tipo);
}

document.querySelectorAll(".btn-gerenciar-login").forEach(btn => {
    btn.addEventListener("click", () => {
        const tipo = btn.closest(".usuario-card").dataset.tipo;
        mostrarGerenciarLogin(tipo);
    });
});

document.querySelectorAll(".btn-historico").forEach(btn => {
    btn.addEventListener("click", () => {
        mostrarHistorico();
    });
});
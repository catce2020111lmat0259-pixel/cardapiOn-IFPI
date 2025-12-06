const btnNovoAviso = document.getElementById("btnNovoAviso");
const pendentes = document.getElementById("avisosPendentes");

// modal
const modal = document.getElementById("modalAviso");
const fecharModal = document.querySelector(".fechar-modal");
const btnSalvarModal = document.getElementById("btnSalvarModal");
const campoTitulo = document.getElementById("modalTitulo");
const campoDescricao = document.getElementById("modalDescricao");
const msgModal = document.getElementById("modalMensagem");

btnNovoAviso.addEventListener("click", () => {
  modal.style.display = "flex";
  document.body.classList.add("modal-ativo");
});

fecharModal.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.classList.remove("modal-ativo");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.classList.remove("modal-ativo");
  }
});

// salvar aviso
btnSalvarModal.addEventListener("click", () => {
  const titulo = campoTitulo.value.trim();
  const descricao = campoDescricao.value.trim();

  if (!titulo || !descricao) {
    msgModal.textContent = "Erro no salvamento: preencha todos os campos.";
    msgModal.style.color = "red";
    return;
  }

  const avisoCard = document.createElement("div");
  avisoCard.classList.add("card-aviso", "amarelo");

  avisoCard.innerHTML = `
    <span class="bola amarelo"></span>
    <div class="conteudo-aviso">
      <strong>${titulo}</strong>
      <p>${descricao}</p>
    </div>
    <div class="acoes-aviso">
      <button class="btn-publicar">Publicar</button>
      <button class="btn-indeferir">Indeferir</button>
    </div>
  `;

  pendentes.appendChild(avisoCard);
  modal.style.display = "none";
  limparModal();
  document.body.classList.remove("modal-ativo");
});

// limpar modal
function limparModal() {
  campoTitulo.value = "";
  campoDescricao.value = "";
  msgModal.textContent = "";
}

document.addEventListener("click", (e) => {
  const card = e.target.closest(".card-aviso");

  if (e.target.classList.contains("btn-publicar")) {
    card.classList.remove("amarelo");
    card.classList.add("verde");
    card.querySelector(".bola").className = "bola verde";
    document.getElementById("avisosPublicados").appendChild(card);
    card.querySelector(".btn-publicar").remove();
    card.querySelector(".btn-indeferir")?.remove();
  }

  if (e.target.classList.contains("btn-indeferir")) {
    card.classList.remove("amarelo");
    card.classList.add("vermelho");
    card.querySelector(".bola").className = "bola vermelho";
    document.getElementById("avisosInvalidos").appendChild(card);
    card.querySelector(".btn-publicar")?.remove();
    card.querySelector(".btn-indeferir").remove();
  }
});
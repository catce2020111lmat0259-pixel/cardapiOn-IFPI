function mostrarSecao(id) {
  const secoes = document.querySelectorAll('.secao');
  secoes.forEach(secao => {
    secao.style.display = 'none';
  });

  const ativa = document.getElementById(id);
  if (ativa) {
    ativa.style.display = 'block';
  }
}

function salvarAviso() {
  const aviso = document.querySelector("textarea").value.trim();
  if (aviso === "") return;

  const lista = document.querySelector(".avisos-lista");
  const item = document.createElement("li");
  item.innerHTML = `<strong>📢 ${aviso}</strong><br /><small>Observação: sem observações adicionais.</small><br />
    <button class="editar">Editar</button>
    <button class="excluir">Excluir</button>`;
  lista.prepend(item);

  document.querySelector("textarea").value = "";
  document.getElementById("confirmacao").style.display = "block";
}
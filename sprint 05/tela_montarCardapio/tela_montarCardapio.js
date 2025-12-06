// montando cardápio
const selecionadosPorRefeicao = {};

function montarCardapio() {
  const categorias = {};
  alimentos.forEach(alimento => {
    if (!categorias[alimento.categoria]) categorias[alimento.categoria] = [];
    categorias[alimento.categoria].push(alimento.nome);
  });

  document.querySelectorAll(".refeicao").forEach(refeicao => {
    const painel = refeicao.querySelector(".painel-selecao");
    const nomeCategoria = painel.querySelector(".nome-categoria");
    const checkboxesArea = painel.querySelector(".checkboxes-categoria");
    const botaoFechar = painel.querySelector(".fechar-painel");

    refeicao.querySelectorAll("button[data-categoria]").forEach(botao => {
      botao.addEventListener("click", () => {
        const categoria = botao.dataset.categoria;
        const dia = refeicao.closest('.dia-cardapio').dataset.dia;
        const tipo = refeicao.dataset.refeicao;
        const chave = `${tipo}-${dia}`;

        nomeCategoria.textContent = categoria;
        checkboxesArea.innerHTML = "";

        categorias[categoria].forEach(nome => {
          const label = document.createElement("label");
          label.innerHTML = `<input type="checkbox" 
                                name="${chave}" 
                                value="${nome}"> ${nome}`;
          const checkbox = label.querySelector("input");

          if (selecionadosPorRefeicao[chave] && selecionadosPorRefeicao[chave].has(nome)) {
            checkbox.checked = true;
          }

          checkbox.addEventListener("change", () => {
            if (!selecionadosPorRefeicao[chave]) {
              selecionadosPorRefeicao[chave] = new Set();
            }

            if (checkbox.checked) {
              selecionadosPorRefeicao[chave].add(checkbox.value);
            } else {
              selecionadosPorRefeicao[chave].delete(checkbox.value);
            }

            atualizarPreviewLocal(dia, tipo);
          });

          checkboxesArea.appendChild(label);
        });

        painel.style.display = "block";
        botaoFechar.classList.add("mostrar"); // *
      });
    });
    // *
    botaoFechar.addEventListener("click", () => {
      painel.style.display = "none";
      botaoFechar.classList.remove("mostrar");
    });


    painel.querySelector(".fechar-painel").addEventListener("click", () => {
      painel.style.display = "none";
    });
  });
}


// lista lateral
function atualizarPreviewLocal(dia, refeicao) {
  const lista = document.querySelector(`.lista-refeicao[data-dia="${dia}"][data-refeicao="${refeicao}"]`);
  const chave = `${refeicao}-${dia}`;
  const selecionados = selecionadosPorRefeicao[chave] ? Array.from(selecionadosPorRefeicao[chave]) : [];

  lista.innerHTML = "";
  selecionados.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    lista.appendChild(li);
  });
}

montarCardapio();

carregarAlimentos();

// estrutura cardápio
const formCardapio = document.getElementById("form-cardapio");
const resultado = document.getElementById("resultado-cardapio");

formCardapio.addEventListener("submit", e => {
  e.preventDefault();

  const dias = ["segunda", "terca", "quarta", "quinta", "sexta"];
  const refeicoes = ["almoco", "jantar"];
  const cardapio = {};

  dias.forEach(dia => {
    cardapio[dia] = {};
    refeicoes.forEach(refeicao => {
      const chave = `${refeicao}-${dia}`;
      const selecionados = selecionadosPorRefeicao[chave]
        ? Array.from(selecionadosPorRefeicao[chave])
        : [];

      cardapio[dia][refeicao] = selecionados;
    });
  });

  // botão limpar
  formCardapio.addEventListener("reset", () => {
    // zera os selecionados
    for (let chave in selecionadosPorRefeicao) {
      delete selecionadosPorRefeicao[chave];
    }

    // limpa listas "Selecionados"
    document.querySelectorAll(".lista-refeicao").forEach(lista => {
      lista.innerHTML = "";
    });

    // limpa os painéis mas mantém visíveis
    document.querySelectorAll(".painel-selecao").forEach(painel => {
      painel.querySelector(".nome-categoria").textContent = "";
      painel.querySelector(".checkboxes-categoria").innerHTML = "";
      painel.style.display = "block"; // garante que continue aparecendo
    });

    // esconde botões fechar
    document.querySelectorAll(".fechar-painel").forEach(botaoFechar => {
      botaoFechar.classList.remove("mostrar");
    });

    // limpa tabela e notificação
    resultado.innerHTML = "";
    document.getElementById("notificacao").style.display = "none";
  });

  // resultado em tabela
  let html = "<h3>Cardápio da Semana</h3><table border='1' style='border-collapse:collapse;'>";
  html += "<tr><th>Dia</th><th>Almoço</th><th>Jantar</th></tr>";

  for (let dia in cardapio) {
    html += `<tr>
    <td>${dia.charAt(0).toUpperCase() + dia.slice(1)}</td>
    <td>${cardapio[dia].almoco.length ? cardapio[dia].almoco.join(", ") : "-"}</td>
    <td>${cardapio[dia].jantar.length ? cardapio[dia].jantar.join(", ") : "-"}</td>
  </tr>`;
  }
  html += "</table>";

  // botões
  html += `<div style="margin-top:10px; display:flex; gap:10px;">
    <button type="button" class="btn-publicar-tabela">
      <span class="material-icons">campaign</span> Publicar 
    </button>
    <button type="button" class="btn-excluir-tabela">
      <span class="material-icons">delete</span> Excluir 
    </button>
  </div>`;


  resultado.innerHTML = html;

  // publicar
  document.querySelector(".btn-publicar-tabela").addEventListener("click", () => {
    alert("Cardápio da semana publicado com sucesso!");
  });

  // excluir
  document.querySelector(".btn-excluir-tabela").addEventListener("click", () => {
    resultado.innerHTML = "";
    alert("Cardápio da semana excluído!");
  });

  document.getElementById("notificacao").style.display = "flex";
});

// fechar notificação
document.querySelector(".fechar-x").addEventListener("click", () => {
  document.getElementById("notificacao").style.display = "none";
});
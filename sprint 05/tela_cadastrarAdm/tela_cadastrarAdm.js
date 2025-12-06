const btnSalvar = document.querySelector(".btn-salvar");
const btnCancelar = document.querySelector(".btn-cancelar");
const btnNovo = document.getElementById("btnNovo");
const mensagem = document.getElementById("mensagemStatus");
const boxDados = document.getElementById("dadosGerados");

// gerar senha
function gerarSenha() {
  return "adm" + Math.floor(100000 + Math.random() * 900000);
}

btnSalvar.addEventListener("click", () => {
  mensagem.textContent = "";
  mensagem.style.color = "";
  boxDados.innerHTML = "";

  const obrigatorios = document.querySelectorAll(".obrigatorio + input, .obrigatorio + select");
  let erro = false;

  obrigatorios.forEach((campo) => {
    if (!campo.value.trim()) {
      campo.classList.add("erro");
      erro = true;
    } else {
      campo.classList.remove("erro");
      campo.classList.add("sucesso");
    }
  });

  if (erro) {
    mensagem.textContent = "Erro: preencha todos os campos obrigatórios.";
    mensagem.style.color = "red";
    return;
  }

  // dados
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const nivelAcesso = document.getElementById("nivelAcesso").value;

  // senha automática
  const senha = gerarSenha();

  // permissões
  const permissoesSelecionadas = Array.from(document.querySelectorAll(".checkboxes input:checked"))
    .map(cb => cb.value);

  // exibe os dados
  mensagem.textContent = "Administrador cadastrado com sucesso!";
  mensagem.style.color = "green";

  boxDados.innerHTML = `
    <h3>Dados gerados para o banco:</h3>
    <p><strong>Login:</strong> ${email}</p>
    <p><strong>Senha:</strong> ${senha}</p>
    <p><strong>Nível de Acesso:</strong> ${nivelAcesso}</p>
    <p><strong>Permissões:</strong> ${permissoesSelecionadas.join(", ") || "Nenhuma"}</p>
    <p><strong>INSERT SQL:</strong></p>
    <code>
      INSERT INTO administradores (nome, email, senha, nivel_acesso, permissoes, tipo_usuario)<br>
      VALUES ('${nome}', '${email}', '${senha}', '${nivelAcesso}', '${permissoesSelecionadas.join(",")}', 'admin');
    </code>
  `;
});

btnCancelar.addEventListener("click", () => {
  document.querySelector(".form-adm").reset();
  mensagem.textContent = "";
  boxDados.innerHTML = "";
  document.querySelectorAll("input, select, textarea").forEach(el => el.classList.remove("erro", "sucesso"));
});

// novo administrador
btnNovo.addEventListener("click", () => {
  const form = document.querySelector(".form-adm");
  if (form && typeof form.reset === "function") {
    form.reset();
  } else {
    document.querySelectorAll("input, select, textarea").forEach(el => {
      el.value = "";
    });
  }
  // limpar
  document.querySelectorAll("input, select, textarea").forEach(el => el.classList.remove("erro", "sucesso"));
  mensagem.textContent = "";
  boxDados.innerHTML = "";
});
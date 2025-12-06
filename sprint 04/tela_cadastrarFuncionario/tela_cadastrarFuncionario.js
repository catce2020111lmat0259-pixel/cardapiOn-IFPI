const btnSalvar = document.querySelector(".btn-salvar");
const btnCancelar = document.querySelector(".btn-cancelar");
const btnNovo = document.getElementById("btnNovo");
const mensagem = document.getElementById("mensagemStatus");
const boxDados = document.getElementById("dadosGerados");

function gerarSenha() {
    return "ru" + Math.floor(100000 + Math.random() * 900000);
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

    // coleta os dados
    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const rg = document.getElementById("rg").value.trim();
    const nascimento = document.getElementById("nascimento").value;
    const sexo = document.getElementById("sexo").value;
    const email = document.getElementById("email").value.trim();
    const observacoes = document.getElementById("observacoes").value.trim();

    const senha = gerarSenha();
    const login = email || cpf;

    // exibe os dados simulados
    mensagem.textContent = "Funcionário cadastrado com sucesso!";
    mensagem.style.color = "green";

    boxDados.innerHTML = `
    <h3>Dados gerados para o banco:</h3>
    <p><strong>Login:</strong> ${login}</p>
    <p><strong>Senha:</strong> ${senha}</p>
    <p><strong>INSERT SQL:</strong></p>
    <code>
      INSERT INTO funcionarios (nome, cpf, email, senha, tipo_usuario, data_nascimento, sexo, observacoes)<br>
      VALUES ('${nome}', '${cpf}', '${login}', '${senha}', 'funcionario', '${nascimento}', '${sexo}', '${observacoes}');
    </code>
  `;
});

btnCancelar.addEventListener("click", () => {
    document.querySelector(".form-funcionario").reset();
    mensagem.textContent = "";
    boxDados.innerHTML = "";
    document.querySelectorAll("input, select, textarea").forEach(el => el.classList.remove("erro", "sucesso"));
});

// novo funcionário
btnNovo.addEventListener("click", () => {
  const form = document.querySelector(".form-funcionario");
  if (form && typeof form.reset === "function") {
    form.reset();
  } else {
    document.querySelectorAll("input, select, textarea").forEach(el => {
      el.value = "";
    });
  }
  // limpar tudo
  document.querySelectorAll("input, select, textarea").forEach(el => el.classList.remove("erro", "sucesso"));
  mensagem.textContent = "";
  boxDados.innerHTML = "";
});


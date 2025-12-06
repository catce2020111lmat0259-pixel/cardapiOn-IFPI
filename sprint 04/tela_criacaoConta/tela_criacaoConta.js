const form = document.getElementById("cadastroForm");
const senhaInput = document.getElementById("senha");
const confirmarInput = document.getElementById("confirmarSenha");
const toggleSenha = document.getElementById("toggleSenha");
const cpfInput = document.getElementById("cpf");
const mensagemErro = document.getElementById("mensagemErro");

// validar CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  return cpf.length === 11;
}

// mostrar/ocultar senha
toggleSenha.addEventListener("click", () => {
  if (senhaInput.type === "password") {
    senhaInput.type = "text";
    toggleSenha.textContent = "visibility_off"; // olho fechado
  } else {
    senhaInput.type = "password";
    toggleSenha.textContent = "visibility"; // olho aberto
  }
});

// validação ao enviar
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // limpa mensagens
  mensagemErro.textContent = "";
  mensagemErro.className = "";

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const cpf = cpfInput.value.trim();
  const senha = senhaInput.value;
  const confirmar = confirmarInput.value;

  // nome
  if (nome.length < 3) {
    mensagemErro.textContent = "Digite seu nome completo.";
    mensagemErro.classList.add("erro");
    return;
  }

  // CPF
  if (!validarCPF(cpf)) {
    mensagemErro.textContent = "CPF inválido. Digite 11 números.";
    mensagemErro.classList.add("erro");
    cpfInput.classList.add("erro");
    return;
  } else {
    cpfInput.classList.remove("erro");
    cpfInput.classList.add("sucesso");
  }

  // senha
  if (senha.length < 8) {
    mensagemErro.textContent = "A senha deve ter pelo menos 8 caracteres.";
    mensagemErro.classList.add("erro");
    senhaInput.classList.add("erro");
    return;
  } else {
    senhaInput.classList.remove("erro");
    senhaInput.classList.add("sucesso");
  }

  if (senha !== confirmar) {
    mensagemErro.textContent = "As senhas não coincidem.";
    mensagemErro.classList.add("erro");
    confirmarInput.classList.add("erro");
    return;
  } else {
    confirmarInput.classList.remove("erro");
    confirmarInput.classList.add("sucesso");
  }

  // se validar
  mensagemErro.textContent = "Conta criada com sucesso!";
  mensagemErro.classList.add("sucesso");
  form.reset();
});
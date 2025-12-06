const form = document.getElementById("formSolicitar");
const mensagemStatus = document.getElementById("mensagemStatus");
const btnEnviar = document.querySelector(".btn-enviar");

btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();

  mensagemStatus.textContent = "";
  mensagemStatus.className = "";

  const email = document.getElementById("email").value.trim();
  const cpf = document.getElementById("cpf").value.trim();

  if (!email || !cpf) {
    mensagemStatus.textContent = "Preencha todos os campos obrigatórios.";
    mensagemStatus.classList.add("erro");
    return;
  }

  // remove caracteres não numéricos
  const cpfNumeros = cpf.replace(/\D/g, "");

  // checa se tem 11 dígitos
  if (cpfNumeros.length !== 11) {
    mensagemStatus.textContent = "CPF ou e-mail inválido.";
    mensagemStatus.classList.add("erro");
    return;
  }

  // envio
  mensagemStatus.textContent = "Um link de redefinição foi enviado para seu e-mail.";
  mensagemStatus.classList.add("sucesso");

  form.reset();
});
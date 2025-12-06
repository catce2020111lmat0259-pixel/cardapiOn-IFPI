import usuarios from "../../sprint 02/usuarios/usuarios.js";

const toggleSenha = document.getElementById('toggleSenha');
const senhaInput = document.getElementById('senha');

toggleSenha.addEventListener("click", () => {
  if (senhaInput.type === "password") {
    senhaInput.type = "text";
    toggleSenha.innerText = "visibility_off";
  } else {
    senhaInput.type = "password";
    toggleSenha.innerText = "visibility";
  }
});

const formLogin = document.getElementById("loginForm");
const mensagemLogin = document.createElement("div");
formLogin.appendChild(mensagemLogin);

const rotasPorTipo = {
  aluno: "../../sprint 03/tela_inicial/tela_inicial_Alu.html",
  funcionario: "../../sprint 03/tela_inicial/tela_inicial_Fun.html",
  admin: "../../sprint 03/tela_inicial/tela_inicial_Adm.html"
};

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const usuarioDigitado = document.getElementById("usuario").value.trim().toLowerCase();
  const senhaDigitada = document.getElementById("senha").value.trim();

  const encontrado = usuarios.find(u => u.usuario.toLowerCase() === usuarioDigitado);

  if (!encontrado) {
    mensagemLogin.style.color = "red";
    mensagemLogin.textContent = "Usuário não cadastrado.";
    return;
  }

  if (encontrado.senha !== senhaDigitada) {
    mensagemLogin.style.color = "red";
    mensagemLogin.textContent = "Senha incorreta.";
    return;
  }

  mensagemLogin.style.color = "green";
  mensagemLogin.textContent = `Login bem-sucedido! Bem-vindo, perfil: ${encontrado.tipo}`;

  const rota = rotasPorTipo[encontrado.tipo];
  if (!rota) {
    console.error("Tipo de usuário sem rota configurada:", encontrado.tipo);
    mensagemLogin.style.color = "red";
    mensagemLogin.textContent = "Perfil sem rota configurada.";
    return;
  }

  window.location.href = rota;
});
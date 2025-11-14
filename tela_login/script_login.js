const toggleSenha = document.getElementById('toggleSenha');
const senhaInput = document.getElementById('senha');

toggleSenha.addEventListener('click', function () {
  const tipoAtual = senhaInput.getAttribute('type');

  if (tipoAtual === 'password') {
    senhaInput.setAttribute('type', 'text');
    toggleSenha.setAttribute('src', 'olho-aberto.png');
    toggleSenha.setAttribute('alt', 'Ocultar senha');
    toggleSenha.classList.remove('icone-fechado');
    toggleSenha.classList.add('icone-aberto');
  } else {
    senhaInput.setAttribute('type', 'password');
    toggleSenha.setAttribute('src', 'olho-fechado.png');
    toggleSenha.setAttribute('alt', 'Mostrar senha');
    toggleSenha.classList.remove('icone-aberto');
    toggleSenha.classList.add('icone-fechado');
  }
});
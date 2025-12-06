// status e funcionamento - funcionário
function verificarStatusRU() {
  const agora = new Date();
  const hora = agora.getHours();
  const minutos = agora.getMinutes();
  const diaSemana = agora.getDay(); // 0 = domingo, 6 = sábado

  const statusRU = document.getElementById("statusRU");

  // funciona de segunda a sexta
  const feriado = false;
  const funcionamento = (
    (hora >= 11 && hora < 13) ||
    (hora === 13 && minutos <= 30) ||
    (hora >= 17 && hora < 19) ||
    (hora === 19 && minutos <= 0)
  );

  // remove o estilo anterior
  statusRU.classList.remove("aberto", "fechado");

  // aplica novo estilo
  if (diaSemana === 0 || diaSemana === 6 || feriado) {
    statusRU.textContent = "Fechado (fim de semana ou feriado)";
    statusRU.classList.add("fechado");
  } else if (funcionamento) {
    statusRU.textContent = "Aberto";
    statusRU.classList.add("aberto");
  } else {
    statusRU.textContent = "Fechado";
    statusRU.classList.add("fechado");
  }
}

// atualiza a cada minuto
setInterval(verificarStatusRU, 60000);
verificarStatusRU(); // executa ao carregar
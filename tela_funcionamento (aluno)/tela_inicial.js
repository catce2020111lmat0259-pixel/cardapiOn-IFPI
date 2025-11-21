// Script base para futuras funcionalidades

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        alert(`Você clicou em: ${card.querySelector('h3').innerText}`);
    });
});

// atualizações do primeiro prototipo

// status e funcionamento
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

setInterval(verificarStatusRU, 60000); // atualiza a cada minuto
verificarStatusRU(); // executa ao carregar
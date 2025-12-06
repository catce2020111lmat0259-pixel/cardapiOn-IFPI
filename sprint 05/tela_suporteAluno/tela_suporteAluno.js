let iniciouMenu = false;
let moduloAtual = null;
let conversaEncerrada = false;

function mostrarMenuPrincipal() {
    const botMsg = document.createElement("div");
    botMsg.className = "mensagem bot";
    botMsg.innerHTML =
        "🙂 Como posso ajudar? Escolha uma opção:<br>" +
        "1️⃣ Horário de funcionamento<br>" +
        "2️⃣ Cardápio<br>" +
        "3️⃣ Avisos<br>" +
        "4️⃣ Problemas de login/usuário<br>" +
        "5️⃣ Outro assunto<br>" +
        "6️⃣ Encerrar conversa";
    chatWindow.appendChild(botMsg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    iniciouMenu = true;
    moduloAtual = null;
    conversaEncerrada = false;
}

function respostaPrincipal(opcao) {
    switch (opcao) {
        case "1":
            return "⏰ O RU funciona de 11:30 às 13:30 e de 17:00 às 19:00.";
        case "2":
            return "🍽️ Você pode consultar os cardápios ativos na aba Alimentos.";
        case "3":
            return "📢 Os avisos publicados estão disponíveis na aba Avisos.";
        case "4":
            mostrarMenuLogin();
            return null;
        case "5":
            return "✉️ Sua dúvida será encaminhada para o suporte real via e-mail.";
        case "6":
            conversaEncerrada = true;
            return "✅ Atendimento encerrado. Você conseguiu resolver sua dúvida?\nSe precisar, fique à vontade para usar o chat novamente.\nDigite 'reiniciar' para voltar ao menu ou 'sair' para encerrar.";
        default:
            return "❌ Opção inválida. Digite um número de 1 a 6.";
    }
}

sendMessage.addEventListener("click", () => {
    const msg = chatMessage.value.trim();
    if (!msg) return;

    const userMsg = document.createElement("div");
    userMsg.className = "mensagem user";
    userMsg.textContent = msg;
    chatWindow.appendChild(userMsg);

    if (!iniciouMenu) {
        if (msg.toLowerCase() === "oi" || msg.toLowerCase() === "olá") {
            mostrarMenuPrincipal();
        } else {
            const botMsg = document.createElement("div");
            botMsg.className = "mensagem bot";
            botMsg.textContent = "👀 Você pode me cumprimentar com 'Oi' para iniciar o atendimento.";
            chatWindow.appendChild(botMsg);
        }
    } else if (conversaEncerrada) {
        if (msg.toLowerCase() === "reiniciar") {
            mostrarMenuPrincipal();
        } else if (msg.toLowerCase() === "sair") {
            const botMsg = document.createElement("div");
            botMsg.className = "mensagem bot";
            botMsg.textContent = "👋 Conversa encerrada. Obrigado por usar o suporte!";
            chatWindow.appendChild(botMsg);
        } else {
            const botMsg = document.createElement("div");
            botMsg.className = "mensagem bot";
            botMsg.textContent = "Digite 'reiniciar' para voltar ao menu ou 'sair' para encerrar.";
            chatWindow.appendChild(botMsg);
        }
    } else {
        let resposta;
        if (moduloAtual === "login") {
            resposta = respostaLogin(msg);
        } else {
            resposta = respostaPrincipal(msg);
        }

        if (resposta) {
            const botMsg = document.createElement("div");
            botMsg.className = "mensagem bot";
            botMsg.textContent = resposta;
            chatWindow.appendChild(botMsg);
        }
    }

    chatMessage.value = "";
    chatWindow.scrollTop = chatWindow.scrollHeight;
});
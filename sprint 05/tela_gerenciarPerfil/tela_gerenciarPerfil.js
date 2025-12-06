// gerenciarPerfil

// funcionário
document.querySelector(".btn-cadastrar-funcionario")
  .addEventListener("click", () => {
    window.location.href = "../../sprint 04/tela_cadastrarFuncionario/tela_cadastrarFuncionario.html";
  });

// administrador
document.querySelector(".btn-cadastrar-admin")
  .addEventListener("click", () => {
    window.location.href = "../../sprint 05/tela_cadastrarAdm/tela_cadastrarAdm.html";
  });

// relatório de uso
document.querySelector(".btn-relatorio-login")
  .addEventListener("click", () => {
    // gera e baixa relatório CSV
    const dados = [
      ["Usuário", "Último acesso", "Status"],
      ["flavio@ifpi.com", "2025-12-01 10:30", "Ativo"],
      ["maria@ifpi.com", "2025-12-02 09:15", "Bloqueado"],
      ["joao@ifpi.com", "2025-12-03 14:20", "Ativo"],
      ["ana@ifpi.com", "2025-12-04 08:50", "Ativo"],
      ["pedro@ifpi.com", "2025-12-05 11:00", "Logout forçado"]
    ];

    const csvContent = dados.map(linha => linha.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "relatorio_uso.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("Relatório de uso baixado!");
  });
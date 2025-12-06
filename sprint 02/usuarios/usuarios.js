const usuarios = [
  // admin master
  { tipo: "admin", usuario: "gabriel.master@dominio.com", senha: "adm123456", nivel: "super" },

  // outros admins
  { tipo: "admin", usuario: "jaubert@dominio.com", senha: "adm654321", nivel: "gestor" },
  { tipo: "admin", usuario: "daniel@dominio.com", senha: "adm789456", nivel: "moderador" },
  { tipo: "admin", usuario: "diego@dominio.com", senha: "adm321654", nivel: "gestor" },
  { tipo: "admin", usuario: "flavio@dominio.com", senha: "adm987123", nivel: "moderador" },

  // funcionário
  { tipo: "funcionario", usuario: "funcionario0001@ifpi.com.br", senha: "func0001" },
  { tipo: "funcionario", usuario: "funcionario0002@ifpi.com.br", senha: "func0002" },
  { tipo: "funcionario", usuario: "funcionario0003@ifpi.com.br", senha: "func0003" },
  { tipo: "funcionario", usuario: "funcionario0004@ifpi.com.br", senha: "func0004" },
  { tipo: "funcionario", usuario: "funcionario0005@ifpi.com.br", senha: "func0005" },

  // aluno
  { tipo: "aluno", usuario: "flavio@ifpi.com", senha: "flav1234" },
  { tipo: "aluno", usuario: "maria@ifpi.com", senha: "maria1234" },
  { tipo: "aluno", usuario: "joao@ifpi.com", senha: "joao5678" },
  { tipo: "aluno", usuario: "ana@ifpi.com", senha: "ana4321" },
  { tipo: "aluno", usuario: "pedro@ifpi.com", senha: "pedro8765" }

];

export default usuarios;
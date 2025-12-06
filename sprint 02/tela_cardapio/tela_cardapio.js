// cardápios por semana
const semanas = {
  "2025-11-10_a_2025-11-14": {
    segunda: { almoco: ["Chapa mista","Arroz colorido","Feijão preto","Farofa","Salada","Fruta"], jantar: ["Frango assado","Arroz","Feijão com legumes","Farofa","Salada","Fruta"] },
    terca:   { almoco: ["Lombo suíno","Arroz","Feijão com legumes","Farofa","Salada","Fruta"], jantar: ["Picadinho com legumes","Baião de dois","Macarrão","Salada","Fruta"] },
    quarta:  { almoco: ["Estrogonofe de frango","Baião de dois","Macarrão","Salada","Fruta"], jantar: ["Filé de frango","Arroz","Feijão com legumes","Farofa","Salada","Fruta"] },
    quinta:  { almoco: ["Picadinho com legumes","Baião de dois","Macarrão","Salada","Fruta"], jantar: ["Assado de panela","Arroz","Feijão com legumes","Macarrão","Salada","Fruta"] },
    sexta:   { almoco: ["Iscas de carne à parmegiana","Arroz","Macarrão","Salada tropical com feijão fradinho","Fruta"], jantar: ["Tábua mista","Arroz","Feijão com legumes","Farofa","Salada","Fruta"] }
  },

  "2025-11-17_a_2025-11-21": {
    segunda: { almoco: ["Arroz com frango","Feijão com legumes","Macarrão","Salada","Fruta"], jantar: ["Pernil suíno","Arroz","Feijão com legumes","Macarrão especial","Salada","Fruta"] },
    terca:   { almoco: ["Lombo suíno","Arroz colorido","Feijão preto","Farofa","Salada","Fruta"], jantar: ["Frango assado","Arroz","Feijão com legumes","Farofa","Salada","Fruta"] },
    quarta:  { almoco: ["Creme de galinha","Maria Isabel","Feijão tropeiro","Salada","Fruta"], jantar: ["Bife com cebolas","Arroz","Feijão com legumes","Farofa","Salada","Fruta"] },
    quinta:  { almoco: [], jantar: [] }, // feriado
    sexta:   { almoco: ["Assado de panela","Arroz","Feijão com legumes","Farofa","Salada","Fruta"], jantar: ["Cuscuz com ovos e calabresa","Chocolate quente"] }
  }
};

// informações das semanas
const semanasInfo = [
  { id: "2025-11-10_a_2025-11-14", inicio: "2025-11-10", fim: "2025-11-14" },
  { id: "2025-11-17_a_2025-11-21", inicio: "2025-11-17", fim: "2025-11-21" }
];

let indiceSemana = 0;
let semanaAtual = semanasInfo[indiceSemana].id;

// formatar data
function formatarDataISO(dataISO) {
  const d = new Date(dataISO);
  return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}`;
}

// atualizar semana e botões
function atualizarSemanaNav() {
  const semana = semanasInfo[indiceSemana];
  document.getElementById("semana-atual").textContent =
    `Semana ${formatarDataISO(semana.inicio)} a ${formatarDataISO(semana.fim)}`;

  const diasNav = document.getElementById("dias-nav");
  diasNav.innerHTML = "";

  const dias = ["segunda","terca","quarta","quinta","sexta"];
  for (let i=0; i<dias.length; i++) {
    const data = new Date(semana.inicio);
    data.setDate(data.getDate()+i);
    const btn = document.createElement("button");
    btn.className = "dia-btn" + (i===0 ? " ativo" : "");
    btn.dataset.dia = dias[i];
    btn.textContent = `${dias[i].charAt(0).toUpperCase()+dias[i].slice(1)} (${formatarDataISO(data.toISOString().slice(0,10))})`;
    diasNav.appendChild(btn);

    btn.addEventListener("click", () => {
      document.querySelectorAll(".dia-btn").forEach(b => b.classList.remove("ativo"));
      btn.classList.add("ativo");
      abrirModal(dias[i]);
    });
  }
}

// mostrar cardápio do dia
function mostrarCardapio(dia) {
  const dados = semanas[semanaAtual][dia];
  const cardapioDia = document.getElementById("cardapio-dia");
  cardapioDia.innerHTML = `
    <h2>${dia.charAt(0).toUpperCase() + dia.slice(1)}</h2>
    <strong>Almoço:</strong>
    <ul>${dados.almoco.length ? dados.almoco.map(item => `<li>${item}</li>`).join('') : '<li>Feriado</li>'}</ul>
    <strong>Jantar:</strong>
    <ul>${dados.jantar.length ? dados.jantar.map(item => `<li>${item}</li>`).join('') : '<li>Feriado</li>'}</ul>
  `;
}

// modal
const overlay = document.getElementById('overlay');
const listaAlmoco = document.getElementById('lista-almoco');
const listaJantar = document.getElementById('lista-jantar');
const fecharModal = document.getElementById('fecharModal');

function abrirModal(dia) {
  const dados = semanas[semanaAtual][dia];
  listaAlmoco.innerHTML = dados.almoco.length ? dados.almoco.map(item => `<li>${item}</li>`).join('') : '<li>Feriado</li>';
  listaJantar.innerHTML = dados.jantar.length ? dados.jantar.map(item => `<li>${item}</li>`).join('') : '<li>Feriado</li>';
  overlay.style.display = 'flex';
  document.body.classList.add('modal-ativo');
}

fecharModal.addEventListener('click', () => {
  overlay.style.display = 'none';
  document.body.classList.remove('modal-ativo');
});

// entre semanas
document.getElementById("semana-anterior").addEventListener("click", () => {
  if (indiceSemana > 0) {
    indiceSemana--;
    semanaAtual = semanasInfo[indiceSemana].id;
    atualizarSemanaNav();
  }
});

document.getElementById("semana-proxima").addEventListener("click", () => {
  if (indiceSemana < semanasInfo.length-1) {
    indiceSemana++;
    semanaAtual = semanasInfo[indiceSemana].id;
    atualizarSemanaNav();
  }
});

// inicializa
atualizarSemanaNav();
const cardapios = {
    segunda: {
        almoco: [
            'Chapa mista',
            'Arroz colorido',
            'Feijão preto',
            'Farofa',
            'Salada',
            'Fruta'
        ],
        jantar: [
            'Frango assado',
            'Arroz',
            'Feijão com legumes',
            'Farofa',
            'Salada',
            'Fruta'
        ]
    },
    terca: {
        almoco: [
            'Lombo suíno',
            'Arroz',
            'Feijão com legumes',
            'Farofa',
            'Salada',
            'Fruta'
        ],
        jantar: [
            'Picadinho com legumes',
            'Baião de dois',
            'Macarrão',
            'Salada',
            'Fruta'
        ]
    },
    quarta: {
        almoco: [
            'Estrogonofe de frango',
            'Baião de dois',
            'Macarrão',
            'Salada',
            'Fruta'
        ],
        jantar: [
            'Filé de frango',
            'Arroz',
            'Feijão com legumes',
            'Farofa',
            'Salada',
            'Fruta'
        ]
    },
    quinta: {
        almoco: [
            'Picadinho com legumes',
            'Baião de dois',
            'Macarrão',
            'Salada',
            'Fruta'
        ],
        jantar: [
            'Assado de panela',
            'Arroz',
            'Feijão com legumes',
            'Macarrão',
            'Salada',
            'Fruta'
        ]
    },
    sexta: {
        almoco: [
            'Iscas de carne à parmegiana',
            'Arroz',
            'Macarrão',
            'Salada tropical com feijão fradinho',
            'Fruta'
        ],
        jantar: [
            'Tábua mista',
            'Arroz',
            'Feijão com legumes',
            'Farofa',
            'Salada',
            'Fruta'
        ]
    }
};

const botoes = document.querySelectorAll('.dia-btn');
const cardapioDia = document.getElementById('cardapio-dia');

function mostrarCardapio(dia) {
    const dados = cardapios[dia];
    cardapioDia.innerHTML = `
    <h2>${dia.charAt(0).toUpperCase() + dia.slice(1)}</h2>
    <strong>Almoço:</strong>
    <ul>${dados.almoco.map(item => `<li>${item}</li>`).join('')}</ul>
    <strong>Jantar:</strong>
    <ul>${dados.jantar.map(item => `<li>${item}</li>`).join('')}</ul>
  `;
}

// especifico tela em segundo plano (modal)
const overlay = document.getElementById('overlay');
const listaAlmoco = document.getElementById('lista-almoco');
const listaJantar = document.getElementById('lista-jantar');
const fecharModal = document.getElementById('fecharModal');

function abrirModal(dia) {
    const dados = cardapios[dia];
    listaAlmoco.innerHTML = dados.almoco.map(item => `<li>${item}</li>`).join('');
    listaJantar.innerHTML = dados.jantar.map(item => `<li>${item}</li>`).join('');
    overlay.style.display = 'flex';
    document.body.classList.add('modal-ativo');
}

fecharModal.addEventListener('click', () => {
    overlay.style.display = 'none';
    document.body.classList.remove('modal-ativo');
});

botoes.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.dia-btn.ativo').classList.remove('ativo');
        btn.classList.add('ativo');
        abrirModal(btn.dataset.dia);
    });
});
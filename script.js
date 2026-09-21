class Jogos {
    constructor() {
        this.jogos = [];
    }

    adicionarJogo(nome) {
        this.jogos.push(nome);
    }

    listarJogos() {
        console.log(this.jogos);
    }

    atualizarJogo(indice, novonome) {
        if (this.jogos[indice]) {
            this.jogos[indice] = novonome;
            console.log('Jogo atualizade com sucesso!');
        } else {
            console.log('Jogo não encontrado.')
        }
    }

    excluirJogo(indice) {
        if (this.jogos[indice]) {
            this.jogos.splice(indice, 1);
            console.log('Jogo excluído com sucesso!');
        } else {
            console.log('Jogo não encontrado.');
        }
    }
}

const listaDeJogos = new Jogos();

const nomeJogo = document.getElementById('nomeJogo');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaJogos = document.getElementById('listaJogos');

function mostrarJogos() {
    listaJogos.innerHTML = '';

    listaDeJogos.jogos.forEach(function(jogo, indice){
        listaJogos.innerHTML += `
            <div class="card-jogo">
                <h3>${jogo}</h3>

                <button onclick="editarJogo(${indice})">Editar</button>
                <button onclick="excluirJogo(${indice})">Excluir</button>
            </div>
        `;
    });
}

function excluirJogo(indice) {
    listaDeJogos.excluirJogo(indice);
    mostrarJogos();
}

function editarJogo(indice) {
    const card = listaJogos.children[indice];

    card.innerHTML = `
        <input
        type="text" 
        id="novoNome${indice}" 
        value="${listaDeJogos.jogos[indice]}"
        onkeydown="if(event.key === 'Enter') salvarEdicao(${indice})">
        <button onclick="salvarEdicao(${indice})">Salvar</button>
        <button onclick="mostrarJogos()">Cancelar</button>
    `;
    const campoEdicao = document.getElementById(`novoNome${indice}`);
    campoEdicao.focus();
    campoEdicao.setSelectionRange(campoEdicao.value.length, campoEdicao.value.length);
}

function salvarEdicao(indice) {
    const novoNome = document.getElementById(`novoNome${indice}`).value;

    if (novoNome !== '') {
        listaDeJogos.atualizarJogo(indice, novoNome);
        mostrarJogos();

    }

}

function adicionarJogo() {
    if (nomeJogo.value !== '') {
        listaDeJogos.adicionarJogo(nomeJogo.value);
        mostrarJogos();
        nomeJogo.value = '';
    }

}

btnAdicionar.addEventListener('click', adicionarJogo);
nomeJogo.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        adicionarJogo();
    }

});




const seuVotoPara = document.querySelector('.d-1-1 span');
const cargo = document.querySelector('.d-1-2 span');
const descricao = document.querySelector('.d-1-4');
const aviso = document.querySelector('.d-2');
const lateral = document.querySelector('.d-1-right');
const numeros = document.querySelector('.d-1-3');
let etapaAtual = 0;
let numero = '';
let branco = true;

function start() {
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';
    branco = false;

    for(let i=0;i<etapa.numeros;i++) {
        if(i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function update() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidato.filter((item) => {
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br/> Partido: ${candidato.partido}`
        
        let fotosHtml = '';

        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtml += `<figure class="d-1-image small"> <img src="/src/images/${candidato.fotos[i].url}"> ${candidato.fotos[i].legenda} </figure>`
            } else {
                fotosHtml += `<figure class="d-1-image"> <img src="/src/images/${candidato.fotos[i].url}"> ${candidato.fotos[i].legenda} </figure>`
            }
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--nulo pisca">VOTO NULO</div>'
    }
}

function press(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero != null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            update();
        }
    }  
}

function white() {
        numero = '';
        branco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--nulo pisca">VOTO EM BRANCO</div>'
        lateral.innerHTML = ''
    }

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false

    if(branco === true) {
        votoConfirmado = true
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            start();
        } else {
            document.querySelector('#tela').innerHTML = '<div class="aviso--fim pisca">FIM</div>'
        }
    }
}

function corrige() {
    start();
}

start();
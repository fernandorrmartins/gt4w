class Estado {
    constructor() {
        let api = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`;
        this.defineEstados(api);
    }

    defineEstados = async (api) => {
        try {
            let resposta = await fetch(api);
            resposta = await resposta.json();
            resposta = resposta.sort((a, b) => {
                if (a.nome.toUpperCase() > b.nome.toUpperCase()) return 1;
                else return -1;
            });
            console.log(resposta);
            /*resposta.sort((op1, op2) => {
                console.log(op1, op2);
                if(op1.sigla < op2.sigla) return op1;
                else return op2;
            });*/
            let opcoes = [];
            for (let chave in resposta) {
                opcoes[resposta[chave].sigla] = resposta[chave].nome;
            }
            let select = document.querySelector('#estado');
            select.innerHTML = "";
            for (let chave in opcoes) {
                let option = document.createElement('option');
                option.appendChild(document.createTextNode(opcoes[chave]));
                option.value = chave;
                select.appendChild(option);
            }
            let btn_cadastrar = document.querySelector('#btn_cadastrar');
            btn_cadastrar.disabled = false;
        } catch (erro) {
            console.warn(erro);
        }
    }
}

new Estado();

class Pessoa {
    nome;
    cpf;
    data_nascimento;
    peso;
    estado;
    uf_regex = /[A-Z]{2}/g;

    constructor() {
        this.nome = document.querySelector('#formulario #nome');
        this.nome.onkeyup = this.mascaraNome;
        this.cpf = document.querySelector('#formulario #cpf');
        this.cpf.onkeyup = this.mascaraCpf;
        this.data_nascimento = document.querySelector('#formulario #data_nascimento');
        this.data_nascimento.onchange = this.validacaoData;
        this.peso = document.querySelector('#formulario #peso');
        this.peso.onkeyup = this.mascaraPeso;
        this.estado = document.querySelector('#formulario #estado');
        this.estado.onchange = this.mascaraEstado;
    }

    mascaraNome = (evt) => {
        let valor = evt.target.value;
        valor = valor.replace(/[-!¨´$#%^@\&*()\\_+|~=`{}\[\]:";'<>?,.\/0-9]/g, '');
        evt.target.value = valor;
    }

    mascaraCpf = (evt) => {
        try {
            let valor = evt.target.value;
            let valorPuro = valor.replace(/[-!¨´$#%^@\&*()\\_+|~=`{}\[\]:";'<>?,.\/a-zA-Z]/g, '');
            let valorFormatado = '';
            for (let i = 0; i < valorPuro.length; i++) {
                if (i === 3 || i === 6) {
                    valorFormatado += '.'
                } else if (i === 9) {
                    valorFormatado += '-'
                }
                valorFormatado += valorPuro[i];
            }
            evt.target.value = valorFormatado;
        } catch (erro) {
            console.warn(erro);
        }
    }

    validacaoData = (evt) => {
        try {
            let valor = evt.target.value;
            let data_nascimento = new Date(valor);
            if (data_nascimento > Date.now()) {
                alert('A data de nascimento não pode ser maior que o dia de hoje');
                evt.target.value = evt.target.defaultValue;
            }
        } catch (erro) {
            console.warn(erro);
        }
    }

    mascaraPeso = (evt) => {

    }

    mascaraEstado = (evt) => {
        try {
            let valor = evt.target.value;
            if (!this.uf_regex.test(valor)) {
                alert('Valor inválido');
                evt.target.value = null;
            }
        } catch (erro) {
            console.warn(erro);
        }
    }
}

new Pessoa();
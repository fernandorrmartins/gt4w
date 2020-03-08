class Estado {
    constructor() {
        let api = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`;
        this.definirEstados(api);
    }

    definirEstados = async (api) => {
        try {
            let resposta = await fetch(api);
            resposta = await resposta.json();
            resposta = resposta.sort((a, b) => {
                if (a.nome.toUpperCase() > b.nome.toUpperCase()) return 1;
                else return -1;
            });
            let opcoes = [];
            for (let chave in resposta) {
                opcoes[resposta[chave].sigla] = resposta[chave].nome;
            }
            let select = document.querySelector('#uf');
            select.innerHTML = "";
            for (let chave in opcoes) {
                let option = document.createElement('option');
                option.appendChild(document.createTextNode(opcoes[chave]));
                option.value = chave;
                select.appendChild(option);
            }
        } catch (erro) {
            console.warn(erro);
        }
    }
}

new Estado();

class Pessoa {
    static nome;
    static cpf;
    static data_nascimento;
    static peso;
    static uf;
    static btn_cadastrar;
    static nome_regex = /[a-zA-Z]/g;
    static cpf_regex = /[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/g;
    static data_nascimento_regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/g;
    static uf_regex = /[A-Z]/g;


    constructor() {
        Pessoa.nome = document.querySelector('#formulario #nome');
        Pessoa.nome.onkeyup = this.mascaraNome;
        Pessoa.cpf = document.querySelector('#formulario #cpf');
        Pessoa.cpf.onkeyup = this.mascaraCpf;
        Pessoa.data_nascimento = document.querySelector('#formulario #data_nascimento');
        Pessoa.data_nascimento.onchange = this.validacaoData;
        Pessoa.peso = document.querySelector('#formulario #peso');
        Pessoa.peso.onkeyup = Pessoa.liberarCadastro;
        Pessoa.uf = document.querySelector('#formulario #uf');
        Pessoa.uf.onchange = Pessoa.liberarCadastro;
        Pessoa.btn_cadastrar = document.querySelector('#formulario #btn_cadastrar');
        Pessoa.btn_cadastrar.onclick = Pessoa.cadastrar;
    }

    mascaraNome = (evt) => {
        try {
            let valor = evt.target.value;
            valor = valor.replace(/[-!¨´$#%^@\&*()\\_+|~=`{}\[\]:";'<>?,.\/0-9]/g, '');
            evt.target.value = valor;
            Pessoa.liberarCadastro();
        } catch (erro) {
            console.warn(erro);
        }
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
            Pessoa.liberarCadastro();
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
            Pessoa.liberarCadastro();
        } catch (erro) {
            console.warn(erro);
        }
    }

    static liberarCadastro = () => {
        let dados_validos = this.verificarSePodeCadastrar();
        if (dados_validos && Pessoa.btn_cadastrar.disabled) {
            Pessoa.btn_cadastrar.disabled = false;
        } else if (!dados_validos && !Pessoa.btn_cadastrar.disabled) {
            Pessoa.btn_cadastrar.disabled = true;
        }
    }

    static verificarSePodeCadastrar = () => {
        let nome = Pessoa.nome.value;
        let cpf = Pessoa.cpf.value;
        let data_nascimento = Pessoa.data_nascimento.value;
        let peso = Pessoa.peso.value;
        let uf = Pessoa.uf.value;
        let valid = false;
        if (
            (nome && nome.match(Pessoa.nome_regex)) &&
            (cpf && cpf.match(Pessoa.cpf_regex)) &&
            (!data_nascimento || data_nascimento.match(Pessoa.data_nascimento.match)) &&
            (!isNaN(parseFloat(peso))) &&
            (uf && uf.match(Pessoa.uf_regex))
        ) {
            valid = true;
        }
        return valid;
    }

    static gerarAlertaDeFormatoIncorreto = (dados_validos) => {
        if (!dados_validos) {
            let nome = Pessoa.nome.value;
            let cpf = Pessoa.cpf.value;
            let data_nascimento = Pessoa.data_nascimento.value;
            let peso = Pessoa.peso.value;
            let uf = Pessoa.uf.value;
            let alerta = '';

            if (!nome) alerta += '• Nome é obrigatório\n';
            if (!cpf) alerta += '• CPF é obrigatório\n';
            if (!uf) alerta += '• UF é obrigatório\n';
            if (nome && !nome.match(Pessoa.nome_regex)) alerta += '• Nome não esta no formato correto. Utilize somente letras\n';
            if (cpf && !cpf.match(Pessoa.cpf_regex)) alerta += '• CPF não esta no formato correto\n';
            if (uf && !uf.match(Pessoa.uf_regex)) alerta += '• UF não possui um valor valido\n';
            if (data_nascimento && !data_nascimento.match(Pessoa.data_nascimento_regex)) alerta += '• Data de nascimento esta invalida\n';
            if (isNaN(parseFloat(peso))) alerta += '• Peso não esta no formato correto\n';

            alert(alerta);
        }
    }

    static enviarCadastro = async (pessoa) => {
        $('#modal_requisicao').modal({ backdrop: 'static', keyboard: false });
        try {
            let resposta = await fetch("http://localhost:83/pessoa/create", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(pessoa)
            }).catch((erro) => {
                console.warn(erro);
            });;
            resposta = await resposta.json().catch((erro) => {
                console.warn(erro);
            });
            $('#modal_requisicao').modal('hide');
            if(resposta && resposta.message && resposta.message.toUpperCase().includes('DUPLICATE ENTRY')) {
                alert('Já existe uma pessoa registrada com esse CPF')
            } else if(resposta) {
                if (Array.isArray(resposta)) {
                    alert('Registro finalizado com sucesso!');
                }
                else if(resposta.code) {
                    alert('Erro inesperado. Tente novamente, se o erro persistir, envie-nos um e-mail')
                }
            }
            // Tratar erro de cpf duplicado
        } catch (erro) {
            console.warn(erro);
            $('#modal_requisicao').modal('hide');
        }
    }

    static cadastrar = (evt) => {
        try {
            let dados_validos = this.verificarSePodeCadastrar();
            if (!dados_validos) {
                Pessoa.gerarAlertaDeFormatoIncorreto();
            } else {
                let nome = Pessoa.nome.value;
                let cpf = Pessoa.cpf.value;
                let data_nascimento = Pessoa.data_nascimento.value;
                let peso = Pessoa.peso.value;
                let uf = Pessoa.uf.value;
                let pessoa = {
                    nome,
                    cpf,
                    data_nascimento,
                    peso,
                    uf
                }
                Pessoa.enviarCadastro(pessoa);
            }
        } catch (erro) {
            console.warn(erro);
        }
    }
}

new Pessoa();
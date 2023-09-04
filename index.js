//Variáveis onde vai armazenar os números dos inputs "botões da calculadora " para operações
let numeros = []
let numerosConcatenados = []

const verificarOperacaoUltimo = () => {
    //Função para verificar se o último índice do array é igual a ("/", "+", "-", "*")
    let tamanhoArray = numeros.length - 1
    let verificarDiv = numeros.lastIndexOf("/") === tamanhoArray ? true : false
    let verificarAdi = numeros.lastIndexOf("+") === tamanhoArray ? true : false
    let verificarSub = numeros.lastIndexOf("-") === tamanhoArray ? true : false
    let verificarMulti = numeros.lastIndexOf("*") === tamanhoArray ? true : false

    if (verificarDiv || verificarAdi || verificarSub || verificarMulti) {
        return true
    } else {
        return false
    }
}

const atualizarVisor = () => {
    //Concatena o array "numeros" em uma string, depois mostra no visor o valor
    numerosConcatenados = numeros.reduce((accumulator, currentValue) => accumulator + currentValue)
    document.getElementById("resultado").value = `${numerosConcatenados}`
}

const guardarOperadores = id => {
    //Verifica o tamanho máx do array, guarda o valor do input "Sinais" e armazena para exibir no visor, tratamento de dados para não colocar 2 sinais "++"
    if (numerosConcatenados.length > 10) {
        return
    }
    if (verificarOperacaoUltimo()) {
        return
    }
    const valorInput = document.getElementById(id).value
    numeros.push(valorInput)
    atualizarVisor()
}

const guardarZero = () => {
    //Verifica se o tamanho máx do array, verifica a entrada para não digitar "00 ou 1+0", guarda o valor do input "0" e armazena para exibir no visor
    if (numerosConcatenados.length > 10) {
        return
    }
    if (numeros[0] === "0") {
        return
    } else if (verificarOperacaoUltimo()) {
        return
    } else {
        const valorInput = document.getElementById("numero0").value
        numeros.push(valorInput)
        atualizarVisor()
    }
}

const guardarValor = id => {
    //Verifica máx de caracteres, guarda valor do input e mostra no visor
    if (numerosConcatenados.length > 10) {
        return
    }
    const valorInput = document.getElementById(id).value
    numeros.push(valorInput)
    atualizarVisor()
}

const apagarNumero = () => {
    //Remove o item do array e do visor, caso não tenha operações mostra "0" no visor
    try {
        if (numeros.length === 1) {
            numerosConcatenados = []
            numeros = []
            document.getElementById("resultado").value = 0
            return
        } else {
            numeros.pop()
            atualizarVisor()
        }
    } catch (error) {
        console.log(error.message)
    }
}

const resultadoOperacao = () => {
    //Tratativa de erros como verificar se "2+" ou "18" estão no visor, faz a operação dos itens armazenados pelos inputs.
    const vericarOperacao = () => {
        //Veifica se a em algum índice do array "/, -, *, +" OBS: verificarOperacaoUltimo() identifica apenas o último índice
        let verificarDiv = numeros.indexOf("/") === -1 ? true : false
        let verificarAdi = numeros.indexOf("+") === -1 ? true : false
        let verificarSub = numeros.indexOf("-") === -1 ? true : false
        let verificarMulti = numeros.indexOf("*") === -1 ? true : false
        
        if (verificarDiv === false || verificarAdi === false || verificarSub === false || verificarMulti === false) {
            return true
        } else {
            return false
        }
    }
    if (vericarOperacao() && verificarOperacaoUltimo() === false) {
        let dataHoras = new Date()
        let operacaoFeita = numerosConcatenados
        mostrarDadosOperacao(dataHoras, operacaoFeita)
        let resultado = eval(numerosConcatenados)
        document.getElementById("resultado").value = `${resultado}`
        numeros = resultado.toString().split("")
        numerosConcatenados = [resultado.toString()]
    }
    return
}

const mostrarOperacaoVisor = (idTd, idTr) => {
    //Atualiza o visor com a operação que clicar "Quadro operações feitas", remove o mesmo e atualiza o array de "numeros".
    let valorInput = document.getElementById(idTd).value
    document.getElementById("resultado").value = `${valorInput}`
    document.getElementById(idTr).remove()
    contadorTabelas--
    numeros = valorInput.split("")
    numerosConcatenados = valorInput
    let index = arrayTr.indexOf(idTr)
    arrayTr.splice(index, 1)
}

//Variáveis para fazer o controle de operações que vão ser mostradas na tabela
let contadorTabelas = 0
let contadorId = 0
let arrayTr = []
const mostrarDadosOperacao = (dataHoras, operacaoFeita) => {
    /*
        Mostra a data, horas, minutos e segundos que a operação foi feita e 
        atualiza o HTML com a Tag contendo os ids e função para deixar dinâmico ao click e ao limite de operações "4"
    */
    contadorTabelas++
    contadorId++
    let idTd
    let idTr
    let leitor = document.getElementById("tabela")
    let [mes, hora, min, seg, dia] = [dataHoras.getMonth() + 1, dataHoras.getHours(), dataHoras.getMinutes(), dataHoras.getSeconds(), dataHoras.getDate()]
    mes < 10 ? mes = "0" + mes : mes
    hora < 10 ? hora = "0" + hora : hora
    min < 10 ? min = "0" + min : min
    seg < 10 ? seg = "0" + seg : seg
    dia < 10 ? dia = "0" + dia : dia

    if (contadorTabelas < 5) {
        idTd = "valorTd" + contadorId
        idTr = "Tr" + contadorId
        leitor.innerHTML += `
            <tr id="${idTr}">
                <td>${dia}/${mes}/${dataHoras.getFullYear()} ${hora}:${min}:${seg}</td>
                <td id="operacaoTabela" onClick="mostrarOperacaoVisor('${idTd}', '${idTr}')"><input class="input-td" type="button" name="${idTd}" id="${idTd}" value="${operacaoFeita}"></td>
            </tr>
        `
        arrayTr.push(idTr)
    } else {
        //Caso tenha 4 operações na tela, a função remove sempre a primeira feita e adiciona a nova
        contadorTabelas--
        let primeiraTr = arrayTr[0]
        document.getElementById(primeiraTr).remove()
        idTd = "valorTd" + contadorId
        idTr = "Tr" + contadorId
        leitor.innerHTML += `
            <tr id="${idTr}">
                <td>${dia}/${mes}/${dataHoras.getFullYear()} ${hora}:${min}:${seg}</td>
                <td id="operacaoTabela" onClick="mostrarOperacaoVisor('${idTd}', '${idTr}')"><input class="input-td" type="button" name="${idTd}" id="${idTd}" value="${operacaoFeita}"></td>
            </tr>
        `
        arrayTr.splice(0, 1)
        arrayTr.push(idTr)
    }
}
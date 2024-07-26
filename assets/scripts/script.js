//Botões de ação
const btn = document.querySelector(".container_botoes_items");
const btnNumeros = document.querySelectorAll(".btn_num");
const btnOperador = document.querySelectorAll(".operador");
const btnPoint = document.querySelector(".btn_point");
const btnResult = document.querySelector("#result");
const btnLimparTudo = document.querySelector("#limpa_tudo");
const btnLimpaRecente = document.querySelector("#limpa_recente");

//Display
const display = document.querySelector("#display");

let valorDisplay = "0";
let valorPendente = '';
let operador = '';

//Vamos add os no numeros no display da calculadora
function updateDisplay() {
    display.innerText = valorDisplay;
}

//Add os numeros no display da calculadora
//Primeiro verifica se há algum numero no display, se tiver add, mas se ja tiver algum add mais numeros
function appendNumber(number) {
    if (valorDisplay === '0') {
        valorDisplay = number;
    } else {
        valorDisplay += number;
    }
    updateDisplay();
}

function addPoint() {
    if (!valorDisplay.includes('.')) {
        valorDisplay = valorDisplay + ".";
    }
}
// Add o operador da conta
function addOperador(op) {
    //Verifica se há algum valor depois do operador, se não tiver faz o calculo
    if (valorPendente !== '') {
        calcular();
    }
    valorPendente = valorDisplay;
    operador = op;
    valorDisplay = '0';
}

//Limpa todo o display
function clearDisplay() {
    valorDisplay = '0';
    valorPendente = '';
    operador = '';
    updateDisplay();
}

//limpar o numero recente adicionado
function clearRecente() {
    if (valorDisplay == "NaN") {
        btnLimpaRecente.disabled = true;
        return;
    }
    btnLimpaRecente.disabled = false;
    valorDisplay = valorDisplay.slice(0, -1);
    updateDisplay();
}

function calcular() {
    const prev = parseFloat(valorPendente);
    const atual = parseFloat(valorDisplay);
    let result;
    switch (operador) {
        case '+':
            result = prev + atual;
            break;
        case '-':
            result = prev - atual;
            break;
        case '*':
            result = prev * atual;
            break;
        case '/':
            if (atual === 0) {
                result = "NaN";
            } else {
                result = prev / atual;
            }
            break;
        default:
            return;
    }
    valorDisplay = result.toString();
    valorPendente = '';
    operador = '';
    updateDisplay();
}

//Pega todos os numeros e exibe no display
btnNumeros.forEach(function (btn) {
    btn.addEventListener("click", function () {
        appendNumber(btn.innerText);
    });
});

//Pega todos os operadores
btnOperador.forEach(function (btn) {
    //Pega o click do btn operador e envia para a função addOperador e lá ela vai adicionar esse operador
    // a conta e adicionar na variavel operador para que não percamos a referencia dele
    btn.addEventListener("click", function () {
        addOperador(btn.innerText);
    });
});

btnLimparTudo.addEventListener("click", clearDisplay);

btnResult.addEventListener("click", calcular);

btnLimpaRecente.addEventListener("click", clearRecente);

btnPoint.addEventListener("click", addPoint);

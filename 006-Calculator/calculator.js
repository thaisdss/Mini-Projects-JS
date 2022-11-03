'use strict';

const display = document.getElementById("display");
const keys = document.querySelectorAll("[id*=key]");
const operators = document.querySelectorAll("[id*=operator]");

let newNumber = true;
let operator;
let previousNumber;

const PendingOperation = () => operator != undefined;

const calculate = () => {
    console.log(operator)
    if(PendingOperation()){
        const currentNumber = parseFloat(display.textContent.replace(",", "."));
        newNumber = true;
        const result = eval (`${previousNumber} ${operator} ${currentNumber}`);
        updateDisplay(result)
    }
}

const updateDisplay = (text) => {
    if(newNumber){
        display.textContent = text.toLocaleString("BR");
        newNumber = false;
    }else{
        display.textContent += text.toLocaleString("BR");
    }
}

const insertKey = (event) => updateDisplay(event.target.textContent);
keys.forEach( key => key.addEventListener("click", insertKey));

const selectOperator = (event) => {
    if(!newNumber){
        calculate();
        newNumber = true;
        operator = event.target.textContent;
        previousNumber = parseFloat(display.textContent.replace(",", "."));
    }
};
operators.forEach( operator => operator.addEventListener("click", selectOperator));

const activeEqual = () => {
    calculate();
    operator = undefined;
};
document.getElementById("equal").addEventListener("click", activeEqual);

const clearDisplay = () => display.textContent = "";
document.getElementById("clearDisplay").addEventListener("click", clearDisplay);

const clearCalculation = () => {
    clearDisplay();
    newNumber = true;
    operator = undefined;
    previousNumber = undefined
};
document.getElementById("clearCalculation").addEventListener("click", clearCalculation);

const removeLastNumber = () => display.textContent = display.textContent.slice(0, -1)
document.getElementById("backspace").addEventListener("click", removeLastNumber)

const invertSignal = () => {
    newNumber = true
    updateDisplay(display.textContent * -1)
}
document.getElementById("invert").addEventListener("click", invertSignal);

const thereIsDecimal = () => display.textContent.indexOf(",") != -1;
const thereIsValue = () => display.textContent.length > 0;

const insertDecimal = () => {
    if(!thereIsDecimal()){
        if(thereIsValue()){
            updateDisplay(",")
        }else{
            updateDisplay("0,")
        }
    }
};
document.getElementById("decimal").addEventListener("click", insertDecimal);

const keyboardMap = {
    '0': 'key0',
    '1': 'key1',
    '2': 'key2',
    '3': 'key3',
    '4': 'key4',
    '5': 'key5',
    '6': 'key6',
    '7': 'key7',
    '8': 'key8',
    '9': 'key9',
    '/': 'operatorDivision',
    '*': 'operatorMultiply',
    '-': 'operatorSubtract',
    '+': 'operatorAdd',
    '=': 'equal',
    'Enter': 'equal',
    'Backspace': 'backspace',
    'c': 'clearCalculation',
    'Escape': 'clearDisplay',
    ',': 'decimal'
}

const allowedKey = (key) => Object.keys(keyboardMap).indexOf(key) != -1;

const mapKeyboard = (event) => {
    const key = event.key;
    
    if(allowedKey(key)) document.getElementById(keyboardMap[key]).click();
}
document.addEventListener("keydown", mapKeyboard)
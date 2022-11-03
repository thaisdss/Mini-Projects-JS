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
        const currentNumber = parseFloat(display.textContent);
        newNumber = true;
        const result = eval (`${previousNumber} ${operator} ${currentNumber}`);
        updateDisplay(result)
    }
}

const updateDisplay = (text) => {
    if(newNumber){
        display.textContent = text;
        newNumber = false;
    }else{
        display.textContent += text;
    }
}

const insertKey = (event) => updateDisplay(event.target.textContent);
keys.forEach( key => key.addEventListener("click", insertKey));

const selectOperator = (event) => {
    if(!newNumber){
        calculate();
        newNumber = true;
        operator = event.target.textContent;
        previousNumber = parseFloat(display.textContent);
    }
}
operators.forEach( operator => operator.addEventListener("click", selectOperator));

const activeEqual = () => {
    calculate();
    operator = undefined;
}
document.getElementById("equal").addEventListener("click", activeEqual());
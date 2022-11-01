const calcular = document.getElementById("calcular")

calcular.addEventListener("click", calcularIMC)

function calcularIMC(){
    const nome = document.getElementById("nome").value
    const altura = document.getElementById("altura").value
    const peso = document.getElementById("peso").value
    const resultado = document.getElementById("resultado")

    if(nome == "" && altura == "" && peso == ""){
        alert("Por favor preencha todos os campos para calcularmos seu IMC")
    }else{
        let imc = (peso/(altura**2)).toFixed(1)

        if(imc < 18.5){
            resultado.innerText = `${nome} seu IMC é ${imc} e você está abaixo do peso.`
        }else if(imc < 25.0){
            resultado.innerText = `${nome} seu IMC é ${imc} e você está no peso ideal.`
        }else if(imc < 30.0){
            resultado.innerText = `${nome} seu IMC é ${imc} e você está no sobrepeso.`
        }else if(imc < 40.0){
            resultado.innerText = `${nome} seu IMC é ${imc} e você está na obesidade.`
        }else{
            resultado.innerText = `${nome} seu IMC é ${imc} e você está na obesidade grave.`
        }
    }
}
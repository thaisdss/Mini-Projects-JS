const turnOnOff = document.getElementById("turnOnOff")
const lamp = document.getElementById("lamp")

function isLampBroken(){
    return lamp.src.indexOf("quebrada") > -1
}

function lampOnOff(){
    if(!isLampBroken()){
        lamp.classList.toggle("on")

        if(lamp.classList.contains("on") == true){
            lamp.src = "imagens/ligada.jpg"
        }else{
            lamp.src = "imagens/desligada.jpg" 
        }
    }
}

function lampBroken(){
    lamp.src = "imagens/quebrada.jpg"
}

turnOnOff.addEventListener("click", lampOnOff)

lamp.addEventListener("mouseover", lampOnOff)
lamp.addEventListener("mouseleave", lampOnOff)

lamp.addEventListener("dblclick", lampBroken)

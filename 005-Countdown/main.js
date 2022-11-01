'use strict';

let id = 0;
const modal = document.querySelector(".modalContainer")

const clearModal = () => {
    const input = document.querySelectorAll("input")

    for(let i = 0; i< (input.length -1); i++){
        input[i].value = ""
    }
}

const closeModal = () => {
    clearModal()

    modal.style.display = "none"
}

const stopCounting = () => clearInterval(id)

const formatDigit = (digit) => `0${digit}`.slice(-2)

const update = (time) => {
    const seconds = document.getElementById("seconds")
    const minutes = document.getElementById("minutes")
    const hours = document.getElementById("hours")
    const days = document.getElementById("days")

    const qttSeconds = time % 60
    const qttMinutes = Math.floor((time % (60 * 60)) / 60)
    const qttHours = Math.floor((time % (60 * 60 * 24)) / (60 * 60))
    const qttDays = Math.floor(time / (60 * 60 * 24))

    seconds.textContent = formatDigit(qttSeconds)
    minutes.textContent = formatDigit(qttMinutes)
    hours.textContent = formatDigit(qttHours)
    days.textContent = formatDigit(qttDays)
}

const countdown = (time) => {
    const count = () => {
        if(time == 0){
            stopCounting()
        }
        update(time)
        time--
    }

    id = setInterval(count, 1000)
}

const timeLeft = (data) => {
    const date = new Date()
    const year = date.getFullYear()
    const eventDate = new Date (`${year}-${data[0]}-${data[1]} ${data[2]}:${data[3]}:00`)
    const today = Date.now()

    stopCounting()

    countdown(Math.floor((eventDate - today) / 1000))

    closeModal()
}

const eventData = () => {
    const day = document.getElementById("day").value
    const mouth = document.getElementById("mouth").value
    const hour = document.getElementById("hour").value
    const minute = document.getElementById("minute").value
    const data = [mouth, day, hour, minute]

    if(data[0] == "" || data[1] == "" || data[2] == "" || data[3] == ""){
        alert("Preencha todos os campos!")
    }else{
        timeLeft(data)
    }
}

const handleClickOutside = (event) => {

    if (modal.contains(event.target) == false) {
        modal.style.display = 'none';
        document.removeEventListener('click', handleClickOutside);
    }
}

const openModal = () => {
    modal.style.display = "block"

    setTimeout(() => {document.addEventListener("click", handleClickOutside)}, 200)
}

document.getElementById("cadastre").addEventListener("click", openModal)
document.getElementById("eventButton").addEventListener("click", eventData)
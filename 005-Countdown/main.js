'use strict';

let id = 0;
const modal = document.querySelector(".modalContainer")

$(document).mouseup(function (e) {
    if ($(e.target).closest(modal).length === 0){
        $(modal).hide();
    }
})

const clearModal = () => {
    const input = document.querySelectorAll("input")

    for(let i = 0; i<= (input.length -1); i++){
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
    const years = document.getElementById("years")

    const qttSeconds = time % 60
    const qttMinutes = Math.floor((time % (60 * 60)) / 60)
    const qttHours = Math.floor((time % (60 * 60 * 24)) / (60 * 60))
    const qttDays = Math.floor((time % (60 * 60 * 24 * 365)) / (60 * 60 * 24))
    const qttYears = Math.floor(time / (60 * 60 * 24 * 365))

    seconds.textContent = formatDigit(qttSeconds)
    minutes.textContent = formatDigit(qttMinutes)
    hours.textContent = formatDigit(qttHours)
    days.textContent = `${qttDays}`.length >= 3 ? `${qttDays}` : formatDigit(qttDays)
    years.textContent = `${qttYears}`.length >= 3 ? `${qttYears}` : formatDigit(qttYears)
    
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

const validateTime = (time) => {
    return time <= 0
}

const timeLeft = (data) => {
    const eventDate = new Date (`${data[0]}-${data[1]}-${data[2]} ${data[3]}:${data[4]}:00`)
    const today = Date.now()
    const time = Math.floor((eventDate - today) / 1000)

    stopCounting()

    if(validateTime(time)){
        return alert("Insira uma data ou horário válido")
    }

    countdown(time)

    closeModal()
}

const eventData = (event) => {
    event.preventDefault()

    const date = document.getElementById("date").value
    const [year, month, day] = date.split("-")

    const hourAndMinute = document.getElementById("hourAndMinute").value
    const [hour, minute] = hourAndMinute.split(":")
    
    const data = [year, month, day, hour, minute]

    timeLeft(data)
}

const openModal = () => modal.style.display = "block"

document.getElementById("cadastre").addEventListener("click", openModal)
document.querySelector(".modal").addEventListener("submit", eventData)
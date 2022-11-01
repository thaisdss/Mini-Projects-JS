'use strict';

const images = [
    {'id': '1', 'url': 'imagens/chrono.jpg'},
    {'id': '2', 'url': 'imagens/inuyasha.jpg'},
    {'id': '3', 'url': 'imagens/ippo.png'},
    {'id': '4', 'url': 'imagens/tenchi.jpg'},
    {'id': '5', 'url': 'imagens/tenjhotenge.jpg'},
    {'id': '6', 'url': 'imagens/yuyuhakusho.jpg'},
]

const containerItems = document.getElementById("container-items")

const loadImages = (images, containerItems) => {
    images.forEach(image => {
        containerItems.innerHTML += `<div class="item"><img src="${image.url}"></div>`
    });
}

loadImages(images, containerItems)

let items = document.querySelectorAll(".item")

const previousImage = () => {
    containerItems.appendChild(items[0])
    items = document.querySelectorAll(".item")
}

const nextImage = () => {
    const lastItem = items[items.length -1]
    containerItems.insertBefore(lastItem, items[0])
    items = document.querySelectorAll(".item")
}

document.querySelector("#previous").addEventListener("click", previousImage)
document.querySelector("#next").addEventListener("click", nextImage)
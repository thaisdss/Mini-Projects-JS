import {API_KEY, BASE_URL, IMG_URL, language,} from './api.js';

const movieSection = document.querySelector("#movieSection");
const h2 = document.querySelector("main > h2")

const movieUndefined = () => {
  hideElement(movieSection)

  h2.innerText = `
  Ops, Filme indisponível. 
  Clique em "Encontrar filme" novamente!
  `

  showElement(h2)
}

const addMovieImgPoster = (path) => {
  const img = document.querySelector("section > img")
  img.src = `${IMG_URL}${path}`

  img.style.display = "block"
}

const addTextInElementOfMovieSectionDiv = (element, text) => {
  hideElement(h2)

  const elementDiv = document.querySelector(`section > div > ${element}`);

  elementDiv.innerText = text;
}

const generateMovieId = () => {
  const movieId = Math.floor(Math.random() * 1000);

  return movieId
}

const showElement = (element) => element.style.display = "flex";
const hideElement = (element) => element.style.display = "none";

const findMovie = () => {
  fetch(`${BASE_URL}/${generateMovieId()}?${API_KEY}&${language}`)
  .then(response => response.json()
    .then(data => {

      if(data.title == undefined || data.overview == "") movieUndefined()

      if(data.title != undefined && data.overview != ""){
        showElement(movieSection)
        addTextInElementOfMovieSectionDiv("h2", data.title)
        addTextInElementOfMovieSectionDiv("p", data.overview)
        addMovieImgPoster(data.poster_path)
      }
    })
  )
}


document.querySelector("#findMovie").addEventListener("click", findMovie)
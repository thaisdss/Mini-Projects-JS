const showCustomize = () => {
    document.querySelector(".customize").style.display = "block";
}

const changeHeightContainer = () => {
    const container = document.querySelector(".container");
    container.classList.add("show-card");
    container.classList.remove("hide-card");
}

const showCard = () => {
    document.querySelector(".card-container").style.display = "block";

    changeHeightContainer();
    showCustomize();
}

const isNull = (elementName, info) => {
    if(info === null){
        document.querySelector(`.${elementName}-div`).style.display = "none";
    }
}

const addInfoProfile = (elementName, info, infoLegend) => {
    const divInfoProfile = document.querySelector(`.${elementName}-div`);

    if(divInfoProfile){
        divInfoProfile.style.display = "block";
    }

    const element = document.querySelector(`#${elementName}`);

    if(infoLegend === undefined){
        element.innerHTML = info;
    }else{
        element.innerHTML = `${info} ${infoLegend}`;
    }

    isNull(elementName, info);
}

const addProfileImg = (url) => {
    const img = document.querySelector(".profile-img > img");

    img.src = url;
}

const getDataApi = () => {
    const userName = document.querySelector("#userName");

    fetch(`https://api.github.com/users/${userName.value}`)
    .then(response => response.json()
        .then(data => {
            addProfileImg(data.avatar_url)
            addInfoProfile("name", data.name)
            addInfoProfile("following", data.following, "Seguindo")
            addInfoProfile("followers", data.followers, "Seguidores")
            addInfoProfile("repository", data.public_repos, "Repositórios")
            addInfoProfile("company", data.company)
            addInfoProfile("location", data.location)
        })
    )

    showCard()

    userName.value = "";
}

const checkKey = (event) => {
    const key = event.key;
    const input = document.querySelector("#userName");

    if(key === "Enter" && input.value != ""){
        getDataApi();
    }
}

const addBackground = (color) => {
    const bgCard = document.querySelector(".bg-card");
    const profileImg = document.querySelector(".profile-img > img");

    bgCard.style.background = color;
    profileImg.style.borderColor = color;
}

const generateBackground = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    addBackground(color)
}

const print = () => window.print();

document.querySelector("#sendUserName").addEventListener("click", getDataApi);
window.addEventListener("keypress", checkKey)
document.querySelector("#generateBackground").addEventListener("click", generateBackground);
document.querySelector(".card-container > h2").addEventListener("click", print)
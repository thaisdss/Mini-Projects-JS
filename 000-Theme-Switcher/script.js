const checkbox = document.querySelector("#checkbox");
const body = document.querySelector("body");

const saveCurrentTheme = () => {
    bodyClass = body.classList.item(1);

    localStorage.setItem("theme", JSON.stringify(bodyClass));
}

const changeTheme = () => {
    body.classList.toggle("dark");

    saveCurrentTheme();
}

const addLastTheme = () => {
    const theme = JSON.parse(localStorage.getItem("theme"));

    body.classList.add(theme);

    if(body.classList.contains("dark")){
        checkbox.checked = true;
    }
}

checkbox.addEventListener("change", changeTheme);
document.addEventListener("DOMContentLoaded", addLastTheme);
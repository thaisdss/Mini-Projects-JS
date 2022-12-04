const sidebar = document.querySelector("nav");

const closeSidebar = () => {
    if(!sidebar.classList.contains("open")) sidebar.classList.toggle("close")
}

const removeClass = (className) => {
    sidebar.classList.remove(className);
}

const openSidebar = () => {
    if(sidebar.classList.contains("close")){
        removeClass("close")
    }

    sidebar.classList.toggle("open")

    closeSidebar()
}

document.querySelector(".iconMenu").addEventListener("click", openSidebar)

closeSidebar()

'use strict';

const getDatabase = () => JSON.parse(localStorage.getItem("todoList")) ?? [];

const createTask = (task, status, index) => {
    const label = document.createElement("label")
    label.classList.add("todo__task")
    label.innerHTML = `
        <input type="checkbox" ${status} data-index=${index}>
        <div>${task}</div>
        <input type="button" value="X" data-index=${index}>
    `
    document.getElementById("todoList").appendChild(label)
}

const clearTasks = () => {
    const todoList = document.getElementById("todoList")
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild)
    }
}

const clearTaskInput = () => {
    document.querySelector("input[type=text]").value = ""
}

const updateScreen = () => {
    clearTasks()
    const database = getDatabase()
    database.forEach((data, index) => createTask(data.task, data.status, index))
}

const setDatabase = (database) => localStorage.setItem("todoList", JSON.stringify(database));

const addTaskOnDatabase = (event) => {
    const key = event.key
    const newTask = event.target.value
    const database = getDatabase()
    if(key === "Enter"){
        database.push({'task': newTask, 'status': ''})
        setDatabase(database)
        updateScreen()
        clearTaskInput()
    }
}

const removeTask = (index, database) => {
    database.splice(index, 1)
    setDatabase(database)
    updateScreen()
}

const updateTask = (index, database) => {
    database[index].status = database[index].status === "" ? "checked" : ""
    setDatabase(database)
    updateScreen()
}

const clickTask = (event) => {
    const element = event.target
    const index = element.dataset.index
    const database = getDatabase()

    if(element.type === "button"){ removeTask(index, database) }

    if(element.type === "checkbox"){ updateTask(index, database) }
}

document.getElementById("newTask").addEventListener("keypress", addTaskOnDatabase)
document.getElementById("todoList").addEventListener("click", clickTask)

updateScreen()
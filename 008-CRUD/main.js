'use strict'
const openModal = () => {
    document.getElementById("modal").classList.add("active")
}

const closeModal = () => {
    clearFields()
    document.getElementById("modal").classList.remove("active")
}

const getLocalStorage = () => JSON.parse(localStorage.getItem("database_client")) ?? [];

const setLocalStorage = (databaseClient) => {
    localStorage.setItem("database_client", JSON.stringify(databaseClient))
}

//CRUD - Create, Read, Update, Delete
const deleteClient = (index) => {
    const databaseClient = getLocalStorage()
    databaseClient.splice(index, 1)
    setLocalStorage(databaseClient)
}

const updateClient = (index, client) => {
    const databaseClient = getLocalStorage()
    databaseClient[index] = client
    setLocalStorage(databaseClient)
}

const createClient = (newClient) => {
    const databaseClient = getLocalStorage()
    databaseClient.push(newClient)
    setLocalStorage(databaseClient)
}

//Interação com Layout
const clearFields = () => {
    const fields = document.querySelectorAll(".modal-field")
    fields.forEach(field => field.value = "")
}

const saveClient = (event) => {
    event.preventDefault();

    const client = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        cell: document.getElementById("cell").value,
        city: document.getElementById("city").value
    }

    const index = document.getElementById("name").dataset.index

    if(index == "new"){
        return createClient(client), updateTable(), closeModal()
    }

    updateClient(index, client)
    updateTable()
    closeModal()

}

const createRow = (client, index) => {
    const newRow = document.createElement("tr")
    newRow.innerHTML = `
    <td>${client.name}</td>
    <td>${client.email}</td>
    <td>${client.cell}</td>
    <td>${client.city}</td>
    <td>
        <button type="button" class="button green" data-action="edit-${index}">Editar</button>
        <button type="button" class="button red" data-action="delete-${index}">Excluir</button>
    </td>`;

    document.querySelector("#tableClient>tbody").appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll("#tableClient>tbody>tr")
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const databaseClient = getLocalStorage()
    clearTable()
    databaseClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById("name").value = client.name;
    document.getElementById("email").value = client.email;
    document.getElementById("cell").value = client.cell;
    document.getElementById("city").value = client.city;

    document.getElementById("name").dataset.index = client.index
}

const editClient = (index) => {
    const client = getLocalStorage()[index]
    client.index = index
    fillFields(client)
    openModal()
}

const isEditOrDelete = (event) => {

    const [action, index] = event.target.dataset.action.split("-")

    if(action == 'edit'){
        editClient(index);
    }

    if(action == "delete"){
        const client = getLocalStorage()[index]
        const response = confirm(`Deseja realmente excluir o cliente ${client.name}?`)
        if(response){
            deleteClient(index);
            updateTable()
        }
    }
}

const maskCell = (event) => {
    const Fieldcell = document.getElementById("cell")
    const cell = Fieldcell.value
    const backspace = event.key == "Backspace"

    if(cell.length == 1 && !backspace){
        const newcell = "(" + cell;
        Fieldcell.value = newcell;
    }

    if(cell.length == 3 && !backspace){
        const newcell = cell + ")";
        Fieldcell.value = newcell;
    }

    if(cell.length == 9 && !backspace){
        const newcell = cell + "-";
        Fieldcell.value = newcell;
    }

}

updateTable()

//Eventos
document.getElementById("registerClient").addEventListener("click", openModal)
document.getElementById("modalClose").addEventListener("click", closeModal)
document.getElementById("cancel").addEventListener("click", closeModal)
document.getElementById("cell").addEventListener("keypress", maskCell)
document.getElementById("form").addEventListener("submit", saveClient)
document.querySelector("#tableClient>tbody").addEventListener("click", isEditOrDelete)

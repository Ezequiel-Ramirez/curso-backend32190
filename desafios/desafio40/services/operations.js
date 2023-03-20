const { listar, insertar, listarMensajes, insertarMensaje, mostrarMensajes } = require('../persistencia/operations.js')

async function getData() {
    const productos = await mostrarMensajes()
    return productos
}

async function insertData(data) {
    await mostrarMensajes(data)
}

async function getMessages() {
    const mensajes = await mostrarMensajes()
    return mensajes
}

async function insertMessage(data) {
    await mostrarMensajes(data)
}


module.exports = { getData, insertData, getMessages, insertMessage }



const { option } = require('../options/mysqlconnection.js')
const { optionLite } = require('../options/myslLiteconnection')
const ClientSQL = require('./DAO/productosDAOFactory.js')
const ClientSQLLite = require('./DAO/mensajesDAOFactory.js')
const MensajesRepos = require('../repos/mensajesRepos.js')
const ProductosRepos = require('../repos/productosRepos.js')
const mensajes = require('../modelos/Mensaje.js')
const productos = require('../modelos/Producto.js')
const MensajesMostrable = require('../utils/mostrar.js')
const ProductosMostrable = require('../utils/mostrar.js')


const sql = new ProductosRepos()
const sqlLite = new MensajesRepos()

async function listar() {
    return await sql.listarArticulos()
}

async function insertar(data) {
    await sql.insertarArticulos(data)
}

async function listarMensajes() {
    return await sqlLite.listarArticulos()
}

async function insertarMensaje(data) {
    await sqlLite.insertarArticulos(data)
}

function  mostrarMensajes ( mensajes, productos ) {
    if(Array.isArray(mensajes)) {
        if (mensajes.length > 0) {
            for (const mensaje of mensajes) {
                console.log(new MensajesMostrable(mensaje).comoTexto())
            }
        } else {
            console.log('No hay mensajes')
        }
    } else {
        console.log(new MensajesMostrable(mensajes).comoTexto())
    }

    if(Array.isArray(productos)) {
        if (productos.length > 0) {
            for (const producto of productos) {
                console.log(new ProductosMostrable(producto).comoTexto())
            }
        } else {
            console.log('No hay productos')
        }
    } else {
        console.log(new ProductosMostrable(productos).comoTexto())
    }
    
    
}



module.exports = { listar , insertar, listarMensajes, insertarMensaje, mostrarMensajes }
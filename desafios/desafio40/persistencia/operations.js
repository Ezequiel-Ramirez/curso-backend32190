
const { option } = require('../options/mysqlconnection.js')
const { optionLite } = require('../options/myslLiteconnection')
const ClientSQL = require('./DAO/productosDAO.js')
const ClientSQLLite = require('./DAO/mensajesDAO.js')

const sql = new ClientSQL(option)
const sqlLite = new ClientSQLLite(optionLite)

//creo la tabla
sql.crearTabla().then(() => {
    console.log('tabla creada')
})

//creo la tabla mensajes
sqlLite.crearTabla().then(() => {
    console.log('tabla mensajes creada')
})

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

module.exports = { listar , insertar, listarMensajes, insertarMensaje }
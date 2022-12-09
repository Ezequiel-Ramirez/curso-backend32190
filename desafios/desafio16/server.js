const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { option } = require('./options/mysqlconnection')
const { optionLite } = require('./options/myslLiteconnection')
const ClientSQL = require('./sqlContenedor.js')
const ClientSQLLite = require('./sqlContenedorMensajes.js')

const sql = new ClientSQL(option)
const sqlLite = new ClientSQLLite(optionLite)

const app = express()
const httpServer = HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')

//creo la tabla
sql.crearTabla().then(() => {
    console.log('tabla creada')
})

//creo la tabla mensajes
sqlLite.crearTabla().then(() => {
    console.log('tabla mensajes creada')
})

// get
app.get('/', async (req, res) => {
    res.render('inicio', { productos: await sql.listarArticulos() })
})

// socket
io.on('connection', async socket => {
    console.log('Un cliente se ha conectado')
    
    //guardar mensajes en la base de datos y mostrarlos con sqlite3
    socket.emit('messages', await sqlLite.listarArticulos())
    socket.on('new-message', async data => {

        await sqlLite.insertarArticulos(data)

        const mensajes = await sqlLite.listarArticulos()

        io.sockets.emit('messages', mensajes)
    })

    //guardar productos en la base de datos y mostrarlos
    socket.emit('products', await sql.listarArticulos())
    socket.on('new-product', async data => {

        await sql.insertarArticulos(data)

        const productos = await sql.listarArticulos()

        io.sockets.emit('products', productos)
    })
})

// listen
const PORT = 8080
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
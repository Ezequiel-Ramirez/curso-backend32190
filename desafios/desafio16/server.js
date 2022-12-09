const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const fs = require('fs');
const { option } = require('./options/mysqlconnection')
const ClientSQL = require('./sqlContenedor.js')

const sql = new ClientSQL(option)

const app = express()
const httpServer = HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')

//contenedor
class Contenedor {
    constructor(file) {
        this.file = file
    }

    async save(obj) {
        try {
            const producto = await fs.promises.readFile(this.file, 'utf-8');
            const archivoParse = JSON.parse(producto);
            archivoParse.push({ ...obj });
            fs.promises.writeFile(this.file, JSON.stringify(archivoParse, null, 2))
        } catch (error) {
            fs.promises.writeFile(this.file, JSON.stringify([{ ...obj }], null, 2))
        }
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            console.log('Error en getAll: ', error)
        }
    }
}

const contenedorMensajes = new Contenedor('./mensajes.txt')

//creo la tabla
sql.crearTabla().then(() => {
    console.log('tabla creada')
})


// get

app.get('/', async (req, res) => {
    res.render('inicio', { productos: await sql.listarArticulos() })
})

// socket

io.on('connection', async socket => {
    console.log('Un cliente se ha conectado')
    socket.emit('messages', await contenedorMensajes.getAll())
    socket.on('new-message', async data => {
        await contenedorMensajes.save(data)

        io.sockets.emit('messages', await contenedorMensajes.getAll())
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
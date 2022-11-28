const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const fs = require('fs');

const app = express()
const httpServer = HttpServer(app)
const io = new IOServer(httpServer)



app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')


const productosArray = []
const mensajesArray = []
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

const contenedorProductos = new Contenedor('./productos.txt')

const contenedorMensajes = new Contenedor('./mensajes.txt')


// get

app.get('/', (req, res) => {
    res.render('inicio', { productosArray })
})


// post

app.post('/productos', (req, res) => {
    productosArray.push(req.body)
    res.redirect('/')
})

// socket

io.on('connection', async socket => {
    console.log('Un cliente se ha conectado')
    socket.emit('messages', await contenedorMensajes.getAll())
    socket.on('new-message', async data => {
        await contenedorMensajes.save(data)

        io.sockets.emit('messages', await contenedorMensajes.getAll())
    })

    //guardar productos en archivo productos.txt y mostrarlos

    socket.emit('products', await contenedorProductos.getAll())
    socket.on('new-product', async data => {
        await contenedorProductos.save(data)

        io.sockets.emit('products', await contenedorProductos.getAll())
    }
    )
    
})




// listen
const PORT = 8080

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
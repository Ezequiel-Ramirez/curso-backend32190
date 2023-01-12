const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { option } = require('./options/mysqlconnection')
const connectDB = require('./options/mongodb')
const { optionLite } = require('./options/myslLiteconnection')
const ClientSQL = require('./sqlContenedor.js')
const ClientSQLLite = require('./sqlContenedorMensajes.js')
const ContenedorMongodbProductos = require('./mongodbContenedorProductos.js')
const ContenedorMongodbMensajes = require('./mongodbContenedorMensajes.js')
const { faker } = require('@faker-js/faker')
const { normalize, schema, denormalize } = require('normalizr');
const util = require('util');

faker.locale = 'en'

const mongo = new ContenedorMongodbProductos()
const mongoMensajes = new ContenedorMongodbMensajes()
const sql = new ClientSQL(option)
const sqlLite = new ClientSQLLite(optionLite)


connectDB()

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
    //res.render('inicio', { productos: await sql.listarArticulos() })
    //con mongodb
    res.render('inicio', { productos: await mongo.getAll() })
})

//productos con faker
function getProduct(id) {
    return {
        id: id,
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    }
}

app.get('/api/productos-test', async (req, res) => {
    const cant = Number(req.query.cant) || 5;
    const objs = []

    for (let i = 0; i < cant; i++) {
        objs.push(getProduct(i + 1))
        await mongo.save(getProduct(i + 1))
    }
    res.json(objs)
}
)

// socket
io.on('connection', async socket => {
    console.log('Un cliente se ha conectado')



    //guardar mensajes en la base de datos y mostrarlos con mongodb
    //obtengo los mensajes de la base de datos y los normalizo antes de enviarlos
    //socket.emit('messages', await mongoMensajes.getAll())
    const mensajesMongo = await mongoMensajes.getAll()
    const messages = {
        id: 'mensajesTest',
        messages: mensajesMongo
    }
    const author = new schema.Entity('author', {}, { idAttribute: 'id' });
    const mensaje = new schema.Entity('mensaje', { author: author });
    const mensajes = new schema.Entity('mensajes', { messages: [mensaje] });
    const mensajesNormalizados = normalize(messages, mensajes);

    socket.emit('messages', mensajesNormalizados)

    socket.on('new-message', async data => {
        console.log(data)
        await mongoMensajes.save(data)

        //const mensajes = await mongoMensajes.getAll()

        //io.sockets.emit('messages', mensajes)
        const mensajesMongo = await mongoMensajes.getAll()
        const messages = {
            id: 'mensajesTest',
            messages: mensajesMongo
        }
        const author = new schema.Entity('author', {}, { idAttribute: 'id' });
        const mensaje = new schema.Entity('mensaje', { author: author });
        const mensajes = new schema.Entity('mensajes', { messages: [mensaje] });
        const mensajesNormalizados = normalize(messages, mensajes);

        socket.emit('messages', mensajesNormalizados)
    })




    //guardar productos en la base de datos y mostrarlos con mongodb
    socket.emit('products', await mongo.getAll())
    socket.on('new-product', async data => {

        await mongo.save(data)

        const productos = await mongo.getAll()

        io.sockets.emit('products', productos)
    })

})

// listen
const PORT = 8080
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
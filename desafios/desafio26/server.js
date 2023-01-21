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
const { normalizarMensajes, getProductsFaker } = require('./utils/utils')
const session = require('express-session')
const auth = require('./middlewares/middlewares')
const MongoStore = require('connect-mongo')

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

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

//middleware de session
app.use(session({
    //conecto a mongo Atlas
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://ezequiel:ezequiel@backendcodercurso.y3plhcv.mongodb.net/desafio24?retryWrites=true&w=majority",
        mongoOptions: advancedOptions,
        collectionName: "sessions",
        ttl: 600,
    }),
    secret: "cursoBackend",
    resave: false,
    saveUninitialized: false
}))



// get
app.get('/', auth, async (req, res) => {
    //res.render('inicio', { productos: await sql.listarArticulos() })
    //con mongodb
    const nombre = req.session.username || ""
    res.render('inicio', { productos: await mongo.getAll(), nombre })
})


//login
app.get('/login', (req, res) => {
    if (req.session.username && req.session.admin) {
        res.redirect('/')
    } else {
        res.render('login')
    }
})

//loing
app.post('/login', (req, res) => {
    const { username } = req.body

    if (username !== '') {
        req.session.username = username
        req.session.admin = true
        res.redirect('/')
    } else {
        res.redirect('/login')
    }
})

//logout
app.post('/logout', (req, res) => {
    const nombre = req.session.username || ""
    if (req.session.username && req.session.admin) {
        req.session.destroy(err => {
            if (err) {
                res.json({ error: "algo hiciste mal", descripcion: err })
            } else {
                res.render('messageLogout', { nombre })
            }
        })
    } else {
        res.redirect('/login')
    }
})


app.get('/api/productos-test', auth, async (req, res) => {
    const cant = Number(req.query.cant) || 1;
    const objs = []

    for (let i = 0; i < cant; i++) {
        objs.push(getProductsFaker(i + 1))
        await mongo.save(getProductsFaker(i + 1))
    }
    res.json(objs)
})

// socket
io.on('connection', async socket => {
    console.log('Un cliente se ha conectado')
    //guardar mensajes en la base de datos y mostrarlos con mongodb
    //obtengo los mensajes de la base de datos y los normalizo antes de enviarlos

    const mensajesMongo = await mongoMensajes.getAll()
    const mensajesNormalizados = normalizarMensajes(mensajesMongo)
    socket.emit('messages', mensajesNormalizados)

    socket.on('new-message', async data => {
        await mongoMensajes.save(data)
        const mensajesMongo = await mongoMensajes.getAll()
        const mensajesNormalizados = normalizarMensajes(mensajesMongo)
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
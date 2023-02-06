//Class containerMensajesMongoDB.js
const ContenedorMensajesMongoDB = require('./containers/containerMensajesMongoDB')
const mensajesMongoDB = new ContenedorMensajesMongoDB()

//SERVIDOR
const dotenv = require('dotenv')
const express = require('express')
const session = require('express-session')
const cookieParser = require("cookie-parser")
const MongoStore = require("connect-mongo")
const { registrar, login, datos, logout, raiz, datosProcess, numerosRandoms } = require('./routers/routers');
const parseArgs = require('yargs/yargs')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const passport = require("passport")
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }



app.set('view engine', 'ejs')

app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL || "mongodb+srv://ezequiel:ezequiel@backendcodercurso.y3plhcv.mongodb.net/desafio28?retryWrites=true&w=majority",
        mongoOptions: advancedOptions
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 60000 }
}))
app.use(express.static("./public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())


app.use((req, res, next) => {
    req.isAuthenticated = () => {
        if (req.session.nombre) {
            return true
        }
        return false
    }

    req.logout = callback => {
        req.session.destroy(callback)
    }

    next()
})

app.get('/', async (req, res) => {
    if (req.session.nombre) {
        res.redirect('/datos')
    } else {
        res.render('login')
    }
})
app.use('/', registrar)
app.use('/', login)
app.use('/', datos)
app.use('/', logout)
app.use('/', raiz)
app.use('/', datosProcess)
app.use('/', numerosRandoms)

app.get('/test', async (req, res) => {
    res.render("productos")
})

io.on("connection", async (socket) => {
    const mensajes = await mensajesMongoDB.getAll()

    const stringifyData = JSON.stringify(mensajes)
    const parseData = JSON.parse(stringifyData)

    const normalizado = await mensajesMongoDB.normalizeMessages(parseData)
    
    socket.emit('mensajes', normalizado)
    
    socket.on('new-msj', async (message) => {
        if (message.author.email && message.author.nombre && message.author.apellido && message.author.edad && message.author.alias && message.author.avatar
            && message.text) {
                await mensajesMongoDB.save(message)
                
                let todosmensajes = await mensajesMongoDB.getAll()
                
                const stringifyData = JSON.stringify(todosmensajes)
                const parseData = JSON.parse(stringifyData)
                
            const normalizado = await mensajesMongoDB.normalizeMessages(parseData)

            io.sockets.emit('mensajes', normalizado)
        } else {
            console.log('Faltan completar campos')
        }
    })

    let productos = await mensajesMongoDB.getAllProductos()

    socket.emit('productos', productos)

    socket.on('new-product', async (data) => {
        let todosProductos = data

        if (data.titulo && data.descripcion && data.codigo && data.precio && data.foto && data.stock) {
            await mensajesMongoDB.saveProductos(todosProductos)

            console.log('Articulos Almacenados')

            const productos = await mensajesMongoDB.getAllProductos()

            io.sockets.emit('productos', productos)
        }
        else { console.log('Faltan completar campos') }
    })


    let productosFaker = []

    for (let i = 0; i < 5; i++) {
        productosFaker.push(await mensajesMongoDB.crearProducto(i + 1))
    }

    socket.emit('faker', productosFaker)
})

//PORT
//Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.
const argv = parseArgs(process.argv.slice(2)).argv
const PORT = argv.PORT || 8080
const MODE = argv.MODE || 'FORK'

if (MODE === 'FORK') {
    const { fork } = require('child_process')
    const n = require('os').cpus().length
    console.log(`Fork mode on ${n} CPUs`)
    /* for (let i = 0; i < n; i++) {
        fork('./server.js')
    } */

    
} else if (MODE === 'CLUSTER') {
    const cluster = require('cluster')
    const numCPUs = require('os').cpus().length
    console.log(`Cluster mode on ${numCPUs} CPUs`)
    if (cluster.isMaster) {
        console.log(`Master ${process.pid} is running`)
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`)
        })
    } else {
        httpServer.listen(PORT, () => {
            console.log(`Servidor http escuchando en el puerto ${PORT}`)
        })
        console.log(`Worker ${process.pid} started`)
    }
}


const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))



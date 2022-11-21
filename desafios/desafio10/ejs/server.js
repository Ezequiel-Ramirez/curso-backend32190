const express = require('express')

const app = express()

const productos = []

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'ejs')

// get

app.get('/', (req, res) => {
    res.render('inicio', {productos})
})

app.get('/productos', (req, res) => {
    res.render('historial', {productos})
})

// post

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/')
})

// listen
const server = app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
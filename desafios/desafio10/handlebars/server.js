const express = require('express')
const handlebars = require('express-handlebars')
const app = express()

const productos = []
let listExist = false

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//with handlebars

app.engine('handlebars', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

// get

app.get('/', (req, res) => {
    res.render('formulario')
})

app.get('/productos', (req, res) => {
    if(productos.length > 0){
        listExist = true
    }
    res.render('historial', { productos, listExist })
})

// post

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/productos')
})

// listen
const server = app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})




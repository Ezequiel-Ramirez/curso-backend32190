//router en express
const express = require('express');
const { Router } = require('express');

const app = express()

//para enviar json
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
//para agregar una ruta estatica
app.use('/static', express.static(__dirname + '/public'))
//middelware nivel de aplicacion
app.use((req, res, next) => {
    console.log('middleware global')
    next()
})




const mascotas = []
const personas = []

const routerMascotas = new Router()

routerMascotas.get('/', (req, res) => {
    res.json(mascotas)
})

routerMascotas.post('/', (req, res) => {
    mascotas.push(req.body)
    res.json(mascotas)
})


const routerPersonas = new Router()

routerPersonas.get('/', (req, res) => {
    res.json(personas)
})

routerPersonas.post('/', (req, res) => {
    personas.push(req.body)
    res.json(personas)
})

app.use('/mascotas', routerMascotas)
app.use('/personas', routerPersonas)

const server = app.listen(8080, () =>{
    console.log('Servidor escuchando en puerto 8080');
})

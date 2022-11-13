const express = require('express')
const { Router } = express

const app = express()

/* 
Partiendo del ejercicio anterior, generar una carpeta pública 'public' en el servidor, la cual tendrá un archivo index.html. 
En ese archivo se encontrarán dos formularios: uno que permita ingresar mascotas y otro personas utilizando el método post
Probar el ingreso de datos mediante los formularios y con Postman
Verificar los datos cargados en cada caso.
*/

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/public'))

const mascotas = []
const personas = []

const routerMascotas = new Router()

routerMascotas.get('/', (req, res) => {
    res.json(mascotas)
})

routerMascotas.post('/', (req, res) => {
    mascotas.push(req.body)
    res.json({ ok: 'ok' })
})

const routerPersonas = new Router()

routerPersonas.get('/', (req, res) => {
    console.log(req.headers)
    res.json(personas)
})

routerPersonas.post('/', (req, res) => {
    personas.push(req.body)
    res.json({ ok: 'ok' })
})

app.use('/mascotas', routerMascotas)
app.use('/personas', routerPersonas)

const server = app.listen(8080, () => {
    console.log(__dirname)
    console.log('escuchando en el 8080')
})

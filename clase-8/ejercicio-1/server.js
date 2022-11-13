const express = require('express')
const { Router } = express

const app = express()
/* 
 Crear un servidor que permita manejar una lista de mascotas y personas. Debe poseer dos rutas principales: '/mascotas' y '/personas', las cuales deben incluir métodos para listar y para agregar recursos:
    GET: devolverá la lista requerida en formato objeto.
POST: permitirá guardar una persona ó mascota en arrays propios en memoria, con el siguiente formato: 
Persona -> { "nombre": ..., "apellido": ..., "edad":... }
Mascota -> { "nombre":..., "raza":..., "edad":... }
Utilizar el Router de express para definir las rutas base, implementando las subrutas en los métodos correspondientes.
- Probar la funcionalidad con Postman.
- El servidor escuchará peticiones en el puerto 8080 y mostrará en la consola un mensaje de conexión que muestre dicho puerto, junto a los mensajes de error si ocurriesen.

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
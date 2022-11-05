const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send(`<h1>Hola Mundo con express</h1>`)
})

let visitas = 0
app.get('/visitas', (req, res) => {
    visitas++
    res.send('Visitas: ' + visitas)
})

app.get('/fyh', (req, res) => {
    res.send('Fecha y hora: ' + new Date().toLocaleString())
})

app.get('/random', (req, res) => {
    res.send('Numero random: ' + Math.floor(Math.random() * 100))
})

const server = app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto', server.address().port)
})

server.on('error', error => console.log('hubo un error: ' + error))

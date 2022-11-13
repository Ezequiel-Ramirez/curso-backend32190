const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

/* 
Considere la siguiente frase: ‘Frase inicial’
Realizar una aplicación de servidor node.js con express que incorpore las siguientes rutas:


*/

const palabras = ["Frase", "inicial"]

// verbos

//GET '/api/frase': devuelve un objeto que como campo ‘frase’ contenga la frase completa

app.get('/api/frase', (req, res) => {
    res.json({ frase: palabras.join(' ') })
})

//GET '/api/palabras/:pos': devuelve un objeto que como campo ‘buscada’ contenga la palabra hallada en la frase en la posición dada (considerar que la primera palabra es la #1.
app.get('/api/palabras/:num', (req, res) => {
    const { num } = req.params
    res.json({ buscada: palabras[parseInt(num) - 1] })
})

//POST '/api/palabras': recibe un objeto con una palabra bajo el campo ‘palabra’ y la agrega al final de la frase. Devuelve un objeto que como campo ‘agregada’ contenga la palabra agregada, y en el campo ‘pos’ la posición en que se agregó dicha palabra.
app.post('/api/palabras', (req, res) => {
    const { palabra } = req.body
    palabras.push(palabra)

    res.json({ agregada: palabra, posicion: palabras.length })
})

//PUT '/api/palabras/:pos': recibe un objeto con una palabra bajo el campo ‘palabra’ y reemplaza en la frase aquella hallada en la posición dada. Devuelve un objeto que como campo ‘actualizada’ contenga la nueva palabra, y en el campo ‘anterior’ la anterior.

app.put('/api/palabras/:num', (req, res) => {
    const { num } = req.params
    const { palabra } = req.body
    
    const palabraAnterior = palabras[parseInt(num) -1]
    palabras[parseInt(num) -1] = palabra

    res.json({ actualizada: palabra, anterior: palabraAnterior})
})

//DELETE '/api/palabras/:pos': elimina una palabra en la frase, según la posición dada (considerar que la primera palabra tiene posición #1).
app.delete('/api/palabras/:num', (req, res) => {
    const { num } = req.params
    const palabraEliminada = palabras.splice(parseInt(num) - 1, 1)

    res.json({ borrada: palabraEliminada })
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log('escuchando en el puerto ' + PORT)
})
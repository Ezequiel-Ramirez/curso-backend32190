import express from 'express'

const app = express()

function calcularRandoms(min, max, cant) {
    let randoms = []

    for (let i = 0; i < cant; i++) {
        let random = parseInt(Math.random() * (max - min + 1)) + min
        randoms.push(random)
    }
    return randoms
}

app.get('/ramdom-debug', (req, res) => {
    let randoms = calcularRandoms(0, 9, 10000)
    console.log(randoms);
    res.json({ randoms }).status(200)
})

app.get('/ramdom-nodebug', (req, res) => {
    let randoms = calcularRandoms(0, 9, 10000)
    res.json({ randoms }).status(200)
})

const PORT = 8080

app.listen(PORT, () => {
    console.log("escuchando en el 8080");
})

//comando para ejecutar en la terminal
//artillery quick -c 50 -n 50 "http://localhost:8080/ramdom-debug" > artillery_slow.txt
//artillery quick -c 50 -n 50 "http://localhost:8080/ramdom-nodebug" > artillery_fast.txt
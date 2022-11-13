const express = require('express')
const multer = require('multer')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

/* 
Crear un servidor que permita elegir y subir un archivo utilizando un formulario servido desde su espacio público.
Dicho archivo se almacenará en una carpeta propia del servidor llamada 'uploads'.
El nombre del archivo guardado se formará con el nombre original anteponiéndole un timestamp (Date.now()) seguido con un guión. Ej: 1610894554093-clase1.zip
Utilizar express y multer en un proyecto de servidor que escuche en el puerto 8080.

*/

// config multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

// end config multer

const router = express.Router()

router.post('/subir', upload.single('miArchivo'), (req, res) => {
    const file = req.file
    if (!file) {
        const error = new Error('Error, no se subio ningun archivo')
        res.send(error)
    }
    res.send('Archivo ' + file.originalname + ' se subio correctamente')
})

app.use('/api/productos', router)

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log('servidor escuchando en el ' + PORT)
})
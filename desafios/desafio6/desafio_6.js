const express = require('express')
const fs = require('fs')

const app = express()

class Contenedor {
    constructor(file) {
        this.file = file
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            console.log('Error en getAll: ', error)
        }
    }
    async save(product) {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8')
            const products = JSON.parse(data)
            //busco el ultimo id para generar un nuevo id sumandole 1
            const lastId = products[products.length - 1].id
            const newProduct = { ...product, id: lastId + 1 }
            products.push(newProduct)
            await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2))
            console.log('Se creo nuevo producto con id:' + newProduct.id)
        } catch (error) {
            //si no existe el archivo, creamos por primera vez la lista de productos
            const newProduct = { ...product, id: 1 }
            await fs.promises.writeFile(this.file, JSON.stringify([newProduct], null, 2))
            console.log('Se creo nuevo producto con id:' + newProduct.id)
        }
    }


    async getById(id) {
        try {
            const products = await this.getAll()
            const product = products.find((product) => product.id === id)
            if (!product) {
                console.log('null')
            } else {
                return product
            }
        } catch (error) {
            throw new Error('No fue encontrado un producto con ese id')
        }
    }
}

const contenedor = new Contenedor('productos.txt')
const main = async () => {
    await contenedor.save({
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    })
    await contenedor.save({
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    })
    await contenedor.save({
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
    })

   
    const products = await contenedor.getAll()
    console.log('array de objetos', products)
   
}

main()


const server = app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto', server.address().port)
})

server.on('error', error => console.log('hubo un error: ' + error))

//muestro productos por pantalla
app.get('/productos', async (req, res) => {
    const productos = await contenedor.getAll()
    res.send({productos})
})

//obtento todos los id y luego elijo uno random para mostrar por pantalla
app.get('/productoRandom', async (req, res) => {
    const productos = await contenedor.getAll()
    const ids = productos.map(producto => producto.id)
    console.log(ids)
    const randomId = ids[Math.floor(Math.random() * ids.length)]
    const producto = await contenedor.getById(randomId)
    res.send({producto})
})

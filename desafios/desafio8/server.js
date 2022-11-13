const express = require('express');
const fs = require('fs');
const { Router } = express

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const routerProductos = new Router();

//contendor
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
            return newProduct
        } catch (error) {
            //si no existe el archivo, creamos por primera vez la lista de productos
            const newProduct = { ...product, id: 1 }
            await fs.promises.writeFile(this.file, JSON.stringify([newProduct], null, 2))
            return newProduct
        }
    }


    async getById(id) {
        try {
            const products = await this.getAll()
            const product = products.find((product) => product.id === id)
            //Para el caso de que un producto no exista, se devolverá el objeto: { error : 'producto no encontrado' }
            if (!product) {
                return { error: 'producto no encontrado' }
            } else {
                return product
            }
        } catch (error) {
            throw new Error('No fue encontrado un producto con ese id')
        }
    }


    async deleteById(id) {
        try {
            const products = await this.getAll()
            //verifico si existe ese id sino mando error
            const product = products.find((product) => product.id === id)
            if (!product) {
                throw new Error('No fue encontrado un producto con ese id')
            }
            //filtro el array de productos y me quedo con los que no tengan el id que quiero eliminar
            const newProducts = products.filter((product) => product.id !== id)
            await fs.promises.writeFile(this.file, JSON.stringify(newProducts, null, 2))
        } catch (error) {
            console.log('Error en deleteById: ', error)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, JSON.stringify([], null, 2))
        } catch (error) {
            console.log('Error en deleteAll: ', error)
        }
    }
}

/* 
Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:
GET '/api/productos' -> devuelve todos los productos.
GET '/api/productos/:id' -> devuelve un producto según su id.
POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
DELETE '/api/productos/:id' -> elimina un producto según su id.
Cada ítem almacenado dispondrá de un id numérico proporcionado por el backend, comenzando en 1, y que se irá incrementando a medida de que se incorporen productos. Ese id será utilizado para identificar un producto que va a ser listado en forma individual.
Para el caso de que un producto no exista, se devolverá el objeto:
{ error : 'producto no encontrado' }
Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.
Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.
Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.
El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.
Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.

 */

const contenedor = new Contenedor('productos.txt')

//GET '/api/productos' -> devuelve todos los productos.
routerProductos.get('/', async (req, res) => {
    const products = await contenedor.getAll()
    res.json(products)
})

//GET '/api/productos/:id' -> devuelve un producto según su id.
routerProductos.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const product = await contenedor.getById(id)
    res.json(product)
})

//POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
routerProductos.post('/', async (req, res) => {
    const product = req.body
    const newProduct = await contenedor.save(product)
    res.json(newProduct)
})

//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
routerProductos.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const product = req.body
    const products = await contenedor.getAll()
    const index = products.findIndex((product) => product.id === id)
    products[index] = { ...product, id: id }
    await fs.promises.writeFile('productos.txt', JSON.stringify(products, null, 2))
    res.json(products[index])
})

//DELETE '/api/productos/:id' -> elimina un producto según su id.
routerProductos.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    await contenedor.deleteById(id)
    res.json({ msg: 'Producto eliminado' })
})

//DELETE '/api/productos' -> elimina todos los productos.
routerProductos.delete('/', async (req, res) => {
    await contenedor.deleteAll()
    res.json({ msg: 'Todos los productos eliminados' })
})


app.use('/api/productos', routerProductos);
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log('servidor escuchando en el ' + PORT);
}
);


const express = require('express');
const { Router } = express
const ContenedorProductos = require('../persistencia/ContenedorProductos.js')

const routerProductos = new Router();

const persistenciaProductos = new ContenedorProductos('./persistencia/productos.txt');

let admin = true;

//rutas productos

//GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
routerProductos.get('/:id?', async (req, res) => {
    const { id } = req.params
    if (id) {
        const product = await persistenciaProductos.getById(Number(id))
        res.json(product)
    } else {
        const products = await persistenciaProductos.getAll()
        res.json(products)
    }
})

//POST: '/' - Para incorporar productos al listado (disponible para administradores)
//En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada }

routerProductos.post('/', async (req, res) => {
    if (admin) {
        const product = req.body
        const newProduct = await persistenciaProductos.save(product)
        res.json(newProduct)
    } else {
        res.json({ error: -1, descripcion: 'ruta /api/productos método POST no autorizada' })
    }
})

//PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
routerProductos.put('/:id', async (req, res) => {
    if (admin) {
        const { id } = req.params
        const product = req.body
        const newProduct = await persistenciaProductos.updateById(Number(id), product)
        res.json(newProduct)
    } else {
        res.json({ error: -1, descripcion: 'ruta /api/productos método PUT no autorizada' })
    }
})

//DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
routerProductos.delete('/:id', async (req, res) => {
    if (admin) {
        const { id } = req.params
        const product = await persistenciaProductos.deleteById(Number(id))
        res.json(product)
    } else {
        res.json({ error: -1, descripcion: 'ruta /api/productos método DELETE no autorizada' })
    }
})

module.exports = routerProductos;








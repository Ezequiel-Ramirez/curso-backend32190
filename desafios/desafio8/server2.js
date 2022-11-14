const express = require('express');
const Contenedor = require('./productos.js')
const { Router } = express

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const routerProductos = new Router();

const contenedor = new Contenedor();

//rutas

routerProductos.get('/', (req, res) => {
    const products = contenedor.getAll()
    res.json(products)
})

routerProductos.get('/:id', (req, res) => {
    const { id } = req.params
    const product = contenedor.getById(Number(id))
    res.json(product)
})

routerProductos.post('/', (req, res) => {
    const product = req.body
    const newProduct = contenedor.save(product)
    res.json(newProduct)
})

routerProductos.put('/:id', (req, res) => {
    const { id } = req.params
    const product = req.body
    const newProduct = contenedor.update(Number(id), product)
    res.json(newProduct)
})

routerProductos.delete('/:id', (req, res) => {
    const { id } = req.params
    const product = contenedor.delete(Number(id))
    res.json(product)
})

app.use('/api/productos', routerProductos)

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});






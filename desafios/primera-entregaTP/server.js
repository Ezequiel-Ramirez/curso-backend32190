import express from "express";
import { Router } from "express";
import Contenedor from "./persistencia/Contenedor.js";
import ContenedorCarrito from "./persistencia/ContenedorCarrito.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const routerProductos = new Router();
const routerCarrito = new Router();

app.use('/productos', routerProductos)
app.use('/carrito', routerCarrito)

const persistenciaProductos = new Contenedor('./persistencia/productos.txt');
const persistenciaCarrito = new ContenedorCarrito('./persistencia/carritos.txt');

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
        res.json({ error : -1, descripcion: 'ruta /api/productos método POST no autorizada' })
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
        res.json({ error : -1, descripcion: 'ruta /api/productos método PUT no autorizada' })
    }
})

//DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
routerProductos.delete('/:id', async (req, res) => {
    if (admin) {
    const { id } = req.params
    const product = await persistenciaProductos.deleteById(Number(id))
    res.json(product)
    } else {
        res.json({ error : -1, descripcion: 'ruta /api/productos método DELETE no autorizada' })
    }
})

//rutas carrito

//POST: '/' - Crea un carrito y devuelve su id.
routerCarrito.post('/', async (req, res) => {
    const carrito = req.body
    const newCarrito = await persistenciaCarrito.saveCarrito(carrito)
    res.json(newCarrito)
})

//GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
routerCarrito.get('/:id/productos', async (req, res) => {
    const { id } = req.params
    const carrito = await persistenciaCarrito.getProductosCarrito(Number(id))
    res.json(carrito)
})

//DELETE: '/:id' - Vacía un carrito y lo elimina.
routerCarrito.delete('/:id', async (req, res) => {
    const { id } = req.params
    const carrito = await persistenciaCarrito.deleteCarrito(Number(id))
    res.json(carrito)
})

//POST: '/:id/productos' - Para incorporar productos al carrito por su id de carrito.
routerCarrito.post('/:id/productos', async (req, res) => {
    const { id } = req.params
    const producto = req.body
    const newProducto = await persistenciaCarrito.addProductoCarrito(Number(id), producto)
    res.json(newProducto)
})

//DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params
    const producto = await persistenciaCarrito.deleteProductoCarrito(Number(id), Number(id_prod))
    res.json(producto)
})


//server
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
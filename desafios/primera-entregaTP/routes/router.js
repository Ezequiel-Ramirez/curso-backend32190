const express = require('express');
const { Router } = express

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const routerProductos = new Router();
const routerCarrito = new Router();

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

//exporto el router
module.exports = routerProductos;
module.exports = routerCarrito;





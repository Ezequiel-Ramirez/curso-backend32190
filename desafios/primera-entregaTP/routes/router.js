const express = require('express');
const { Router } = express

const routerProductos = new Router();
const routerCarrito = new Router();

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

//exporto el router
module.exports = routerProductos;
module.exports = routerCarrito;





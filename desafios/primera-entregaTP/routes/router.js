import express from "express";
import { Router } from "express";

const routerProductos = new Router();
const routerCarrito = new Router();

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

//exporto el router
module.exports = routerProductos;
module.exports = routerCarrito;





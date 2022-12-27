const express = require('express')
const routerProductos = require('./routes/routerProduct.js')
const routerCarrito = require('./routes/routerCarrito.js')
const routerCarritoFirebase = require('./routes/routerCarritoFirebase.js')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)
app.use('/api/carrito', routerCarritoFirebase)

//server
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
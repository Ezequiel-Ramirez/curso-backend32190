# App Ecommerce curso Backend

## Descripción

Este es un proyecto de backend para una aplicación de comercio electrónico desarrollado en Node.js y MongoDB.

## Dependencias

A continuación se muestra una lista de dependencias utilizadas en este proyecto.

| Dependencia         | Versión  |
|---------------------|----------|
| @faker-js/faker     | ^7.6.0   |
| autocannon          | ^7.10.0  |
| axios               | ^1.3.4   |
| bcrypt              | ^5.1.0   |
| cluster             | ^0.7.7   |
| compression         | ^1.7.4   |
| connect-mongo       | ^4.6.0   |
| connect-session     | ^0.0.1   |
| cookie-parser       | ^1.4.6   |
| dotenv              | ^16.0.3  |
| ejs                 | ^3.1.8   |
| express             | ^4.18.2  |
| express-session     | ^1.17.3  |
| knex                | ^2.4.0   |
| log4js              | ^6.7.1   |
| minimist            | ^1.2.7   |
| mongoose            | ^6.8.1   |
| mysql               | ^2.18.1  |
| normalizr           | ^3.6.2   |
| os                  | ^0.1.2   |
| passport            | ^0.6.0   |
| passport-local      | ^1.0.0   |
| socket.io           | ^4.5.4   |
| sqlite3             | ^5.1.4   |

## DevDependencies

| Dependencia  | Versión  |
|--------------|----------|
| chai         | ^4.3.7   |
| mocha        | ^10.2.0  |
| nodemon      | ^2.0.22  |
| supertest    | ^6.3.3   |






### Modelo de Schema de MongoDB

## Modelos

A continuación se muestra el modelo utilizado para la colección "producto" en MongoDB.

```javascript
const collectionProductos = "producto";
const productoSchema = new Schema({
  title: { type: String },
  price: { type: Number },
  description: { type: String },
  code: { type: String },
  image: { type: String },
  stock: { type: Number },
  timestamp: { type: String },
  category: { type: String },
});
```
A continuación se muestra el modelo utilizado para la colección "carrito" en MongoDB.
```javascript
const carritoCollection = "Carrito";
const carritoSchema = new Schema({
    user: { type: String },
    products: [
        {
            title: { type: String },
            price: { type: Number },
            description: { type: String },
            code: { type: String },
            image: { type: String },
            stock: { type: Number },
            timestamp: { type: String },
            category: { type: String },
        },
    ],
});
```
A continuación se muestra el modelo utilizado para la colección "mensajes" en MongoDB.
```javascript
const collectionMensajes = "mensajes";
const mensajeSchema = new Schema({
    id: {type: String, require: true},
    author: {
        id: {type: String, require: true, max: 150},
        nombre: {type: String, require: true, max: 150},
        apellido: {type: String, require: true, max: 150},
        edad: {type: Number, require: true},
        alias: {type: String, require: true, max: 150},
        avatar: {type: String, require: true, max: 150},
    },
    fyh: {type: String, require: true},
    text: {type: String, require: true}
})
```
A continuación se muestra el modelo utilizado para la colección "usuarios" en MongoDB.
```javascript
const collectionUsuarios = 'usuarios'
const usuarioSchema = new Schema({
    username: {type: String, require: true, max: 150},
    password: {type: String, require: true, max: 150},
    direccion: {type: String, require: true},
})
```

## Rutas

A continuación se muestra la lista de rutas utilizadas en este proyecto.

| Ruta                  | Método   | Descripción |
|-----------------------|----------|-------------|
| /                     | GET      | Ruta inicial de la aplicación. |
| /register             | GET      | Ruta para registrar un usuario. |
| /register             | POST     | Ruta para registrar un usuario. |
| /failregister         | GET      | Ruta para mostrar un mensaje de error al registrar un usuario. |
| /login                | GET      | Ruta para loguear un usuario. |
| /login                | POST     | Ruta para loguear un usuario. |
| /faillogin            | GET      | Ruta para mostrar un mensaje de error al loguear un usuario. |
| /logout               | GET      | Ruta para desloguear un usuario. |
| /datos                | GET      | Ruta para mostrar los datos de un usuario y productos iniciales. |
| /productos/:id?       | GET      | Devuelve un listado de productos o un producto por su id. |
| /productos            | POST     | Crea un nuevo producto. |
| /productos/:id        | PUT      | Actualiza un producto por su id. |
| /productos/:id        | DELETE   | Elimina un producto por su id. |
| /productos/categoria/:categoria | GET | Devuelve un listado de productos por su categoría. |
| /carrito/:id          | GET      | Devuelve un carrito por su id. |
| /carrito/:id          | POST     | Agregar un producto al carrito. |
| /carrito/:id          | DELETE   | Eliminar un producto del carrito. |
| /api/                 | GET      | Devuelve un listado de productos random. |



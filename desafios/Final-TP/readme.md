# App Ecommerce curso Backend

## Descripción

Este es un proyecto de backend para una aplicación de comercio electrónico desarrollado en Node.js y MongoDB.

## Dependencias

A continuación se muestra una lista de dependencias utilizadas en este proyecto.

| Dependencia           | Versión  |
|-----------------------|----------|
| @faker-js/faker      | ^7.6.0   |
| autocannon           | ^7.10.0  |
| bcrypt               | ^5.1.0   |
| boostrap             | ^2.0.0   |
| compression          | ^1.7.4   |
| connect-mongo        | ^4.6.0   |
| cookie-parser        | ^1.4.6   |
| dotenv               | ^16.0.3  |
| ejs                  | ^3.1.8   |
| express              | ^4.18.2  |
| express-fileupload   | ^1.4.0   |
| express-session      | ^1.17.3  |
| firebase             | ^9.17.1  |
| firebase-admin       | ^11.5.0  |
| minimist             | ^1.2.8   |
| mongoose             | ^6.9.1   |
| multer               | ^1.4.5-lts.1 |
| nodemailer           | ^6.9.1   |
| normalizr            | ^3.6.2   |
| passport             | ^0.6.0   |
| passport-local       | ^1.0.0   |
| socket.io            | ^4.6.0   |
| swagger-jsdoc        | ^6.2.8   |
| swagger-ui-express   | ^4.6.2   |
| twilio               | ^4.8.0   |
| winston              | ^3.8.2   |


### Modelo de Schema de MongoDB

## Modelos

A continuación se muestra el modelo utilizado para la colección "productos" en MongoDB.

```javascript
const collectionProductos = "productos";
const schemaProductos = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  codigo: Number,
  precio: Number,
  foto: String,
  stock: Number,
});
```
A continuación se muestra el modelo utilizado para la colección "carritos" en MongoDB.
```javascript
const carritoCollection = "carritos";
const carritoSchema = new mongoose.Schema({
  productos:[
    {
      titulo: { type: String, require: true },
      descripcion: { type: String, require: true },
      codigo: { type: Number, require: true },
      precio: { type: Number, require: true },
      foto: { type: String, require: true },
      stock:{ type: Number, require: true },
      id: { type: Number},
      timestamp: { type: Date, required: true},
    }
  ],
  timestamp: { type: Date, required: true}
});
```
A continuación se muestra el modelo utilizado para la colección "mensajes" en MongoDB.
```javascript
const collectionMensajes = "mensajes";
const mensajeSchema = new mongoose.Schema({   
    author: {        
        email: { type: String, require: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        edad: { type:String, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true }
    },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true},
    id: { type: Number, required: true },
});
```
A continuación se muestra el modelo utilizado para la colección "usuarios" en MongoDB.
```javascript
const collectionUsuarios = 'usuarios'
const schemaUsuarios = new mongoose.Schema({
    nombre: String,
    password: String,
    direccion: String,
    edad: Number,
    telefono: Number,
    email: String,
    avatar: String,
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
| /api/productos        | GET      | Devuelve un listado de productos. |
| /api/producto         | GET      | Devuelve un producto por su id. |
| /api/productos        | POST     | Crea un nuevo producto. |
| /api/productos        | PUT      | Actualiza un producto por su id. |
| /api/productos        | DELETE   | Elimina un producto por su id. |
| /carrito              | GET      | Devuelve un listado de productos del carrito. |
| /carritos             | GET      | Devuelve un listado de carritos. |
| /carritoss            | GET      | Devuelve un carrito por su id. |
| /carrito/producto     | GET      | Traer todos los productos del carrito. |
| /carrito/             | POST     | Agregar un producto al carrito. |
| /carrito/producto     | DELETE   | Eliminar un producto del carrito. |
| /carrito              | DELETE   | Eliminar carrito. |
| /carrito/comprar      | POST     | Comprar productos del carrito. |
| /api/mensajeria       | GET      | Devuelve un listado de mensajes. |
| /info                 | GET      | Devuelve info de variables. |
| /infoBloq             | GET      | Devuelve info de variables. |
| /api/random/:cant     | GET      | Devuelve un listado de numeros aleatorios. |
| *                     | GET      | Ruta para mostrar un mensaje de error al ingresar una ruta incorrecta. |



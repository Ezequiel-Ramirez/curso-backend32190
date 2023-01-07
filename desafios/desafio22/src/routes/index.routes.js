import { Router } from "express";
import Producto from "../models/Producto";
import Mensaje from "../models/Mensaje";
import { faker } from '@faker-js/faker'
faker.locale = 'en'

function getProduct(id) {
    return {
        id: id,
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.abstract()
    }
}




const router = Router();


router.get("/", async (req, res) => {
    const productos = await Producto.find().lean();
    const mensajes = await Mensaje.find().lean();
    res.render('index', { productos, mensajes })
})

router.post("/api/productos/guardar", async (req, res) => {
    const { title, price, thumbnail } = req.body;
    const newProducto = new Producto({ title, price, thumbnail });
    await newProducto.save();
    res.redirect('/')
})

router.post("/api/mensajes/guardar", async (req, res) => {
    const {email, nombre, apellido, edad, alias, avatar, message} = req.body;
    const author = {
        email: email,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        alias: alias,
        avatar: avatar
    }
    const text = message;
    const timestamp = new Date().toLocaleString()
    const newMensaje = new Mensaje({ author, text, timestamp });
    await newMensaje.save();
    res.redirect('/')
})


router.get("/api/productos-test", (req, res) => {
    const cant = Number(req.query.cant) || 1
    const objs = []

    for (let i = 0; i < cant; i++) {
        objs.push(getProduct(i + 1))
        const newProducto = new Producto({ title: objs[i].title, price: objs[i].price, thumbnail: objs[i].thumbnail });
        newProducto.save();
    }

    res.render('productos', { objs })
})

export default router;
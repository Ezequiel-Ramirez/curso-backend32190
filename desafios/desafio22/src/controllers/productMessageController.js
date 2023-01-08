import Producto from '../models/producto.js';
import Mensaje from '../models/mensaje.js';
import { getProduct } from '../utils/utils.js';


export const renderIndex = async (req, res) => {
    const productos = await Producto.find().lean();
    const mensajes = await Mensaje.find().lean();
    res.render('index', { productos, mensajes })
}

export const createProduct = async (req, res) => {
    const { title, price, thumbnail } = req.body;
    const newProducto = new Producto({ title, price, thumbnail });
    await newProducto.save();
    res.redirect('/')
}

export const createMessage = async (req, res) => {
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
}

export const createProductTest = async (req, res) => {
    const cant = Number(req.query.cant) || 1
    const objs = []

    for (let i = 0; i < cant; i++) {
        objs.push(getProduct(i + 1))
        const newProducto = new Producto({ title: objs[i].title, price: objs[i].price, thumbnail: objs[i].thumbnail });
        newProducto.save();
    }

    res.render('productos', { objs })
}
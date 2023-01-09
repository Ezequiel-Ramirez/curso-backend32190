import Producto from '../models/producto.js';
import Mensaje from '../models/mensaje.js';
import { getProduct, normalizeMessages } from '../utils/utils.js';

import util from 'util';


export const renderIndex = async (req, res) => {
    const productos = await Producto.find().lean();
    const mensajes = await Mensaje.find().lean();

const mensajesNormalizados = normalizeMessages(mensajes);
console.log('mensajesNormalizados', mensajesNormalizados)

    res.render('index', { productos, mensajes, mensajesNormalizados })
}

export const createProduct = async (req, res) => {
    const { title, price, thumbnail } = req.body;
    const newProducto = new Producto({ title, price, thumbnail });
    await newProducto.save();
    res.redirect('/')
}

export const createMessage = async (req, res) => {
    const { email, nombre, apellido, edad, alias, avatar, message } = req.body;
    const id = email;
    const author = {
        id: email,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        alias: alias,
        avatar: avatar
    }
    const text = message;
    const timestamp = new Date().toLocaleString()
    const newMensaje = new Mensaje({id, author, text, timestamp });
    await newMensaje.save();
    res.redirect('/')
}

export const createProductTest = async (req, res) => {
    const cant = Number(req.query.cant) || 5;
    const objs = []

    for (let i = 0; i < cant; i++) {
        objs.push(getProduct(i + 1))
        const newProducto = new Producto({ title: objs[i].title, price: objs[i].price, thumbnail: objs[i].thumbnail });
        newProducto.save();
    }

    res.render('productos', { objs })
}
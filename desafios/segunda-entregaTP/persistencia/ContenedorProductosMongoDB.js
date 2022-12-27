const fs = require('fs');
const models = require('../models/productos');
const connect = require('../config/mongoDbConfig');

class ContenedorProductosMongoDB {
    constructor() {
        this.productos = [];
    }

    async save(producto) {
        try {
            await connect();
            const productoNuevo = new models(producto);
            const productoGuardado = await productoNuevo.save();
            return productoGuardado;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            await connect();
            const producto = await models.findById(id);
            return producto;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            await connect();
            const productos = await models.find();
            return productos;
        } catch (error) {
            console.log(error);
        }
    }   

    async deleteById(id) {
        try {
            await connect();
            const producto = await models.findByIdAndDelete(id);
            return producto;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            await connect();
            const productos = await models.deleteMany();
            return productos;
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id, producto) {

        try {
            await connect();
            const productoActualizado = await models.findByIdAndUpdate(id, producto
                , { new: true });
            return productoActualizado;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorProductosMongoDB;


const productosFactory = require('../persistencia/DAO/productosDAOFactory');
const productosDTO = require('../persistencia/DTO/productosDTO');
const Productos = require('../modelos/Producto');

class ProductosRepos {
   dao 

    constructor() {
        this.dao = productosFactory.getDAO()
    }

    async listar() {
        try {
            const productos = await this.dao.listarArticulos()
            return productos.map(producto => new Productos(producto))
        } catch (error) {
            console.log('Error en listar: ', error)
        }
    }

    async guardar(producto) {
        try {
            const productoDTO = productosDTO(producto)
            await this.dao.insertarArticulos(productoDTO)
        } catch (error) {
            console.log('Error en guardar: ', error)
        }
    }

    async borrar(id) {
        try {
            await this.dao.borrarArticulos(id)
        } catch (error) {
            console.log('Error en borrar: ', error)
        }
    }

    async actualizar(id, producto) {
        try {
            const productoDTO = productosDTO(producto)
            await this.dao.actualizarStock(id, productoDTO)
        } catch (error) {
            console.log('Error en actualizar: ', error)
        }
    }
}

module.exports = ProductosRepos
const mensajesFactory = require('../persistencia/DAO/mensajesDAOFactory');
const mensajesDTO = require('../persistencia/DTO/mensajesDTO');
const Mensajes = require('../modelos/Mensaje');

class MensajesRepos {
    dao

    constructor() {
        this.dao = mensajesFactory.getDAO()
    }

    async listar() {
        try {
            const mensajes = await this.dao.listarArticulos()
            return mensajes.map(mensaje => new Mensajes(mensaje))
        } catch (error) {
            console.log('Error en listar: ', error)
        }
    }

    async guardar(mensaje) {
        try {
            const mensajeDTO = mensajesDTO(mensaje)
            await this.dao.insertarArticulos(mensajeDTO)
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

    async actualizar(id, mensaje) {
        try {
            const mensajeDTO = mensajesDTO(mensaje)
            await this.dao.actualizarStock(id, mensajeDTO)
        } catch (error) {
            console.log('Error en actualizar: ', error)
        }
    }
}

module.exports =  MensajesRepos
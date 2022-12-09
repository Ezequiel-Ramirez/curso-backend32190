const knex = require('knex')

//creo la clase
class ClientSQLLite{
    constructor(options){
        this.knex = knex(options)
    }
    //creo la tabla mensajes
    async crearTabla(){
        try {
            return this.knex.schema.dropTableIfExists('mensajes')
            .finally(() => {
                return this.knex.schema.createTable('mensajes', table => {
                    table.increments('id')
                    table.string('author')
                    table.string('text')
                    table.time('date')
                })
            })
        } catch (error) {
            console.log('Error en crearTabla: ', error)
        }
    }
    //inserto los productos
    async insertarArticulos(articulos){
        try {
            return this.knex('mensajes').insert(articulos)
        } catch (error) {
            console.log('Error en insertarArticulos: ', error)
        }
    }
    //listo los productos
    async listarArticulos(){
        try {
            return this.knex.from('mensajes').select('*')
        } catch (error) {
            console.log('Error en listarArticulos: ', error)
        }
    }
    //borro un producto
    async borrarArticulos(id){
        try {
            await this.knex('mensajes').where('id', id).del()
        } catch (error) {
            console.log('Error en borrarArticulos: ', error)
        }
    }
    //actualizo el stock
    async actualizarStock(id, stock){
        try {
            await this.knex('mensajes').where('id', id).update({stock})
        } catch (error) {
            console.log('Error en actualizarStock: ', error)
        }
    }
    //cierro la conexion
    close(){
        this.konex.destroy()
    }
}

//exporto
module.exports = ClientSQLLite
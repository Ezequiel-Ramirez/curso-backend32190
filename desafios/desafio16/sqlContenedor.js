const knex = require('knex')

//creo la clase
class ClientSQL{
    constructor(options){
        this.knex = knex(options)
    }
    //creo la tabla
    async crearTabla(){
        try {
            return this.knex.schema.dropTableIfExists('productos')
            .finally(() => {
                return this.knex.schema.createTable('productos', table => {
                    table.increments('id')
                    table.string('title')
                    table.string('price')
                    table.string('thumbnail')
                })
            })
        } catch (error) {
            console.log('Error en crearTabla: ', error)
        }
    }
    //inserto los productos
    async insertarArticulos(articulos){
        try {
            return this.knex('productos').insert(articulos)
        } catch (error) {
            console.log('Error en insertarArticulos: ', error)
        }
    }
    //listo los productos
    async listarArticulos(){
        try {
            return this.knex.from('productos').select('*')
        } catch (error) {
            console.log('Error en listarArticulos: ', error)
        }
    }
    //borro un producto
    async borrarArticulos(id){
        try {
            await this.knex('productos').where('id', id).del()
        } catch (error) {
            console.log('Error en borrarArticulos: ', error)
        }
    }
    //actualizo el stock
    async actualizarStock(id, stock){
        try {
            await this.knex('productos').where('id', id).update({stock})
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
module.exports = ClientSQL
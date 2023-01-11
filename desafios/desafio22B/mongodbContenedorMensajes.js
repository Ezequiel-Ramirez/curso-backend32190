const Mensaje = require('./models/mensaje');

//creo la clase
class ContenedorMongodbMensajes{
    constructor(){
        this.mensajes = []
    }
    //inserto los mensajes
    async save(mensaje){
        try {
            const newMensaje = new Mensaje(mensaje);
            await newMensaje.save();
            return newMensaje._id
        } catch (error) {
            console.log('Error en save: ', error)
        }
    }
    //listo los mensajes
    async getAll(){
        try {
            const mensajes = await Mensaje.find().lean();
            return mensajes
        } catch (error) {
            console.log('Error en getAll: ', error)
        }
    }
    //listo un mensaje
    async getById(id){
        try {
            const mensaje = await Mensaje.findById(id).lean();
            return mensaje
        } catch (error) {
            console.log('Error en getById: ', error)
        }
    }
    //borro un mensaje
    async deleteById(id){
        try {
            await Mensaje.findByIdAndDelete(id)
        } catch (error) {
            console.log('Error en deleteById: ', error)
        }
    }
    //actualizo un mensaje
    async updateById(id, mensaje){
        try{
            await Mensaje.findByIdAndUpdate(id, mensaje).lean();

        } catch (error) {
            console.log('Error en updateById: ', error)
        }
    }
    //borro todos los mensajes
    async deleteAll(){
        try {
            await Mensaje.deleteMany()
        } catch (error) {
            console.log('Error en deleteAll: ', error)
        }
    }
}

module.exports = ContenedorMongodbMensajes
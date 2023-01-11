const Producto = require('./models/producto.js'); //importo el modelo de producto

//creo la clase
class ContenedorMongodbProductos{
    constructor(){
        this.productos = []
    }
    //inserto los productos
    async save(producto){
        try {
            const newProducto = new Producto(producto);
            await newProducto.save();
            return newProducto._id
        } catch (error) {
            console.log('Error en save: ', error)
        }
    }
    //listo los productos
    async getAll(){
        try {
            const productos = await Producto.find().lean();
            return productos
        } catch (error) {
            console.log('Error en getAll: ', error)
        }
    }
    //listo un producto
    async getById(id){
        try {
            const producto = await Producto.findById(id).lean();
            return producto
        } catch (error) {
            console.log('Error en getById: ', error)
        }
    }
    //borro un producto
    async deleteById(id){
        try {
            await Producto.findByIdAndDelete(id)
        } catch (error) {
            console.log('Error en deleteById: ', error)
        }
    }
    //actualizo un producto
    async updateById(id, producto){
        try{
            await Producto.findByIdAndUpdate(id, producto).lean();
        }
        catch(error){
            console.log('Error en updateById: ', error)
        }
    }
    //borro todos los productos
    async deleteAll(){
        try {
            await Producto.deleteMany()
        } catch (error) {
            console.log('Error en deleteAll: ', error)
        }
    }
}

module.exports = ContenedorMongodbProductos;
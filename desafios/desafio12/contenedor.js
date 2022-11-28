//contendor
class Contenedor {
    constructor() {
        this.file = []
    }

    getAll() {
        try {
            return this.file
        } catch (error) {
            console.log('Error en getAll: ', error)
        }
    }
    save(product) {
        try {
            //si es el primer dato ingreso id 1 sino sumo uno para generar el siguiente
            if (this.file.length === 0) {
                const newProduct = { ...product, id: 1 }
                this.file.push(newProduct)
                return newProduct
            } else {
                const lastId = this.file[this.file.length - 1].id
                const newProduct = { ...product, id: lastId + 1 }
                this.file.push(newProduct)
                return newProduct
            }
        } catch (error) {
            throw new Error('No fue posible guardar el dato')
        }
    }

    getById(id) {
        try {
            const products = this.getAll()
            console.log('products: ', products)
            const product = products.find((product) => product.id == id)
            //Para el caso de que un producto no exista, se devolverá el objeto: { error : 'producto no encontrado' }
            if (!product) {
                return { error: 'producto no encontrado' }
            } else {
                return product
            }
        } catch (error) {
            throw new Error('No fue encontrado un producto con ese id')
        }
    }

    update(id, item) {
        try {
            const products = this.getAll()
            const index = products.findIndex((product) => product.id == id)
            if (index === -1) {
                return { error: 'producto no encontrado' }
            } else {
                products[index] = { ...item, id: id }
                return item
            }
        } catch (error) {
            throw new Error('No fue encontrado un producto con ese id')
        }
    }

    delete(id) {
        try {
            const products = this.getAll()
            const product = products.find((product) => product.id === id)
            //Para el caso de que un producto no exista, se devolverá el objeto: { error : 'producto no encontrado' }
            if (!product) {
                return { error: 'producto no encontrado' }
            } else {
                //filtro el array de productos y me quedo con los que no tengan el id que quiero eliminar
                const newProducts = products.filter((product) => product.id !== id)
                this.file = newProducts
                return product
            }
        } catch (error) {
            throw new Error('No fue encontrado un producto con ese id')
        }
    }

}

//exporto
module.exports = Contenedor
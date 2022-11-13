const fs = require('fs')

class Contenedor {
    constructor(file) {
        this.file = file
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            console.log('Error en getAll: ', error)
        }
    }
    async save(product) {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8')
            const products = JSON.parse(data)
            //busco el ultimo id para generar un nuevo id sumandole 1
            const lastId = products[products.length - 1].id
            const newProduct = { ...product, id: lastId + 1 }
            products.push(newProduct)
            await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2))
            console.log('Se creo nuevo producto con id:' + newProduct.id)
        } catch (error) {
            //si no existe el archivo, creamos por primera vez la lista de productos
            const newProduct = { ...product, id: 1 }
            await fs.promises.writeFile(this.file, JSON.stringify([newProduct], null, 2))
            console.log('Se creo nuevo producto con id:' + newProduct.id)
        }
    }


    async getById(id) {
        try {
            const products = await this.getAll()
            const product = products.find((product) => product.id === id)
            if (!product) {
                console.log('null')
            } else {
                console.log('Producto con id', id, product)
            }
        } catch (error) {
            throw new Error('No fue encontrado un producto con ese id')
        }
    }


    async deleteById(id) {
        try {
            const products = await this.getAll()
            //verifico si existe ese id sino mando error
            const product = products.find((product) => product.id === id)
            if (!product) {
                throw new Error('No fue encontrado un producto con ese id')
            }
            //filtro el array de productos y me quedo con los que no tengan el id que quiero eliminar
            const newProducts = products.filter((product) => product.id !== id)
            await fs.promises.writeFile(this.file, JSON.stringify(newProducts, null, 2))
        } catch (error) {
            console.log('Error en deleteById: ', error)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, JSON.stringify([], null, 2))
        } catch (error) {
            console.log('Error en deleteAll: ', error)
        }
    }
}

const main = async () => {
    const contenedor = new Contenedor('productos.txt')
    await contenedor.save({
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    })
    await contenedor.save({
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    })
    await contenedor.save({
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
    })

    const id = 3
    await contenedor.getById(id)
    const products = await contenedor.getAll()
    console.log('array de objetos', products)
    await contenedor.deleteById(2)
    await contenedor.deleteAll()
}

main()



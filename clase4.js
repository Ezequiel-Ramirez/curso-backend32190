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
            const products = await this.getAll()
            const id = products.length + 1
            const newProduct = { ...product, id }
            products.push(newProduct)
            await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2))
            console.log('id generado', id)
        } catch (error) {
            console.log('Error en save: ', error)
        }
    }

    async getById(id) {
        try {
            const products = await this.getAll()
            const product = products.find((product) => product.id === id)
            return product
        } catch (error) {
            console.log('Error en getById: ', error)
        }
    }


    async deleteById(id) {
        try {
            const products = await this.getAll()
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
    //verificar si existe el archivo productos.txt sino crearlo
    try {
        await fs.promises.access('productos.txt')
    } catch (error) {
        await fs.promises.writeFile('productos.txt', JSON.stringify([], null, 2))
    }
    
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
    console.log('array de objetos', await contenedor.getAll())
    const id = 2
    const product = await contenedor.getById(id)
    console.log('Producto con id', id, product)
    await contenedor.deleteById(id)
    const products = await contenedor.getAll()
    console.log('Productos luego de eliminar uno', products)
    await contenedor.deleteAll()
    console.log('mostrar contenedor luego de eliminar', await contenedor.getAll())
}


main()



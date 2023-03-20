
class MensajesMostrables {
    mensaje

    constructor(mensaje) {
        this.mensaje = mensaje
    }

    comoTexto() {
        
        const lines = []
        lines.push(`id: ${this.mensaje?.id}`)
        lines.push(`author: ${this.mensaje?.author}`)
        lines.push(`text: ${this.mensaje?.text}`)
        lines.push(`date: ${this.mensaje?.date}`)
        return lines.join('\n')
    }
    
}

class ProductosMostrables {
    producto

    constructor(producto) {
        this.producto = producto
    }

    comoTexto() {
        
        const lines = []
        lines.push(`id: ${this.producto?.id}`)
        lines.push(`title: ${this.producto?.title}`)
        lines.push(`price: ${this.producto?.price}`)
        lines.push(`thumbnail: ${this.producto?.thumbnail}`)
        return lines.join('\n')
    }
    
}

module.exports =  MensajesMostrables
module.exports =  ProductosMostrables
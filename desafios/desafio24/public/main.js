
const socket = io()
const author = new normalizr.schema.Entity('author', {}, { idAttribute: 'id' });

const mensaje = new normalizr.schema.Entity("mensaje", { author: author });

const mensajes = new normalizr.schema.Entity("mensajes", { messages: [mensaje] });


socket.on('messages', data => {
    //denormalizo los datos
    let mensajesNtamaño = JSON.stringify(mensajes).length;
    const decompressionPorcentaje = (mensajesNtamaño - JSON.stringify(data).length) / mensajesNtamaño * 100;
    mensajesNtamaño = decompressionPorcentaje.toFixed(2);
    const mensajesDenormalizados = normalizr.denormalize(data.result, mensajes, data.entities)
    //fin denormalizacion
   const html2 = `Decompression: ${mensajesNtamaño} %`
    const html = mensajesDenormalizados.messages.map(msj => {
        return `<div class="rounded col-3 text-break" style="background: gray">
        <div class="row">
            <div class="col-5">
                <p>${msj.author.id}</p>
                <p>${msj.timestamp}</p>  
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col-12">
                        <h5>${msj.author.nombre} ${msj.author.apellido}</h5>
                    </div>
                    <div class="col-12">
                        <p>${msj.text}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    })
        .join("<br>")

    document.getElementById("messages").innerHTML = html
    document.getElementById("decompresion").innerHTML = html2
})

function addMessage() {
    const message = {
        id: document.getElementById("username").value,
        author: {
            id: document.getElementById("username").value,
            nombre: document.getElementById("nombres").value,
            apellido: document.getElementById("apellido").value,
            edad: document.getElementById("edad").value,
            alias: document.getElementById("alias").value,
            avatar: document.getElementById("avatar").value,
        },
        text: document.getElementById("text").value,
        timestamp: new Date().toLocaleString()
    }

    socket.emit('new-message', message)
    return false
}

socket.on('products', (data) => {
    const html = data.map(product => {
        return `<div class="col-4 mb-2" >${product.title}</div>
        <div class="col-4" >${product.price}</div>
        <div class="col-4" >${product.thumbnail}</div>`
    })
        .join("<br>")

    document.getElementById("products").innerHTML = html

})

function addProduct() {
    const product = {
        title: document.getElementById("nombre").value,
        price: document.getElementById("precio").value,
        thumbnail: document.getElementById("imagen").value
    }

    socket.emit('new-product', product)
    return false
}


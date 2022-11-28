const socket = io()

socket.on('messages', data => {
    const html = data.map(msj => {
        return `<div class="rounded col-3 text-break" style="background: gray">
        <strong style="color: white">${msj.author}:</strong>
        <em style="color: white">${msj.text}</em>
        <br>
        <em>${msj.date}</em>
        </div>`
    })
        .join("<br>")

    document.getElementById("messages").innerHTML = html
})

function addMessage() {
    const message = {
        author: document.getElementById("username").value,
        text: document.getElementById("text").value,
        date: new Date().toLocaleString()
    }

    socket.emit('new-message', message)
    return false
}

socket.on('products', (data) => {
    const html = data.map(product => {
        return `<tr><td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.thumbnail}</td></tr>`
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


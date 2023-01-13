const { normalize, schema, denormalize } = require('normalizr');
const { faker } = require('@faker-js/faker')
faker.locale = 'en'

//normalizr function
function normalizarMensajes(data) {
    const messages = {
        id: 'mensajesTest',
        messages: data
    }

    const author = new schema.Entity('author', {}, { idAttribute: 'id' });
    const mensaje = new schema.Entity('mensaje', { author: author });
    const mensajes = new schema.Entity('mensajes', { messages: [mensaje] });
    const mensajesNormalizados = normalize(messages, mensajes);

    return mensajesNormalizados;
}

//denormalizr function
function denormalizarMensajes(data) {
    const mensajes = new schema.Entity('mensajes', {}, { idAttribute: 'id' });
    const mensajesDenormalizados = denormalize(data, mensajes, data);
    return mensajesDenormalizados;
}

//productos con faker
function getProductsFaker(id) {
    return {
        id: id,
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    }
}

module.exports = { normalizarMensajes, denormalizarMensajes, getProductsFaker }
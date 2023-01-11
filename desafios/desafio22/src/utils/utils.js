import { faker } from '@faker-js/faker'
import { normalize, schema, denormalize } from 'normalizr';
import util from 'util';

faker.locale = 'en'

function getProduct(id) {
    return {
        id: id,
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    }
}

function normalizeMessages(data) {
    const valueToReturn = {
        dataNormalized: {},
        dataDenormalized: {},
        percentageCompression: 0,
        lengthNormalized: 0,
        lengthOriginal: 0
    }
    const messages = {
        id: 'mensajesTest',
        messages: data
    }
    const author = new schema.Entity('author', {}, { idAttribute: 'id' });
    const mensaje = new schema.Entity('mensaje', { author: author });
    const mensajes = new schema.Entity('mensajes', { messages: [mensaje] });
    const mensajesNormalizados = normalize(messages, mensajes);

    //console.log(util.inspect(mensajesNormalizados, false, null, true /* enable colors */))
    const tamanoMensajesNormalizados = JSON.stringify(mensajesNormalizados).length;
    valueToReturn.lengthNormalized = tamanoMensajesNormalizados;

    const tamanoMensajesOriginal = JSON.stringify(messages).length;
    valueToReturn.lengthOriginal = tamanoMensajesOriginal;

    valueToReturn.dataNormalized = mensajesNormalizados;
    valueToReturn.percentageCompression = (100 - (JSON.stringify(mensajesNormalizados).length * 100 / JSON.stringify(messages).length)).toFixed(2);

    const mensajesDesnormalizados = denormalize(mensajesNormalizados.result, mensajes, mensajesNormalizados.entities);
   console.log(util.inspect(mensajesDesnormalizados, false, null, true /* enable colors */))
    valueToReturn.dataDenormalized = mensajesDesnormalizados;

    return valueToReturn;
}

export { getProduct, normalizeMessages }

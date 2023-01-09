import { faker } from '@faker-js/faker'
import { normalize, schema, denormalize } from 'normalizr';

faker.locale = 'en'

function getProduct(id) {
    return {
        id: id,
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.abstract()
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
    const author = new schema.Entity('author', {}, { idAttribute: 'email' });
    const mensaje = new schema.Entity('mensaje', { author });
    const mensajesNormalizados = normalize(messages, mensaje);

    const tamanoMensajesNormalizados = JSON.stringify(mensajesNormalizados).length;
    valueToReturn.lengthNormalized = tamanoMensajesNormalizados;
    const tamanoMensajesOriginal = JSON.stringify(messages).length;
    valueToReturn.lengthOriginal = tamanoMensajesOriginal;

    valueToReturn.dataNormalized = mensajesNormalizados;
    valueToReturn.percentageCompression = (100 - (JSON.stringify(mensajesNormalizados).length * 100 / JSON.stringify(messages).length)).toFixed(2);

    const mensajesDesnormalizados = denormalize(mensajesNormalizados.result, mensaje, mensajesNormalizados.entities);
    valueToReturn.dataDenormalized = mensajesDesnormalizados;
    return valueToReturn;
}

export { getProduct, normalizeMessages }

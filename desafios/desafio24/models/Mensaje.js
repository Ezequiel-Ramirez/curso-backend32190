const { Schema, model } = require('mongoose');

const mensajeSchema = new Schema({
    id: { type: String, required: true },
    author: {
        id: { type: String, required: true },
        nombre: { type: String },
        apellido: { type: String, required: true },
        edad: { type: Number, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true },
    },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true },
});

const Mensaje = model('Mensaje', mensajeSchema);

module.exports = Mensaje;
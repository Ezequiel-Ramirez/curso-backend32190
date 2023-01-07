import { Schema, model } from 'mongoose';

const mensajeSchema = new Schema({
    author: {
        id: { type: String },
        email: { type: String, required: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        edad: { type: Number, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true },
    },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true },
});

const Mensaje = model('Mensaje', mensajeSchema);

export default Mensaje;
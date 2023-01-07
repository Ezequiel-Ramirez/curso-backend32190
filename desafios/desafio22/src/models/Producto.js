import { Schema, model } from 'mongoose';

const productoSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
});

const Producto = model('Producto', productoSchema);

export default Producto;
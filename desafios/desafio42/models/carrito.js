import mongoose from "mongoose";

const Schema = mongoose.Schema;

//schema donde se guardan los productos que se agregan al carrito al id de un usuario
const carritoSchema = new Schema({
    user: { type: String },
    products: [
        {
            title: { type: String },
            price: { type: Number },
            description: { type: String },
            code: { type: String },
            image: { type: String },
            stock: { type: Number },
            timestamp: { type: String },
            category: { type: String },
        },
    ],
});

export const carritos = mongoose.model("Carrito", carritoSchema);
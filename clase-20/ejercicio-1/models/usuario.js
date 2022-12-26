import mongoose from "mongoose";

const usuariosCollection = "usuarios";

const UsuariosSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: Number, required: true },
});

export const usuarios = mongoose.model(usuariosCollection, UsuariosSchema);
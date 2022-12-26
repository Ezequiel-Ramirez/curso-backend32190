import mongoose from "mongoose";
import * as models from "./models/usuario.js";

const URL = "mongodb+srv://ezequiel:ezequiel@backendcodercurso.y3plhcv.mongodb.net/ecommerce?retryWrites=true&w=majority"

try {
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    console.log("conectados correctamente")

    const usuario = await models.usuarios.find()
    console.log(usuario)

    const newUsuario = new models.usuarios({
        nombre: "Ezequiel",
        apellido: "Gonzalez",
        dni: 12345678
    })

    await newUsuario.save()
    console.log("usuario guardado")

} catch (error) {
    console.log("error al conectarse a la base de datos", error)
} finally {
    mongoose.disconnect()
}


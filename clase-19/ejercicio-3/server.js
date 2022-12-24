import mongoose from "mongoose";
import * as models from "./models/estudiante.js"

try {
    const URL = "mongodb://localhost:27017/colegio"

    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    console.log("conectados correctamente")
    //Actualizar el dni del estudiante Lucas Blanco a 20355875
    console.log("1) //////////////////////////////////")
    let rta = await models.estudiantes.updateOne({ nombre: "Lucas", apellido: "Blanco" },
        { $set: { dni: "20355875" } })
    console.log(rta)

    //Agregar un campo 'ingreso' a todos los documentos con el valor false
    console.log("2) //////////////////////////////////")
    rta = await models.estudiantes.updateMany({},
        { $set: { ingreso: false } })
    console.log(rta)

    //Modificar el valor de 'ingreso' a true para todos los estudiantes que pertenezcan al curso 1A
    console.log("3) //////////////////////////////////")
    rta = await models.estudiantes.updateMany({ curso: "1A" },
        { $set: { ingreso: true } })
    console.log(rta)

    //Listar los estudiantes que aprobaron (hayan sacado de 4 en adelante) sin los campos de _id y __v
    console.log("4) //////////////////////////////////")
    rta = await models.estudiantes.find({ nota: { $gte: 4 } }, { _id: 0, __v: 0 })
    console.log(rta)

    //Listar los estudiantes que posean el campo 'ingreso' en true sin los campos de _id y __v
    console.log("5) //////////////////////////////////")
    rta = await models.estudiantes.find({ ingreso: true }, { _id: 0, __v: 0 })
    console.log(rta)

    //Borrar de la colección de estudiantes los documentos cuyo campo 'ingreso' esté en true
    console.log("6) //////////////////////////////////")
    rta = await models.estudiantes.deleteMany({ ingreso: true })
    console.log(rta)

    //Listar el contenido de la colección estudiantes utilizando la consola, imprimiendo en cada caso los datos almacenados (sin el campo __v) junto a su fecha de creación obtenida del ObjectID en formato YYYY/MM/DD HH:mm:SS. 
    //Por ejemplo: 
    //{"_id":"604df61b5e39a84ba41313e4","nombre":"Fabio","apellido":"Pieres","edad":39,"dni":"4315388","curso":"1B","nota":9,"ingreso":false} -> Fecha creación:  14/3/2021 08:40:11
    console.log("7) //////////////////////////////////")
    let estud = await models.estudiantes.find({}, { __v: 0 })
    estud.forEach(estudiante => {
        console.log(
            JSON.stringify(estudiante),
            '-> fecha de creacion: ',
            new Date(estudiante._id.getTimestamp()).toLocaleString()
        )
    });

} catch (err) {
    console.log("se pudrio todo, ", err)
} finally {
    await mongoose.disconnect()
}
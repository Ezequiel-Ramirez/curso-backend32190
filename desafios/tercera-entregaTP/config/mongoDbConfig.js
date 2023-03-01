const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connect = async () => {
    
    try {
        const URL = process.env.MONGO_URL || "mongodb+srv://ezequiel:ezequiel@backendcodercurso.y3plhcv.mongodb.net/TP3?retryWrites=true&w=majority"
        mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("conectados correctamente")

    } catch (error) {
        console.log("error al conectarse a la base de datos", error)
    }
}

module.exports = { connect };
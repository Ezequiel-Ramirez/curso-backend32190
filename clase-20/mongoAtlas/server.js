import mongoose from "mongoose";

const URL = "mongodb+srv://ezequiel:ezequiel@backendcodercurso.y3plhcv.mongodb.net/?retryWrites=true&w=majority"

await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

console.log("conectados correctamente")

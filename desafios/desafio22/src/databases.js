import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        const db = await connect("mongodb+srv://ezequiel:ezequiel@backendcodercurso.y3plhcv.mongodb.net/desafio22?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB connected to', db.connection.name);
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;

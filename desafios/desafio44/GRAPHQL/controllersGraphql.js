import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import numCPUs from "os";
import ProductosRepository from "../persistence/Repositories/ProductosRepository.js";
const productosRepo = new ProductosRepository();

const schema = buildSchema(`
    type Query {
        hello: String
        producto(_id: String): Producto
        productos: [Producto]
        info: Info
    }
    type Mutation {
        agregarProducto(title: String, price: Int, description: String, code: String, image: String, stock: Int, timestamp: String): Producto
        actualizarProducto(id: Int, title: String, price: Int, description: String, code: String, image: String, stock: Int, timestamp: String): Producto
    }
    type Producto {
        _id: String
        title: String
        price: Int
        description: String
        code: String
        image: String
        stock: Int
        timestamp: String
    }
    type Info {
        directorioActual: String
        idProceso: Int
        vNode: String
        rutaEjecutable: String
        sistemaOperativo: String
        cantProcesadores: Int
        memoria: String
    }
`);

const root = {
    hello: () => {
        return 'Hello world!';
    },
    producto: async ({ _id }) => {
        const product = await productosRepo.getById(_id);
        return product;
    },
    productos: async () => {
        const products = await productosRepo.getAll();
        return products;
    },
    agregarProducto: async ({ title, price, description, code, image, stock, timestamp }) => {
        const newProductId = await productosRepo.save({ title, price, description, code, image, stock, timestamp });
        const product = await productosRepo.getById(newProductId);
        return product;
    },
    actualizarProducto: async ({ _id, title, price, description, code, image, stock, timestamp }) => {

        const wasUpdated = await productosRepo.updateById(_id, { title, price, description, code, image, stock, timestamp });
        const product = await productosRepo.getById(_id);
        return product;
    },
    info: () => {
        const data = {
            directorioActual: process.cwd(),
            idProceso: process.pid,
            vNode: process.version,
            rutaEjecutable: process.execPath,
            sistemaOperativo: process.platform,
            cantProcesadores: numCPUs.cpus().length,
            memoria: JSON.stringify(process.memoryUsage().rss, null, 2),
        };
        return data;
    }

};

const controllersGraphql = graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
});

export default controllersGraphql;
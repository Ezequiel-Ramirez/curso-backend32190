import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import ProductosRepository from "../persistence/Repositories/ProductosRepository.js";
const productosRepo = new ProductosRepository();

const schema = buildSchema(`
    type Query {
        hello: String
        producto(_id: String): Producto
        productos: [Producto]
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
    }
};

const graphqlProducts = graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
});

export default graphqlProducts;


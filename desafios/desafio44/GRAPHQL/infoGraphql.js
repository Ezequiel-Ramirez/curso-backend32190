import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import numCPUs from "os";

const schema = buildSchema(`
    type Query {
        hello: String
        info: Info
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

const graphqlInfo = graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
});

export default graphqlInfo;

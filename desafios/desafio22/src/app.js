import express from "express"
import indexRoutes from "./routes/index.routes.js"
import {engine} from "express-handlebars"
import path from "path"
import morgan from "morgan"


const app = express()

//settings
app.set('views', path.join(__dirname, 'views'))
app.engine(".hbs", engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: __dirname + "/views/partials"
}))
app.set('view engine', '.hbs')


//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));


//routes
app.use(indexRoutes)

export default app
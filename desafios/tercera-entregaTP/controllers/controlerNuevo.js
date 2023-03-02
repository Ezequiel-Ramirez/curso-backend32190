const ContenedorUsuarioMongoDB = require('../containers/containerUsuariosMongoDB')
const ContenedorProductosMongoDB = require('../containers/containerMensajesMongoDB')
const usuariosMongoDB = new ContenedorUsuarioMongoDB()
const productosMongoDB = new ContenedorProductosMongoDB()
const dotenv = require('dotenv')
const { fork } = require('child_process')
const path = require('path')
const os = require('os')
const logger = require('../logger')


// Rutas de registro //
const getRegistrar = async (req, res) => {
    if (req.session.nombre) {
        res.redirect('/datos')
    } else {
        res.render('register')
    }
}

// Rutas de login //
const getLogin = async (req, res) => {
    if (req.session.nombre) {
        res.redirect('/datos')
    } else {
        res.render('login')
    }
}

const postLogin = async (req, res, next) => {
    if (req.user == undefined) {
        return next()
    }
    req.session.nombre = req.user.nombre
    req.session.contador = 0
    next()
}

// Rutas de datos //
const getDatos = async (req, res) => {
    const nombre = req.session.nombre
    const usuarios = await usuariosMongoDB.getAll1()

    if (req.session.nombre) {
        let user = await usuarios.find(usuario => usuario.nombre == nombre)
        req.session.contador++
        res.render('datos', {
            user,
            contador: req.session.contador
        })
    } else {
        req.session.destroy()
        res.redirect('/login')
    }
}

// Ruta Datos del Process //
const getDatosProcess = async (req, res) => {
    const argumentos = process.argv.slice(2)
    const plataforma = process.platform
    const version = process.version
    const memoria = process.memoryUsage().rss
    const path = process.execPath
    const id = process.pid
    const carpeta = process.cwd()
    //numeros de procesadores presentes en el servidor
    const cpus = os.cpus().length

    if (req.session.nombre) {
        logger.info('Se accedió a la ruta /info')
        res.render('data-process', {
            argumentos,
            plataforma,
            version,
            memoria,
            path,
            id,
            carpeta,
            cpus
        })
    } else {
        req.session.destroy()
        res.redirect('/login')
        logger.info('Se intentó acceder a la ruta /info sin estar logueado')
    }
}

//Ruta de numeros random //
const getNumerosRandom = async (req, res) => {
    //recibo por params la cantidad de numeros random que quiero
    const cantidad = req.params.cant || 100000000;

    const calculo = fork(path.resolve(process.cwd(), './middleware/calculo.js'));
    calculo.on('message', result => {
        if (result == 'listo') {
            calculo.send(cantidad);
        } else {
            res.json(result);
        };
    });
};


// Ruta de logout //
const getLogout = async (req, res) => {
    req.logout(err => {
        res.redirect('/login')
    })
}

// Ruta raiz //
const getRaiz = async (req, res) => {
    res.redirect('/datos')
}

//Ruta carrito //
const getCarrito = async (req, res) => {
    const nombre = req.session.nombre
    const usuarios = await usuariosMongoDB.getAll1()

    if (req.session.nombre) {
        let user = await usuarios.find(usuario => usuario.nombre == nombre)
        
        const productos = await productosMongoDB.getAllProductosByIdUsuario(user.email)
        res.render('carrito', {
            user,
            productos
        })
    } else {
        req.session.destroy()
        res.redirect('/login')
    }
}

//Ruta de eliminar producto del carrito //
const deleteProductoCarrito = async (req, res) => {
    
    const nombre = req.session.nombre
    const usuarios = await usuariosMongoDB.getAll1()

    if (req.session.nombre) {

        let user = await usuarios.find(usuario => usuario.nombre == nombre)
        const productos = await productosMongoDB.getAllProductosByIdUsuario(user.email)
        const producto = await productos.find(producto => producto.codigo == req.params.id)
        await productosMongoDB.deleteProductoById(producto)
        res.redirect('/carrito')
    } else {
        req.session.destroy()
        res.redirect('/login')
    }
}



module.exports = {
    getRegistrar,
    getLogin,
    postLogin,
    getDatos,
    getLogout,
    getRaiz,
    getDatosProcess,
    getNumerosRandom,
    getCarrito,
    deleteProductoCarrito
};
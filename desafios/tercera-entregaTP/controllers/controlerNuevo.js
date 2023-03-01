const ContenedorUsuarioMongoDB = require('../containers/containerUsuariosMongoDB')
const usuariosMongoDB = new ContenedorUsuarioMongoDB()
const dotenv = require('dotenv')
const {fork} = require('child_process')
const path = require('path')
const os = require('os')
const logger = require('../logger')
/* 
Ruta y método de todas las peticiones recibidas por el servidor (info)
Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
Errores lanzados por las apis de mensajes y productos, únicamente (error)

Loggear todos los niveles a consola (info, warning y error)
Registrar sólo los logs de warning a un archivo llamada warn.log
Enviar sólo los logs de error a un archivo llamada error.log
 */

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
            datos: user.nombre,
            direccion: user.direccion,
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

module.exports = {
    getRegistrar,
    getLogin,
    postLogin,
    getDatos,
    getLogout,
    getRaiz,
    getDatosProcess,
    getNumerosRandom
};
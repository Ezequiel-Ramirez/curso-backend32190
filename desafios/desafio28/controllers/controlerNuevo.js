const ContenedorUsuarioMongoDB = require('../containers/containerUsuariosMongoDB')
const usuariosMongoDB = new ContenedorUsuarioMongoDB()
const dotenv = require('dotenv')
const {fork} = require('child_process')
const path = require('path')

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

    if (req.session.nombre) {
        res.render('data-process', {
            argumentos,
            plataforma,
            version,
            memoria,
            path,
            id,
            carpeta
        })
    } else {
        req.session.destroy()
        res.redirect('/login')
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
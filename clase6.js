const http = require('http')

const server = http.createServer((req, res) => {
    res.end('Hola Mund0')
})

const connectedServer = server.listen(8080, () => {
        console.log('Servidor escuchando en el puerto', connectedServer.address().port)
    }   
)
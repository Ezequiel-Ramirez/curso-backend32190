import autocannon from 'autocannon'
import stream from 'stream'

function run(url) {
    const buf = []
    const outputStream = new stream.PassThrough()
  
    const inst = autocannon({
      url,
      connections: 500,
      duration: 20
    })
  
    autocannon.track(inst, { outputStream })
  
    outputStream.on('data', data => buf.push(data))
    inst.on('done', () => {
      process.stdout.write(Buffer.concat(buf))
    })
}

console.log('Corriendo el benchmark...');

run('http://localhost:8080/random-nodebug')
run('http://localhost:8080/random-debug')

//instalo dependencias en la carpeta 3-ejercicio-3 
//npm install autocannon
//npm install stream
//npm i -g 0x
//npm i -g artillery

//ejecuto el benchmark cambiando los comandos en el archivo package.json
//"test": "node benchmark.js",
//"start": "0x server.js"
//"main": "benchmark.js",

//ejecuto el benchmark
//0x server.js
//npm run test


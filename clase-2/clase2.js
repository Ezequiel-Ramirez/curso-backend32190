class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.appellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.appellido}`
    }
    addMascota(name) {
        this.mascotas.push(name);
    }
    countMascotas() {
        return this.mascotas.length;
    }
    addBook(name, author) {
        this.libros = this.libros.concat(this.libros = {
            nombre: name,
            autor: author
        })
    }
    getBookNames(arr, palabra) {
        let arregloNuevo = [];
        for (let objeto of arr) {
            if (objeto.hasOwnProperty(palabra)) {
                arregloNuevo.push(objeto[palabra]);
            }
        }
        return arregloNuevo;
    }
}

let UsuarioNuevo = new Usuario("Ezequiel", "Ramirez", [], ['perro', 'gato'])
console.log(UsuarioNuevo);
console.log(UsuarioNuevo.getFullName());
UsuarioNuevo.addMascota('loro');
console.log(UsuarioNuevo.countMascotas());
UsuarioNuevo.addBook('El señor de las moscas', 'William Golding');
UsuarioNuevo.addBook('Fundación', 'Isaac Asimov');
console.log(UsuarioNuevo.getBookNames(UsuarioNuevo.libros, "nombre"))
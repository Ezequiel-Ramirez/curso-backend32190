import CarritoRepository from "../persistence/Repositories/CarritoRepository.js";
const carritoRepo = new CarritoRepository();

const admin = true;

// GET /carrito/:id
const get = async (req, res) => {
    const { id } = req.params;
    if (id) {
        //busco todos los carritos y hacer un find por user con el id del paramas
        const carritos = await carritoRepo.getAll();
        const carrito = carritos.find((carrito) => carrito.user === id);
        carrito
            ? res.status(200).json(carrito)
            : res.status(400).json({ error: "carrito no encontrado" });
    } else {
        res.status(400).json({ error: "debe ingresar un id" });
    }
};


// POST /carrito/:id
const post = async (req, res, next) => {
    if (admin) {
        //obtengo el id del paramas y lo agrego al user del model carritoRepo
        const { id } = req.params;
        const { body } = req;
        body.user = id;
        const newProductId = await carritoRepo.save(body);
        
        newProductId
            ? res
                .status(200)
                .json({ success: "Agregado ok ID: " + newProductId })
            : res
                .status(400)
                .json({ error: "Error al agregar un producto" });
    } else {
        res.json({
            error: -1,
            descripcion: "ruta /product no registrada",
        });
    } 
};



// DELETE /carrito/:id
const del = async (req, res, next) => {
    if (admin) {
        //buscar todos los carritos y hacer un find por user con el id del paramas y luego eliminarlo
        const { id } = req.params;
        const carritos = await carritoRepo.getAll();
        const carrito = carritos.find((carrito) => carrito.user === id);
        carrito
            ? await carritoRepo.deleteById(carrito._id)
            : res.status(400).json({ error: "carrito no encontrado" });
        res.status(200).json({ success: "carrito eliminado" });
    } else {
        res.json({
            error: -1,
            descripcion: "ruta /product no registrada",
        });
    }
    
    
};

export default { get, post, del };
import { Router } from "express";
import Producto from "../models/Producto";

const router = Router();


router.get("/", (req, res) => {
    res.render('index')
})

router.post("/api/productos/guardar", async (req, res) => {
    const { title, price, thumbnail } = req.body;
    const newProducto = new Producto({ title, price, thumbnail });
    await newProducto.save();


    res.send('guardar')
})

router.get("/api/productos", (req, res) => {
    res.render('productos')
})

export default router;
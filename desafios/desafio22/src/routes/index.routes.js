import { Router } from "express";

const router = Router();


router.get("/", (req, res) => {
    res.render('index')
})

router.get("/api/productos", (req, res) => {
    res.render('productos')
})

export default router;
import { Router } from "express";

import { renderIndex, createMessage, createProduct, createProductTest } from "../controllers/productMessageController";

const router = Router();

router.get("/", renderIndex);

router.post("/api/productos/guardar", createProduct);

router.post("/api/mensajes/guardar", createMessage);

router.get("/api/productos-test", createProductTest);

export default router;
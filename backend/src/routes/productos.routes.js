import {Router} from "express";
import {consultasProductos as productosControllers} from "../controlles/productos.controlles.js";

const router = Router();

router.get("/", productosControllers.getProductosXtotal);

router.post("/", productosControllers.postProducto);

export default router;
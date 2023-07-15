import {Router} from "express";
import {consultasProductos as productosControllers} from "../controlles/productos.controlles.js";
import proxyProductos from "../middleware/middlewareproductos.js"
const router = Router();

router.get("/", proxyProductos ,productosControllers.getProductosXtotal);

router.post("/", productosControllers.postProducto);

export default router;
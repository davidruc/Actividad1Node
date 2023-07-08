import { Router } from "express";
import {consultasInventarios as consultas} from "../controlles/inventarios.controlles.js";

const router = Router();

router.post("/", consultas.añadir_o_actualizar_inventario);


router.put("/:id", consultas.updateProduct)
export default router;
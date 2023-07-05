import {Router} from "express";
import {consultasBodegas as bodegaControllers} from "../controlles/bodegas.controlles.js";

const router = Router();

router.get("/", bodegaControllers.getBodegas);
router.post("/", bodegaControllers.postBodegas);


export default router;
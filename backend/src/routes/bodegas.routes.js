import {Router} from "express";
import getBodegas from "../controlles/bodegas.controlles.js";

const router = Router();

router.get("/", getBodegas);

export default router;
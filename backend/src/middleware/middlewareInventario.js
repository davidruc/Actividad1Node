import express from "express"; 
import "reflect-metadata";
import { plainToClass } from "class-transformer";
import {inventarios} from "../controller/inventarios.js";
import { validate } from "class-validator";

const proxyInventario = express();
proxyInventario.use("/:idInventario", async (req,res,next)=>{
    try {
        let data = plainToClass(inventarios, req.body, { excludeExtraneousValues: true});
        await validate(data);
        let data2 = plainToClass(inventarios, req.params, { excludeExtraneousValues: true});
        await validate(data2);
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyInventario;
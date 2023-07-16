import express from "express"; 
import "reflect-metadata";
import { plainToClass } from "class-transformer";
import {productos} from "../controller/productos.js";
import { validate } from "class-validator";

const proxyProductos = express();
proxyProductos.use(async (req,res,next)=>{
    try {
        let data = plainToClass(productos, req.body, { excludeExtraneousValues: true});
        await validate(data);
   
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyProductos;
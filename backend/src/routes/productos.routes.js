import {Router} from "express";
import proxyProductos from "../middleware/middlewareproductos.js"
import mysql from "mysql2";

let con = undefined;
const routerProduct = Router();

routerProduct.get("/", proxyProductos , (req,res)=>{
    con.query(`SELECT productos.id AS identificacion, productos.nombre AS nombre_producto, productos.descripcion, productos.estado AS Estado, productos.created_by AS creada_por, productos.update_by AS actualizada_por, productos.created_at AS creada_el, productos.updated_at AS actualizada_el, productos.deleted_at AS eliminada_el, (SELECT SUM(inventarios.cantidad) FROM inventarios WHERE inventarios.id_producto = productos.id) AS total FROM productos ORDER BY total DESC`, (err, data, fil)=>{
        if (err) {
            console.error('Error al obtener los datos de las citas:', err.message);
            res.sendStatus(500);
          } else {
            res.json(data);
          }
    })
});

/* router.post("/", productosControllers.postProducto); */

export default routerProduct;
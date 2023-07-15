import {Router} from "express";
import mysql from "mysql2";


let con = undefined;
const routerBodegas = Router();

routerBodegas.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});


routerBodegas.get("/", (req, res)=>{
    con.query('SELECT bodegas.id AS "identificacion", bodegas.nombre AS "nombre_bodega", bodegas.id_responsable AS "fk_responsable", users.nombre AS "nombre_del_responsable", bodegas.estado AS "Estado", bodegas.created_by AS "creada_por", bodegas.update_by AS "actualizada_por", bodegas.created_at AS "creada_el", bodegas.updated_at AS "actualizada_el", bodegas.deleted_at AS "eliminada_el" FROM bodegas INNER JOIN users ON bodegas.id_responsable = users.id ORDER BY bodegas.nombre',(err, data, fil)=>{
        if (err) {
            console.error('Error al obtener los datos:', err.message);
            res.sendStatus(500);
          } else {
            res.json(data);
          }
    })
});
/* router.post("/", bodegaControllers.postBodegas); */


export default routerBodegas;
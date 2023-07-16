import { Router } from "express";
import mysql from "mysql2";

let con = undefined;
const routerInventario = Router();

routerInventario.use((req,res,next)=>{
  let myConfig = JSON.parse(process.env.MY_CONNECT);
  con = mysql.createPool(myConfig)
  next();
});


routerInventario.post("/", (req, res)=>{
    con.query(`SELECT id, id_producto,id_bodega,cantidad FROM inventarios`, (err, data)=>{
        if (err) {
            console.error('Error al obtener los datos de inventarios:', err.message);
            res.sendStatus(500);
          } else {
            let {id_bodega, id_producto, cantidad} = req.body;
            const busqueda = data.find(val => (val.id_bodega == id_bodega && val.id_producto == id_producto));
            console.log(busqueda);
            if(busqueda !== undefined){
              const idInventario = busqueda.id;
                cantidad = busqueda.cantidad + cantidad; 
                const inventario = {cantidad}
                con.query("UPDATE inventarios SET ? WHERE id = ?", [inventario, idInventario], (err, data2)=>{
                  if(err){
                    console.error('Error al actualizar los datos del inventario:', err.message);
                  } else {
                    res.send(data2)
                  }
                })
            } else {
              con.query("INSERT INTO inventarios SET ?", req.body, (err, data3)=>{
                if(err){
                  console.error('Error al ingresar datos al inventario:', err.message);
                } else {
                  res.send(data3)
                }
              })
            }
          }
    })
});

export default routerInventario;
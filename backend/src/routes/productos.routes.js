import {Router} from "express";
import proxyProductos from "../middleware/middlewareproductos.js"
import mysql from "mysql2";

let con = undefined;
const routerProduct = Router();

routerProduct.use((req,res,next)=>{
  let myConfig = JSON.parse(process.env.MY_CONNECT);
  con = mysql.createPool(myConfig)
  next();
});


routerProduct.get("/", proxyProductos , (req,res)=>{
    con.query(`SELECT productos.id AS identificacion, 
          productos.nombre AS nombre_producto, 
          productos.descripcion, 
          productos.estado AS Estado, 
          productos.created_by AS creada_por, 
          productos.update_by AS actualizada_por, 
          productos.created_at AS creada_el, 
          productos.updated_at AS actualizada_el, 
          productos.deleted_at AS eliminada_el, 
          (SELECT SUM(inventarios.cantidad) 
          FROM inventarios 
          WHERE inventarios.id_producto = productos.id) AS total FROM productos 
          ORDER BY total DESC`, (err, data, fil)=>{
        if (err) {
            console.error('Error al obtener los datos de las citas:', err.message);
            res.sendStatus(500);
          } else {
            res.json(data);
          }
    })
});

routerProduct.post("/",(req, res)=>{
  con.query(`INSERT INTO productos SET ?`, req.body, (err, data) => {
    if (err) {
        console.error('Error al crear el producto:', err.message);
        res.sendStatus(500);
    } else {
      let id_producto = data.insertId;
      let cantidad = 1;
      let id_bodega = 11;
      let {created_by, created_at} = req.body
      let values = [id_bodega, id_producto, cantidad, created_by, created_at]
      console.log(req.body);
      con.query(`INSERT INTO inventarios(id_bodega,id_producto,cantidad,created_by,created_at) VALUES (?,?,?,?,?)`, values,(err, data2) =>{
        if (err) {
          console.error('Error al agregar el producto a la bodega 11:', err.message);
          res.sendStatus(500);
      } else {
        res.send(data2)
      }
      } )
    }
  })
  
});

export default routerProduct;
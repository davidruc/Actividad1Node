import express from "express";
import bodegaRoute from "./routes/bodegas.routes.js";
import productosRoute from "./routes/productos.routes.js";
import inventariosRoute from "./routes/inventarios.routes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

//Routes
app.use("/api/bodegas", bodegaRoute);
/* Para el post de bodegas hay que usar las siguientes entradas:
  "id": ,
  "nombre":,
  "id_responsable":,
  "estado":,
  "created_by":,
  "update_by":,
  "created_at":,
  "updated_at":,
  "deleted_at": */


app.use("/api/productos/total", productosRoute);
app.use("/api/insert/productos", productosRoute);
/* 
 Los parámetros para agregar productos y que se guarde de manera automática el inventario en una bodega default:
 "nombre":,
 "descripcion":,
 "estado":,
 "created_by":,
 "created_at":
 */



app.use("/api/inventarios", inventariosRoute);
/* 
  Los parámetros para agregar o actualizar un inventario es: 
  {
  "id_producto":,
  "id_bodega":,
  "cantidad":
}
*/
const config = JSON.parse(process.env.MY_CONFIG);
app.listen(config, ()=>console.log(`http://${config.hostname}:${config.port}`));

export default app;
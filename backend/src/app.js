import express from "express";
import bodegaRoute from "./routes/bodegas.routes.js";
import routerProduct from "./routes/productos.routes.js";
import routerInventario from "./routes/inventarios.routes.js";
/* import routerMovimientoInventario from "./routes/movimientoInventario.routes.js" */
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

//Routes
app.use("/api/bodegas", bodegaRoute);
/* Para el post de bodegas hay que usar las siguientes entradas:
  "nombre":"",
  "id_responsable":,
  "estado":,
  "created_by": */

app.use("/api/productos/total", routerProduct);
app.use("/api/insert/productos", routerProduct);
/* 
 Los parámetros para agregar productos y que se guarde de manera automática el inventario en una bodega default:
 "nombre":,
 "descripcion":,
 "estado":,
 "created_by":,
 */



app.use("/api/inventarios", routerInventario);
app.use("/api/moverInventarios", routerInventario);
/* 
  Los parámetros para agregar o actualizar un inventario es: 
  {
  "id_producto":,
  "id_bodega":,
  "cantidad":
  }
*/
/* app.use("/api/movimiento", routerMovimientoInventario); */




const config = JSON.parse(process.env.MY_CONFIG);
app.listen(config, ()=>console.log(`http://${config.hostname}:${config.port}`));

export default app;
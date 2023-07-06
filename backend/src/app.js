import express from "express";
import bodegaRoute from "./routes/bodegas.routes.js"
import productosRoute from "./routes/productos.controlles.js"

const app = express();
app.set("port", 5010);
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
export default app;
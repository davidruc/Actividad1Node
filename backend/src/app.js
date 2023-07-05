import express from "express";
import bodegaRoute from "./routes/bodegas.routes.js"

const app = express();
app.set("port", 5010);
app.use(express.json());

//Routes

app.use("/api/bodegas", bodegaRoute);

export default app;
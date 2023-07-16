import { Router } from "express";
import mysql from "mysql2";

let con = undefined;
const routerMovimientoInventario = Router();

routerMovimientoInventario.use((req,res,next)=>{
  let myConfig = JSON.parse(process.env.MY_CONNECT);
  con = mysql.createPool(myConfig)
  next();
});


routerMovimientoInventario.put("/:id?", (req, res)=>{
    con.query("SELECT * FROM inventarios WHERE id = ?", req.params.id, (err, data)=>{
      if (err) {
        console.error(`Error al obtener los datos de inventarios para el id ${req.params.id}:`, err.message);
        res.sendStatus(500);
      } else {
        let {id_bodega, id_producto, cantidad} = req.body;
        const busqueda = data.find(val =>(val.cantidad >= cantidad));
        if(busqueda !== undefined){
            //Inicialmente la bodega de donde vamos a tomar los productos es la que tiene el id que ingresamos.
            cantidad = busqueda.cantidad - cantidad;
            const inventario = {cantidad};
            con.query("UPDATE inventarios SET ? WHERE id = ?", [inventario, req.params.id], (err, data2) =>{
                if(err){
                    console.error(`Error al actualizar la cantidad del inventario para el id ${req.params.id}:`, err.message);
                    res.sendStatus(500);
                } else {
                    //La bodega que recibe los productos es la que coincide con los registros ingresados en el cuerpo. Recuerde que los datos id_bodega y id_producto son una llave compuesta única. //* Por esto, tomamos de esta búsque el id del producto y vamos a mirar si dicho producto existe en la bodega que ingresamos en el cuerpo
                    const id_producto = busqueda.id_producto;
                    con.query(`SELECT * FROM inventarios WHERE id_producto = ? AND id_bodega = ?`, [id_producto, id_bodega], (err, data3)=>{
                        if(err){
                            console.error(`Error al traer los datos de coincidencias:`, err.message);
                            res.sendStatus(500);
                        } else {
                            if(data3 != ""){
                                //Una vez traidos los datos de la nueva consulta vamos a tomar su id y hacer el update de esta bodega.
                                const idBodegaDestino = data3[0].id;
                                //* Nueva cantidad bodega receptora
                                cantidad = data3[0].cantidad + busqueda.cantidad - cantidad;
                                const NewAmount = {cantidad};
                                con.query("UPDATE inventarios SET ? WHERE id = ?", [NewAmount, idBodegaDestino], (err, data4)=>{
                                    if(err){
                                        console.error(`Error al actualizar la nueva cantidad de productos en la bodega ${idBodegaDestino}:`, err.message);
                                        res.sendStatus(500);
                                    } else {
                                        //Se hacen las consultas para enviar en el json tanto el dato que se le saco el producto y el dato donde se agregó la cantidad que se saco
                                        con.query("SELECT * FROM inventarios WHERE id = ?", req.params.id, (err, data5)=>{
                                            if(err){
                                                console.error(`Error al traer los datos de la bodega ${req.params.id}:`, err.message);
                                                res.sendStatus(500);
                                            } else {
                                                con.query("SELECT * FROM inventarios WHERE id = ?", idBodegaDestino, (err, data6)=>{
                                                    if(err){
                                                        console.error(`Error al traer los datos de la bodega ${idBodegaDestino}:`, err.message);
                                                        res.sendStatus(500);
                                                    } else{
                                                        //Se crean todas las veriables que necesita el historial para ingresar los datos
                                                        cantidad = req.body.cantidad;
                                                        const id_bodega_origen  = req.params.id;
                                                        const id_bodega_destino = idBodegaDestino;
                                                        const id_inventario = data6[0].id;
                                                        const created_by = data6[0].created_by;
                                                        const update_by = data6[0].update_by;
                                                        const datosHistorial = {cantidad, id_bodega_origen, id_bodega_destino, id_inventario, created_by, update_by}
                                                        con.query("INSERT INTO historiales SET ?", datosHistorial, (err, data9)=>{
                                                            if(err){
                                                                console.error(`Error al insertar en el historial la transacción:`, err.message);
                                                                res.sendStatus(500);
                                                            }else{
                                                                res.json([data5,data6,data9])
                                                            }
                                                            
                                                        })
                                                    }
                                                })
                                            }
                                        });
                                    }
                                })
                            } else {
                                //Si la bodega a la que se está intentando meter el producto no lo tiene, crea un nuevo registro y lo añade automáticamente
                                cantidad = data[0].cantidad - cantidad;
                                const newInventario = {id_producto, id_bodega, cantidad}
                                con.query("INSERT INTO inventarios SET ?", newInventario, (err, data7)=>{
                                    if(err){
                                        console.error(`Error al insertar los datos nuevos :c :`, err.message);
                                        res.sendStatus(500);
                                    } else {
                                        console.log("la bodega no tenía este artículo, por lo que se creará");
                                        //Se hace esto para agregar al historial
                                        cantidad = req.body.cantidad;
                                        const id_bodega_origen  = null;
                                        const id_bodega_destino = id_bodega;
                                        const id_inventario = req.params.id;
                                        const created_by = data[0].created_by;
                                        const update_by = data[0].update_by;
                                        const datosHistorial = {cantidad, id_bodega_origen, id_bodega_destino, id_inventario, created_by, update_by }
                                        con.query("INSERT INTO historiales SET ?", datosHistorial, (err, data8)=>{
                                            if(err){
                                                console.error(`Error al insertar en el historial la acción:`, err.message);
                                                res.sendStatus(500);
                                            }else{ 
                                                res.json([data7, data8])
                                            }
                                        })
                                        
                                    }
                                });
                            }
                        }
                    })

                }
            })            
        } else{res.json({message: "Estás intentando trasladar demasiados productos."})}
    }})
  })

export default routerMovimientoInventario;
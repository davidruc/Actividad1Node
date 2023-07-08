import getConnection from "../db/database.js";

const getProductosXtotal = async (req, res)=>{
    try{
        const connection = await getConnection();
        const consult = await connection.query('SELECT productos.id AS identificacion, productos.nombre AS nombre_producto, productos.descripcion, productos.estado AS Estado, productos.created_by AS creada_por, productos.update_by AS actualizada_por, productos.created_at AS creada_el, productos.updated_at AS actualizada_el, productos.deleted_at AS eliminada_el, (SELECT SUM(inventarios.cantidad) FROM inventarios WHERE inventarios.id_producto = productos.id) AS total FROM productos ORDER BY total DESC')
        res.json(consult);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const postProducto = async (req, res)=>{
    try{
        const {nombre,descripcion,estado,created_by, created_at} = req.body;
        
        const connection = await getConnection();
        const query = "INSERT INTO productos (nombre, descripcion, estado, created_by, created_at) VALUES ( ?, ?, ?, ?, ?)";
        const values = [nombre,descripcion,estado,created_by, created_at];
        const result = await connection.query(query, values);
        const id_producto = result.insertId;
        const cantidad = 1;
        const id_bodega = 11;
        const valuesInventario = [id_bodega,id_producto,cantidad,created_by,created_at];
        const query2 = "INSERT INTO inventarios (id_bodega,id_producto,cantidad,created_by,created_at) VALUES ( ?, ?, ?, ?, ?)";
        await connection.query(query2, valuesInventario);
        res.json({mensaje: 'se insertaron datos en productos y el producto se agregó en inventario en la bodega 11'});
    }catch (error){
        res.status(500);
        res.send(error.message);
    }
}




export const consultasProductos ={
    getProductosXtotal,
    postProducto
} 
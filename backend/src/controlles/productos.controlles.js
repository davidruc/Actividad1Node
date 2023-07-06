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
        const {id,nombre,descripcion,estado,created_by, created_at} = req.body;
        
        const connection = await getConnection();
        const values = {id,nombre,descripcion,estado,created_by, created_at};
        const query = "INSERT INTO productos SET ?";
        const result = await connection.query(query, values);
        res.json(result);
    }catch (error){
        res.status(500);
        res.send(error.message);
    }
}
export const consultasProductos ={
    getProductosXtotal,
    postProducto
} 
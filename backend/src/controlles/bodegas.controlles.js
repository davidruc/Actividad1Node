import getConnection from "../db/database.js";

const getBodegas = async (req, res)=>{
    try{
        const connection = await getConnection();
        const consult = await connection.query('SELECT bodegas.id AS "identificacion", bodegas.nombre AS "nombre_bodega", bodegas.id_responsable AS "fk_responsable", users.nombre AS "nombre_del_responsable", bodegas.estado AS "Estado", bodegas.created_by AS "creada_por", bodegas.update_by AS "actualizada_por", bodegas.created_at AS "creada_el", bodegas.updated_at AS "actualizada_el", bodegas.deleted_at AS "eliminada_el" FROM bodegas INNER JOIN users ON bodegas.id_responsable = users.id ORDER BY bodegas.nombre')
        res.json(consult);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const postBodegas = async (req, res)=>{
    try{
        const {id, nombre, id_responsable, estado, created_by, update_by, created_at, updated_at, deleted_at} = req.body;
        const bodega = {id, nombre, id_responsable, estado, created_by, update_by, created_at, updated_at, deleted_at};
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO bodegas SET ?", bodega);
        res.json(result);
    } catch (error){
        res.status(500);
        res.send(error.message);
    }
}

export const consultasBodegas ={
    getBodegas,
    postBodegas
} 
import getConnection from "../db/database.js";

const añadir_o_actualizar_inventario = async (req,res)=>{
    try{
        let {id_producto,id_bodega,cantidad} = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, id_producto,id_bodega,cantidad FROM inventarios");
        async function buscarCoincidencia() {
            const result2 = result.find(val => (val.id_bodega== id_bodega && val.id_producto == id_producto));  
            if(result2 !== undefined){
                const idInventario = result2.id;
                cantidad = result2.cantidad + cantidad; 
                const inventario = {cantidad}
                const result3 = await connection.query("UPDATE inventarios SET ? WHERE id = ?", [inventario, idInventario])
                res.json(result3)
            } else {
                const inventario = {id_producto,id_bodega,cantidad}
                const result3 = await connection.query("INSERT INTO inventarios SET ?", inventario);
                res.json(result3)
            }
        }
        buscarCoincidencia()
    } catch (error){
        res.status(500);
        res.send(error.message);
    }
}

//Se ingresa el id del inventario donde está el producto
const updateProduct = async(req, res)=>{
    try{
        const {id} = req.params;
        let {id_bodega, cantidad} = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM inventarios WHERE id = ?", id);
        async function traslados(){
            const busqueda = result.find(val =>(val.cantidad >= cantidad));
            if(busqueda !== undefined){
                //Esta parte del código lo que hace es restarle a la bodega de la que tomo el producto la cantidad que le estoy mandando a otra bodega. 
                cantidad = busqueda.cantidad - cantidad ;
                const inventario = {cantidad}
                const result2 = await connection.query("UPDATE inventarios SET ? WHERE id = ?", [inventario, id]);

                //Aquí voy a tomar el id_producto y voy a buscar en la base de datos si existe en el inventario el id_bodega que estoy ingresando relacionado con ese producto
                const id_producto = result[0].id_producto;
                const ExistenciaP_B = await connection.query("SELECT * FROM inventarios WHERE id_producto = ? AND id_bodega = ?", [id_producto, id_bodega ]); 
                if (ExistenciaP_B != "") {
                    //Una vez traidos los datos de la nueva consulta vamos a tomar su id y hacer el update de esta bodega.
                    const newid = ExistenciaP_B[0].id;
                    cantidad = ExistenciaP_B[0].cantidad + result[0].cantidad - cantidad; 
                    const inventario2 = {cantidad};
                    const pasoNewBodega = await connection.query("UPDATE inventarios SET ? WHERE id = ?", [inventario2, newid]);

                    //Se hacen las consultas para enviar en el json tanto el dato que se le saco el producto y el dato donde se agregó la cantidad que se saco
                    const result3 = await connection.query("SELECT * FROM inventarios WHERE id = ?", id);
                    const result4 = await connection.query("SELECT * FROM inventarios WHERE id = ?", newid);
                    res.json([result3,result4])
                } else {
                    //Si la bodega a la que se está intentando meter el producto no lo tiene, crea un nuevo registro y lo añade automáticamente
                    cantidad = result[0].cantidad - cantidad;
                    const newInventario = {id_producto, id_bodega, cantidad}
                    const crearNewRegistro = await connection.query("INSERT INTO inventarios SET ?", newInventario);
                    console.log("la bodega no tenía este artículo, por lo que se creará");
                    res.json(crearNewRegistro)
                }
            } else{
                res.json({message: "Estás intentando trasladar demasiados productos."})
            }
        }
        traslados();
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}


export const consultasInventarios ={
    añadir_o_actualizar_inventario,
    updateProduct
} 
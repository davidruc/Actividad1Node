1. EndPoint bodegas ordenadas alfabeticamente: *http://localhost:5010/api/bodegas*

2. EndPoint para insertar una bodega: *http://localhost:5010/api/bodegas*
* Se utiliza el mismo endPoint que el anterior, puede verificar desde Thunder client la funcionalidad del endPoint
* Es importante que envíe un formato JSON (poniendo los en los headers "Content-Type": "application/json") 
* Los datos con los que se debe enviar la data son: 
  "id": ,
  "nombre":,
  "id_responsable":,
  "estado":,
  "created_by":,
  "update_by":,
  "created_at":,
  "updated_at":,
  "deleted_at": 

3. EndPoint para traer los productos ordenados por su total: *http://localhost:5010/api/productos/total*

4. EndPoint para agregar productos y que se guarden en inventario con valores de cantidad y bodega por defecto: *http://localhost:5010/api/insert/productos*
* Los datos que se deben enviar a la base de datos son: 
  "nombre":,
  "descripcion":,
  "estado":,
  "created_by":,
  "created_at":

5. EndPoint para agegar registros en la tabla de inventarios, los parámetros de entrada deben ser: id_producto,id_bodega,cantidad en formato JSON, En este caso si la combinación producto-bodega no existe añade un nuevo registro al inventario. Pero si existe actualiza la cantidad. *http://localhost:5010/api/inventarios* Este endPoint es un POST 

6. Este endPoint permite trasladar un producto de una bodega a otra. Además agregá automaticamente al historial toda la información de la transacción. Los datos de entrada son únicamente el id_bodega que se le va a realizar el traslado y cantidad. El valor id que se envía en el endPoint es el registro de inventarios que se desea editar. *localhost:5010/api/inventarios/:id* Este endPoint es un PUT

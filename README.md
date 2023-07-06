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

*Para fines de protección de la base de datos hace falta realizar la query con alias*

3. EndPoint para traer los productos ordenados por su total: *http://localhost:5010/api/productos/total*

4. 
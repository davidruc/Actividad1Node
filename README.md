# Proyecto bodegas con NODE y EXPRESS

Este proyecto da solución a un sistema de bodegas. Por el momento se está trabajando de manera local y para fines académicos (calificativos) no se ha agregado el script de la base de datos ni la carpeta DTO al .gitignore. Se tiene el conocimiento de que estos archivos son ocultos y que deben ser ignorados en un futuro para evitar problemas en la seguridad del proyecto.  

## Tabla de contenido:

- [Tecnologias](#tecnologías)
- [Dependencias de npm](#dependencias-utilizadas)
- [Esquema sql](#esquema-sql)
- [Requerimientos del proyecto](#requerimientos)
- [Solución: Endpoints](#solución-endpoints)

## Tecnologías

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="50" height="50"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="50" height="50"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="60" height="60"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="60" height="60"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="50" height="50"/> 

## Dependencias utilizadas

Para el presente proyecto se van a utilizar las siguientes dependencias en sus respectivas versiones:

  ```json
      "class-transformer": "0.5.1",
      "dotenv": "16.3.1",
      "promise-mysql": "5.2.0",
      "express": "4.18.2",
      "nodemon": "3.0.1",
      "reflect-metadata": "0.1.13",
      "typescript": "5.1.6"
  ```

## Esquema SQL 

![esquemaSql](./diagrama.png)

## Requerimientos

1. Realizar un EndPolnt que permita listar todas las bodegas ordenadasalfabéticamente.

2. Realizar un EndPolnt que permita crear una bodegas.(agregar en los comentarios de la función los datos de entrada).

3. Realizar un EndPoint que permita listar todos los productos en orden descendente por el campo "Total".
*  El campo "Total" es la cantidad de unidades que la empresa tiene de este producto, considerando la unión de todas las bodegas, es decir que el dato como tal no existe en la base de datos,sino se debe calcular. Si la Bodega A tiene 1O unidades, la Bodega B tiene 5 unidades y la Bodega C tiene 3 unidades. Total= 18.

4. Realizar un EndPoint que permita insertar un productos y a su vez asigne una cantidad inicial del mismo en la tabla inventarios en una de las bodegas por default.

5. Realizar un EndPoint que permita insertar registros en la tabla de inventarios, los parámetros de entrada deben ser (id_producto,id_bodega,cantidad).

* La tabla no puede repetir la combinación de Bodega I Producto Por lo tanto será necesario validar si el ingreso que se está realizado ya existe o es una combinación totalmente nueva.
* Si es una combinación totalmente nueva, se debe hacer un lnsert, considerando los datos ingresados.
* Si es una combinación existente, entonces se debe hacer un Update a este registro, considerando la suma de la cantidad existente con la cantidad nueva.

6. Realizar un EndPolnt que permita Trasladar un producto de una bodega a otra:

* Se debe validar que la cantidad de unidades que se pretende sacar de una Bodega, sea posible, ya que si tengo 1O unidades en la Bodega A, no podré sacar de ella 20 unidades. Esta acción debe generar una alerta e impedir el registro.
* Para la afectación de las tablas se debe considerar que del Origen debo restar la cantidad,y al destino le debo sumar la cantidad. Por ejemplo: Bodega A = 1O unidades. Bodega B = 1O unidades. Haré el traslado de 5 unidades desde la Bodega A para la Bodega B, Por lo cual el resultado será hacer Updated a los dos registros en inventarios:
  * Bodega A = 5 unidades. Bodega B = 15 unidades. 
Además hacer un lnsert con toda la información en la tabla de historiales.

7. Por cada EndPolnt realizado generar un commit.

8. Generar un README.md explicando cómo funciona cada Router y como
consumirlo

## Solución: Endpoints

1. EndPoint bodegas ordenadas alfabeticamente: *http://127.3.32.23:5000/api/bodegas*
  * Este endPoint es un get, simplemente retorna todas las bodegas en un orden específico

2. EndPoint para insertar una bodega: *http://127.3.32.23:5000/api/bodegas*
  * Se utiliza el mismo endPoint que el anterior.
  * Es un POST: puede verificarse mediante Thunder client la funcionalidad del endPoint,
  * Es importante que envíe un formato JSON (poniendo los en los encabezados respectivos *"Content-Type": "application/json"*) 
* Los datos con los que se debe enviar la data son: 
  
  ```json
  {
    "id": ,
    "nombre": "",
    "id_responsable":,
    "estado":,
    "created_by":
  }
  ```
  Es importante notar que hay un DTO que se encarga de verificar que los datos ingresados sean los correctos antes de realizar las consultas a la base de datos.
  

3. EndPoint para traer los productos ordenados por su total: *http://127.3.32.23:5000/api/productos/total*
  * Este endPoint es simplemente un get que trae las bodegas ordenadas según una columna identada que habla del total.

4. EndPoint para agregar productos y que se guarden en inventario con valores de cantidad y bodega por defecto: *http://127.3.32.23:5000/api/insert/productos*
 * Es un POST: puede verificarse mediante Thunder client la funcionalidad del endPoint
 * Es importante que envíe un formato JSON (poniendo los en los encabezados respectivos *"Content-Type": "application/json"*) 
 * Los datos que se deben enviar a la base de datos son: 
  ```json
  {
    "nombre": "",
    "descripcion":"",
    "estado":,
    "created_by":
  }
  ```
 Es importante notar que hay un DTO que se encarga de verificar que los datos ingresados sean los correctos antes de realizar las consultas a la base de datos.

5. EndPoint para agegar registros en la tabla de inventarios. En este caso si la combinación producto-bodega no existe añade un nuevo registro al inventario. Pero si existe actualiza la cantidad. *http://127.3.32.23:5000/api/inventarios* 
 * Es un POST: puede verificarse mediante Thunder client la funcionalidad del endPoint
 * Es importante que envíe un formato JSON (poniendo los en los encabezados respectivos *"Content-Type": "application/json"*) 
 * Los datos que se deben enviar a la base de datos son: 
  ```json
  {
    "id_producto":,
    "id_bodega":,
    "cantidad":
  }
  ```
 Es importante notar que hay un DTO que se encarga de verificar que los datos ingresados sean los correctos antes de realizar las consultas a la base de datos.

6. Este endPoint permite trasladar un producto de una bodega a otra. Además agregá automaticamente al historial toda la información de la transacción. *http://127.3.32.23:5000/api/moverInventarios/:id* 
* Es un parámetro obligatirio y debe ser un número entero.
* Si la bodega a la que se le está trasladando el producto no lo tiene se crea un nuevo registro de manera automática, también agrega al historial esta acción.
* El valor del parámetro id que se envía en el endPoint es el registro de inventarios que se desea editar.
* Es un PUT: puede verificarse mediante Thunder client la funcionalidad del endPoint
 * Es importante que envíe un formato JSON (poniendo los en los encabezados respectivos *"Content-Type": "application/json"*) 
 * Los datos que se deben enviar a la base de datos son: 
  ```json
  {
    "id_producto":,
    "id_bodega":,
    "cantidad":
  }
  ```
 Es importante notar que hay un DTO que se encarga de verificar que los datos ingresados sean los correctos antes de realizar las consultas a la base de datos.
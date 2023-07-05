import app from "./app.js";

const main = () =>{

    //listen es para que escuche, y le decimos que se traiga lo que definimos en app
    app.listen(app.get("port"));
    console.log(`The port of the company is ${app.get("port")}`);
};

main();
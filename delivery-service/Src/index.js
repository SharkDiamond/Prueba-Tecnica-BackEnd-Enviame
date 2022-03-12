const Server=require('./Models/Server-Model');
require('dotenv').config();
//INSTANCIANDO UN OBJETO DE LA CLASE SERVIDOR
const server=new Server();
//CORRIENDO EL SERVIDOR EN EL PUERTO
server.Listen();

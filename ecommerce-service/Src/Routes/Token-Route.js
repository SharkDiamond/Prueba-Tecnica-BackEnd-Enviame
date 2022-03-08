//IMPORTACIONES
const getToken = require("../Controllers/Token-Controller");
const {Router}=require("express");

//CREANDO EL ROUTE
const route=Router();

//OBTENER UN TOKEN
route.get('/GetToken',[],getToken);

//EXPORTANDO EL ROUTE
module.exports=route;

//IMPORTACIONES
const {Router}=require('express');
const {check}=require('express-validator');
const { validationExpress } = require('../Midlewares/validationExpress');
const validarToken = require('../Midlewares/validationJWT');
//CREANDO EL ROUTE
const route=Router();

//CREAR UNA ENTREGA
route.post('/crearEntrega',[],()=>{});
//OBTENER UNA ENTREGA
route.get('/verEntrega/:id',[],()=>{});
//ACTUALIZAR UNA ENTREGA
route.put('/actualizarEntrega/:id',[],()=>{});
//ELIMINAR UNA ENTREGA
route.delete('/EliminarEntrega/:id',[],()=>{});

//EXPORTANDO LAS RUTAS
module.exports=route;
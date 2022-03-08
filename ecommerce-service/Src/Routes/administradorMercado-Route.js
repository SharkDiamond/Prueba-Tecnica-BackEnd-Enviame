//IMPORTACIONES
const {Router}=require('express');
const {check}=require('express-validator');
const { createVendedores, getVendedor } = require('../Controllers/Vendedores-Controller');
const existUsername = require('../Helpers/validation-Custom-Helper');
const { validationExpress } = require('../Midlewares/validationExpress');
const validarToken = require('../Midlewares/validationJWT');
const existVendedorForId = require('../Midlewares/validationUsers');
//CREANDO EL ROUTE
const route=Router();
//CREAR VENDEDOR
route.post('/crearVendedor',[validarToken,check('Nombre','El nombre no puede estar vacio').not().isEmpty(),
                             check('Descripcion','La descripcion del usuario debe tener minimo 12 letras y maximo 30 letras').isLength({min:12,max:30}),
                             check('Username','El nombre de usuario no puede venir vacio').not().isEmpty(),
                             check('Username','El nombre de usuario debe tener minimo 8 letras y maximo 15 letras').isLength({min:8,max:15}),
                             check('Username').custom(existUsername),validationExpress],createVendedores);
//OBTENER UN VENDEDOR
route.get('/verVendedor/:id',[validarToken,existVendedorForId],getVendedor);
//ACTUALIZAR INFORMACION DE VENDEDOR
route.put('/editarVendedor',[validarToken,existVendedorForId],()=>{});
//LISTAR VENDEDORES
route.get('/listVendedores',[validarToken],()=>{});
//ELIMINAR VENDEDOR
route.delete('/EliminarVendedor',[validarToken,check('id','El id del vendedor debe ser un valor numerico').isNumeric(),
                                  check('id').custom(()=>{ return true}),validationExpress],()=>{});
//ELIMINAR VENDEDOR DE MANERA FISICA
route.delete('/EliminarVendedor',[validarToken,check('id','El id del vendedor debe ser un valor numerico').isNumeric(),
                                  check('id').custom(()=>{ return true}),validationExpress],()=>{});


//EXPORTANDO LAS RUTAS              
module.exports=route;
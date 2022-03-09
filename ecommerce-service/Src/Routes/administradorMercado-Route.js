//IMPORTACIONES
const {Router}=require('express');
const {check}=require('express-validator');
const { createVendedores, getVendedor, listVendedores, deleteVendedor,deleteVendedorFisic, updateVendedor } = require('../Controllers/Administrador-Mercado-Controller');
const existUsername = require('../Helpers/validation-Custom-Helper');
const { validationExpress } = require('../Midlewares/validationExpress');
const validarToken = require('../Midlewares/validationJWT');
const {existVendedorForId,validarCamposPermitidos,validateUserType} = require('../Midlewares/validationUsers');
//CREANDO EL ROUTE
const route=Router();
//CREAR VENDEDOR
route.post('/crearVendedor',[validarToken,validateUserType('Administrador_Mercado'),validarCamposPermitidos('Nombre','Username','Descripcion'),check('Nombre','El nombre no puede estar vacio').not().isEmpty(),
                             check('Descripcion','La descripcion del usuario debe tener minimo 12 letras y maximo 50 letras').isLength({min:12,max:50}),
                             check('Username','El nombre de usuario no puede venir vacio').not().isEmpty(),
                             check('Username','El nombre de usuario debe tener minimo 8 letras y maximo 15 letras').isLength({min:8,max:15}),
                             check('Username').custom(existUsername),validationExpress],createVendedores);
//OBTENER UN VENDEDOR
route.get('/verVendedor/:id',[validarToken,existVendedorForId,validateUserType('Administrador_Mercado','Vendedor')],getVendedor);
//ACTUALIZAR INFORMACION DE VENDEDOR
route.put('/actualizarVendedor/:id',[validarToken,validarCamposPermitidos('Nombre','Username','Descripcion','userType'),validateUserType('Administrador_Mercado','Vendedor'),existVendedorForId],updateVendedor);
//LISTAR VENDEDORES
route.get('/listVendedores',[validarToken,validateUserType('Administrador_Mercado'),check('all',`El valor de "all" debe de ser booleano`).isBoolean(),validationExpress],listVendedores);
//ELIMINAR VENDEDOR
route.delete('/EliminarVendedor/:id',[validarToken,validateUserType('Administrador_Mercado'),existVendedorForId],deleteVendedor);
//ELIMINAR VENDEDOR DE MANERA FISICA
route.delete('/EliminarVendedorFisica/:id',[validarToken,validateUserType('Administrador_Mercado'),existVendedorForId],deleteVendedorFisic);


//EXPORTANDO LAS RUTAS              
module.exports=route;
//IMPORTACIONES
const {Router}=require('express');
const {check}=require('express-validator');
const { createVendedores, getVendedor, listVendedores, deleteVendedor,deleteVendedorFisic, updateVendedor } = require('../Controllers/Vendedores-Controller');
const existUsername = require('../Helpers/validation-Custom-Helper');
const { validationExpress } = require('../Midlewares/validationExpress');
const validarToken = require('../Midlewares/validationJWT');
const {existVendedorForId, validarCamposPermitidos} = require('../Midlewares/validationUsers');
//CREANDO EL ROUTE
const route=Router();
//CREAR VENDEDOR
route.post('/crearVendedor',[validarToken,validarCamposPermitidos,check('Nombre','El nombre no puede estar vacio').not().isEmpty(),
                             check('Descripcion','La descripcion del usuario debe tener minimo 12 letras y maximo 50 letras').isLength({min:12,max:50}),
                             check('Username','El nombre de usuario no puede venir vacio').not().isEmpty(),
                             check('Username','El nombre de usuario debe tener minimo 8 letras y maximo 15 letras').isLength({min:8,max:15}),
                             check('Username').custom(existUsername),validationExpress],createVendedores);
//OBTENER UN VENDEDOR
route.get('/verVendedor/:id',[validarToken,existVendedorForId],getVendedor);
//ACTUALIZAR INFORMACION DE VENDEDOR
route.put('/actualizarVendedor/:id',[validarToken,validarCamposPermitidos,existVendedorForId],updateVendedor);
//LISTAR VENDEDORES
route.get('/listVendedores',[validarToken,check('all',`El valor de "all" debe de ser booleano`).isBoolean(),validationExpress],listVendedores);
//ELIMINAR VENDEDOR
route.delete('/EliminarVendedor/:id',[validarToken,existVendedorForId],deleteVendedor);
//ELIMINAR VENDEDOR DE MANERA FISICA
route.delete('/EliminarVendedorFisica/:id',[validarToken,existVendedorForId],deleteVendedorFisic);


//EXPORTANDO LAS RUTAS              
module.exports=route;
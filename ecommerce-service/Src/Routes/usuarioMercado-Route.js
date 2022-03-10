//IMPORTACIONES
const {Router}=require('express');
const {check}=require('express-validator');
const { createUsuarioMercado, createCompra, cancelCompra } = require('../Controllers/UsuarioMercado-Controller');
const { ProductExist } = require('../Midlewares/Productos');
const { validationExpress } = require('../Midlewares/validationExpress');
const validarToken = require('../Midlewares/validationJWT');
const { validateUserType, validarCamposPermitidos } = require('../Midlewares/validationUsers');

//CREANDO EL ROUTE
const route=Router();

//CREAR UN USUARIO MERCADO
route.post('/crearUsuarioMercado',[validarToken,
                                   validarCamposPermitidos('Correo','Direccion_De_Envio','userType'),
                                   validateUserType('UsuarioInternet'),
                                   ProductExist,
                                   check('Correo','El correo enviado no es valido!').isEmail(),
                                   check('Direccion_De_Envio','La direccion fisica del usuario es necesaria').not().isEmpty(),
                                   validationExpress],createUsuarioMercado);
           
//COMPRAR UN PRODUCTO
route.post('/ComprarProductos/:id',[validarToken,validateUserType('UsuarioInternet')],createCompra);
//ELIMINAR UN PRODUCTO POR EL ID DE COMPRA
route.put('/CancelarCompra/:id',[validarToken,validateUserType('UsuarioInternet')],cancelCompra);
//EXPORTANDO LAS RUTAS
module.exports=route;
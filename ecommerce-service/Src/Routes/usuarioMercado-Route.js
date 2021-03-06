//IMPORTACIONES
const {Router}=require('express');
const {check}=require('express-validator');
const { createUsuarioMercado, createCompra, cancelCompra, verEstadoPedido } = require('../Controllers/UsuarioMercado-Controller');
const { validateCompraForIdBody, validateCompraForIdBodyEstadoPedido } = require('../Midlewares/PedidosCompra');
const { productExistForIdForBody } = require('../Midlewares/Productos');
const { validateExistUsuarioMercardo, validateExistUsuarioMercardoForId,validateExistUsuarioMercardoForIdBody } = require('../Midlewares/Usuarios-Mercado');
const { validationExpress } = require('../Midlewares/validationExpress');
const validarToken = require('../Midlewares/validationJWT');
const { validateUserType, validarCamposPermitidos } = require('../Midlewares/validationUsers');

//CREANDO EL ROUTE
const route=Router();
//CREAR UN USUARIO MERCADO
route.post('/Registrarse',[validarToken,
                           validarCamposPermitidos('Correo','Direccion_De_Envio','userType','Nombre'),
                           validateUserType('UsuarioInternet'),
                           validateExistUsuarioMercardo,
                           check('Correo','El correo enviado no es valido!').isEmail(),
                           check('Direccion_De_Envio','La direccion fisica del usuario es necesaria').not().isEmpty(),
                           check('Nombre','El nombre del usuario es necesario').not().isEmpty(),
                           validationExpress],createUsuarioMercado);
           
//COMPRAR UN PRODUCTO
route.post('/ComprarProductos',[validarToken,validateUserType('UsuarioInternet'),
                                 validarCamposPermitidos('ProductId','UsuarioMercadoId','Cantidad','userType')
                                ,validateExistUsuarioMercardoForIdBody,
                                 productExistForIdForBody,check('Cantidad','La cantidad debe de ser un valor numerico!').isNumeric(),validationExpress],createCompra);
//ELIMINAR UN PRODUCTO POR EL ID DE COMPRA
route.put('/CancelarCompra',[validarToken,validarCamposPermitidos('UsuarioMercadoId','PedidoId','userType'),
                            validateUserType('UsuarioInternet'),
                            validateExistUsuarioMercardoForIdBody,validateCompraForIdBody],cancelCompra);
//ESTADO ACTUAL PEDIDO
route.get('/EstadoPedido',[validarToken,validateUserType('UsuarioInternet'),
                           validarCamposPermitidos('UsuarioMercadoId','PedidoId','userType'),
                           validateExistUsuarioMercardoForIdBody,
                           validateCompraForIdBodyEstadoPedido],verEstadoPedido);

//EXPORTANDO LAS RUTAS
module.exports=route;
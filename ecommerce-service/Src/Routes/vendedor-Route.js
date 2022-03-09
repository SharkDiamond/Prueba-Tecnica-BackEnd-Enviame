//IMPORTACIONES
const {Router}=require('express');
const {check}=require('express-validator');
const { createProducto, getProducto, listProductos,deleteProducto, updateProducto} = require('../Controllers/Vendedor-Controller');
const { validationExpress } = require('../Midlewares/validationExpress');
const validarToken = require('../Midlewares/validationJWT');
const { existVendedorForId, validateUserType, validarCamposPermitidos } = require('../Midlewares/validationUsers');

//CREANDO EL ROUTE
const route=Router();
//CREAR UN PRODUCTO
route.post('/crearProducto',[validarToken,validarCamposPermitidos('Nombre','Descripcion','Cantidad','userType'),validateUserType('Vendedor'),
                             check('Nombre','El nombre del producto no puede estar vacio').not().isEmpty(),
                             check('Descripcion','La descripcion del producto debe tener minimo 12 letras y maximo 60 letras').isLength({min:12,max:60}),
                             check('Cantidad','La cantidad debe de ser un valor numerico').isNumeric(),
                             check('id').custom(existVendedorForId),validationExpress],createProducto);

/*
//OBTENER UN PRODUCTO POR ID
route.get('/ObtenerProducto/:id',[validarToken,existVendedorForId],getVendedor);
//ACTUALIZAR INFORMACION DE UN PRODUCTO
route.put('/actualizarProducto/:id',[validarToken,validarCamposPermitidos,existVendedorForId],updateVendedor);
//LISTAR LOS PRODUCTOS
route.get('/listProducto',[validarToken,check('all',`El valor de "all" debe de ser booleano`).isBoolean(),validationExpress],listVendedores);
//ELIMINAR UN PRODUCTO
route.delete('/EliminarVendedor/:id',[validarToken,existVendedorForId],deleteVendedor);
//ELIMINAR UN PRODUCTO DE MANERA FISICA
route.delete('/EliminarProductoFisica/:id',[validarToken,existVendedorForId],deleteVendedorFisic);
*/
//EXPORTANDO LAS RUTAS           
module.exports=route;
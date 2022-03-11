//IMPORTACIONES
const {Router}=require('express');
const {check}=require('express-validator');
const { createProducto, getProducto, listProductos,deleteProducto, updateProducto, OrdenesCompras, cambiarOrden} = require('../Controllers/Vendedor-Controller');
const { validateCompraForIdBodyVendedor } = require('../Midlewares/PedidosCompra');
const { ProductExist, productExistForId } = require('../Midlewares/Productos');
const { validationExpress } = require('../Midlewares/validationExpress');
const validarToken = require('../Midlewares/validationJWT');
const { existVendedorForId, validateUserType, validarCamposPermitidos } = require('../Midlewares/validationUsers');

//CREANDO EL ROUTE
const route=Router();

//CREAR UN PRODUCTO
route.post('/crearProducto/:id',[validarToken,validarCamposPermitidos('Nombre','Descripcion','Cantidad','userType'),
                                 validateUserType('Vendedor'),existVendedorForId,ProductExist,
                                 check('Descripcion','La descripcion del producto debe tener minimo 12 letras y maximo 60 letras').isLength({min:12,max:60}),
                                 check('Cantidad','La cantidad debe de ser un valor numerico').isNumeric(),validationExpress],createProducto);
//OBTENER UN PRODUCTO POR SU ID
route.get('/ObtenerProducto/:id',[validarToken,validateUserType('Vendedor'),productExistForId],getProducto);
//LISTAR LOS PRODUCTOS DE UN VENDEDOR POR EL ID DE VENDEDOR
route.get('/listProducto/:id',[validarToken,validateUserType('Vendedor'),existVendedorForId],listProductos);
//ELIMINAR UN PRODUCTO POR SU ID
route.delete('/EliminarProducto/:id',[validarToken,validateUserType('Vendedor'),productExistForId],deleteProducto);
//ACTUALIZAR INFORMACION DE UN PRODUCTO
route.put('/actualizarProducto/:id',[validarToken,validarCamposPermitidos('Nombre','Cantidad','Descripcion','userType'),productExistForId],updateProducto);
//OBTENER ORDENES DE COMPRA
route.get('/OrdenesCompras/:id',[validarToken,validarCamposPermitidos('userType'),validateUserType('Vendedor'),existVendedorForId],OrdenesCompras);
//ACTUALIZAR ESTADO PEDIDO
route.put('/CambiarEstadoOrden/:id',[validarToken,validarCamposPermitidos('userType','Estado','PedidoId'),
                                validateUserType('Vendedor'),existVendedorForId,validateCompraForIdBodyVendedor],cambiarOrden);


//EXPORTANDO LAS RUTAS
module.exports=route;
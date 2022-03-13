//IMPORTACIONES
const {Router}=require('express');
const {check}=require('express-validator');
const { crearEntrega, verSeguimientoEntrega, verEntrega, actualizarEntrega, eliminarEntrega, cambiarEstado } = require('../Controllers/entrega-Controller');
const { validateExistforeing_order_id,validarCamposPermitidos, validateExistEntregaConforeing_order_id, validateEntregaForId, validateCambioEstado } = require('../Midlewares/valiadteEntrega');
const { validationExpress } = require('../Midlewares/validationExpress');
const validarToken = require('../Midlewares/validationJWT');
//CREANDO EL ROUTE
const route=Router();

//CREAR UNA ENTREGA
route.post('/crearEntrega',[validarToken,validarCamposPermitidos("foreing_order_id","sku_Producto","nombre_Producto","cantidad_Producto","direccion_origen","direccion_destino","nombre_Cliente","estado"),
                            validateExistforeing_order_id,check("sku_Producto","El sku_Producto debe de ser un valor numerico").isNumeric(),
                            check("nombre_Producto","El nombre del producto debe de ser un string").isString(),check('cantidad_Producto','La cantidad debe de ser un valor numerico').isNumeric(),
                            check("direccion_origen","El nombre del producto debe de ser un string").isString(),check("direccion_destino","El nombre del producto debe de ser un string").isString(),
                            check("nombre_Cliente","El nombre del producto debe de ser un string").isString(),
                            check("estado","El estado inicial de la entrega debe ser LISTO_PARA_RECOLECCIÓN").isIn(['LISTO_PARA_RECOLECCIÓN']),validationExpress],crearEntrega);
//OBTENER UNA ENTREGA
route.get('/verEntrega/:tracking_number',[validarToken,validateEntregaForId],verEntrega);
//OBTENER UNA ENTREGA
route.get('/seguimientoEntrega',[validarToken,validarCamposPermitidos("foreing_order_id","tracking_number"),
                                 validateExistEntregaConforeing_order_id],verSeguimientoEntrega);
//ACTUALIZAR UNA ENTREGA
route.put('/actualizarEntrega/:tracking_number',[validarToken,validarCamposPermitidos("nombre_Producto","sku_Producto","direccion_origen","direccion_destino"),validateEntregaForId],actualizarEntrega);
//ELIMINAR UNA ENTREGA
route.delete('/EliminarEntrega/:tracking_number',[validarToken,validateEntregaForId],eliminarEntrega);
//CAMBIAR ESTADO ENTREGA
route.put('/CambiarEstadoEntrega/:tracking_number',[validarToken,validarCamposPermitidos("estado"),validateEntregaForId,validateCambioEstado],cambiarEstado);


//EXPORTANDO LAS RUTAS
module.exports=route;
//IMPORTACIONES
const {Router}=require('express');
const {check}=require('express-validator');
const { validationExpress } = require('../Midlewares/validationExpress');
const validarToken = require('../Midlewares/validationJWT');
//CREANDO EL ROUTE
const route=Router();
//CREAR VENDEDOR
route.post('/crearVendedor',[validarToken,check('nombre','E usuario no puede estar vacio').not().isEmpty(),
                             check('description','La descripcion del usuario debe tener minimo 12 letras y maximo 30 letras').length({min:12,max:30}),
                             check('username','El nombre de usuario no puede venir vacio').not().isEmpty(),
                             check('username','El nombre de usuario debe tener minimo 8 letras y maximo 15 letras').isLength({min:8,max:15}),
                             check('username').custom(()=>{ return true},validationExpress)],(req,res)=>{});
//OBTENER VENDEDOR
route.get('/verVendedor',[validarToken,check('id','El id del vendedor debe ser un valor numerico').isNumeric(),
                          check('id').custom(()=>{ return true}),validationExpress],()=>{});
//ACTUALIZAR INFORMACION DE VENDEDOR
route.put('/editarVendedor',[validarToken],()=>{});
//LISTAR VENDEDORES
route.get('/listVendedores',[validarToken],()=>{});
//ELIMINAR VENDEDOR
route.delete('/EliminarVendedor',[validarToken,check('id','El id del vendedor debe ser un valor numerico').isNumeric(),
                                  check('id').custom(()=>{ return true}),validationExpress],()=>{});

module.exports=route;
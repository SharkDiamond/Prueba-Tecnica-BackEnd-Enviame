//IMPORTACIONES
const { usuarioMercado } = require("../Models");

//FUNCION PARA CREAR EL USUARIO DE MERCADO
const createUsuarioMercado=async(req,res)=>{

    try {
        
        const {userType,...data}=req.body;
       //INSTANCIANDO EL NUEVO VENDEDOR CON LOS DATOS ENVIANDO POR EL BODY
       const newUsuarioMercado= new usuarioMercado(data);
       //GUARDANDO EL NUEVO VENDEDOR
       await newUsuarioMercado.save();
       //RESPONDIENDO QUE EL PRODUCTO FUE CREADO EXITOSAMENTE
       res.status(201).json({msg:'Usuario Creado Exitosamente',newUsuarioMercado}).end();

    } catch (error) {
        //RESPONDIENDO EN DADO CASO OCURRA UN PROBLEMA
        res.status(500).json({Problems:error}).end();

    }


}
//FUNCION PARA CREAR UNA COMPRA
const createCompra=async(req,res)=>{

    // await usuarioMercado
 
 
 }
//FUNCION PARA CANCELAR UNA COMPRA
const cancelCompra=async(req,res)=>{

    // await usuarioMercado
 
 
 }

//EXPORTACIONES
module.exports={

    createUsuarioMercado,
    createCompra,
    cancelCompra

}
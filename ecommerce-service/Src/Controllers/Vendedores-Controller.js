const Vendedor = require("../Models/vendedor-Model");

//PARA CREAR VENDEDORES
const createVendedores=async(req,res)=>{
    //DESESTRUCTURANDO EL REQUEST DEL BODY
    const {body}=req;

    try {
       //INSTANCIANDO EL NUEVO VENDEDOR CON LOS DATOS ENVIANDO POR EL BODY
       const newVendedor= new Vendedor(body);
       //GUARDANDO EL NUEVO VENDEDOR
       await newVendedor.save();
       //INDICANDO QUE SE CREO EL VENDEDOR DE MANERA EXITOSA
       res.status(201).json({msg:"Usuario Vendedor Creado!",body}).end();

    } catch (error) {

        //EN DADO CASO OCURRA UN ERROR RESPONDIENDOLO
        res.status(500).json({'Problems':error.message}).end();

    }

}
//PARA OBTENER VENDEDOR
const getVendedor=async(req,res)=>{

    try {
        //RESPONDIENDO CON EL VENDEDOR
        res.json({"Vendedor":req.vendedor}).end();

    } catch (error) {

        //EN DADO CASO OCURRA UN ERROR RESPONDIENDOLO
        res.status(500).json({'Problems':error.message}).end();

    }

}
//PARA LOS VENDEDORES
const listVendedores=async(req,res)=>{

    try {
        


    } catch (error) {
        


        
    }

}
//PARA ACTUALIZAR UN VENDEDOR
const updateVendedor=async(req,res)=>{

    try {
        


    } catch (error) {
        


        
    }





}
//PARA ELIMINAR VENDEDORES
const deleteVendedor=async(req,res)=>{

    try {
        


    } catch (error) {
        


        
    }





}
//EXPORTANDO LAS FUNCIONES
module.exports={createVendedores,getVendedor,listVendedores,updateVendedor,deleteVendedor};
//IMPORTACIONES
const { Producto } = require("../Models");

//PARA VERIFICAR SI UN PRODUCTO EXISTE
const ProductExist=async(req,res,next)=>{

    try {
        
        //DESESTRUCTURANDO EL NOMBRE DEL BODY
        const {Nombre}=req.body;
        //BUSCANDO EL PRODUCTO
        const ProductoEncontrado=await Producto.findOne({

            where:{
                Nombre,
                Estado:true
            }
    
    
        });

        //EN DADO CASO QUE EXISTA UN PRODUCTO CON ESE NOMBRE
        if (ProductoEncontrado) return res.status(400).json({Problems:`Ya existe un producto con el nombre ${Nombre}`}).end();

        next();

    } catch (error) {
        //RESPONDIENDO EN DADO CASO OCURRA UN ERROR
        res.status(500).json(error).end();


    }

}
//FUNCION PARA VERIFICAR SI EXISTE UN USUARIO POR ID
const productExistForId=async(req,res,next)=>{

    try {
        
    //DESESTRUCTURANDO EL ID DEL PARAMS
    let {id}=req.params;
    //VALIDANDO QUE EFECTIVAMENTE EL PARAMETRO SEA UN VALOR NUMERICO
    if (Number.isNaN(parseInt(id,10))) return res.status(400).json(`El valor ${id} no es un valor numerico!`).end();
    //EN DADO CASO EL NUMERO ESTE PRIMERO Y LUEGO TENGA CARACTERES DE LETRA PARA SOLO DEJAR EL NUMERO 
    id=id.replace(/[abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ/.#()-*+.<>!@#$%^&*_=:éáíóúü]/g,"");
    //BUSCANDO EL VENDEDOR CON ESE ID
    const findProducto=await Producto.findByPk(id);
    //EN DADO CASO NO SE ENCUENTRE EL USUARIO
    if (!findProducto || !findProducto.dataValues.Estado) return res.status(404).json(`No existe un usuario con el id=${id}`).end();
    //AGREGANDO EL ELEMENTO VENDEDOR AL OBJETO REQUEST
    req.producto=findProducto.dataValues;
    //SIGUIENDO YA QUE TODO SALIO BIEN
    next();
    } catch (error) {
        //RESPONDIENDO EN DADO CASO OCURRA UN ERROR
        res.status(500).json(error).end();
    }



}

//EXPORTACIONES
module.exports={

    ProductExist,
    productExistForId

}

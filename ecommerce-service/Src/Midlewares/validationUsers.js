const Vendedor = require("../Models/vendedor-Model")

//FUNCION PARA VERIFICAR SI EXISTE UN USUARIO POR ID
const existVendedorForId=async(req,res,next)=>{

    //DESESTRUCTURANDO EL ID DEL PARAMS
    let {id}=req.params;
    //VALIDANDO QUE EFECTIVAMENTE EL PARAMETRO SEA UN VALOR NUMERICO
    if (Number.isNaN(parseInt(id,10))) return res.status(400).json(`El valor ${id} no es un valor numerico!`).end();
    //EN DADO CASO EL NUMERO ESTE PRIMERO Y LUEGO TENGA CARACTERES DE LETRA PARA SOLO DEJAR EL NUMERO 
    id=id.replace(/[abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ/.#()-*+.<>!@#$%^&*_=:éáíóúü]/g,"");
    //BUSCANDO EL VENDEDOR CON ESE ID
    const findVendedor=await Vendedor.findByPk(id);
    //EN DADO CASO NO SE ENCUENTRE EL USUARIO
    if (!findVendedor || !findVendedor.dataValues.Estado) return res.status(404).json(`No existe un usuario con el id=${id}`).end();
    //AGREGANDO EL ELEMENTO VENDEDOR AL OBJETO REQUEST
    req.vendedor=findVendedor.dataValues;
    //SIGUIENDO YA QUE TODO SALIO BIEN
    next();

}

module.exports=existVendedorForId;
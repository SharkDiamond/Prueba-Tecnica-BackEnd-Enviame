//IMPORTACIONES
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
//FUNCION PARA VALIDAR QUE LOS CAMPOS QUE SE ESTEN ENVIANDO SON LOS PERMITIDOS
const validarCamposPermitidos=(...CamposPermitidos)=>{

    return (req,res,next)=>{
         
          //SACANDO UN ARREGLO DE LAS LLAVES DEL OBJETO BODY
          const camposActualizar=  Object.keys(req.body);
          //ARREGLO PARA ALMACENAR LOS CAMPOS QUE NO SON PERMITIDOS
          let camposNoPermitodos=[];
          //RECORRIENDO LOS ELEMENTOS DE LOS CAMPOS A ACTUALIZAR
          camposActualizar.forEach(element=>{
          //EN DADO CASO UNO DE LOS ELEMENTO NO CONCUERDE CON LOS CAMPOS PERMITIDOS
         if (!CamposPermitidos.includes(element)) camposNoPermitodos.push(element);

         });
         //SI HAY CAMPOS QUE NO ESTAN PERMITIDOS
        if (camposNoPermitodos.length>0) return res.status(400).json({Problems:`Los campos ${camposNoPermitodos} no estan permitidos, los campos permitidos son ${CamposPermitidos}`}).end();
        //SI TODO SALE BIEN
        next();

    }

}
//VALIDANDO LOS USUARIO PERMITIDOS
const validateUserType=(...usuariosPermitidos)=>{

    return (req,res,next)=>{

      //DESESTRUCTURANDO EL USERTYPE DEL BODY
      const {userType}=req.body;
      //EN DADO CASO QUE EL USER TYPE NO VENGA
      if (!userType) return res.status(400).json({Problems:`El tipo de usuario es necesario`}).end();
      //SI EL USUARIO NO ESTA DENTRO DEL ARREGLO DE PERMITIDOS
      if (!usuariosPermitidos.includes(userType)) return res.status(401).json({Problems:`El tipo de usuario ${userType} no tiene permitido realizar estas acciones`}).end();
      //SI TODO SALE BIEN
      next();

  }


}
//EXPORTANDO LAS FUNCIONES
module.exports={existVendedorForId,validarCamposPermitidos,validateUserType};
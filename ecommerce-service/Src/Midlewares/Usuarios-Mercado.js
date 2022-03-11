//IMPORTANDO
const { usuarioMercado } = require("../Models");

//FUNCION PARA VERIFICAR SI EXISTE UN USUARIO POR CORREO
const validateExistUsuarioMercardo=async(req,res,next)=>{
    
    try {
        
        //DESESTRUCTURANDO EL NOMBRE DEL BODY
        const {Correo}=req.body;
        //EN DADO CASO DE QUE NO VENGA EL CORREO
        if (!Correo) return res.status(400).json(`El Correo electronico es necesario`).end(); 
        //BUSCANDO EL USUARIO DE MERCADO POR EMAIL
        const UsuarioEncontradoForEmail=await usuarioMercado.findOne({

            where:{
                Correo,
                Estado:true
            }
    
    
        });
        //EN DADO CASO QUE EXISTA UN USUARIO CON EL CORREO
        if (UsuarioEncontradoForEmail) return res.status(400).json({Problems:`Ya existe un usuario de mercado con el correo=${Correo}`}).end();
        //SIGUIENDO YA QUE TODO SALIO BIEN
        next();

    } catch (error) {

        //RESPONDIENDO EN DADO CASO OCURRA UN ERROR
        res.status(500).json(error).end();

    }

}
//FUNCION PARA VALIDAR SI EXISTE UN USUARIO POR ID
const validateExistUsuarioMercardoForId=async(req,res,next)=>{
    
    try {
        
        //DESESTRUCTURANDO EL NOMBRE DEL BODY
        const {id}=req.params;
        //BUSCANDO EL USUARIO DE MERCADO POR EMAIL
        const UsuarioEncontradoForId=await usuarioMercado.findByPk(id);
        //EN DADO CASO QUE NO EXISTA UN USUARIO CON EL ID
        if (!UsuarioEncontradoForId || !UsuarioEncontradoForId.dataValues.Estado) return res.status(404).json({Problems:`No existe un usuario con el id=${id}`}).end();
        //SIGUIENDO YA QUE TODO SALIO BIEN
        next();

    } catch (error) {

        //RESPONDIENDO EN DADO CASO OCURRA UN ERROR
        res.status(500).json(error).end();

    }

}
//FUNCION PARA VALIDAR SI EXISTE UN USUARIO POR ID
const validateExistUsuarioMercardoForIdBody=async(req,res,next)=>{
    
    try {
        
        //DESESTRUCTURANDO EL NOMBRE DEL BODY
        const {UsuarioMercadoId}=req.body;
        //EN DADO CASO NO VENGA EL ID DEL USUARIO DE MERCADO
        if (!UsuarioMercadoId) return res.status(400).json(`El id del usuario del mercado es necesario`).end();
         //SACANDO EL TIPO DE DATO QUE VIENE POR EL ID
        let tipoDatoUsuarioMercadoId=typeof UsuarioMercadoId;
        //EN DADO CASO NO VENGA EL ID DEL USUARIO DE MERCADO
         if (tipoDatoUsuarioMercadoId!=='number') return res.status(400).json(`El UsuarioMercadoId debe de ser un valor numerico`).end();
        //BUSCANDO EL USUARIO DE MERCADO POR EMAIL
        const UsuarioEncontradoForId=await usuarioMercado.findByPk(UsuarioMercadoId);
        //EN DADO CASO QUE NO EXISTA UN USUARIO CON EL ID
        if (!UsuarioEncontradoForId || !UsuarioEncontradoForId.dataValues.Estado) return res.status(404).json({Problems:`No existe un usuario con el id=${UsuarioMercadoId}`}).end();
        //SIGUIENDO YA QUE TODO SALIO BIEN
        next();

    } catch (error) {
        //RESPONDIENDO EN DADO CASO OCURRA UN ERROR
        res.status(500).json(error).end();

    }

}

//EXPORTANDO
module.exports={validateExistUsuarioMercardo,validateExistUsuarioMercardoForId,validateExistUsuarioMercardoForIdBody};
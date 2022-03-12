//IMPORTACIONES
const Entrega = require("../Models/entrega-Model")

//PARA VALIDAR SI YA EXISTE UNA ENTREGA CON ID DE PEDIDO
const validateExistforeing_order_id=async(req,res,next)=>{

         //DESESTRUCTURANDO DEL OBJETO BODY
         const {foreing_order_id}=req.body;
         //EN DADO CASO EL foreing_order_id NO SEA UN VALOR NUMERICO
         if (typeof foreing_order_id!='number') return res.status(400).json(`El foreing_order_id debe ser un valor numerico`).end();
        //BUSCANDO UNA ENTREGA CON EL ID DE PEDIDO
        const findEntrega=await Entrega.findOne({"foreing_order_id":foreing_order_id});
        //EN DADO CASO EXISTA
        if (findEntrega) return res.json(`Ya existe una entrega con el id de pedido=${findEntrega.dataValues.foreing_order_id}`).end();
        //SIGUIENDO SI TODO SALE BIEN
        next();

}
//FUNCION PARA VALIDAR SI EXISTE UNA ENTREGA 
const validateExistEntregaConforeing_order_id=async(req,res,next)=>{

    try {
        
        //DESESTRUCTURANDO DEL OBJETO BODY
        const {foreing_order_id,tracking_number}=req.body;
        //EN DADO CASO EL tracking_number NO SEA UN VALOR NUMERICO
        if (typeof tracking_number!='number') return res.status(400).json(`El tracking_number debe ser un valor numerico`).end();
        //EN DADO CASO EL foreing_order_id NO SEA UN VALOR NUMERICO
        if (typeof foreing_order_id!='number') return res.status(400).json(`El foreing_order_id debe ser un valor numerico`).end();
        //BUSCANDO LA ENTREGA POR SU CLAVE PRIMARIA
        const FindEntrega= await Entrega.findByPk(tracking_number);
        //EN DADO CASO LA ENTREGA NO EXISTA
        if (!FindEntrega ||  FindEntrega.dataValues.estado=='cancelado') return res.status(404).json(`No existe una entrega con el tracking_number=${tracking_number}`).end();
        //EN DADO CASO EL ID DE LA ENTREGA NO CONCUERDE CON EL ID DE PEDIDO
        if (FindEntrega.dataValues.foreing_order_id!=foreing_order_id) return res.status(400).json(`El foreing_order_id no concuerda con el id de Pedido de la entrega`).end();
        //SI TODO SALE BIEN
        next();

    } catch (error) {
        
        res.status(500).json(error).end();

    }


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
//PARA VALIDAR ENTREGA POR ID
const validateEntregaForId=async(req,res,next)=>{

 
    try {
        
        //DESESTRUCTURANDO EL ID DEL PARAMS
        let {tracking_number}=req.params;
        //VALIDANDO QUE EFECTIVAMENTE EL PARAMETRO SEA UN VALOR NUMERICO
        if (Number.isNaN(parseInt(tracking_number,10))) return res.status(400).json(`El valor ${tracking_number} no es un valor numerico!`).end();
        //EN DADO CASO EL NUMERO ESTE PRIMERO Y LUEGO TENGA CARACTERES DE LETRA PARA SOLO DEJAR EL NUMERO 
        tracking_number=tracking_number.replace(/[abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ/.#()-*+.<>!@#$%^&*_=:éáíóúü]/g,"");
        //BUSCANDO LA ENTREGA CON ESE ID
        const findEntrega=await Entrega.findByPk(tracking_number);
        //EN DADO CASO NO SE ENCUENTRE LA ENTREGA
        if (!findEntrega || findEntrega.dataValues.estado=='cancelado') return res.status(404).json(`No existe una Entrega con el id=${tracking_number}`).end();
        //AGREGANDO AL OBJETO REQUEST LA ENTREGA
        req.findEntrega=findEntrega;
        //SIGUIENDO YA QUE TODO SALIO BIEN
        next();

        } catch (error) {

            console.log(error.message);
            //RESPONDIENDO EN DADO CASO OCURRA UN ERROR
            res.status(500).json(error).end();
        }
    
    


}

//EXPORTACIONES
module.exports={validateExistforeing_order_id,validarCamposPermitidos,validateExistEntregaConforeing_order_id,validateEntregaForId};
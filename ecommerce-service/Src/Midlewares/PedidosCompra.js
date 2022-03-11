//IMPORTACIONES
const { Pedido } = require("../Models");

const validateCompraForIdBody=async(req,res,next)=>{
    
    try {
        
        //DESESTRUCTURANDO EL PEDIDO
        const {PedidoId}=req.body;
         //EN DADO CASO NO VENGA EL ID DEL PEDIDO 
         if (!PedidoId) return res.status(400).json(`El id del pedido es necesario`).end();
        //SACANDO EL TIPO DE DATO QUE VIENE POR EL ID
        let tipoDatoPedidoId=typeof PedidoId;
        //EN DADO CASO EL ID DEL PEDIDO NO SEA NUMERICO
        if (tipoDatoPedidoId!=='number') return res.status(400).json(`El id del pedido  debe de ser un valor numerico`).end();
        //BUSCANDO EL PEDIDO POR SU ID
        const PedidoEncontrado=await Pedido.findByPk(PedidoId);
        //EN DADO CASO QUE NO EXISTA UN PEDIDO CON EL ID
        if (!PedidoEncontrado) return res.status(404).json({Problems:`No existe un pedido con el id=${id}`}).end();
        //EN DADO CASO EL ESTADO DEL PEDIDO SEA CREADO O CONFIRMADO
        if (!['creado','confirmado'].includes(PedidoEncontrado.dataValues.Estado)) return res.status(400).json({Problems:`No se puede cancelar el pedido por que ya fue enviado`}).end();

        req.PedidoEncontrado=PedidoEncontrado;
        //SIGUIENDO YA QUE TODO SALIO BIEN
        next();

    } catch (error) {
        
        //RESPONDIENDO EN DADO CASO OCURRA UN ERROR
        res.status(500).json(error).end();

    }




}
//EXPORTACIONES
module.exports={validateCompraForIdBody};
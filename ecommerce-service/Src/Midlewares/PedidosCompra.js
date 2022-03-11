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
        if (!PedidoEncontrado) return res.status(404).json({Problems:`No existe un pedido con el id=${PedidoId}`}).end();
        //VALIADANDO SI EL PEDIDO ESTA CANCELADO
        if (['cancelado Por Administrador De Mercado','Cancelado Por Usuario De Mercado'].includes(PedidoEncontrado.dataValues.Estado)) return res.status(404).json({Problems:`El pedido ya esta cancelado "${PedidoEncontrado.dataValues.Estado}"`}).end();
        //EN DADO CASO EL ESTADO DEL PEDIDO SEA CREADO O CONFIRMADO
        if (!['creado','confirmado'].includes(PedidoEncontrado.dataValues.Estado)) return res.status(400).json({Problems:`No se puede cancelar el pedido por que ya fue enviado`}).end();

        req.PedidoEncontrado=PedidoEncontrado;
        //SIGUIENDO YA QUE TODO SALIO BIEN
        next();

    } catch (error) {

        console.log(error.message);
        //RESPONDIENDO EN DADO CASO OCURRA UN ERROR
        res.status(500).json(error).end();

    }




}

const validateCompraForIdBodyVendedor=async(req,res,next)=>{
    
    
    try {
        
        //DESESTRUCTURANDO EL PEDIDO
        const {PedidoId,Estado}=req.body;
        //SACANDO EL TIPO DE DATO DE ESTADO
        let tipoDatoEstado=typeof Estado;
        //EN DADO CASO EL Estado DEL PEDIDO NO SEA STRING
        if (tipoDatoEstado!=='string') return res.status(400).json(`El estado del pedido debe de ser un valor string`).end();
        //ARREGLO DE LOS ESTADOS PERMITIDOS
        const estadosPermitidos=['confirmado','enviado'];
        //EN DADO CASO EL ESTADO NO ESTE DENTRO DE LOS ESTADOS PERMITIDOS
        if (!estadosPermitidos.includes(Estado)) return res.status(400).json(`El estado ${Estado} no es un valor permitido`).end();
         //EN DADO CASO NO VENGA EL ID DEL PEDIDO 
         if (!PedidoId) return res.status(400).json(`El id del pedido es necesario`).end();
        //SACANDO EL TIPO DE DATO QUE VIENE POR EL ID
        let tipoDatoPedidoId=typeof PedidoId;
        //EN DADO CASO EL ID DEL PEDIDO NO SEA NUMERICO
        if (tipoDatoPedidoId!=='number') return res.status(400).json(`El id del pedido  debe de ser un valor numerico`).end();
        //BUSCANDO EL PEDIDO POR SU ID
        const PedidoEncontrado=await Pedido.findByPk(PedidoId);
        //EN DADO CASO QUE NO EXISTA UN PEDIDO CON EL ID
        if (!PedidoEncontrado) return res.status(404).json({Problems:`No existe un pedido con el id=${PedidoId}`}).end();
        //DESESTRUCTURANDO EL ESTADO QUE ESTA EN LA BASE DE DATOS
        const {Estado:EstadoDb}=PedidoEncontrado.dataValues;
        //EN DADO CASO EL ESTADO DEL PEDIDO SEA CREADO O CONFIRMADO
        if ((Estado=="confirmado" && EstadoDb!=='creado') || (Estado=="enviado" && EstadoDb!=='confirmado')) return res.status(400).json({Problems:`No se puede cambiar el estado del pedido de ${EstadoDb} a ${Estado}`}).end();
        //AGREGANDO EL PEDIDO ENCONTRADO AL OBJETO REQUEST
        req.PedidoEncontrado=PedidoEncontrado;
        //SIGUIENDO YA QUE TODO SALIO BIEN
        next();

    } catch (error) {

        console.log(error.message);
        //RESPONDIENDO EN DADO CASO OCURRA UN ERROR
        res.status(500).json(error).end();

    }




}


//EXPORTACIONES
module.exports={validateCompraForIdBody,validateCompraForIdBodyVendedor};
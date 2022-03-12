//IMPORTACIONES
const { Pedido, Entrega } = require("../Models");

//PARA CREAR UNA ENTREGA
const crearEntrega=async(req,res)=>{

    try {
        
      //CRANDO LA ENTREGA
      const createEntrega= new Entrega(req.body);
      //GUARDANDOLO EN BASE DE DATOS
      await createEntrega.save();
      //DESESTRUCTURANDO DEL OBJETO createEntrega.dataValues
      const {foreing_order_id,sku_Producto,nombre_Producto,cantidad_Producto,direccion_origen,nombre_Cliente,tracking_number,estado,direccion_destino}=createEntrega.dataValues;
      //OBJETO DE RESPUESTA
      const respuestaData={

        "pedido":{ foreing_order_id ,
             "productos" : [{
                     "sku" : sku_Producto ,
                     "nombre" : nombre_Producto ,
                     "cantidad" : cantidad_Producto 
                }] 
        }, 
        
        "origen" : {
             "dirección" : direccion_origen
        }, 
        
        "destino": {
             "nombre" : nombre_Cliente,
             "dirección" : direccion_destino
        }, "tracking_number" : tracking_number ,
        estado

      };

      //RESPONDIENDO QUE LA ENTREGA FUE CREADA
      res.status(201).json({'Entrega':respuestaData}).end();


    } catch (error) {

        //EN DADO CASO OCURRA UN ERROR
        res.status(500).json(error).end();

    }

}
//PARA VER EL SEGUIMIENTO DE UN PRODUCTO
const verSeguimientoEntrega=async(req,res)=>{

  try {

    //DESESTRUCTURANDO DEL OBJETO BODY
    const {tracking_number}=req.body;
    //BUSCANDO EL PRODUCTO
    const findEntrega=await Entrega.findOne({
      
      include:[{

        model:Pedido,
        attributes:['estado','createdAt']
        
    }],
      
      where: {

      'tracking_number': tracking_number
    
    }
    
    
    });
    //DESESTRUCTURANDO LOS DATOS DEL OBJETO dataValues
    const {estado,createdAt,Pedido : PedidoData}=findEntrega.dataValues;
    //RESPUESTA PERSONALIZADA
    const Respuesta={

      tracking_number,
      "status": PedidoData.dataValues.estado,
      "tracking": [{
          "status": estado,
          "date": createdAt
        }]
    }
    //RESPONDIENDO CON LOS DATOS
    res.json(Respuesta).end();

    } catch (error) {
     
        //EN DADO CASO OCURRA UN ERROR
        res.status(500).json(error).end();

  }

}
//PARA OBTENER INFORMACION DE UNA ENTREGA
const verEntrega=async(req,res)=>{

    res.json({'Entrega':req.findEntrega}).end();

}

const actualizarEntrega=async(req,res)=>{

  try {
    //ACTUALIZANDO LA ENTREGA
    const updateEntrega=await req.findEntrega.update(req.body);
    //RESPONDIENDO CON LA ENTREGA ACTUALIZADA
    res.json({msg:"Entrega Actualizada",
              updateEntrega}).end();

  } catch (error) {

      //EN DADO CASO OCURRA UN ERROR
      res.status(500).json(error).end();
  
    }

}

const eliminarEntrega=async(req,res)=>{
  
  
  try {
    //ACTUALIZANDO LA ENTREGA
    await req.findEntrega.update({'estado':"cancelado"});
    //RESPONDIENDO CON LA ENTREGA ACTUALIZADA
    res.json({msg:"Entrega Eliminada"}).end();

  } catch (error) {

      //EN DADO CASO OCURRA UN ERROR
      res.status(500).json(error).end();
  
    }

}



//EXPORTACIONES
module.exports={

  crearEntrega,
    verEntrega,
    actualizarEntrega,
    eliminarEntrega,
    verSeguimientoEntrega


};
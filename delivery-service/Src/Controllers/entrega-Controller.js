//IMPORTACIONES

const Entrega = require("../Models/entrega-Model");


const crearEntrega=async(req,res)=>{

    try {
        
      //CRANDO LA ENTREGA
      const createEntrega= new Entrega(req.body);
      //GUARDANDOLO EN BASE DE DATOS
      await createEntrega.save();
      //DESESTRUCTURANDO DEL OBJETO createEntrega.dataValues
      const {foreing_order_id,sku_Producto,nombre_Producto,cantidad_Producto,direccion_origen,nombre_Cliente,tracking_number,estado,direccion_destino}=createEntrega.dataValues;

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
        console.log(error.message);
    }




}

const verEntrega=async(req,res)=>{}

const actualizarEntrega=async(req,res)=>{}

const eliminarEntrega=async(req,res)=>{}

const estadoEntrega=async(req,res)=>{



}

//EXPORTACIONES
module.exports={

  crearEntrega,
    verEntrega,
    actualizarEntrega,
    eliminarEntrega


};
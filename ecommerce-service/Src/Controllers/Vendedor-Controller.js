//IMPORTACIONES
const { valideCamposInControllerVendedores } = require("../Helpers/validation-Custom-Helper");
const { Producto, Pedido, usuarioMercado } = require("../Models");

//PARA CREAR UN PRODUCTO
const createProducto=async(req,res)=>{

    try {
        
        const {userType,...data}=req.body;
        //ASIGNANDOLE EL ID A LA PROPIEDAD VENDEDORID
        data.IdVendedor=req.params.id;

    
       //INSTANCIANDO EL NUEVO VENDEDOR CON LOS DATOS ENVIANDO POR EL BODY
       const newProducto= new Producto(data);
       //GUARDANDO EL NUEVO VENDEDOR
       await newProducto.save();
       //RESPONDIENDO QUE EL PRODUCTO FUE CREADO EXITOSAMENTE
       res.status(201).json({msg:'Producto Creado Exitosamente',newProducto}).end();

    } catch (error) {
        console.log(error.message);
        //RESPONDIENDO EN DADO CASO OCURRA UN PROBLEMA
        res.status(500).json({Problems:error}).end();

    }

}
//PARA OBTENER UN PRODUCTO
const getProducto=async(req,res)=>{

    try {

        //RESPONDIENDO CON EL VENDEDOR
        res.json({"Producto":req.producto}).end();

    } catch (error) {
        
        //RESPONDIENDO EN DADO CASO OCURRA UN PROBLEMA
        res.status(500).json({Problems:error}).end();
    }

}
//PARA LISTAR UN PRODUCTO
const listProductos=async(req,res)=>{

    try {

        //SACANDO TODOS LOS PRODUCTOS QUE EN QUE EL ESTADO SEA TRUE Y CONCUERDEN CON EL ID DEL VENDEDOR
        const Productos=await Producto.findAll({where: {
            Estado: true,
            IdVendedor:req.params.id
            }});
        //EN DADO CASO NO HAYA PRODUCTOS
        if (Productos.length==0) return res.status(204).end();
        //RESPONDIENDO CON LA LISTA DE TODOS LOS PRODUCTOS
        res.json({

            Cantidad:Productos.length,
            Productos
        
        }).end();
        
    } catch (error) {
        
        //EN DADO CASO OCURRA UN ERROR RESPONDIENDOLO
        res.status(500).json({'Problems':error.message}).end();
  
    }


}
//PARA ELIMINAR UN PRODUCTO
const deleteProducto=async(req,res)=>{

    try {

        //ELIMINANDO EL PRODUCTO CAMBIANDO EL ESTADO A FALSE
       await Producto.update({Estado:false}, {
            where: {
                IdProducto: req.params.id
            }
          });
        //RESPONDIENDO QUE EL PRODUCTO FUE ELIMINADO
        res.json({msg:`Producto Eliminado`,
        "Producto":req.producto}).end();

    } catch (error) {
        
           //EN DADO CASO OCURRA UN ERROR RESPONDIENDOLO
           res.status(500).json({'Problems':error.message}).end();
        
    }

}
//PARA ACTUALIZAR UN PRODUCTO 
const updateProducto=async(req,res)=>{

    try {

        //DESESTRUCTURANDO EL BODY Y EL PARAMS DEL OBJETO REQUEST
        const {body,params}=req;
        //SACANDO EL USER TYPE DE LOS DATOS A ACTUALIZAR
        const {userType,...updateData}=body;
        //HACIENDO LAS VALIDACIONES CORRESPONDIENTES
        const responseValidate=await valideCamposInControllerVendedores(updateData);
        //SI LA FUNCION RETORNA EL VALOR BOOLEANO DE TRUE
        if (responseValidate==true) {
            
            //BUSCANDO UN VENDEDOR CON EL ID
            const findVendedor=await Producto.findByPk(params.id);
            //ACTUALIZANDO LA INFORMACION DEL USUARIO ENCONTRADO
            const ProductoActualizado=await findVendedor.update(updateData);
            //RESPONDIENDO QUE EL USUARIO FUE ACTUALIZADO EXITOSAMENTE
            return res.json({msg:"Producto Actualizado Exitosamente",ProductoActualizado}).end();
            
        }
        //SI RETORNA CUALQUIER OTRO VALOR ES DECIR UN ERROR
        res.status(400).json({Problems:responseValidate}).end();
        
    } catch (error) {
        //EN DADO CASO OCURRA UN ERROR RESPONDIENDOLO
        res.status(500).json({'Problems':error.message}).end();
          
    }


}
//PARA LISTAR LAS ORDENES DE COMPRA
const OrdenesCompras=async(req,res)=>{

    try {

        //BUSCANDO TODOS LOS PEDIDOS CON EL USUARIO ID
        const misPedidos=await Pedido.findAll({include:[{

            model:usuarioMercado,
            attributes:['Correo','Direccion_De_Envio']
            
        }],where:{

            VendedorId:req.params.id

            }});
        //EN DADO CASO NO HAYA PEDIDOS
        if (misPedidos.length==0) return res.json(`Usted no tiene pedidos al momento`).end();
        //RESPONDIENDO LOS PEDIDOS
        res.json({CantidadPedidos:misPedidos.length,misPedidos}).end();

    } catch (error) {

        //EN DADO CASO OCURRA UN ERROR RESPONDIENDOLO
        res.status(500).json({'Problems':error.message}).end();
          
    }




}
//PARA CAMBIAR EL ESTADO DE UN PEDIDO
const cambiarOrden=async(req,res)=>{

    try {

        //DESESTRUCTURANDO EL ESTADO DEL PRODUCTO DEL OBJETO BODY
        const {Estado}=req.body;
        //ACTUALIZANDO EL PRODUCTO
        await req.PedidoEncontrado.update({Estado});
        //NOTIFICANDO A LA API DE ENTREGA PARA QUE CREE LA ENTREGA SI ESTADO ES ENVIADO
        if (Estado=='enviado') {
            //consumiendo la api de entrega para crear la entrega
        }

        //RESPONDIENDO QUE EL ESTADO FUE ACTUALIZADO EXITOSAMENTE
        res.json(`Estado del producto cambiado a ${Estado}`).end();
        
    } catch (error) {

         //EN DADO CASO OCURRA UN ERROR RESPONDIENDOLO
         res.status(500).json({'Problems':error.message}).end();
    
        }



}

//EXPORTACIONES
module.exports={

    createProducto,
    getProducto,
    listProductos,
    deleteProducto,
    updateProducto,
    OrdenesCompras,
    cambiarOrden

}
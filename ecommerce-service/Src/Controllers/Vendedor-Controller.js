//IMPORTACIONES
const { valideCamposInControllerVendedores } = require("../Helpers/validation-Custom-Helper");
const { Producto } = require("../Models");

//PARA CREAR UN PRODUCTO
const createProducto=async(req,res)=>{

    try {
        
        const {userType,...data}=req.body;
        //ASIGNANDOLE EL ID A LA PROPIEDAD VENDEDORID
        data.VendedorId=req.params.id;
       //INSTANCIANDO EL NUEVO VENDEDOR CON LOS DATOS ENVIANDO POR EL BODY
       const newProducto= new Producto(data);
       //GUARDANDO EL NUEVO VENDEDOR
       await newProducto.save();
       //RESPONDIENDO QUE EL PRODUCTO FUE CREADO EXITOSAMENTE
       res.status(201).json({msg:'Producto Creado Exitosamente',newProducto}).end();

    } catch (error) {
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
            VendedorId:req.params.id
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
       const ProductoEliminado= await Producto.update({Estado:false}, {
            where: {
                IdProducto: req.params.id
            }
          });
        //RESPONDIENDO QUE EL PRODUCTO FUE ELIMINADO
        res.json({msg:`Producto Eliminado`,
        ProductoEliminado}).end();

    } catch (error) {
        
           //EN DADO CASO OCURRA UN ERROR RESPONDIENDOLO
           res.status(500).json({'Problems':error.message}).end();
        
    }

}
//PARA ACTUALIZAR UN PRODUCTO - FALTA ESTO
const updateProducto=(req,res)=>{

    try {

        //DESESTRUCTURANDO EL BODY Y EL PARAMS DEL OBJETO REQUEST
        const {body,params}=req;
        //SACANDO EL USER TYPE DE LOS DATOS A ACTUALIZAR
        const {userType,...updateData}=body;
        //HACIENDO LAS VALIDACIONES CORRESPONDIENTES
        const responseValidate=await valideCamposInControllerVendedores(body);
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

//EXPORTACIONES
module.exports={

    createProducto,
    getProducto,
    listProductos,
    deleteProducto,
    updateProducto

}
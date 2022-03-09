const { valideCamposInController } = require("../Helpers/validation-Custom-Helper");
const Vendedor = require("../Models/vendedor-Model");

//PARA CREAR VENDEDORES
const createVendedores=async(req,res)=>{
    //DESESTRUCTURANDO EL REQUEST DEL BODY
    const {body}=req;

    try {
       //SACANDO EL USERTYPE DE LOS DATOS A ACTUALIZAR
       const {userType,...create}=body;
       //INSTANCIANDO EL NUEVO VENDEDOR CON LOS DATOS ENVIANDO POR EL BODY
       const newVendedor= new Vendedor(create);
       //GUARDANDO EL NUEVO VENDEDOR
       await newVendedor.save();
       //INDICANDO QUE SE CREO EL VENDEDOR DE MANERA EXITOSA
       res.status(201).json({msg:"Usuario Vendedor Creado!",create}).end();

    } catch (error) {

        //EN DADO CASO OCURRA UN ERROR RESPONDIENDOLO
        res.status(500).json({'Problems':error.message}).end();

    }

}
//PARA OBTENER VENDEDOR
const getVendedor=async(req,res)=>{

    try {
        //RESPONDIENDO CON EL VENDEDOR
        res.json({"Vendedor":req.vendedor}).end();

    } catch (error) {

        //EN DADO CASO OCURRA UN ERROR RESPONDIENDOLO
        res.status(500).json({'Problems':error.message}).end();

    }

}
//PARA LOS VENDEDORES
const listVendedores=async(req,res)=>{

    try {

        //DESESTRUCTURANDO EL ALL DEL OBJETO BODY
        const {all}=req.body;
        //VERIFICANDO EL VALOR DEL ALL PARA DAR UNA CONDICION U OTRA OPERADOR TERNARIO
        const WHERE= all ? {} : {where: {
            Estado: true}};
        //SACANDO TODOS LOS VENDEDORES
        const Vendedores=await Vendedor.findAll(WHERE);
        //EN DADO CASO NO HAYA VENDEDORES
        if (Vendedores.length==0) return res.status(204).end();
        //RESPONDIENDO CON LA LISTA DE TODOS LOS VENDEDORES
        res.json({
            
            Cantidad:Vendedores.length,
            Vendedores
        
        }).end();
        
    } catch (error) {
        
        //EN DADO CASO OCURRA UN ERROR RESPONDIENDOLO
        res.status(500).json({'Problems':error.message}).end();
  
    }

}
//PARA ACTUALIZAR UN VENDEDOR
const updateVendedor=async(req,res)=>{

    try {

        //DESESTRUCTURANDO EL BODY Y EL PARAMS DEL OBJETO REQUEST
        const {body,params}=req;
        //SACANDO EL USER TYPE DE LOS DATOS A ACTUALIZAR
        const {userType,...updateData}=body;
        //HACIENDO LAS VALIDACIONES CORRESPONDIENTES
        const responseValidate=await valideCamposInController(body,params.id);
        //SI LA FUNCION RETORNA EL VALOR BOOLEANO DE TRUE
        if (responseValidate==true) {
            
            //BUSCANDO UN VENDEDOR CON EL ID
            const findVendedor=await Vendedor.findByPk(params.id);
            //ACTUALIZANDO LA INFORMACION DEL USUARIO ENCONTRADO
            const usuarioActualizado=await findVendedor.update(updateData);
            //RESPONDIENDO QUE EL USUARIO FUE ACTUALIZADO EXITOSAMENTE
            return res.json({msg:"Usuario Actualizado Exitosamente",usuarioActualizado}).end();
            
        }
        //SI RETORNA CUALQUIER OTRO VALOR ES DECIR UN ERROR
        res.status(400).json({Problems:responseValidate}).end();
        
    } catch (error) {
        console.log(error.message);
        //EN DADO CASO OCURRA UN ERROR RESPONDIENDOLO
        res.status(500).json({'Problems':error.message}).end();
          
    }

}
//PARA ELIMINAR VENDEDORES
const deleteVendedor=async(req,res)=>{

    try {
        //ELIMINANDO EL VENDEDOR CAMBIANDO EL ESTADO A FALSE
        await Vendedor.update({Estado:false}, {
            where: {
              IdVendedor: req.params.id
            }
          });

          req.vendedor.Estado=false;
        //RESPONDIENDO QUE EL USUARIO FUE ELIMINADO
        res.json({msg:`Usuario eliminado`,
                  Vendedor:req.vendedor}).end();

    } catch (error) {
        
           //EN DADO CASO OCURRA UN ERROR RESPONDIENDOLO
           res.status(500).json({'Problems':error.message}).end();
        
    }

}
//PARA ELIMINAR VENDEDORES DE MANERA FISICA DE LA BASE DE DATOS
const deleteVendedorFisic=async(req,res)=>{

    try {

       //ELIMINANDO EL VENDEDOR
       await Vendedor.destroy({where: {IdVendedor: req.params.id}});
       //RESPONDIENDO QUE EL VENDEDOR FUE ELIMINADO
       res.json({msg:'Usuario Vendedor Eliminado Exitosamente',
                  vendedorRemove:req.vendedor}).end();

    } catch (error) {
        
        //EN DADO CASO OCURRA UN ERROR RESPONDIENDOLO
        res.status(500).json({'Problems':error.message}).end();
        
    }


}

//EXPORTANDO LAS FUNCIONES
module.exports={createVendedores,getVendedor,listVendedores,updateVendedor,deleteVendedor,deleteVendedorFisic};
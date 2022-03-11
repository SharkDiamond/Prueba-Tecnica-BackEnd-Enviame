//IMPORTACIONES
const { usuarioMercado, Pedido, Producto } = require("../Models");

//FUNCION PARA CREAR EL USUARIO DE MERCADO
const createUsuarioMercado=async(req,res)=>{

    try {
        
        const {userType,...data}=req.body;
       //INSTANCIANDO EL NUEVO VENDEDOR CON LOS DATOS ENVIANDO POR EL BODY
       const newUsuarioMercado= new usuarioMercado(data);
       //GUARDANDO EL NUEVO VENDEDOR
       await newUsuarioMercado.save();
       //RESPONDIENDO QUE EL PRODUCTO FUE CREADO EXITOSAMENTE
       res.status(201).json({msg:'Usuario Creado Exitosamente',newUsuarioMercado}).end();

    } catch (error) {
        //RESPONDIENDO EN DADO CASO OCURRA UN PROBLEMA
        res.status(500).json({Problems:error}).end();

    }


}
//FUNCION PARA CREAR UNA COMPRA //FALTA COLOCARLE UN ESTADO POR DEFECTO Y COLOCAR EL UPDATE ADD Y CREATE ADD
const createCompra=async(req,res)=>{

    try {
        //DESESTRUCTURANDO DEL OBJETO BODY
        const {userType,ProductId,...data}=req.body;
        //DESESTRUCTURANDO DEL OBJETO REQUEST
        const {vendedorId,CantidadFinal,ProductoEncontrado}=req;
        //ASIGNANDOLE AL SKU EL PRODUCT ID
        data.Sku=ProductId;
        //ASIGNANDO EL VENDEDOR ID
        data.VendedorId=vendedorId;
       //INSTANCIANDO EL NUEVO PEDIDO CON LOS DATOS ENVIANDO POR EL BODY
       const newPedido= new Pedido(data);
       //GUARDANDO EL NUEVO VENDEDOR Y CAMBIANDO LA CANTIDAD DEL PRODUCTO
       await Promise.all([newPedido.save(),ProductoEncontrado.update({Cantidad:CantidadFinal})]);
       //RESPONDIENDO QUE EL PRODUCTO FUE CREADO EXITOSAMENTE
       res.status(201).json({msg:'Compra Realizada',newPedido}).end();

    } catch (error) {
       
        //RESPONDIENDO EN DADO CASO OCURRA UN PROBLEMA
        res.status(500).json({Problems:error}).end();

    }

 }
//FUNCION PARA CANCELAR UNA COMPRA
const cancelCompra=async(req,res)=>{

    try {

        //DESESTRUCTURANDO DEL OBJETO REQUEST
        const {PedidoEncontrado}=req;
        //DESESTRUCTURANDO DEL OBJETO DATA VALUES DEL OBJETO PedidoEncontrado
        const {Cantidad : CantidadComprada,Sku}=PedidoEncontrado.dataValues;
        //ACTUALIZANDO EL ESTADO DEL PEDIDO Y BUSCANDO EL PRODUCTO
        const [updatePedido,findProduct]=await Promise.all([PedidoEncontrado.update({"Estado":'Cancelado Por Usuario De Mercado'}),Producto.findByPk(Sku)]);
        //ACTUALIZANDO EL STOCK DEL PRODCUTO
        await findProduct.update({Cantidad:CantidadComprada+findProduct.dataValues.Cantidad});
        //RESPONDIENDO
        res.json({msg:"Pedido Cancelado",PedidoEncontrado}).end();

    } catch (error) {
        console.log(error.message);
        //RESPONDIENDO EN DADO CASO OCURRA UN PROBLEMA
        res.status(500).json({Problems:error}).end();
        
    }

 }

//EXPORTACIONES
module.exports={

    createUsuarioMercado,
    createCompra,
    cancelCompra

}
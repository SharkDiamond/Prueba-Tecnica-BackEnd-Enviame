//IMPORTACIONES
const { usuarioMercado, Pedido, Producto, Vendedor } = require("../Models");
const axios=require('axios');
//FUNCION PARA CREAR EL USUARIO DE MERCADO
const createUsuarioMercado=async(req,res)=>{

    try {
        
        const {userType,...data}=req.body;
       //INSTANCIANDO EL NUEVO USUARIO MERCADO CON LOS DATOS ENVIANDO POR EL BODY
       const newUsuarioMercado= new usuarioMercado(data);
       //GUARDANDO EL NUEVO USUARIO MERCADO
       await newUsuarioMercado.save();
       //RESPONDIENDO QUE EL USUARIO FUE CREADO
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
        const {vendedorId,CantidadFinal,ProductoEncontrado,ClienteUsuarioMercado}=req;
        //ASIGNANDOLE AL SKU EL PRODUCT ID
        data.Sku=ProductId;
        //ASIGNANDO EL VENDEDOR ID
        data.VendedorId=vendedorId;
       //INSTANCIANDO EL NUEVO PEDIDO CON LOS DATOS ENVIANDO POR EL BODY
       let newPedido= new Pedido(data);
        //GUARDANDO GUARDANDO EL NUEVO PEDIDO Y ACTUALIZANDO EL STOCK DEL PRODUCTO
       const [p,PE,vendedorEncontrado]= await Promise.all([newPedido.save(),ProductoEncontrado.update({Cantidad:CantidadFinal}),Vendedor.findByPk(vendedorId)]);
        //DESESTRUCTURANDO LOS DATOS DEL PEDIDO CREADO
        const {IdPedido,Cantidad}=newPedido;
        //AGREGANDO AL OBJETO  newPedido.dataValues.NombreProducto el nombre del producto
        newPedido.dataValues.NombreProducto=ProductoEncontrado.Nombre;
        //CREANDO LA ENTREGA la direccion de entrega debe de estar en una variable de entorno
       const createEntrega= await axios.post(`${process.env.DELIVERY_DIRECTION}/Entregas/crearEntrega`,{
            "foreing_order_id":IdPedido,
             "sku_Producto":ProductId,
             "nombre_Producto":ProductoEncontrado.Nombre,
             "cantidad_Producto":Cantidad,
            "direccion_origen":vendedorEncontrado.dataValues.DireccionAlmacen,
            "direccion_destino":ClienteUsuarioMercado.Direccion_De_Envio,
            "nombre_Cliente":ClienteUsuarioMercado.Nombre,
            "estado":'LISTO_PARA_RECOLECCIÓN'
          },
          {
            headers: {
              token: req.headers.token
            },
          });
       //RESPONDIENDO QUE LA COMPRA FUE REALIZADA EXITOSAMENTE
       res.status(201).json({msg:'Compra Realizada','Pedido':newPedido,'Entrega':createEntrega.data.Entrega}).end();

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

        //RESPONDIENDO EN DADO CASO OCURRA UN PROBLEMA
        res.status(500).json({Problems:error}).end();
        
    }

 }
//OBTENER EL ESTADO DE UN PRODUCTO
const verEstadoPedido=async(req,res)=>{

    try {

        //DESESTRUCTURANDO DEL OBJETO req.PedidoEncontrado.dataValues
        const {VendedorId,UsuarioMercadoId,updatedAt,...data}=req.PedidoEncontrado.dataValues;
        //RESPONDIENDO CON EL ESTADO DEL PEDIDO
        res.json({"Pedido":data}).end(); 

    } catch (error) {
        
        //RESPONDIENDO EN DADO CASO OCURRA UN PROBLEMA
        res.status(500).json({Problems:error}).end();

    }

}

//EXPORTACIONES
module.exports={

    createUsuarioMercado,
    createCompra,
    cancelCompra,
    verEstadoPedido

}
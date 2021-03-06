//IMPORTACIONES
const { Producto } = require("../Models");

//PARA VERIFICAR SI UN PRODUCTO EXISTE
const ProductExist=async(req,res,next)=>{

    try {
        
        //DESESTRUCTURANDO EL NOMBRE DEL BODY
        const {Nombre}=req.body;
        //EN DADO CASO EL NOMBRE DEL PRODUCTO NO VENGA
        if (!Nombre) return res.status(400).json(`El nombre del producto es necesario`).end(); 

        //BUSCANDO EL PRODUCTO
        const ProductoEncontrado=await Producto.findOne({

            where:{
                Nombre,
                Estado:true
            }
    
    
        });

        //EN DADO CASO QUE EXISTA UN PRODUCTO CON ESE NOMBRE
        if (ProductoEncontrado) return res.status(400).json({Problems:`Ya existe un producto con el nombre ${Nombre}`}).end();
        //SIGUIENDO YA QUE TODO SALIO BIEN
        next();

    } catch (error) {

        //RESPONDIENDO EN DADO CASO OCURRA UN ERROR
        res.status(500).json(error).end();

    }

}
//FUNCION PARA VERIFICAR SI EXISTE UN USUARIO POR ID
const productExistForId=async(req,res,next)=>{

    try {
        
    //DESESTRUCTURANDO EL ID DEL PARAMS
    let {id}=req.params;
    //VALIDANDO QUE EFECTIVAMENTE EL PARAMETRO SEA UN VALOR NUMERICO
    if (Number.isNaN(parseInt(id,10))) return res.status(400).json(`El valor ${id} no es un valor numerico!`).end();
    //EN DADO CASO EL NUMERO ESTE PRIMERO Y LUEGO TENGA CARACTERES DE LETRA PARA SOLO DEJAR EL NUMERO 
    id=id.replace(/[abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ/.#()-*+.<>!@#$%^&*_=:éáíóúü]/g,"");
    //BUSCANDO EL VENDEDOR CON ESE ID
    const findProducto=await Producto.findByPk(id);
    //EN DADO CASO NO SE ENCUENTRE EL USUARIO
    if (!findProducto || !findProducto.dataValues.Estado) return res.status(404).json(`No existe un producto con el id=${id}`).end();
    //AGREGANDO EL ELEMENTO VENDEDOR AL OBJETO REQUEST
    req.producto=findProducto.dataValues;
    //SIGUIENDO YA QUE TODO SALIO BIEN
    next();
    } catch (error) {
        //RESPONDIENDO EN DADO CASO OCURRA UN ERROR
        res.status(500).json(error).end();
    }



}
//FUNCION PARA VERIFICAR SI EXISTE UN USUARIO POR ID
const productExistForIdForBody=async(req,res,next)=>{

    try {
        
        //DESESTRUCTURANDO EL PRODUCTID Y LA CANTIDAD DEL BODY
        const {ProductId,Cantidad}=req.body;
         //EN DADO CASO NO VENGA EL ID DEL PRODUCTO 
         if (!ProductId) return res.status(400).json(`El id del producto es necesario`).end();
        //EN DADO CASO NO VENGA LA CANTIDAD
         if (!Cantidad || Cantidad==0) return res.status(400).json(`La cantidad es necesaria!`).end();
        //BUSCANDO EL PRODUCTO POR ID
        const ProductoEncontrado=await Producto.findByPk(ProductId);
        //EN DADO CASO QUE NO EXISTA UN PRUDCTO CON EL ID
        if (!ProductoEncontrado || !ProductoEncontrado.dataValues.Estado) return res.status(404).json({Problems:`No existe un producto con el id=${ProductId}`}).end();
        //EN DADO CASO LA CANTIDAD SE MAYOR AL STOCK DEL PRODUCTO
        if (Cantidad>ProductoEncontrado.dataValues.Cantidad) return res.status(400).json(`Su compra excede el stock del producto, actualmente hay ${ProductoEncontrado.dataValues.Cantidad} elementos disponibles de este producto`).end();
        //AGREGANDO EL VENDEDOR ID AL OBJETO REQUEST
        req.vendedorId=ProductoEncontrado.dataValues.IdVendedor;
        //AGREGANDO EL PRODUCTO ENCONTRADO AL OBJETO REQUEST
        req.ProductoEncontrado=ProductoEncontrado;
        //AGREGANDO LA CANTIDAD FINAL AL PARAMS
        req.CantidadFinal=ProductoEncontrado.dataValues.Cantidad-Cantidad;
        //SIGUIENDO YA QUE TODO SALIO BIEN
        next();

    } catch (error) {
        //RESPONDIENDO EN DADO CASO OCURRA UN ERROR
        res.status(500).json(error).end();

    }



}


//EXPORTACIONES
module.exports={

    ProductExist,
    productExistForId,
    productExistForIdForBody

}

const { Producto } = require("../Models");



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

const getProducto=(req,res)=>{



}

const listProductos=(req,res)=>{



}

const deleteProducto=(req,res)=>{



}

const updateProducto=(req,res)=>{



}

module.exports={

    createProducto,
    getProducto,
    listProductos,
    deleteProducto,
    updateProducto

}


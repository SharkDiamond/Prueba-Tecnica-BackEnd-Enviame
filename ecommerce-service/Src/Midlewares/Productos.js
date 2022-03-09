//IMPORTACIONES
const { Producto } = require("../Models");

ProductExist=async(req,res,next)=>{

    try {
        
        const {Nombre}=req.body;

        const ProductoEncontrado=await Producto.findOne({

            where:{

                Nombre
            }
    
    
        });

        //EN DADO CASO QUE EXISTA UN PRODUCTO CON ESE NOMBRE
        if (ProductoEncontrado) return res.status(400).json({Problems:`Ya existe un producto con el nombre ${Nombre}`}).end();

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json(error).end();


    }




}

//EXPORTACIONES
module.exports={

    ProductExist

}

//IMPORTACIONES
const Vendedor = require("../Models/vendedor-Model");

//FUNCION QUE VALIDA SI EL USUARIO EXISTE
const existUsername=async(Username)=>{

    //VERIFICANDO SI EXISTE UN VENDEDOR CON ESE NOMBRE DE USUARIO
    const vendedor=await Vendedor.findOne({

        where:{

            Username

        }

    });

    //DEVOLVIENDO UN ERROR SI EXISTE
    if (vendedor) throw new Error(`Ya existe un vendedor con el username ${Username}`);
    //RETORNANDO TRUE SI TODO SALE BIEN ES DECIR QUE NO EXISTE UN VENDEDOR CON ESE NOMBRE DE USUARIO
    return true;


}


//EXPORTACIONES
module.exports=existUsername;
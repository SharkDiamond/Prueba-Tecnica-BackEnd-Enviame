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
//FUNCION PARA HACER VALIDACION DE LOS CAMPOS DESDE LOS CONTROLADORES
const valideCamposInController=async(body,id)=>{
    //VALIDANDO EL USERNAME
    if ((body.Username.length<8 || body.Username.length>15) && body.Username) return 'El nombre de usuario debe tener minimo 8 letras y maximo 15 letras';
    //VALIDANDO LA DESCRIPCION
    if ((body.Descripcion.length<12 || body.Descripcion.length>50) && body.Descripcion) return 'La descripcion del usuario debe tener minimo 12 letras y maximo 50 letras';
    //BUSCANDO EL USUARIO
    const VendedorUsername= await Vendedor.findOne({

        where:{

            Username:body.Username

        }


    });
    //VERIFICANDO QUE EL NOMBRE DE USUARIO POR EL QUE SE VA A CAMBIAR NO LO TENGA OTRO USUARIO
    if (VendedorUsername.IdVendedor!==id) return `Ya existe otro usuario vendedor con el username ${body.Username}`;
    //RETORNANDO TRUE SI PARA TODAS LAS VALIDACIONES
    return true;

}

//EXPORTACIONES
module.exports={existUsername,valideCamposInController};
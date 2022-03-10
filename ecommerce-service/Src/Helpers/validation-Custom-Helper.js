//IMPORTACIONES
const { Vendedor } = require("../Models");

//FUNCION QUE VALIDA SI EL USUARIO EXISTE
const existUsername=async(Username)=>{

    //VERIFICANDO SI EXISTE UN VENDEDOR CON ESE NOMBRE DE USUARIO
    const vendedor=await Vendedor.findOne({

        where:{

            Username,
            Estado:true

        }

    });

    //DEVOLVIENDO UN ERROR SI EXISTE
    if (vendedor) throw new Error(`Ya existe un vendedor con el username ${Username}`);
    //RETORNANDO TRUE SI TODO SALE BIEN ES DECIR QUE NO EXISTE UN VENDEDOR CON ESE NOMBRE DE USUARIO
    return true;


}
//FUNCION PARA HACER VALIDACION DE LOS CAMPOS DESDE LOS CONTROLADORES VERIFICAR ESTO BIEN 11 PM CAMBIARLO CON UN SWITCH
const valideCamposInController=async(body,id)=>{

    //SACANDO EN UN ARREGLO LAS LLAVES DEL OBJETO BODY
    const keysBody=Object.keys(body);

    //VALIDANDO EL USERNAME
    if (keysBody.includes('Username') && (body.Username.length<8 || body.Username.length>15)) return 'El nombre de usuario debe tener minimo 8 letras y maximo 15 letras';
    //VALIDANDO LA DESCRIPCION
    if (keysBody.includes("Descripcion") && (body.Descripcion.length<12 || body.Descripcion.length>50) ) return 'La descripcion del usuario debe tener minimo 12 letras y maximo 50 letras';
    //VALIDANDO DIRECCION ALMACEN
     if (keysBody.includes("DireccionAlmacen") && body.DireccionAlmacen.length>0) return 'La descripcion del usuario debe tener minimo 12 letras y maximo 50 letras';
    
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

//FUNCION PARA HACER VALIDACION DE LOS CAMPOS DESDE LOS EN VENDEDORES
const valideCamposInControllerVendedores=async(body)=>{
    
    //SACANDO EN UN ARREGLO LAS LLAVES DEL OBJETO BODY
    const keysBody=Object.keys(body);
    //VALIDANDO EL USERNAME
    if (keysBody.includes('Nombre') && body.Nombre.length==0) return 'El nombre del producto no puede estar vacio';
    //VALIDANDO LA DESCRIPCION
    if ( keysBody.includes('Descripcion') && (body.Descripcion.length<12 || body.Descripcion.length>60) ) return 'La descripcion del producto debe tener minimo 12 letras y maximo 60 letras';
    //SACANDO EL TIPO DE DATO DE CANTIDAD
    let typeCantidad= typeof(body.Cantidad);
    //VALIDANDO LA CANTIDAD
    if (keysBody.includes('Cantidad') && typeCantidad!=='number') return 'El tipo de dato de cantidad debe de ser numerico';
    //RETORNANDO TRUE SI PARA TODAS LAS VALIDACIONES
    return true;



}

//EXPORTACIONES
module.exports={existUsername,valideCamposInController,valideCamposInControllerVendedores};
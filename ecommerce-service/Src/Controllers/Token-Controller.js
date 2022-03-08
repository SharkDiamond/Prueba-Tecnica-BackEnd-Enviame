//IMPORTACIONES
const createToken = require("../Helpers/generate-token-Helper");


const getToken=async(req,res)=>{

try {
    
    //CREANDO EL TOKEN
    const token=await createToken();
    //RESPONDIENDO EL TOKEN
    res.json(token).end();

} catch (error) {

    //EN DADO CASO OCURRA UN PROBLEMA
    res.status(500).json(error.message).end();


}


}

//EXPORTANDO LAS FUNCIONES
module.exports=getToken;
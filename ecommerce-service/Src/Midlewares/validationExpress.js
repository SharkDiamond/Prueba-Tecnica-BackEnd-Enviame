//EXPORTACIONES
const {validationResult}=require('express-validator');

//FUNCION QUE VERIFCA LAS VALIDACIONES
const validationExpress=(req,res,next)=>{

    const errors= validationResult(req);
    //SI HAY ERRORES
    if (!errors.isEmpty()) return res.json(errors).status(400).end();
    //SI NO LOS HAY CONTINUA
    next();

}

//EXPORTACIONES DE LAS FUNCIONES
module.exports={validationExpress};
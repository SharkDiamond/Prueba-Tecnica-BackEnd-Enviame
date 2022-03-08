//IMPORTACIONES
const jwt=require('jsonwebtoken');

//FUNCION PARA VALIDAR EL TOKEN
const validarToken=(req,res,next)=>{

    try {
        //VERIFICANDO EL TOKEN
        jwt.verify(req.headers.token,process.env.KEY_TOKEN_ECOMMERCE_APP);
        //SI TODO SALE BIEN PASANDO A LOS SIGUIENTES MIDLEWARES 'SI ES QUE LOS HAY'
        next();

    } catch (error) {
        //EN DADO CASO EL TOKEN SEA INVALIDO
        res.status(400).json('Token Invanlido').end();

    }

}


module.exports=validarToken;
//IMPORTACIONES
const jwt=require('jsonwebtoken');

//FUNCION PARA VALIDAR EL TOKEN
const validarToken=(req,res,next)=>{

    try {

        //DESESTRUCTURANDO EL TOKEN DE LOS HEADERS
        const {token}=req.headers;
        //EN DADO CASO QUE NO VENGA UN TOKEN EN LA PETICION
        if (token.length==0) return res.status(401).json('No viene token en la peticion').end();
        //VERIFICANDO EL TOKEN
        jwt.verify(token,process.env.KEY_TOKEN_ECOMMERCE_APP);
        //SI TODO SALE BIEN PASANDO A LOS SIGUIENTES MIDLEWARES 'SI ES QUE LOS HAY'
        next();

    } catch (error) {

        //EN DADO CASO EL TOKEN NO VENGA EN LOS ABSOLUTO
        if (error.message==`Cannot read property 'length' of undefined`) return res.status(401).json('No viene token en la peticion').end();
        //EN DADO CASO EL TOKEN SEA INVALIDO
        res.status(401).json('Token Invanlido').end();

    }

}

//EXPORTANDO LA FUNCION
module.exports=validarToken;
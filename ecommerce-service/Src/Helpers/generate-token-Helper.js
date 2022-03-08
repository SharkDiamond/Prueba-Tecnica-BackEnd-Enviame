const token=require('jsonwebtoken');

//FUNCION PARA CREAR EL TOKEN
const createToken=(data="test")=>{
    //RETORNANDO UNA PROMESA
    return new Promise((resolve,reject)=>{

        try {
            
            token.sign({data},process.env.KEY_TOKEN_ECOMMERCE_APP,{expiresIn:'1h'},(err,token)=>{
                //EN DADO CASO OCURRA UN PROBLEMA CON LA FIRMA DEL TOKEN
                if (err) reject(error);
                //MANDANDO EL TOKEN SI TODO SALE BIEN
                resolve(token);
            });

        } catch (error) {
            
            reject(error);
        
        }

    });

}


module.exports=createToken;
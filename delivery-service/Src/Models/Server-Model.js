//IMPORTACIONES
const express=require('express');
const cors=require('cors');
const db = require('../Database/ConectarDB');

class Server{

    constructor(){
        
        //CREANDO EL ATRIBUTO APP
        this.app=express();
        //CARGANDO LOS MIDLEWARES
        this.Midlewares();
        //SENDEROS
        this.path={
            'Entregas':'/Entregas'

        };

        this.ConectarDb();

        //CARGANDO LAS RUTAS
        this.Routes();
        //PUERTO
        this.port=process.env.DELIVERY_APP_PORT;

    }

   async ConectarDb(){

    try {
        //AUTENTICANDO CONTRA LA BASE DE DATOS
        await db.authenticate();
        //SI TODO SALE BIEN
        console.log('database Online');
       
      } catch (error) {
          //EN DADO CASO OCURRA UN ERROR
          throw new Error(" "+error);
            
      }

    }

    Routes(){
        
        //RUTA PARA ENTREGAS
        this.app.use(this.path.Entregas,require('../Routes/entrega-Route'));
  
    }

    Midlewares(){
        
        //USANDO EL CORS COMO UN MIDLEWARE GLOBAL
        this.app.use(cors());
        //PARA LA SERIALIZACION DEL JSON
        this.app.use(express.json());

    }

    Listen(){

        this.app.listen(this.port,()=>{
            //IMPRIMIENDO UN MENSAJE EN CONSOLA
            console.log('Servidor Up En Puerto '+this.port);

        });


    }

}

//EXPORTANDO LA CLASE
module.exports=Server;

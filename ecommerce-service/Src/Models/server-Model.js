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

         'Token':'/Token',
         'Administrator':'/AdministradorMercado',
         'Vendedor':'/Vendedor'

        };

        this.ConectarDb();

        //CARGANDO LAS RUTAS
        this.Routes();
        //PUERTO
        this.port=process.env.ECOMMERCE_APP_PORT;

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
        //DESESTRUCTURANDO EL OBJETO PATH
        const {Token,Administrator,Vendedor}=this.path;
        //RUTA PARA EL TOKEN
        this.app.use(Token,require('../Routes/Token-Route'));
        //RUTA PARA LOS ADMINISTRADORES DEL MERCADO
        this.app.use(Administrator,require('../Routes/administradorMercado-Route'));
        //RUTA PARA LOS VENDEDORES
        this.app.use(Vendedor,require('../Routes/vendedor-Route'));

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
//IMPORTACIONES
const express=require('express');
const cors=require('cors');

class Server{

    constructor(){
        
        //CREANDO EL ATRIBUTO APP
        this.app=express();
        //CARGANDO LOS MIDLEWARES
        this.Midlewares();
        //SENDEROS
        this.path={

         'Administrator':'/AdministradorMercado'

        };
        //CARGANDO LAS RUTAS
        this.Routes();
        //PUERTO
        this.port=process.env.ECOMMERCE_APP_PORT;

    }


    Routes(){

        this.app.use(this.path.Administrator,require('../Routes/administradorMercado'));

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

module.exports=Server;
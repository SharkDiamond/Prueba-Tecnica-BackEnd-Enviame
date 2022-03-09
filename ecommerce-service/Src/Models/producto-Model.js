//IMPORTACIONES
const { DataTypes } =require('sequelize');
const db = require('../Database/ConectarDB');

//DESESTRUCTURANDO LOS TIPOS A USAR
const {STRING,BOOLEAN,BIGINT}=DataTypes;
//CREANDO EL MODELO DE VENDEDOR
const Producto=db.define('productos',{

        IdProducto:{

            type:BIGINT,
            primaryKey: true,
            autoIncrement: true

        },
        VendedorId:{
            
            type:BIGINT

        },

        Nombre:{

            type: STRING

        },
        Cantidad:{

            type:BIGINT

        },
        Descripcion:{

            type:STRING

        },
        Estado:{

            type:BOOLEAN

        }

});
//EXPORTANDO EL MODELO DE VENDEDOR
module.exports=Producto;
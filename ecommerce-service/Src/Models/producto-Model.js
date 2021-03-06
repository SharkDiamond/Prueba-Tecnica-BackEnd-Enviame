//IMPORTACIONES
const { DataTypes } =require('sequelize');
const db = require('../Database/ConectarDB');

//DESESTRUCTURANDO LOS TIPOS A USAR
const {STRING,BOOLEAN,BIGINT}=DataTypes;
//CREANDO EL MODELO DE PRODUCTO
const Producto=db.define('productos',{

        IdProducto:{

            type:BIGINT,
            primaryKey: true,
            autoIncrement: true

        },
        IdVendedor:{
            
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
//EXPORTANDO EL MODELO DE PRODUCTO
module.exports=Producto;
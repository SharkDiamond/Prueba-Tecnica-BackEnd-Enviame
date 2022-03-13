//IMPORTACIONES
const { DataTypes } =require('sequelize');
const db = require('../Database/ConectarDB');
//DESESTRUCTURANDO LOS TIPOS A USAR
const {STRING,BIGINT}=DataTypes;
//CREANDO EL MODELO DE Pedido
const Entrega=db.define('Entregas',{

    tracking_number:{

            type:BIGINT,
            primaryKey: true,
            autoIncrement: true

        },

        foreing_order_id:{

            type:BIGINT


        },

        sku_Producto:{
            
            type:BIGINT

        },
        nombre_Producto:{

            type:STRING

        },
        cantidad_Producto:{

            type:BIGINT


        },
        direccion_origen:{
            
            type:STRING

        },
        direccion_destino:{
            
            type:STRING

        },

        nombre_Cliente:{

            type:STRING

        },
        estado:{

            type:STRING

        }

});

//EXPORTANDO EL MODELO DE PRODUCTO
module.exports=Entrega;
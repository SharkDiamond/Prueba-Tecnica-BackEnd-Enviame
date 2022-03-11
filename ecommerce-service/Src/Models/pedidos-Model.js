//IMPORTACIONES
const { DataTypes } =require('sequelize');
const db = require('../Database/ConectarDB');

//DESESTRUCTURANDO LOS TIPOS A USAR
const {STRING,BIGINT}=DataTypes;
//CREANDO EL MODELO DE Pedido
const Pedido=db.define('Pedidos',{

        idPedidos:{

            type:BIGINT,
            primaryKey: true,
            autoIncrement: true

        },
        Sku:{
            
            type:BIGINT

        },
        VendedorId:{
            
            type:BIGINT

        },
        UsuarioMercadoId:{
            
            type:BIGINT

        },
        Estado:{

            type:STRING

        },
        Cantidad:{

            type:BIGINT

        }

});

/*
    valores de estado
 "creado"  -> "confirmado" -> "enviado"


*/

//EXPORTANDO EL MODELO DE PRODUCTO
module.exports=Pedido;
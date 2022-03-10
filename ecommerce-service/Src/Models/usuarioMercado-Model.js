//IMPORTACIONES
const { DataTypes } =require('sequelize');
const db = require('../Database/ConectarDB');
//DESESTRUCTURANDO LOS TIPOS A USAR
const {STRING,BIGINT,BOOLEAN}=DataTypes;
//CREANDO EL MODELO DE usuarioMercado
const usuarioMercado=db.define('mercadoUsuarios',{

    IdUsuarioMercado:{

            type:BIGINT,
            primaryKey: true,
            autoIncrement: true

        },

        Correo:{

            type: STRING

        },

        Direccion_De_Envio:{

            type:STRING

        },

        Estado:{

            type:BOOLEAN


        }

});
//EXPORTANDO EL MODELO DE usuarioMercado
module.exports=usuarioMercado;
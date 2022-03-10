//IMPORTACIONES
const { DataTypes } =require('sequelize');
const db = require('../Database/ConectarDB');
//DESESTRUCTURANDO LOS TIPOS A USAR
const {STRING,BIGINT}=DataTypes;
//CREANDO EL MODELO DE usuarioMercado
const usuarioMercado=db.define('usuariosMercado',{

        UsuarioMercadoId:{

            type:BIGINT,
            primaryKey: true,
            autoIncrement: true

        },

        Correo:{

            type: STRING

        },

        Direccion_De_Envio:{

            type:STRING

        }

});
//EXPORTANDO EL MODELO DE usuarioMercado
module.exports=usuarioMercado;
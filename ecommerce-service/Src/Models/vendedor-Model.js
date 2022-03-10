//IMPORTACIONES
const { DataTypes } =require('sequelize');
const db = require('../Database/ConectarDB');

//DESESTRUCTURANDO LOS TIPOS A USAR
const {STRING,BOOLEAN,BIGINT}=DataTypes;
//CREANDO EL MODELO DE VENDEDOR
const Vendedor=db.define('vendedores',{

        VendedorId:{

            type:BIGINT,
            primaryKey: true,
            autoIncrement: true

        },

        Nombre:{

            type: STRING

        },
        Username:{

            type:STRING

        },
        Descripcion:{

            type:STRING

        },
        Estado:{

            type:BOOLEAN

        },
        DireccionAlmacen:{

            type:STRING

        }

});
//EXPORTANDO EL MODELO DE VENDEDOR
module.exports=Vendedor;
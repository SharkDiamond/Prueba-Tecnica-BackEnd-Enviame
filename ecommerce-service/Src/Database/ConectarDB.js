//IMPORTACIONES
const {Sequelize}=require('sequelize');

//CREANDO LA CONEXION CON LA BASE DE DATOS
const db= new Sequelize('ECOMMERCE_MYSQL','laptop2','!0sn2o2oit3o3O',{

    host:"172.26.9.115",
    dialect:"mysql",
    logging:false

});

//EXPORTANDO DICHA CONEXION
module.exports=db;
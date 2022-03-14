//IMPORTACIONES
const {Sequelize}=require('sequelize');

//CREANDO LA CONEXION CON LA BASE DE DATOS
const db= new Sequelize(process.env.SQL_ALCHEMY_DATABASE,process.env.MYSQL_USER,'!0sn2o2oit3o3O',{

    host:process.env.SQL_ALCHEMY_HOST,
    dialect:"mysql", 
    logging:false

});

//EXPORTANDO DICHA CONEXION
module.exports=db;

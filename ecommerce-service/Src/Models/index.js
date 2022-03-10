//IMPORTACIONES
const Vendedor = require("./vendedor-Model");
const Producto = require("./producto-Model");
const usuarioMercado = require("./usuarioMercado-Model");

//HACIENDO LA RELACION DE 1 A MUCHOS 
Vendedor.hasMany(Producto);
//HACIENDO LA RELACION DE  1 A 1
Producto.belongsTo(Vendedor,{foreignKey:'VendedorId'});

//EXPORTACIONES
module.exports={

    Vendedor,
    Producto,
    usuarioMercado

}

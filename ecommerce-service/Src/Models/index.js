//IMPORTACIONES
const Vendedor = require("./vendedor-Model");
const Producto = require("./producto-Model");
const usuarioMercado = require("./usuarioMercado-Model");

//HACIENDO LA RELACION DE 1 A MUCHOS 
Vendedor.hasMany(Producto,{foreignKey:"IdVendedor"});

Producto.belongsTo(Vendedor,{foreignKey:"IdVendedor"});
//EXPORTACIONES
module.exports={

    Vendedor,
    Producto,
    usuarioMercado

}

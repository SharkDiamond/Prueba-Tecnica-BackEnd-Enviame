//IMPORTACIONES
const Vendedor = require("./vendedor-Model");
const Producto = require("./producto-Model");
const usuarioMercado = require("./usuarioMercado-Model");
const Pedido = require("./pedidos-Model");


Vendedor.hasMany(Producto,{foreignKey:"IdVendedor"});

Producto.belongsTo(Vendedor,{foreignKey:"IdVendedor"});


//MALO
usuarioMercado.hasMany(Pedido,{foreignKey:"UsuarioMercadoId"});

Producto.hasMany(Pedido,{foreignKey:"Sku"});

Vendedor.hasMany(Pedido,{foreignKey:"VendedorId"});


//EXPORTACIONES
module.exports={

    Vendedor,
    Producto,
    usuarioMercado,
    Pedido

}

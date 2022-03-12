//IMPORTACIONES
const Pedido = require("./pedido-Model");
const Entrega = require("./entrega-Model");


Pedido.hasOne(Entrega,{foreignKey:"foreing_order_id"});

Entrega.belongsTo(Pedido,{foreignKey:"foreing_order_id"});
//EXPORTACIONES
module.exports={Pedido,Entrega};
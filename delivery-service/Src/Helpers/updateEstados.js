//IMPORTACIONES 
const Entrega = require("../Models/entrega-Model");

const updateEstateTime=async()=>{


    try {
        
        setInterval(async()=>{

        //BUSCANDO ENTREGAS EL CUAL SU ESTADO ESTE EN 'EN_RUTA_DE_ENTREGA'
        const findProductEstateEntrega=await Entrega.findAll({ where: {'estado':'EN_RUTA_DE_ENTREGA'}});
        //EN DADO CASO NO HAYA ENTREGAS EN RUTA DE ENTREGA
        if (findProductEstateEntrega.length==0) return console.log(`No se actulizo el estado de ninguna entrega ya que no hay entregas en estado EN_RUTA_DE_ENTREGA`);
        //NUMERO MINIMO
        const  min = Math.ceil(1);
        //NUMERO MAXIMO
        const  max = Math.floor(10);
        //SACANDO EL NUMERO RAMDO CON 50% DE PROBABILIDAD DE QUE SEA MENOR A 5 0 MAYOR A 5
        const numero= Math.floor(Math.random() * (max - min) + min); 
        //SACANDO EL VALOR DEL ESTADO A CAMBIAR SEGUN EL VALOR DEVUELTO
        let estado= numero>5 ? "ENTREGADO" : "EN_RUTA_DE_ENTREGA";
        //SI ES MENOR A 5 QUIERE DECIR QUE EL PRODUCTO NO SE PUDO ENTREGAR LO QUE SIGNIFICA QUE QUEDA EN RUTA DE ENTREGA
        if (estado=="EN_RUTA_DE_ENTREGA") return console.log('Los productos no se pudieron entregar vuelven a EN_RUTA_DE_ENTREGA');
        //ACTUALIZANDO LAS ENTREGAS QUE TIENEN EL ESTADO DE EN_RUTA_DE_ENTREGA
        const [numberUpdate]= await Entrega.update( { estado }, { where: {'estado':'EN_RUTA_DE_ENTREGA' } });
        //MENSAJE DE ACTUALIZACION
        let messageUpdateConsole= numberUpdate>0 ? `Se actualizo el estado de ${numberUpdate} entregas al estado de ENTREGADO` 
        : `No se actulizo el estado de ninguna entrega ya que no hay entregas en estado EN_RUTA_DE_ENTREGA`;
        //IMPRIMIENDO EN CONSOLA
        console.log(messageUpdateConsole);

        }, 30000);
      
    } catch (error) {

            console.log(error.message);
    
    }



}

//EXPORTACIONES
module.exports={updateEstateTime};
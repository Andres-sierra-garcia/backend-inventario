import movimientosModel from "../models/movimientos.js";
import ArticulosModel from "../models/articulos.js"; 

const helperMovimientos = {
    validarId : async (id)=>{
        const existe = await movimientosModel.findById(id)
        if(!existe){
            throw new Error ("el id no existe")
        }
    },

    validarIdArticulo : async (id)=>{
        const existe = await ArticulosModel.findById(id)
        if(!existe){
            throw new Error ("el id no existe")
        }
    }
}
 export default helperMovimientos
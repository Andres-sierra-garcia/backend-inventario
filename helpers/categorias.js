import categoriasModel from "../models/categorias.js";

const helperCategorias ={
    validarId : async (id)=>{
        const existe = await categoriasModel.findById(id)
        if(!existe){
            throw new Error ("el id no existe")
        }
    }
}

export default helperCategorias
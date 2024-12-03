import tercerosModel from "../models/terceros.js";



const helperTerceros = {
    
    validarId: async (id)=>{
        const existe = await tercerosModel.findById(id)
        if(!existe){
            throw new Error ("el id no existe")
        }
    }
}

export default helperTerceros
import ArticulosModel from "../models/articulos.js"

const helperArticulos ={
    validarId: async (id)=>{
        const existe = await ArticulosModel.findById(id)
        if(!existe){
            throw new Error ("el id no existe")
        }
    },

    validarCategoria:async (Categoria)=>{
        const existe  = await ArticulosModel.find({categoria:Categoria})
        if(existe.length == 0){
            throw new Error ("no existen articulos en la categoria: " + Categoria)
        }
    }
}

export default helperArticulos
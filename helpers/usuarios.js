import usuariosModel from "../models/usuarios.js";

const helperUsuarios = {
    validarId: async (id)=>{
        const existe = await usuariosModel.findById(id)
        if(!existe){
            throw new Error ( "el id no existe")
        }
    }
}

export default helperUsuarios
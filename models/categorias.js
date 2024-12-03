import mongoose from 'mongoose';
const categoriasSchema = new mongoose.Schema(
    {
    nombre:{type:String, required:true},
    descripcion:{type:String, required:true},
    estado:{type:Number, required: true, default:1}  //activos:1   inactivos:0
    },{
        timestamps:true
    }
)


const categoriasModel = mongoose.model("categorias",categoriasSchema)
export default categoriasModel
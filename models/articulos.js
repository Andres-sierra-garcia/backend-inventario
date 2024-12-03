import mongoose from 'mongoose';
const articulosSchema = new mongoose.Schema({
    nombre:{type:String, required:true},
    precio:{type:Number, required:true},
    stock:{type:Number, required:true},
    imagen:{type:String, required:true},
    categoria:{type:mongoose.Schema.Types.ObjectId, required: true, ref:"categorias" },
    estado:{type:Number, required:true, default:1} //1:activo 0:inactivo
},{
    timestamps:true
});

const ArticulosModel = mongoose.model("articulos", articulosSchema);
export default ArticulosModel
import mongoose from 'mongoose'
const movimientosSchema = new mongoose.Schema({
    tipo:{type:Number, required: true}, //entrada = 1 , salida = 2 , devolucionEntrada = 3, devolucionSalida = 4
    numeroFactura:{type:String, required: true},
    fecha:{type:Date, required: true},
    articulos:[{
        id:{type:mongoose.Schema.Types.ObjectId, required: true, ref:"articulos" },
        cantidad:{type:Number, required: true},
        precio: { type:Number, required: true }
    }],
    valor:{type:Number, required: true}, 
    iva:{type:Number, required: true},
    total:{type:Number, required: true},
    estado:{type:Number, required: true, default:1}  // 1:activo 0:inactivo
},
{
    timestamps:true
})
 
const movimientosModel = mongoose.model("movimientos", movimientosSchema)
export default movimientosModel
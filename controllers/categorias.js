import categoriasModel from '../models/categorias.js'
import Categorias from '../models/categorias.js'


const postCategorias = async (req, res) => {
    try {
        const { nombre,  descripcion, estado } = req.body
        const categoria = new Categorias({
            nombre,
            descripcion,
            estado
        })
        await categoria.save()
        res.json({ categoria })
    } catch (error) {
        res.status(400).json({ error: "parece que hubo un fallo al registrar la categoria" })
        console.log(error);
    }
}

const putCategorias =async (req,res)=>{
    try {
        const {id}=req.params
    const {nombre, descripcion, estado}=req.body
    const categoria = await Categorias.findByIdAndUpdate(id, { nombre, descripcion,estado},{new:true})
    res.json({categoria})
    } catch (error) {
        res.status(400).json({error:"hubo un error al actualizar la categoria"})
    console.log(error);
    }
}


const getCategorias = async (req, res)=>{
  try {
    const categorias = await Categorias.find();
    res.json({categorias})
  } catch (error) {
    res.status(400).json({error:"parece que hubo un error al listar todas las categorias"})
    console.log(error);
  }
}

const getCategoria = async (req, res)=>{
    try {
        const {id}=req.params
    const categoria = await Categorias.findById(id);
    res.json({categoria})
    } catch (error) {
        res.status(400).json({error:"parece que hubo un error al traer la categoria"})
        console.log(error);
    }
}

const getCategoriasActivas_Inactivas = async (req, res)=>{
    try {
        const {Estado}= req.params
        if (Estado == "activas"){
            const categorias = await Categorias.find({estado:1})
            res.json({categorias})
        }else if(Estado == "inactivas"){
            const categorias = await Categorias.find({estado:0})
            res.json({categorias})
        }
    } catch (error) {
        const {estado}= req.params
        res.status(400).json({error:"parece que hubo un fallo al traer las categorias"+ estado})
        console.log(error);
    }
}

const putActivarInactivar = async (req,res)=>{
  try {
    const {id}=req.params
    const categoria = await categoriasModel.findById(id)
    if(categoria.estado == 1){
        const categoria = await Categorias.findByIdAndUpdate(id,{estado:0},{new:true})
        res.json({categoria})
    }
    else {
        const categoria = await Categorias.findByIdAndUpdate(id,{estado:1},{new:true})
        res.json({categoria})
    }
  } catch (error) {
    res.status(400).json({error:"parece que hubo un error al realizar la operacion"})
    console.log(error);
  }
}

export {
    postCategorias,
    putCategorias,
    getCategorias,
    getCategoria,
    getCategoriasActivas_Inactivas,
    putActivarInactivar
} 
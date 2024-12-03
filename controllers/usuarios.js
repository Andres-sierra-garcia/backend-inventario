import usuariosModel from "../models/usuarios.js";
import { generarJWT } from "../middlewares/validarjwt.js";
import bcrypt from 'bcrypt'


const postUsuarios = async (req, res) => {
    try {
        const { email, contraseña } = req.body
        const contraseñaEncriptada = bcrypt.hashSync(contraseña, 10)
        const usuario = new usuariosModel({
            email,
            contraseña: contraseñaEncriptada
        })
        await usuario.save()
        res.json({ usuario })
    } catch (error) {
        res.status(400).json({ error: "erro al realizaer la operacion" })
        console.log(error);
    }
}


const putUsuarios = async (req, res) => {
    try {
        const { contraseña ,estado } = req.body
        const contraseñaEncriptada = bcrypt.hashSync(contraseña, 10)
        const { id } = req.params
        const usuario = await usuariosModel.findByIdAndUpdate(id, {contraseña:contraseñaEncriptada, estado },{ new: true })
        res.json({ usuario })
    } catch (error) {
        res.status(400).json({ error: "error en la operacion" })
        console.log(error);
    }
}


const getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosModel.find()
        res.json({ usuarios })
    } catch (error) {
        res.status(400).json({error:"error en la operacion"})
        console.log(error);
    }
}


const getUsuario = async (req, res) => {
    try {
        const {id}= req.params
        const usuario = await usuariosModel.findById(id)
        res.json({ usuario })
    } catch (error) {
        res.status(400).json({error:"error en la operacion"})
        console.log(error);
    }
}


const putActivarInactivar = async (req, res)=>{
    try {
        const {accion} = req.params
        const {id}= req.params
        if(accion == "activar"){
            const activar = await usuariosModel.findByIdAndUpdate(id,{estado:1},{new:true})
            res.json({activar})
        }
        else if(accion == "inactivar"){
            const inactivar = await usuariosModel.findByIdAndUpdate(id,{estado:0},{new:true})
            res.json({inactivar})
        }
    } catch (error) {
        res.status(400).json({error:"parece que hubo un error al realizar la operacion"})
    }
}


const postLogin = async (req, res) => {
    const { email, contraseña } = req.body;
    try {
        const usuario = await usuariosModel.findOne({email});
        console.log(usuario);
        if (!usuario) {
            return res.status(400).json({ msg: "usuario / email incorrecto"});
        }
        if (usuario.estado === "0") {
            return res.status(400).json({
                msg: "usuario inactivo",
            });
        }
        const validPassword = bcrypt.compareSync(contraseña, usuario.contraseña);// tengo  que crear un campo para contraseña y hacer la parte de guardarla encriptado en la bd
        if (!validPassword) {
            return res.status(400).json({
                msg: "usuario / contraseña incorrecta",
            });
        } 
        const token = await generarJWT(usuario._id);
        res.json({
            usuario,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "algo salio mal hable con el webMaster" });
    }
};

export{
    postUsuarios,
    putUsuarios,
    getUsuario, 
    getUsuarios,
    putActivarInactivar,
    postLogin
}


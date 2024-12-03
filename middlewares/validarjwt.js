import jwt from 'jsonwebtoken'
import usuariosModel from '../models/usuarios.js';

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: "4h",
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("no se pudo generar el token");
                } else {
                    resolve(token);
                }
            }
        );
    });
}


const validarJWT = async (req, res, next)=>{
    const token = req.header("x-token");
    if(!token){
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        let user = await usuariosModel.findById(uid)
        console.log(uid);
        if(!user){
            return res.status(401).json({
                msg:"Token no valido - usuario no existe"
            })
        }
        if(!user.estado){
            return res.status(401).json({
                msg:"Token no valido - usuario inactivo"
            })
        }
        next()

    } catch (error) {
        res.status(401).json({
            msg:"Token no valido"
        })
    }
}

export {generarJWT, validarJWT}

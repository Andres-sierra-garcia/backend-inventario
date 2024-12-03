import Router from "router";    
import { check } from "express-validator";
import validarCampos from "../middlewares/validarCampos.js";
import helperUsuarios from "../helpers/usuarios.js";
import { validarJWT } from "../middlewares/validarjwt.js";
import {
    postUsuarios,
    putUsuarios,
    getUsuarios,
    getUsuario,
    putActivarInactivar,
    postLogin
} from '../controllers/usuarios.js'
const router = Router()


//registrar un usuario
router.post("/",[
    check("email","el email no puede ir vacio").notEmpty(),
    check("contraseña","la contraseña no debe ir vacia").notEmpty(),
    validarCampos
],postUsuarios)

//actualizar un usuario
router.put("/modificar/:id",[
    validarJWT,
    check("id","el id no es valido").isMongoId(),
    check("id","el id no existe").custom(helperUsuarios.validarId),
    validarCampos
],putUsuarios)

//traer todos los usuarios
router.get("/usuarios",[
    validarJWT,
],getUsuarios)

//traer usuario por id
router.get("/usuario/:id",[
    validarJWT,
    check("id","el id no es valido").isMongoId(),
    check("id","el id no existe").custom(helperUsuarios.validarId),
    validarCampos
],getUsuario)

//activar o inactivar un usuario
router.put("/usuario/:accion/:id",[
    validarJWT,
    check("accion","debe digitar 'activar o inactivar'").isIn(["activar","inactivar"]),
    check("id","el id no es valido").isMongoId(),
    check("id","el id no existe").custom(helperUsuarios.validarId),
    validarCampos
], putActivarInactivar)

//logearse
router.post("/login",postLogin)

export default router 
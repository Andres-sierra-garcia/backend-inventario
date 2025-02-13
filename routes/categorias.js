import Router from "router";
import { check } from "express-validator";
import validarCampos from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validarjwt.js";
import helperCategorias from "../helpers/categorias.js";
const router = Router();
import {
    postCategorias,
    putCategorias,
    getCategorias,  
    getCategoria,
    getCategoriasActivas_Inactivas,
    putActivarInactivar,
} from "../controllers/categorias.js";



//registrar una categoria
router.post("/",[
    validarJWT,
    check("descripcion","es necesaria una descripcion de la categoria").notEmpty(),
    check("estado","el estado debe ser 0 o 1").optional().isInt({min:0, max:1}),
    validarCampos   
], postCategorias);

//modificar una categoria
router.put("/categoria/:id",[
    validarJWT,
    check("id","el id no es valido").isMongoId(),
    check("id","el id no existe").custom(helperCategorias.validarId),
    validarCampos
], putCategorias);

//traer todas las categorias
router.get("/categorias",[
    validarJWT
], getCategorias);

//traer categoria por id
router.get("/Categoria/:id",[
    validarJWT,
    check("id","el id no es valido").isMongoId(),
    check("id","el id no existe").custom(helperCategorias.validarId),
    validarCampos
], getCategoria);

//traer categorias activas o inactivas
router.get("/categorias/:Estado",[
    validarJWT,
    check("Estado","debe ser o activas o inactivas").isIn(["activas", "inactivas"]),
    validarCampos
], getCategoriasActivas_Inactivas);

//activar o inactivar
router.put("/cambiarEstado/:id",[
    validarJWT,
    check("id","el id no es valido").isMongoId(),
    check("id","el id no existe").custom(helperCategorias.validarId),
    validarCampos
], putActivarInactivar);

export default router;

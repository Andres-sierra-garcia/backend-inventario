import Router from "router";
import { check } from "express-validator";
import helperTerceros from "../helpers/terceros.js";
import validarCampos from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validarjwt.js";
import {
    postTerceros,
    putTerceros,
    getTerceros,
    getTercero,
    getActivosinactivos,
    putActivarInactivar,
    getTercerosTipo,
} from "../controllers/terceros.js";
const router = Router();

//registrar un tercero
router.post("/",[
    check("nombre","debe ingresar un nombre").notEmpty(),
    check("nombre","el nombre debe ser un texto").isString(),
    check("identificacion","debe ingresar una identificacion").notEmpty(),
    check("identificacion","la identificaion debe ser un valor numerico").isNumeric(),
    check("direccion","la direccion no debe estar vacia").notEmpty(),
    check("direccion","la direccion debe ser un texto").isString(),
    check("telefono","por favor ingrese un numero telefonico").notEmpty(),
    check("tipo","debe ingresar un tipo").notEmpty(),
    check("tipo","el tipo debe ser 1 o 2 , 1 para cliente y 2 para proveedor").isInt({min:1, max:2}),
    validarCampos
], postTerceros);

//actualizar un tercero
router.put("/tercero/:id",[
    check("id","el id no es valido").isMongoId(),
    check("id","el id no existe en la base de datos").custom(helperTerceros.validarId),
    validarCampos
], putTerceros);

//traer todos los terceros
router.get("/terceros", getTerceros);

//traer tercero por id
router.get("/tercero/:id",[
    check("id","el id no es valido").isMongoId(),
    check("id","el id no existe en la base de datos").custom(helperTerceros.validarId),
    validarCampos
], getTercero);

//traer activos o inactivos
router.get("/terceros/:accion",[
    check("accion","debe digitar 'activos o inactivos'").isIn(["activos","inactivos"]),
    validarCampos
], getActivosinactivos);

//activar o inactivar un tercero
router.put("/:accion/:id",[
    check("accion","debe digitar activar o inactivar").isIn(["activar", "inactivar"]),
    check("id","el id no es valido").isMongoId(),
    check("id","el id no existe en la bd").custom(helperTerceros.validarId),
    validarCampos
], putActivarInactivar);



//de aqui para abajo son las peticiones especificas
router.get("/tipos/:tipo",[
    check("tipo","el tipo debe ser o cliente o proveedor").isIn(["cliente", "proveedor"]),
    validarCampos
], getTercerosTipo)




export default router;

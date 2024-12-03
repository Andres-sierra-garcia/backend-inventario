import Router from "router";
import { check } from "express-validator";
import validarCampos from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validarjwt.js";
import helperMovimientos from "../helpers/movimientos.js";
const router = Router();
import {
    postMovimientos,
    putMovimientos,
    getMovimientos,
    getMovimiento,
    getActivosinactivos,
    putActivarInactivar,
    getMovimientoTipo,
    getMovimientosFechas
} from "../controllers/movimientos.js";

//registrar un nuevo movimiento
router.post("/",[
    validarJWT,
    check("tipo","el tipo debe ser un numero").isNumeric(),
    check("numeroFactura","la factura debe ser un texto").isString(),
    check("fecha","el formato de la fecha es incorrecto").isString(),
    check("articulos","articulos debe ser un array").isArray(),
    check("articulos.*.cantidad","cantidad debe ser un numero").isNumeric(),
    check("valor","debe ser un valor numerico").isNumeric(),
    check("total","debe ser un valor numerico").isNumeric(),
    check("estado","el estado debe ser 0 o 1").optional().isInt({min:0, max:1}),
    validarCampos
], postMovimientos);

//actualizar un movimiento
router.put("/actualizar/:ide",[
    validarJWT,
    check("ide","el id no es valido").isMongoId(),
    check("ide","el id no existe").custom(helperMovimientos.validarId),
    validarCampos
],putMovimientos);

//traer todos los movimientos
router.get("/movimientos",[
    validarJWT,
], getMovimientos);

//traer un movimiento por id
router.get("/movimiento/:id",[
    validarJWT,
    check("id","el id no es valido").isMongoId(),
    check("id","el id no existe").custom(helperMovimientos.validarId),
    validarCampos
], getMovimiento);

//traer todos los movimientos activos
router.get("/movimientos/:accion",[
    validarJWT
], getActivosinactivos);

//activar o inactivar un movimiento
router.put("/:accion/:id",[
    validarJWT,
    check("id","el id no es valido").isMongoId(),
    check("id","el id no existe").custom(helperMovimientos.validarId),
    validarCampos
], putActivarInactivar);



//de aqui para abajo son las peticiones especificas

//traer movimientos por tipo
router.get("/tipo/:tipo",[
    validarJWT
],getMovimientoTipo)

//traer movimientos entre fechas
router.get("/fechas/:fechaInicio/:fechaFin",[
    validarJWT,
    check("fechaInicio","la fecha no es valida debe ser algo como esto '2024-05-01'").isDate(),
    check("fechaFin","la fecha no es valida debe ser algo como esto '2024-05-01'").isDate(),
    validarCampos
],getMovimientosFechas)

export default router;

import Router from 'router'
import { check } from 'express-validator';
import validarCampos from '../middlewares/validarCampos.js';
import { validarJWT } from '../middlewares/validarjwt.js';
import helperArticulos from '../helpers/articulos.js';
const router = Router();
import {
    postArticulos,
    putArticulos,
    getArticulos,
    getArticulo,
    getArticulosActivos,
    getArticulosInactivos,
    putActivar,
    putInactivar,
    getCategorias,
    getArticuloStock
} from '../controllers/articulos.js'

//registrar articulos
router.post("/",[
    validarJWT,
    check("nombre","el  nombre es obligatorio").notEmpty(),
    check("nombre","el nombre no puede tener mas de 40 caracteres").isLength({max:40}),
    check("precio","el precio es obligatorio").notEmpty(),
    check("precio","el precio debe ser un valor numerico").isNumeric(),
    check("precio", "el precio debe ser un numero mayor a 0").isFloat({gt:0}),
    check("imagen","la imagen es obligatoria").notEmpty(),
    check("imagen","la imagen debe ser una URL de texto").isString(),
    check("categoria","la categoria no puede estar vacia").notEmpty(),
    check("categoria","la categoria debe ser un texto").isString(),
    check("estado","el estado debe ser 0 o 1").optional().isInt({min:0, max:1}),
    validarCampos
],postArticulos)

//modificar articulos por id
router.put("/articulo/:id",[
    validarJWT,
    check("id","el id no es valido").isMongoId(),
    check("id","el  id no existe en la base de datos").custom(helperArticulos.validarId),
    validarCampos
], putArticulos)

//traer todos los articulos
router.get("/articulos",[
    validarJWT
], getArticulos)

//traer por articulo por id
router.get("/articulo/:id",[
    validarJWT,
    check("id","el  id no es valido").isMongoId(),
    check("id","el  id no existe").custom(helperArticulos.validarId),
    validarCampos
], getArticulo)

//traer articulos activos
router.get("/activos",[
    validarJWT
], getArticulosActivos)

//traer articulos inactivos
router.get("/inactivos",[
    validarJWT
], getArticulosInactivos)

//activar articulo
router.put("/activar/:id",[
    validarJWT,
    check("id","el id no es valido").isMongoId(),
    check("id","el  id no existe").custom(helperArticulos.validarId),
    validarCampos
], putActivar)

//inactivar articulo
router.put("/inactivar/:id",[
    validarJWT,
    check("id","el id no es valido").isMongoId(),
    check("id","el  id no existe").custom(helperArticulos.validarId),
    validarCampos
], putInactivar)




//de aqui para abajo son las peticiones especificas

//traer articulos por categoria
router.get("/categoria/:Categoria",[
    validarJWT,
    check("Categoria","debe especificar una categoria").notEmpty(),
    check("Categoria","no hay articulos en esta categoria").custom(helperArticulos.validarCategoria),
    validarCampos
],getCategorias)

//buscar articulos en stock por debajo de cierta cantidad o sicho de otra forma los que estan por agotarse
router.get("/stock/:cantidad",[
    validarJWT,
    check("cantidad","la cantidad debe ser un numero").isNumeric(),
    validarCampos
],getArticuloStock)
export default router
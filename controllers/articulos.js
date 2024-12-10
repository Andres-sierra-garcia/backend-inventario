import ArticulosModel from "../models/articulos.js";
import categoriasModel from "../models/categorias.js";

const postArticulos = async (req, res) => {
    try {
        const { nombre, precio, stock, imagen, categoria, estado } = req.body;
        const articulos = new ArticulosModel({
            nombre,
            precio,
            stock,
            imagen,
            categoria, //lo que llega aqui es un id 
            estado,
        });
        await articulos.save();
        res.json({ articulos });
    } catch (error) {
        res.status(400).json({ error: "No se pudo registrar el articulo" });
        console.log(error);
    }
};

const putArticulos = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock, imagen, categoria, estado } = req.body;
        const Categoria = await categoriasModel.find({nombre:categoria})      
        const articulo = await ArticulosModel.findByIdAndUpdate(
            id,
            { nombre, precio, stock, imagen, categoria:Categoria._id, estado },
            { new: true }
        );
        res.json({ articulo });
    } catch (error) {
        res
            .status(400)
            .json({ error: "los datos no han sido modificados correctamente" });
        console.log(error);
    }
};

const getArticulos = async (req, res) => {
    try {
        const articulos = await ArticulosModel.find().populate("categoria");
        res.json({ articulos });
    } catch (error) {
        res
            .status(400)
            .json({ error: "hubo un fallo al traer todos los articulos" });
        console.log(error);
    }
};

const getArticulo = async (req, res) => {
    try {
        const { id } = req.params;
        const articulo = await ArticulosModel.findById(id).populate("categoria");
        res.json({ articulo });
    } catch (error) {
        res.status(400).json({ error: "error al traer el articulo" });
        console.log(error);
    }
};

const getArticulosActivos = async (req, res) => {
    try {
        const articulos = await ArticulosModel.find({ estado: 1 });
        res.json({ articulos });
    } catch (error) {
        res
            .status(400)
            .json({ error: "error al listar todos los articulos activos" });
        console.log(error);
    }
};

const getArticulosInactivos = async (req, res) => {
    try {
        const articulos = await ArticulosModel.find({ estado: 0 });
        res.json({ articulos });
    } catch (error) {
        res
            .status(400)
            .json({ error: "error al listar todos los articulos inactivos" });
        console.log(error);
    }
};

const putActivar = async (req, res) => {
    try {
        const { id } = req.params;
        const articulo = await ArticulosModel.findByIdAndUpdate(
            id,
            { estado: 1 },
            { new: true }
        );
        res.json({ articulo });
    } catch (error) {
        res.status(400).json({ error: "error al activar el articulo" });
        console.log(error);
    }
};

const putInactivar = async (req, res) => {
    try {
        const { id } = req.params;
        const articulo = await ArticulosModel.findByIdAndUpdate(
            id,
            { estado: 0 },
            { new: true }
        );
        res.json({ articulo });
    } catch (error) {
        res.status(400).json({ error: "error al activar el articulo" });
        console.log(error);
    }
};

const getCategorias = async (req, res) => {
    try {
        const { Categoria } = req.params;
        const articulos = await ArticulosModel.find({ categoria: Categoria });
        res.json({ articulos });
    } catch (error) {
        res.status(400).json({ error: "error al completar la operacion" });
        console.log(error);
    }
};

const getArticuloStock = async (req, res) => {
    try {
        const { cantidad } = req.params
        const articulos = await ArticulosModel.find({ stock: { $lt: cantidad } })
        if(articulos.length ==0){
            res.json("no se encontraron articulos")
        }
        else{
        res.json({ articulos })
            
        }
    } catch (error) {
        res.status(400).json({ error: "error al realizar la operacion" })
        console.log(error);
    }
}

export {
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
};

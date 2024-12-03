import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import articulos from './routes/articulos.js'
import categorias from './routes/categorias.js'
import movimientos from './routes/movimientos.js'
import terceros  from './routes/terceros.js'
import usuarios from './routes/usuarios.js'
 
const app= express()
app.use(express.json())
app.use(express.static('public'))
app.use(cors())
app.use("/api/articulos", articulos)
app.use("/api/categorias",categorias)
app.use("/api/movimientos",movimientos)
app.use("/api/terceros",terceros)
app.use("/api/usuarios", usuarios)

dotenv.config()

app.listen(process.env.PORT,()=>{
    console.log("Escuchando en el puerto"+ process.env.PORT);
    mongoose.connect(process.env.CNX_MONGO)
    .then(()=>console.log("conected!"))
    .catch((error)=>console.log(error))
})
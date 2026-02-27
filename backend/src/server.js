import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from "./routers/auth_routes.js";
import cadeteRoutes from "./routers/cadete_routes.js";
import accionRoutes from "./routers/accion_routes.js";

dotenv.config()

const app = express()

//Middleware para parsear JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Rutas
app.get('/',(req,res)=> res.send("API funcionando correctamente 🚀"))
app.use("/api", authRoutes);
app.use("/api", cadeteRoutes);
app.use("/api", accionRoutes);



app.use((req,res) =>
  res.status(404).send("Endpoint no encontrado - 404")
)


// Exportar la instancia de express por medio de app
export default app
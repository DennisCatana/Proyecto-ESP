import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import personaRoutes from './routers/persona_routes.js'
import usuarioRoutes from './routers/usuario_routes.js'

dotenv.config()

const app = express()

// Configuraciones 
app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo')
})

app.use(cors())

//Middleware para parsear JSON
app.use(express.json())


//Rutas
app.use('/api', personaRoutes)
app.use('/api', usuarioRoutes)



app.use((req,res) =>
  res.status(404).send("Endpoint no encontrado - 404")
)



app.get('/', (req, res) => {
  res.send("Servidor corriendo")
})

// Exportar la instancia de express por medio de app
export default app
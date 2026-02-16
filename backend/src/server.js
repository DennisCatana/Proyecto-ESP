import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import personaRoutes from './routers/persona_routes.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send("Servidor corriendo")
})

app.use('/api', personaRoutes)

app.use((req,res) =>
  res.status(404).send("Endpoint no encontrado - 404")
)

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo')
})


export default app
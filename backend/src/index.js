import app from './server.js'
import { connectDatabase } from './database.js'


const PORT = process.env.PORT || 3000

// Primero conectamos la base
connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor listo en http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error al conectar la base de datos:', error)
  })

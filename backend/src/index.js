import app from './server.js'
import prisma from './prisma/client.js'


const PORT = process.env.PORT || 3000


// Conectar la base de datos y luego iniciar el servidor
const connectDatabase = async () => {
  try {
    await prisma.$connect()
    console.log('Base de datos conectada correctamente')
  } catch (error) {
    console.error('Error conectando a la base:', error)
    process.exit(1)
  }
}

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor listo en http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error al conectar la base de datos:', error)
  })

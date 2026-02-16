import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const connectDatabase = async () => {
  try {
    await prisma.$connect()
    console.log('Base de datos conectada correctamente')
  } catch (error) {
    console.error('Error conectando a la base:', error)
    process.exit(1)
  }
}

export default prisma

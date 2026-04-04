import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10)

  // Crear administrador
  const adminUser = await prisma.usuario.upsert({
    where: { correo: 'admin@esp.com' },
    update: {},
    create: {
      correo: 'admin@esp.com',
      password: passwordHash,
      rol: 'Administrador',
      cambioPassword: false,
      activo: true
    }
  })

  const admin = await prisma.administrador.upsert({
    where: { usuarioId: adminUser.id },
    update: {},
    create: {
      usuarioId: adminUser.id,
      nombre: 'Administrador Principal',
      estado: true
    }
  })

  console.log('✅ Admin creado:')
  console.log('- Email: admin@esp.com')
  console.log('- Password: admin123')
  console.log('- Rol: Administrador')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


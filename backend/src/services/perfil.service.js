import bcrypt from 'bcryptjs'
import prisma from "../prisma/client.js"

// Genera credenciales por defecto al crear el perfil
const generarPasswordTemporal = (cedula) => cedula.slice(-6) // últimos 6 dígitos de cédula

export const crearCadete = async (datos) => {
  const passwordHash = await bcrypt.hash(generarPasswordTemporal(datos.cedula), 10)

  return await prisma.$transaction(async (tx) => {
    // 1. Crear usuario de login
    const usuario = await tx.usuario.create({
      data: {
        correo: datos.correo,
        password: passwordHash,
        rol: 'Cadete',
        cambioPassword: true, // fuerza cambio en primer login
      }
    })

    // 2. Crear perfil cadete vinculado
    const cadete = await tx.cadete.create({
      data: {
        usuarioId: usuario.id,
        nombre: datos.nombre,
        cedula: datos.cedula,
        promocion: datos.promocion,
        cia: datos.cia,
        seccion: datos.seccion,
        correo: datos.correo,
        telefono: datos.telefono,
        genero: datos.genero,
        fecha_nacimiento: datos.fecha_nacimiento,
        // ...resto de campos opcionales
      }
    })

    return { usuario, cadete }
  })
}

export const crearInstructor = async (datos) => {
  const passwordHash = await bcrypt.hash(generarPasswordTemporal(datos.cedula), 10)

  return await prisma.$transaction(async (tx) => {
    const usuario = await tx.usuario.create({
      data: {
        correo: datos.correo,
        password: passwordHash,
        rol: 'Instructor',
        cambioPassword: true,
      }
    })

    const instructor = await tx.instructor.create({
      data: {
        usuarioId: usuario.id,
        nombre: datos.nombre,
        cedula: datos.cedula,
        telefono: datos.telefono,
        especialidad: datos.especialidad,
        grado: datos.grado,
      }
    })

    return { usuario, instructor }
  })
}

export const crearAdministrador = async (datos) => {
  const passwordHash = await bcrypt.hash(datos.passwordInicial, 10)

  return await prisma.$transaction(async (tx) => {
    const usuario = await tx.usuario.create({
      data: {
        correo: datos.correo,
        password: passwordHash,
        rol: 'Administrador',
        cambioPassword: true,
      }
    })

    const administrador = await tx.administrador.create({
      data: {
        usuarioId: usuario.id,
        nombre: datos.nombre,
      }
    })

    return { usuario, administrador }
  })
}

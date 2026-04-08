import bcrypt from 'bcryptjs'
import prisma from "../prisma/client.js"

// Genera credenciales por defecto al crear el perfil
const generarPasswordTemporal = (cedula) => cedula.slice(-6) // últimos 6 dígitos de cédula

export const crearCadete = async (datos) => {
  const passwordHash = await bcrypt.hash(generarPasswordTemporal(datos.cedula), 10)

  // Convertir fecha si viene como string
  let fecha_nacimiento = null
  if (datos.fecha_nacimiento) {
    const parsed = new Date(datos.fecha_nacimiento)
    fecha_nacimiento = isNaN(parsed.getTime()) ? null : parsed
  }

  return await prisma.$transaction(async (tx) => {
    const usuario = await tx.usuario.create({
      data: {
        correo: datos.correo,
        password: passwordHash,
        rol: 'Cadete',
        cambioPassword: true,
      }
    })

    // antiguedad es Int? — parsear explícitamente para evitar strings vacíos
    const antiguedadInt = (datos.antiguedad != null && datos.antiguedad !== '')
      ? parseInt(datos.antiguedad, 10)
      : null;

    const cadete = await tx.cadete.create({
      data: {
        usuarioId:        usuario.id,
        nombre:           datos.nombre,
        cedula:           datos.cedula,
        promocion:        datos.promocion,
        cia:              datos.cia,
        seccion:          datos.seccion,
        correo:           datos.correo             || null,
        telefono:         datos.telefono           || null,
        genero:           datos.genero             || null,
        habitacion:       datos.habitacion         || null,
        grupo_guardia:    datos.grupo_guardia       || null,
        antiguedad:       Number.isNaN(antiguedadInt) ? null : antiguedadInt,
        seguro_medico:    datos.seguro_medico       || null,
        numero_emergencia:datos.numero_emergencia   || null,
        parentesco:       datos.parentesco          || null,
        lugar_nacimiento: datos.lugar_nacimiento    || null,
        lugar_residencia: datos.lugar_residencia    || null,
        fecha_nacimiento, // ya convertida a Date o null
      }
    })

    return { usuario, cadete }
  })
}

export const crearInstructor = async (datos) => {
  const passwordHash = await bcrypt.hash(datos.cedula, 10)

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

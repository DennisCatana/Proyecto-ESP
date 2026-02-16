import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//Crea una nueva persona

export const registrarPersona = async (req, res) => {
  const { cedula, grado, apellidoNombre, email } = req.body

  try {
    // Verificar si ya existe
    const personaExistente = await prisma.persona.findUnique({
      where: { cedula }
    })

    if (personaExistente) {
      return res.status(400).json({
        msg: 'La persona con esa cédula ya está registrada'
      })
    }

    const nuevaPersona = await prisma.persona.create({
      data: {
        cedula,
        grado,
        apellidoNombre,
        email
      }
    })

    res.status(200).json({
      msg: 'Persona registrada correctamente',
      persona: nuevaPersona
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: 'Error al registrar persona'
    })
  }
}
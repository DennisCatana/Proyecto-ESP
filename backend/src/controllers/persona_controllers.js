import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';


//Crea una nueva persona
export const registrarPersona = async (req, res) => {
  const { cedula, grado, apellidoNombre, password, rol } = req.body

  if (!cedula || !apellidoNombre || !password) {
    return res.status(400).json({
      msg: 'cedula, grado, nombres y password son obligatorios'
    })
  }

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

    const passwordHash = await bcrypt.hash(password, 10)

      const nuevaPersona = await prisma.persona.create({
        data: {
          cedula,
          grado,
          apellidoNombre,
          usuario: {
            create: {
              password: passwordHash,
              ...(rol ? { rol } : {})
            }
          }
        },
        include: {
          usuario: {
            select: {
              id: true,
              rol: true,
              personaCedula: true
            }
          }
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


//Listar a las personas registradas
  export const listarPersonas = async (req, res) => {
    try {
      const personas = await prisma.persona.findMany();
      res.status(200).json(personas);
    } catch (error) {
      console.error('Error, lista de personas:', error);
      res.status(500).send('Error, lista de personas');
    }
  }


//Actualizar datos de una persona
  export const actualizarPersona = async (req, res) => {
    const { cedula } = req.params;
    const { grado, apellidoNombre } = req.body;

    try {
      const personaActualizada = await prisma.persona.update({
        where: { cedula },
        data: {
          ...(grado && { grado }),
          ...(apellidoNombre && { apellidoNombre })
        }
      });

      res.status(200).json(personaActualizada);
    } catch (error) {
      console.error('Error al actualizar persona:', error);
      res.status(500).json({ msg: 'Error al actualizar persona' });
    }
  };


  // Eliminar una persona
  export const eliminarPersona = async (req, res) => {
    const { cedula } = req.params;

    try {
      const personaEliminada = await prisma.persona.delete({
        where: { cedula }
      });

      res.status(200).json({
        msg: 'Persona y usuario eliminados correctamente',
        persona: personaEliminada
      });

    } catch (error) {
      console.error('Error al eliminar una persona:', error);

      if (error.code === 'P2025') {
        return res.status(404).json({ msg: 'Persona no encontrada' });
      }

      res.status(500).json({ msg: 'Error al eliminar una persona' });
    }
  };

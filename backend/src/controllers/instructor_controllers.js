import prisma from "../prisma/client.js";
import { crearInstructor as crearInstructorService } from "../services/perfil.service.js";

export const listarInstructores = async (req, res) => {
  try {
    const instructores = await prisma.instructor.findMany({
      include: { usuario: { select: { id: true, correo: true, activo: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(instructores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearInstructor = async (req, res) => {
  try {
    const { nombre, cedula, correo } = req.body;
    if (!nombre || !cedula || !correo)
      return res.status(400).json({ error: 'Nombre, cédula y correo son requeridos' });
    const result = await crearInstructorService(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.code === 'P2002')
      return res.status(400).json({ error: 'Correo o cédula ya registrado' });
    res.status(500).json({ error: error.message });
  }
};

export const eliminarTodosInstructores = async (req, res) => {
  try {
    // Instructor se elimina en cascada desde Usuario
    await prisma.usuario.deleteMany({
      where: { rol: 'Instructor' }
    });

    res.json({ msg: 'Todos los instructores eliminados correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar instructores: ' + error.message });
  }
};


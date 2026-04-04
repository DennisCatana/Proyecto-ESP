import prisma from "../prisma/client.js";
import { crearAdministrador as crearAdministradorService } from "../services/perfil.service.js";

export const listarAdministradores = async (req, res) => {
  try {
    const admins = await prisma.administrador.findMany({
      include: { usuario: { select: { id: true, correo: true, activo: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearAdministrador = async (req, res) => {
  try {
    const { nombre, correo, passwordInicial } = req.body;
    if (!nombre || !correo || !passwordInicial)
      return res.status(400).json({ error: 'Nombre, correo y contraseña inicial son requeridos' });
    const result = await crearAdministradorService(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.code === 'P2002')
      return res.status(400).json({ error: 'Correo ya registrado' });
    res.status(500).json({ error: error.message });
  }
};

export const eliminarTodosAdministradores = async (req, res) => {
  try {
    const miUsuarioId = req.usuario.id; // del middleware auth

    // Administrador se elimina en cascada desde Usuario
    // Se excluye al admin que está haciendo la petición
    await prisma.usuario.deleteMany({
      where: {
        rol: 'Administrador',
        id: { not: miUsuarioId }
      }
    });

    res.json({ msg: 'Administradores eliminados (tu cuenta fue conservada)' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar administradores: ' + error.message });
  }
};


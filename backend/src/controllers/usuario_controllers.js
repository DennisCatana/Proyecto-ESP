import prisma from "../prisma/client.js";
import { hashPassword } from "../utils/password.js";
import { crearInstructor as crearInstructorService, crearAdministrador as crearAdministradorService } from "../services/perfil.service.js";

export const crearUsuario = async (req, res) => {
    return res.status(410).json({ 
        error: 'Endpoint deprecado. Use /api/cadetes, /api/usuarios/instructor or /api/usuarios/administrador' 
    });
};

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { correo, rol } = req.body;

        const usuario = await prisma.usuario.update({
            where: { id: parseInt(id) },
            data: {
                correo,
                rol
            }
        });

        res.json(usuario);
    } catch (error) {
        console.error('❌ Error actualizarUsuario:', error);
        if (error.code === 'P2002') {
            return res.status(400).json({ 
                error: `Campo duplicado: ${error.meta?.target?.join(', ') || 'desconocido'}` 
            });
        }
        res.status(500).json({ error: error.message });
    }
};

export const bulkUploadUsuarios = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const XLSX = (await import('xlsx')).default;
    const workbook = XLSX.readFile(files[0].path, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);
    
    const usuariosData = json.map(async (row) => ({
      nombreU: row.nombre || row.Nombre,
      correoU: row.correo || row.Correo,
      cedula: row.cedula,
      gradoU: row.grado || row.Grado,
      rol: row.rol || 'Alumno',
      passwordU: await hashPassword(row.cedula)
    }));

    const usuariosDataResolved = await Promise.all(usuariosData);
    const result = await prisma.usuario.createMany({
      data: usuariosDataResolved,
      skipDuplicates: true
    });

    res.json({ msg: 'Usuarios uploaded', count: result.count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.usuario.delete({
      where: { id: parseInt(id) }
    });
    res.json({ msg: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error eliminarUsuario:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    res.status(500).json({ msg: error.message });
  }
};

export const eliminarTodosLosUsuarios = async (req, res) => {
  try {
    const resultado = await prisma.usuario.deleteMany({});
    res.json({
      msg: "Todos los usuarios eliminados",
      totalEliminados: resultado.count
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




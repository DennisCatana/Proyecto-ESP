import prisma from "../prisma/client.js";
import { hashPassword } from "../utils/password.js";

export const crearUsuario = async (req, res) => {
    try {
        const { nombreU, correoU, cedula, gradoU, rol } = req.body;
        
        // Validación de campos requeridos
        if (!nombreU || !correoU || !cedula || !rol) {
            return res.status(400).json({ 
                error: 'Faltan campos requeridos: nombreU, correoU, cedula, rol' 
            });
        }
        
        const passwordHash = await hashPassword(cedula || '123456');
        
        const usuario = await prisma.usuario.create({
            data: {
                nombreU,
                correoU,
                cedula,
                gradoU: gradoU || 'Cadete',
                passwordU: passwordHash,
                rol
            }
        });
        res.status(201).json(usuario);
    } catch (error) {
        console.error('❌ Error crearUsuario:', error);
        if (error.code === 'P2002') {
            return res.status(400).json({ 
                error: `Campo duplicado: ${error.meta?.target?.join(', ') || 'desconocido'}` 
            });
        }
        res.status(500).json({ error: error.message });
    }
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
        const { nombreU, correoU, cedula, gradoU, rol } = req.body;
        
        const usuario = await prisma.usuario.update({
            where: { id: parseInt(id) },
            data: {
                nombreU,
                correoU,
                cedula,
                gradoU: gradoU || 'Cadete',
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

export const desactivarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await prisma.usuario.update({
            where: { id: parseInt(id) },
            data: { activo: false }
        });

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const bulkUploadUsuarios = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const XLSX = await import('xlsx');
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


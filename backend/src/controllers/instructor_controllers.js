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

export const actualizarInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cedula, grado, especialidad, telefono } = req.body;

    if (!nombre || !cedula)
      return res.status(400).json({ error: 'Nombre y cédula son obligatorios' });

    const instructor = await prisma.instructor.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        cedula,
        grado:        grado        || undefined,
        especialidad: especialidad || undefined,
        telefono:     telefono     || undefined,
      },
      include: { usuario: { select: { id: true, correo: true, activo: true } } }
    });

    res.json(instructor);
  } catch (error) {
    if (error.code === 'P2002')
      return res.status(400).json({ error: 'La cédula ya está registrada en otro instructor' });
    if (error.code === 'P2025')
      return res.status(404).json({ error: 'Instructor no encontrado' });
    res.status(500).json({ error: error.message });
  }
};

export const eliminarTodosInstructores = async (req, res) => {
  try {
    // Verificar si algún instructor tiene acciones registradas
    const instructoresConAcciones = await prisma.accion.count({
      where: {
        registradoPor: { rol: 'Instructor' }
      }
    });

    if (instructoresConAcciones > 0) {
      return res.status(400).json({
        error: `No se pueden eliminar los instructores porque tienen ${instructoresConAcciones} acciones disciplinarias registradas en el sistema.`
      });
    }

    // Instructor se elimina en cascada desde Usuario
    await prisma.usuario.deleteMany({
      where: { rol: 'Instructor' }
    });

    res.json({ msg: 'Todos los instructores eliminados correctamente' });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2003' || error.code === 'P2014') {
      return res.status(400).json({
        error: 'No se pueden eliminar instructores con acciones disciplinarias registradas.'
      });
    }
    res.status(500).json({ msg: 'Error al eliminar instructores: ' + error.message });
  }
};

const normKey = (s) =>
  String(s).trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const normalizeRow = (row) => {
  const r = {};
  for (const [k, v] of Object.entries(row)) r[normKey(k)] = v;
  return r;
};

const col = (r, ...aliases) => {
  for (const a of aliases) {
    const v = r[normKey(a)];
    if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim();
  }
  return null;
};

export const bulkUploadInstructores = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0)
      return res.status(400).json({ error: 'No se subió ningún archivo' });

    const XLSX = (await import('xlsx')).default;
    const workbook = XLSX.readFile(files[0].path, { raw: true });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

    if (rawData.length < 2)
      return res.status(400).json({ error: 'El archivo está vacío o solo tiene encabezados' });

    const cabeceras = rawData[0].map(h => normKey(String(h)));
    const filasDatos = rawData.slice(1).filter(row =>
      row.some(c => c !== '' && c !== null && c !== undefined)
    );

    console.log('=== CABECERAS (instructores) ===', cabeceras);

    const idx = (...aliases) => {
      for (const a of aliases) {
        const i = cabeceras.indexOf(normKey(a));
        if (i !== -1) return i;
      }
      return -1;
    };

    const getStr = (row, i) => {
      if (i === -1) return null;
      const v = row[i];
      if (v === undefined || v === null || String(v).trim() === '') return null;
      return String(v).trim();
    };

    const iNombre      = idx('nombre','nombres');
    const iCedula      = idx('cedula');
    const iCorreo      = idx('correo','email','gmail');
    const iGrado       = idx('grado');
    const iEspecialidad= idx('especialidad');
    const iTelefono    = idx('telefono');

    const allParsed = filasDatos.map(row => ({
      nombre:       getStr(row, iNombre),
      cedula:       getStr(row, iCedula),
      correo:       getStr(row, iCorreo),
      grado:        getStr(row, iGrado),
      especialidad: getStr(row, iEspecialidad),
      telefono:     getStr(row, iTelefono),
    }));

    const filtradosArr = allParsed.filter(d => !(d.nombre && d.cedula && d.correo));
    filtradosArr.forEach(d => console.warn('⚠️ Fila ignorada (instructor):', JSON.stringify(d)));
    const filtrados = filtradosArr.length;
    const instructoresData = allParsed.filter(d => d.nombre && d.cedula && d.correo);

    console.log(`✅ Válidas: ${instructoresData.length} | Filtradas: ${filtrados}`);

    let count = 0;
    let omitidas = 0;
    const errores = [];

    for (const datos of instructoresData) {
      try {
        const existe = await prisma.instructor.findFirst({ where: { cedula: datos.cedula } });
        if (existe) { omitidas++; continue; }
        await crearInstructorService(datos);
        count++;
      } catch (err) {
        errores.push({ cedula: datos.cedula, error: err.message });
        console.error(`❌ Error en cédula ${datos.cedula}:`, err.message);
      }
    }

    res.json({
      msg: 'Proceso completado',
      count,
      omitidas,
      filtradas: filtrados,
      columnas: cabeceras,
      errores: errores.length ? errores : undefined
    });
  } catch (error) {
    console.error('❌ bulkUploadInstructores ERROR:', error);
    res.status(500).json({ error: error.message });
  }
};


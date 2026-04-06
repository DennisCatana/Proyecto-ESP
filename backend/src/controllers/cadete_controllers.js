import prisma from "../prisma/client.js";
import { crearCadete as crearCadeteService } from "../services/perfil.service.js";

// Crear nuevo cadete (usa service)
export const crearCadete = async (req, res) => {
  try {
    const { nombre, cedula, correo, promocion, cia, seccion } = req.body;
    if (!nombre || !cedula || !correo || !promocion || !cia || !seccion) {
      return res.status(400).json({
        error: 'Nombre, cédula, correo, promoción, compañía y sección son obligatorios'
      });
    }
    const result = await crearCadeteService(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Cédula o correo ya registrado' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Listar todos los cadetes
export const listarCadetes = async (req, res) => {
  try {
    const cadetes = await prisma.cadete.findMany({
      select: {
        id: true,
        nombre: true,
        cedula: true,
        correo: true,
        promocion: true,
        cia: true,
        seccion: true,
        genero: true,
        telefono: true,
        habitacion: true,
        grupo_guardia: true,
        antiguedad: true,
        fecha_nacimiento: true,
        lugar_nacimiento: true,
        lugar_residencia: true,
        seguro_medico: true,
        numero_emergencia: true,
        parentesco: true,
        puntajeTotal: true,
        estado: true,
        createdAt: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    res.json(cadetes);
  } catch (error) {
    console.error("Error listarCadetes:", error.message);
    console.error("Código:", error.code);
    console.error("Meta:", error.meta);
    res.status(500).json({ 
      error: error.message, 
      code: error.code,
      meta: error.meta 
    });
}
};

// Obtener info de un cadete
export const obtenerCadete = async (req, res) => {
  const { id } = req.params;
  try {
    const cadete = await prisma.cadete.findUnique({
      where: { id: Number(id) },
      include: {
        acciones: {
          orderBy: { fecha: "desc" },
          include: {
            accionDefinida: {
              select: {
                codigo: true,
                titulo: true,
                descripcion: true,
                tipo: true,
                puntaje: true
              }
            },
            registradoPor: {
              select: {
                id: true,
                rol: true
              }
            }
          }
        }
      }
    });
    if (!cadete) return res.status(404).json({ msg: "Cadete no encontrado" });
    const positivas = cadete.acciones.filter(a => a.accionDefinida.tipo === "Positiva").length;
    const negativas = cadete.acciones.filter(a => a.accionDefinida.tipo === "Negativa").length;
    res.json({
      ...cadete,
      estadisticas: {
        positivas,
        negativas,
        total: cadete.acciones.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Estadísticas globales
export const obtenerEstadisticasGlobales = async (req, res) => {
  try {
    const [totalCadetes, totalPositivas, totalNegativas, cadetesConAcciones] = await Promise.all([
      prisma.cadete.count({ where: { estado: true } }),
      prisma.accion.count({ where: { accionDefinida: { tipo: "Positiva" } } }),
      prisma.accion.count({ where: { accionDefinida: { tipo: "Negativa" } } }),
      prisma.cadete.findMany({
        where: { acciones: { some: {} } },
        select: { id: true, nombre: true, cia: true, seccion: true, puntajeTotal: true }
      })
    ]);
    res.json({
      totalCadetes,
      totalPositivas,
      totalNegativas,
      totalAcciones: totalPositivas + totalNegativas,
      cadetesConAcciones
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mi perfil
export const obtenerMiPerfil = async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.usuario.id },
      include: { cadete: { include: { acciones: { orderBy: { fecha: 'desc' }, include: { accionDefinida: true, registradoPor: { select: { id: true, rol: true } } } } } } }
    });
    if (!usuario || !usuario.cadete) return res.status(404).json({ error: 'No cadete vinculado' });
    const positivas = usuario.cadete.acciones.filter(a => a.accionDefinida.tipo === 'Positiva').length;
    const negativas = usuario.cadete.acciones.filter(a => a.accionDefinida.tipo === 'Negativa').length;
    res.json({
      ...usuario.cadete,
      estadisticas: { positivas, negativas, total: usuario.cadete.acciones.length }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar mi perfil
export const actualizarMiPerfil = async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.usuario.id },
      include: { cadete: true }
    });
    if (!usuario || !usuario.cadete) return res.status(404).json({ error: 'No cadete vinculado' });
    const { correo, telefono, numero_emergencia, parentesco, lugar_residencia } = req.body;
    const cadete = await prisma.cadete.update({
      where: { id: usuario.cadete.id },
      data: { correo, telefono, numero_emergencia, parentesco, lugar_residencia }
    });
    res.json(cadete);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarTodosCadetes = async (req, res) => {
  try {
    await prisma.usuario.deleteMany({
      where: { rol: 'Cadete' }
    });
    res.json({ msg: 'Todos los cadetes eliminados correctamente' });
  } catch (error) {
    console.error('ERROR DETALLADO:', error);
    res.status(500).json({ msg: error.message, code: error.code, meta: error.meta });
  }
};


// Actualizar cadete
export const actualizarCadete = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre, cedula, correo, promocion, cia, seccion,
      genero, telefono, habitacion, grupo_guardia, antiguedad,
      seguro_medico, numero_emergencia, parentesco,
      lugar_nacimiento, lugar_residencia, fecha_nacimiento
    } = req.body;

    if (!nombre || !cedula || !promocion || !cia || !seccion) {
      return res.status(400).json({
        error: 'Nombre, cédula, promoción, compañía y sección son obligatorios'
      });
    }

    const cadete = await prisma.cadete.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        cedula,
        correo:            correo            || undefined,
        promocion,
        cia,
        seccion,
        genero:            genero            || undefined,
        telefono:          telefono          || undefined,
        habitacion:        habitacion        || undefined,
        grupo_guardia:     grupo_guardia     || undefined,
        // antiguedad es Int? — parsear explícitamente
        antiguedad:        antiguedad != null && antiguedad !== ''
                             ? parseInt(antiguedad, 10)
                             : undefined,
        seguro_medico:     seguro_medico     || undefined,
        numero_emergencia: numero_emergencia || undefined,
        parentesco:        parentesco        || undefined,
        lugar_nacimiento:  lugar_nacimiento  || undefined,
        lugar_residencia:  lugar_residencia  || undefined,
        fecha_nacimiento:  fecha_nacimiento  ? new Date(fecha_nacimiento) : undefined,
      }
    });
    res.json(cadete);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Cédula o correo ya registrado en otro cadete' });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Cadete no encontrado' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Desactivar cadete
export const eliminarCadete = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.cadete.update({
      where: { id: parseInt(id) },
      data: { estado: false }
    });
    res.json({ msg: 'Cadete desactivado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ── helpers bulk upload ─────────────────
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

const colNum = (r, ...aliases) => {
  const v = col(r, ...aliases);
  if (v === null) return null;
  const n = Number(v.replace(',', '.')); 
  return isNaN(n) ? null : n;
};
// ────────────────────────────────────

// Bulk upload
export const bulkUploadCadetes = async (req, res) => {
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

    console.log('=== CABECERAS ===', cabeceras);
    console.log('=== FILAS ===', filasDatos.length);

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

    const getNum = (row, i) => {
      if (i === -1) return null;
      const v = row[i];
      if (v === undefined || v === null || v === '') return null;
      if (typeof v === 'number') return v;
      const n = Number(String(v).replace(',', '.'));
      return isNaN(n) ? null : n;
    };

    // Índices de columnas
    const iNombre    = idx('nombre','nombres');
    const iCedula    = idx('cedula');
    const iPromocion = idx('promocion');
    const iCia       = idx('cia','compania','compañia');
    const iSeccion   = idx('seccion');
    const iGenero    = idx('genero','sexo');
    const iHabitacion= idx('habitacion');
    const iGuardia   = idx('grupo_guardia','guardia','grupo');
    const iAntiguedad= idx('antiguedad');
    const iCorreo    = idx('correo','email','gmail');
    const iTelefono  = idx('telefono');
    const iFechaNac  = idx('fecha_nacimiento','fechain','fnacimiento');
    const iSeguro    = idx('seguro_medico','seguro');
    const iEmergencia= idx('numero_emergencia','telefono_emergencia','emergencia');
    const iParentesco= idx('parentesco','relacion');
    const iLugarNac  = idx('lugar_nacimiento','lugarn');
    const iLugarRes  = idx('lugar_residencia','lugarr');

    const allParsed = filasDatos.map(row => ({
      nombre:            getStr(row, iNombre),
      cedula:            getStr(row, iCedula),
      promocion:         getStr(row, iPromocion),
      cia:               getStr(row, iCia),
      seccion:           getStr(row, iSeccion),
      genero:            getStr(row, iGenero),
      habitacion:        getStr(row, iHabitacion),
      grupo_guardia:     getStr(row, iGuardia),
      antiguedad:        getNum(row, iAntiguedad),
      correo:            getStr(row, iCorreo),
      telefono:          getStr(row, iTelefono),
      fecha_nacimiento:  getStr(row, iFechaNac),
      seguro_medico:     getStr(row, iSeguro),
      numero_emergencia: getStr(row, iEmergencia),
      parentesco:        getStr(row, iParentesco),
      lugar_nacimiento:  getStr(row, iLugarNac),
      lugar_residencia:  getStr(row, iLugarRes),
    }));

    const filtradosArr = allParsed.filter(d => !(d.nombre && d.cedula && d.promocion && d.cia && d.seccion));
    filtradosArr.forEach(d => console.warn('⚠️ Fila ignorada:', JSON.stringify(d)));
    const filtrados = filtradosArr.length;
    const cadetesData = allParsed.filter(d => d.nombre && d.cedula && d.promocion && d.cia && d.seccion);

    console.log(`✅ Válidas: ${cadetesData.length} | Filtradas: ${filtrados}`);

    let count = 0;
    let omitidas = 0;
    const errores = [];

    for (const datos of cadetesData) {
      try {
        const existe = await prisma.cadete.findUnique({ where: { cedula: datos.cedula } });
        if (existe) { omitidas++; continue; }
        const correo = datos.correo || `${datos.cedula}@esp.edu.ec`;
        await crearCadeteService({ ...datos, correo });
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
    console.error('❌ bulkUploadCadetes ERROR:', error);
    res.status(500).json({ error: error.message });
  }
};

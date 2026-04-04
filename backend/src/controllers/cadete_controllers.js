import prisma from "../prisma/client.js";
import { crearCadete as crearCadeteService } from "../services/perfil.service.js";

// Crear nuevo cadete (usa service)
export const crearCadete = async (req, res) => {
  try {
    const result = await crearCadeteService(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todos los cadetes
export const listarCadetes = async (req, res) => {
  try {
    const cadetes = await prisma.cadete.findMany({
      select: {
        id: true,
        promocion: true,
        cia: true,
        nombre: true,
        cedula: true,
        seccion: true,
        genero: true,
        habitacion: true,
        grupo_guardia: true,
        antiguedad: true,
        puntajeTotal: true,
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
    console.error('ERROR DETALLADO:', error); // 👈 mira esto en la terminal del backend
    res.status(500).json({ msg: error.message, code: error.code, meta: error.meta });
  }
};


// Actualizar cadete
export const actualizarCadete = async (req, res) => {
  try {
    const { id } = req.params;
    const cadeteData = req.body;
    const cadete = await prisma.cadete.update({
      where: { id: parseInt(id) },
      data: cadeteData
    });
    res.json(cadete);
  } catch (error) {
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

// Bulk upload
export const bulkUploadCadetes = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No se subió ningún archivo" });
    }

    const XLSX = (await import('xlsx')).default;

    // Leer el archivo — soporta xlsx y csv con ; o ,
    const workbook = XLSX.readFile(files[0].path, {
      raw: false,       // convierte fechas automáticamente
      dateNF: 'yyyy-mm-dd'
    });

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Para CSV con ; usar esto:
    const json = XLSX.utils.sheet_to_json(sheet, {
      defval: '', 
      raw: false
      
    });
    console.log('=== TOTAL FILAS ===', json.length);
    console.log('=== COLUMNAS ===', Object.keys(json[0] || {}));
    console.log('=== PRIMERA FILA ===', json[0]);




    // Helper para limpiar texto y manejar tildes
    const str = (val) => (val ? String(val).trim() : null);
    const num = (val) => (val !== '' && !isNaN(val) ? Number(val) : null);

    const cadetesData = json.map(row => ({
      // Obligatorios
      promocion: str(row['Promoción'] || row['Promocion'] || row['PROMOCION']),
      cia:       str(row['CIA']       || row['Cia']       || row['cia']),
      nombre:    str(row['Nombres']   || row['Nombre']    || row['NOMBRE']),
      cedula:    str(row['cédula']    || row['Cédula']    || row['Cedula']  || row['CEDULA']),
      seccion:   str(row['Sección']   || row['Seccion']   || row['SECCION']),

      // Opcionales — ajustados a los nombres reales del CSV
      genero:            str(row['Género']               || row['Genero']),
      habitacion:        str(row['Habitación']            || row['Habitacion']),
      grupo_guardia:     str(row['guardia']               || row['Guardia']    || row['GUARDIA']),
      antiguedad:        num(row['Antiguedad']             || row['Antigüedad']),
      correo:            str(row['Gmail']                 || row['Correo']     || row['correo']),
      telefono:          str(row['telefóno']              || row['Teléfono']   || row['Telefono']),
      fecha_nacimiento:  str(row['FechaN']                || row['Fecha_nacimiento']),
      seguro_medico:     str(row['Seguro']                || row['Seguro_medico']),
      numero_emergencia: str(row['telefóno_emergencia']   || row['Numero_emergencia']),
      parentesco:        str(row['Relación']              || row['Parentesco']),
      lugar_nacimiento:  str(row['LugarN']                || row['Lugar_nacimiento']),
      lugar_residencia:  str(row['LugarR']                || row['Lugar_residencia']),

    })).filter(row => {
      const valido = row.nombre && row.cedula && row.promocion && row.cia && row.seccion;
      if (!valido) console.warn('⚠️ Fila ignorada:', { 
        nombre: row.nombre, cedula: row.cedula, 
        promocion: row.promocion, cia: row.cia, seccion: row.seccion 
      });
      return valido;
    });

    // Log para depuración — ver qué llega del CSV
    console.log(`📋 Filas válidas encontradas: ${cadetesData.length}`);
    if (cadetesData.length > 0) {
      console.log('🔍 Primer registro:', cadetesData[0]);
    }

    let count = 0;
    const errores = [];

    for (const datos of cadetesData) {
      try {
        const existe = await prisma.cadete.findUnique({
          where: { cedula: datos.cedula }
        });
        if (existe) continue;

        // Correo: usar el del CSV si existe, sino generar uno temporal
        const correo = datos.correo || `${datos.cedula}@esp.edu.ec`;

        await crearCadeteService({ ...datos, correo });
        count++;
      } catch (err) {
        errores.push({ cedula: datos.cedula, error: err.message })
        console.error(`❌ Error en cédula ${datos.cedula}:`, err.message)
      }
    }

    res.json({
      msg: 'Proceso completado',
      count,
      errores: errores.length > 0 ? errores : undefined
    });

  } catch (error) {
    console.error('❌ bulkUploadCadetes ERROR:', error);
    res.status(500).json({ error: error.message });
  }
};

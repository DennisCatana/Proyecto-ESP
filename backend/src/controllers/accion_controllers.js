import prisma from "../prisma/client.js";
import { Prisma } from "@prisma/client";

// Función para estadísticas
export const obtenerEstadisticasCadete = async (cadeteId) => {
    const [positivas, negativas, total] = await Promise.all([
        prisma.accion.count({ where: { cadeteId, accionDefinida: { tipo: "Positiva" } } }),
        prisma.accion.count({ where: { cadeteId, accionDefinida: { tipo: "Negativa" } } }),
        prisma.accion.count({ where: { cadeteId } })
    ]);
    return { positivas, negativas, total };
};

// Registrar acción para un cadete
export const registrarAccion = async (req, res) => {
    try {
        const { cadeteId, codigo, observacion, fecha, hora } = req.body;

        // 🔴 Validaciones básicas
        if (!cadeteId) {
            return res.status(400).json({ error: "cadeteId es requerido" });
        }

        if (!codigo) {
            return res.status(400).json({ error: "codigo de acción es requerido" });
        }

        if (!req.usuario || !req.usuario.id) {
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        const usuarioId = req.usuario.id;

        // 🟢 Manejo correcto de imagen (FIX)
        let ruta_imagen = null;
        if (req.file) {
            ruta_imagen = `/uploads/evidencias/${req.file.filename}`;
        }

        // 🟢 Determinar fecha de la acción
        let fechaAccion;

        if (fecha && hora) {
            fechaAccion = new Date(`${fecha}T${hora}`);
        } else if (fecha) {
            fechaAccion = new Date(`${fecha}T${new Date().toTimeString().slice(0, 8)}`);
        } else {
            fechaAccion = new Date();
        }

        const dia = fechaAccion.getDay();

        // 🔁 Transacción
        const accionCreada = await prisma.$transaction(async (tx) => {

            // 🔎 Buscar acción definida
            const accionDef = await tx.accionDefinida.findUnique({
                where: { codigo }
            });

            if (!accionDef) {
                throw new Error("La acción no existe");
            }

            if (!accionDef.activa) {
                throw new Error("La acción está inactiva");
            }

            // 🔢 Calcular puntos
            let puntosAplicados = new Prisma.Decimal(accionDef.puntaje);

            if (accionDef.tipo === "Negativa") {
                puntosAplicados = puntosAplicados.negated();
            }

            // 📊 Obtener total actual
            const sumaActual = await tx.accion.aggregate({
                where: { cadeteId: Number(cadeteId) },
                _sum: { puntajeAplicado: true }
            });

            const totalActual = sumaActual._sum.puntajeAplicado
                ? new Prisma.Decimal(sumaActual._sum.puntajeAplicado)
                : new Prisma.Decimal(0);

            const nuevoTotal = totalActual.plus(puntosAplicados);

            // ✅ Crear acción
            const accion = await tx.accion.create({
                data: {
                    cadete: { connect: { id: Number(cadeteId) } }, // 🔴 IMPORTANTE: Number
                    accionDefinida: { connect: { id: accionDef.id } },
                    registradoPor: { connect: { id: usuarioId } }, // ✔ correcto
                    observacion: observacion || null,
                    puntajeAplicado: puntosAplicados,
                    puntajeAcumulado: nuevoTotal,
                    ruta_imagen, // ✔ ya corregido
                    fecha: fechaAccion,
                    dia
                }
            });

            // 🔄 Actualizar puntaje del cadete
            await tx.cadete.update({
                where: { id: Number(cadeteId) },
                data: { puntajeTotal: nuevoTotal }
            });

            return accion;
        });

        // 📊 Estadísticas
        const estadisticas = await obtenerEstadisticasCadete(Number(cadeteId));

        return res.status(201).json({
            msg: "Acción registrada correctamente",
            accion: accionCreada,
            estadisticas
        });

    } catch (error) {
        console.error("❌ ERROR EN registrarAccion:", error);

        return res.status(400).json({
            error: error.message || "Error al registrar acción"
        });
    }
};

// Listar todas las acciones definidas
export const listarAcciones = async (req, res) => {
    try {
        const acciones = await prisma.accionDefinida.findMany({
            orderBy: [{ tipo: 'asc' }, { codigo: 'asc' }]
        });
        res.json(acciones);
    } catch (error) {
        console.error('🚨 listarAcciones ERROR:', {
            message: error.message,
            stack: error.stack,
            code: error.code,
            meta: error.meta
        });
        res.status(500).json({ error: error.message });
    }
};



// Listar todas las acciones disciplinarias (registros)
export const listarAccionesDisciplinarias = async (req, res) => {
    try {

        const where = {
            cadete: {
                existe: true,
                estado: true
            }
        };

        const acciones = await prisma.accion.findMany({
            where,
            include: {
                cadete: true,
                accionDefinida: true,
                registradoPor: {
                    select: {
                        id: true,
                        rol: true,
                        instructor: {
                            select: { nombre: true, grado: true }
                        },
                        administrador: {
                            select: { nombre: true }
                        }
                    }
                }
            },
            orderBy: { fecha: 'desc' }
        });

        res.json(acciones);

    } catch (error) {
        console.error('🚨 listarAccionesDisciplinarias ERROR:', {
            message: error.message,
            code: error.code,
            meta: error.meta
        });

        res.status(500).json({
            error: 'Error al listar acciones disciplinarias'
        });
    }
};


// Obtener acciones de un cadete específico
export const obtenerAccionesPorCadete = async (req, res) => {
    try {
        const { cadeteId } = req.params;
        const acciones = await prisma.accion.findMany({
            where: { cadeteId: parseInt(cadeteId) },
            include: {
                cadete: true,
                accionDefinida: true,
                registradoPor: {
                    select: {
                        id: true,
                        rol: true,
                        instructor: {
                            select: { nombre: true, grado: true }
                        },
                        administrador: {
                            select: { nombre: true }
                        }
                    }
                }
            },
            orderBy: { fecha: 'desc' }
        });

        const estadisticas = await obtenerEstadisticasCadete(parseInt(cadeteId));
        res.json({ acciones, estadisticas });
    } catch (error) {
        console.error('🚨 obtenerAccionesPorCadete ERROR:', {
            message: error.message,
            stack: error.stack,
            code: error.code,
            meta: error.meta
        });
        res.status(500).json({ error: error.message });
    }
};


// Obtener resumen de un cadete
export const obtenerResumenCadete = async (req, res) => {
    try {
        const cadeteId = parseInt(req.params.id);

        if (isNaN(cadeteId)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        // Verificar que exista el cadete
        const cadete = await prisma.cadete.findUnique({
            where: { id: cadeteId }
        });

        if (!cadete) {
            return res.status(404).json({ error: "Cadete no encontrado" });
        }

        // Obtener acciones con relaciones
        const acciones = await prisma.accion.findMany({
            where: { cadeteId },
            orderBy: { fecha: "desc" },
            include: {
                accionDefinida: true,
                registradoPor: true
            }
        });

        // Estadísticas (paralelo)
        const [totalAcciones, accionesPositivas, accionesNegativas] = await Promise.all([
            prisma.accion.count({ where: { cadeteId } }),
            prisma.accion.count({ where: { cadeteId, accionDefinida: { tipo: "Positiva" } } }),
            prisma.accion.count({ where: { cadeteId, accionDefinida: { tipo: "Negativa" } } })
        ]);

        // Acciones por día de la semana
        const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const accionesPorDia = dias.map((dia, idx) => {
            const accionesDia = acciones.filter(a => new Date(a.fecha).getDay() === idx);
            return {
                dia,
                count: accionesDia.length,
                positivas: accionesDia.filter(a => a.accionDefinida.tipo === "Positiva").length,
                negativas: accionesDia.filter(a => a.accionDefinida.tipo === "Negativa").length
            };
        });

        return res.json({
            puntajeTotal: cadete.puntajeTotal,
            totalAcciones,
            accionesPositivas,
            accionesNegativas,
            acciones,
            accionesPorDia
        });

    } catch (error) {
        console.error("Error en obtenerResumenCadete:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// CRUD AccionDefinida
export const crearAccionDefinida = async (req, res) => {
    try {
        const { codigo, titulo, tipo, puntaje } = req.body;
        const descripcion = req.body.descripcion ?? '';
        if (!codigo || !titulo || !tipo || puntaje == null) {
            return res.status(400).json({ error: "Código, título, tipo y puntaje son requeridos" });
        }
        const accion = await prisma.accionDefinida.create({
            data: { codigo, titulo, descripcion, tipo, puntaje: Number(puntaje) }
        });
        res.status(201).json(accion);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: "El código ya existe" });
        }
        res.status(500).json({ error: error.message });
    }
};

export const actualizarAccionDefinida = async (req, res) => {
    try {
        const { id } = req.params;
        const { codigo, titulo, descripcion, tipo, puntaje, activa } = req.body;

        const data = {};
        if (codigo !== undefined) data.codigo = codigo;
        if (titulo !== undefined) data.titulo = titulo;
        if (descripcion !== undefined) data.descripcion = descripcion;
        if (tipo !== undefined) data.tipo = tipo;
        if (puntaje !== undefined) data.puntaje = Number(puntaje);
        if (activa !== undefined) data.activa = Boolean(activa);

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ error: 'No se enviaron campos para actualizar' });
        }

        const accion = await prisma.accionDefinida.update({
            where: { id: parseInt(id) },
            data
        });
        res.json(accion);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'El código ya existe' });
        }
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Acción no encontrada' });
        }
        res.status(500).json({ error: error.message });
    }
};

export const eliminarAccionDefinida = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.accionDefinida.delete({
            where: { id: parseInt(id) }
        });
        res.json({ msg: "Acción eliminada" });
    } catch (error) {
        if (error.code === 'P2003' || error.code === 'P2014') {
            return res.status(400).json({
                error: 'No se puede eliminar esta acción porque ya tiene registros aplicados a cadetes. Desactívela en lugar de eliminarla.'
            });
        }
        res.status(500).json({ error: error.message });
    }
};

export const eliminarTodasLasAccionesDefinidas = async (req, res) => {
    try {
        // Verificar si existen acciones aplicadas antes de intentar eliminar
        const conRegistros = await prisma.accion.count();
        if (conRegistros > 0) {
            return res.status(400).json({
                error: `No se pueden eliminar las acciones definidas porque existen ${conRegistros} registros disciplinarios asociados. Elimine primero los registros.`
            });
        }
        const resultado = await prisma.accionDefinida.deleteMany({});
        res.json({
            msg: "Todas las acciones definidas eliminadas",
            totalEliminados: resultado.count
        });
    } catch (error) {
        console.error('❌ Error eliminarTodasLasAccionesDefinidas:', error);
        res.status(500).json({ error: error.message });
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

const colNum = (r, ...aliases) => {
    const v = col(r, ...aliases);
    if (v === null) return null;
    const n = Number(v.replace(',', '.'));  // soporta decimales con coma
    return isNaN(n) ? null : n;
};

// Normaliza el tipo al enum exacto de Prisma
const normTipo = (val) => {
    if (!val) return null;
    const low = val.trim().toLowerCase();
    if (low === 'positiva' || low === 'pos' || low === 'p' || low === '+') return 'Positiva';
    if (low === 'negativa' || low === 'neg' || low === 'n' || low === '-') return 'Negativa';
    return null;
};

export const bulkUploadAccionesDefinidas = async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0)
            return res.status(400).json({ error: 'No se subió ningún archivo' });

        const XLSX = (await import('xlsx')).default;
        // raw:true para obtener números reales en vez de strings formateados
        const workbook = XLSX.readFile(files[0].path, { raw: true });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        // Leer como arrays: fila 0 = cabeceras, resto = datos
        const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

        if (rawData.length < 2)
            return res.status(400).json({ error: 'El archivo está vacío o solo tiene encabezados' });

        // Normalizar cabeceras
        const cabeceras = rawData[0].map(h => normKey(String(h)));
        const filasDatos = rawData.slice(1).filter(row =>
            row.some(c => c !== '' && c !== null && c !== undefined)
        );

        console.log('=== CABECERAS DETECTADAS ===', cabeceras);
        console.log('=== FILAS DE DATOS ===', filasDatos.length);

        // Encontrar índice de columna por alias
        const idx = (...aliases) => {
            for (const a of aliases) {
                const i = cabeceras.indexOf(normKey(a));
                if (i !== -1) return i;
            }
            return -1;
        };

        const iCodigo = idx('codigo', 'cod', 'code', 'clave');
        const iTitulo = idx('titulo', 'nombre', 'accion', 'name', 'title', 'descripcion_corta');
        const iPuntaje = idx('puntaje', 'puntos', 'valor', 'score', 'pts', 'puntuacion');
        const iDescripcion = idx('descripcion', 'detalle', 'observacion', 'description', 'desc');

        console.log(`Índices → codigo:${iCodigo} titulo:${iTitulo} puntaje:${iPuntaje} descripcion:${iDescripcion}`);

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
            if (typeof v === 'number') return v;                       // xlsx raw number
            const n = Number(String(v).replace(',', '.'));
            return isNaN(n) ? null : n;
        };

        const tipoForzado = normTipo(req.query.tipo);

        const parsed = filasDatos.map(row => ({
            codigo: getStr(row, iCodigo),
            titulo: getStr(row, iTitulo),
            descripcion: getStr(row, iDescripcion) ?? '',
            tipo: tipoForzado || normTipo(getStr(row, idx('tipo', 'type', 'categoria'))),
            puntaje: getNum(row, iPuntaje),
        }));

        const filtradas = parsed.filter(d => !(d.codigo && d.titulo && d.tipo && d.puntaje != null));
        filtradas.forEach(d => console.warn('⚠️ Fila ignorada:', JSON.stringify(d)));
        const accionesData = parsed.filter(d => d.codigo && d.titulo && d.tipo && d.puntaje != null);

        console.log(`✅ Válidas: ${accionesData.length} | Filtradas: ${filtradas.length}`);

        let count = 0;
        let omitidas = 0;
        const errores = [];

        for (const datos of accionesData) {
            try {
                const existe = await prisma.accionDefinida.findUnique({ where: { codigo: datos.codigo } });
                if (existe) { omitidas++; continue; }
                await prisma.accionDefinida.create({ data: datos });
                count++;
            } catch (err) {
                errores.push({ codigo: datos.codigo, error: err.message });
                console.error(`❌ Error en código "${datos.codigo}":`, err.message);
            }
        }

        res.json({
            msg: 'Proceso completado',
            count,
            omitidas,
            filtradas: filtradas.length,
            columnas: cabeceras,
            errores: errores.length ? errores : undefined
        });
    } catch (error) {
        console.error('❌ bulkUploadAccionesDefinidas ERROR:', error);
        res.status(500).json({ error: error.message });
    }
};



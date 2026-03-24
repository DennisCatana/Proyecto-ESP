import prisma from "../prisma/client.js";
import { obtenerEstadisticasCadete } from "./accion_controllers.js";

//Crear un nuevo cadete
export const crearCadete = async (req, res) => {
    try {
        const cadete = await prisma.cadete.create({ data: req.body });
        res.status(201).json(cadete);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Listar todos los cadetes
export const listarCadetes = async (req, res) => {
    try {
        const cadetes = await prisma.cadete.findMany({
            // where: {
                //     estado: true
                // },

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

        console.log('Cadetes encontrados:', cadetes.length);
        res.json(cadetes);
    } catch (error) {
        console.error("Error listarCadetes:", error);
        res.status(500).json({ error: error.message });
    }
};

//Obtener info de un cadete (sin protección - público)
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
                                gradoU: true,
                                nombreU: true
                            }
                        }
                    }
                }
            }
        });

        if (!cadete) {
            return res.status(404).json({ msg: "Cadete no encontrado" });
        }

        // Calcular estadísticas
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

// Obtener estadísticas globales
export const obtenerEstadisticasGlobales = async (req, res) => {
    try {
        const [totalCadetes, totalPositivas, totalNegativas, cadetesConAcciones] = await Promise.all([
            prisma.cadete.count({ where: { estado: true } }),
            prisma.accion.count({
                where: { accionDefinida: { tipo: "Positiva" } }
            }),
            prisma.accion.count({
                where: { accionDefinida: { tipo: "Negativa" } }
            }),
            prisma.cadete.findMany({
                where: {
                    acciones: { some: {} }
                },
                select: {
                    id: true,
                    nombre: true,
                    cia: true,
                    seccion: true,
                    puntajeTotal: true
                }
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

// Eliminar todos los cadetes
export const eliminarTodosLosCadetes = async (req, res) => {
    try {
        const resultado = await prisma.cadete.deleteMany({});

        res.json({
            msg: "Todos los cadetes fueron eliminados",
            totalEliminados: resultado.count
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

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

export const bulkUploadCadetes = async (req, res) => {
    try {
    const files = req.files;
    if (!files || files.length === 0) {
        return res.status(400).json({ error: "No se subió ningún archivo" });
    }

    const XLSX = (await import('xlsx')).default; 
    const workbook = XLSX.readFile(files[0].path, { FS: ';' }); 
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);

    const cadetesData = json.map(row => ({
        promocion:      String(row['Promoción']   || row['Promocion']  || ''),
        cia:            String(row['CIA']                              || ''),
        nombre:         String(row['Nombres']     || row['Nombre']     || ''),
        cedula:         String(row['cédula']      || row['cedula']     || row['Cedula'] || ''),
        seccion:        String(row['Sección']     || row['Seccion']    || ''),
        genero:         String(row['Género']      || row['Genero']     || ''),
        habitacion:     String(row['Habitación']  || row['Habitacion'] || ''),
        grupo_guardia:  String(row['guardia']                         || ''),
        antiguedad:     Number(row['Antiguedad'])  || 0,
    })).filter(row => row.nombre && row.cedula);

    const result = await prisma.cadete.createMany({
        data: cadetesData,
        skipDuplicates: true
    });

    res.json({ msg: 'Cadetes cargados correctamente', count: result.count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




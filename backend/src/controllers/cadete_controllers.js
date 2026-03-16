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
            include: {
                usuario: true,
                acciones: true

            },
            orderBy: {
                antiguedad: "asc"
            }
        });

        res.json(cadetes);
    } catch (error) {
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

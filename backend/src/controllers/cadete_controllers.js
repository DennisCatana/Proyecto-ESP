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

//Obtener info de un cadete
export const obtenerCadete = async (req, res) => {
    const { id } = req.params;

    try {

        const cadete = await prisma.cadete.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                nombre: true, // si quieres mostrar el nombre del cadete
                puntajeTotal: true,
                acciones: {
                    orderBy: { fecha: "desc" },
                    select: {
                        id: true,
                        observacion: true,
                        puntajeAplicado: true,
                        puntajeAcumulado: true,
                        fecha: true,
                        accionDefinida: {
                            select: {
                                codigo: true,
                                titulo: true,
                                descripcion: true,
                            }
                        },
                        registradoPor: {
                            select: {
                                id: true,
                                gradoU: true,
                                nombreU: true
                            }
                        }
                    },
                    orderBy: {
                        fecha: "desc"
                    }
                }
            }
        });

        if (!cadete) {
            return res.status(404).json({ msg: "Cadete no encontrado" });
        }

        const estadisticas = await obtenerEstadisticasCadete(cadete.id);
        
        res.json({
            ...cadete,
            estadisticas
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
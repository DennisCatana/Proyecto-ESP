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

//Registrar acción para un cadete
export const registrarAccion = async (req, res) => {
    const { cadeteId, codigo, observacion, ruta_imagen, fecha, hora } = req.body;
    const usuarioId = req.usuario.id;

    try {
        // Determinar la fecha de la acción
        let fechaAccion;
        if (fecha && hora) {
            // Combinar fecha y hora proporcionadas
            fechaAccion = new Date(`${fecha}T${hora}`);
        } else if (fecha) {
            // Solo fecha proporcionada, usar hora actual
            fechaAccion = new Date(`${fecha}T${new Date().toTimeString().slice(0, 8)}`);
        } else {
            // Usar fecha y hora actual
            fechaAccion = new Date();
        }

        // Transacción para asegurar consistencia de puntajes
        const accionCreada = await prisma.$transaction(async (tx) => {

            console.log("🔹 Iniciando transacción...");

            // 1️⃣ Buscar acción definida
            const accionDef = await tx.accionDefinida.findUnique({
                where: { codigo }
            });

            console.log("🔹 Acción definida encontrada:", accionDef);

            if (!accionDef) throw new Error("La acción no existe");
            if (!accionDef.activa) throw new Error("La acción está inactiva");

            // 2️⃣ Calcular puntos aplicados
            let puntosAplicados = new Prisma.Decimal(accionDef.puntaje);

            if (accionDef.tipo === "Negativa") {
                puntosAplicados = puntosAplicados.negated();
            }

            console.log("🔹 Puntos aplicados:", puntosAplicados.toString());

            // 3️⃣ Obtener suma actual
            const sumaActual = await tx.accion.aggregate({
                where: { cadeteId },
                _sum: { puntajeAplicado: true }
            });

            const totalActual = sumaActual._sum.puntajeAplicado
                ? new Prisma.Decimal(sumaActual._sum.puntajeAplicado)
                : new Prisma.Decimal(0);

            console.log("🔹 Total actual:", totalActual.toString());

            const nuevoTotal = totalActual.plus(puntosAplicados);

            console.log("🔹 Nuevo total:", nuevoTotal.toString());

            // 4️⃣ Crear acción
            const accion = await tx.accion.create({
                data: {
                    cadete: {
                        connect: { id: cadeteId }
                    },
                    accionDefinida: {
                        connect: { id: accionDef.id }
                    },
                    registradoPor: {
                        connect: { id: req.usuario.id }
                    },
                    observacion,
                    puntajeAplicado: puntosAplicados,
                    puntajeAcumulado: nuevoTotal,
                    ruta_imagen: ruta_imagen || null,
                    fecha: fechaAccion
                }
            });

            console.log("✅ ACCIÓN CREADA DENTRO DE LA TRANSACCIÓN:", accion);

            // 5️⃣ Actualizar puntaje del cadete
            await tx.cadete.update({
                where: { id: cadeteId },
                data: {
                    puntajeTotal: nuevoTotal
                }
            });

            console.log("🔹 Cadete actualizado correctamente");

            return accion;
        });

        console.log("✅ TRANSACCIÓN COMPLETADA. Acción final:", accionCreada);

        const estadisticas = await obtenerEstadisticasCadete(cadeteId);

        return res.status(201).json({
            msg: "Acción registrada correctamente",
            accion: accionCreada,
            estadisticas
        });

    } catch (error) {
        console.error("❌ ERROR EN registrarAccion:", error);
        return res.status(400).json({ error: error.message });
    }
};

//Listar todos las acciones definidas
export const listarAcciones = async (req, res) => {
    try {
        const acciones = await prisma.accionDefinida.findMany({
            include: { accionesAplicadas: true }
        });
        res.json(acciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Listar todas las acciones disciplinarias (registros)
export const listarAccionesDisciplinarias = async (req, res) => {
    try {
        // Obtener filtros de query params
        const { cadeteId, tipo, fechaInicio, fechaFin } = req.query;

        const where = {};

        // Filtrar por cadete si se especifica
        if (cadeteId) {
            where.cadeteId = parseInt(cadeteId);
        }

        // Filtrar por tipo de acción
        if (tipo) {
            where.accionDefinida = { tipo };
        }

        // Filtrar por rango de fechas
        if (fechaInicio || fechaFin) {
            where.fecha = {};
            if (fechaInicio) {
                where.fecha.gte = new Date(fechaInicio);
            }
            if (fechaFin) {
                where.fecha.lte = new Date(fechaFin);
            }
        }

        const acciones = await prisma.accion.findMany({
            where,
            include: {
                cadete: true,
                accionDefinida: true,
                registradoPor: {
                    select: {
                        id: true,
                        gradoU: true,
                        nombreU: true
                    }
                }
            },
            orderBy: {
                fecha: 'desc'
            }
        });
        res.json(acciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Obtener acciones de un cadete específico
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
                        gradoU: true,
                        nombreU: true
                    }
                }
            },
            orderBy: {
                fecha: 'desc'
            }
        });

        // Obtener estadísticas del cadete
        const estadisticas = await obtenerEstadisticasCadete(parseInt(cadeteId));

        res.json({
            acciones,
            estadisticas
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener resumen de un cadete
export const obtenerResumenCadete = async (req, res) => {

    console.log("========== RESUMEN CADETE ==========");
    console.log("DATABASE_URL:", process.env.DATABASE_URL);


    try {
        const cadeteId = parseInt(req.params.id);

        if (isNaN(cadeteId)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        // 1️⃣ Verificar que exista el cadete
        const cadete = await prisma.cadete.findUnique({
            where: { id: cadeteId }
        });

        if (!cadete) {
            return res.status(404).json({ error: "Cadete no encontrado" });
        }

        // 2️⃣ Obtener acciones con relaciones
        const acciones = await prisma.accion.findMany({
            where: { cadeteId },
            orderBy: { fecha: "desc" },
            include: {
                accionDefinida: true,
                registradoPor: true
            }
        });

        // 3️⃣ Estadísticas (paralelo para mejor rendimiento)
        const [totalAcciones, accionesPositivas, accionesNegativas] = await Promise.all([
            prisma.accion.count({ where: { cadeteId } }),
            prisma.accion.count({
                where: {
                    cadeteId,
                    accionDefinida: { tipo: "Positiva" }
                }
            }),
            prisma.accion.count({
                where: {
                    cadeteId,
                    accionDefinida: { tipo: "Negativa" }
                }
            })
        ]);

        return res.json({
            puntajeTotal: cadete.puntajeTotal,
            totalAcciones,
            accionesPositivas,
            accionesNegativas,
            acciones
        });

    } catch (error) {
        console.error("Error en obtenerResumenCadete:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
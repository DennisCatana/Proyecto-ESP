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

    console.log("========== REGISTRAR ACCION ==========");
    console.log("DATABASE_URL:", process.env.DATABASE_URL);

    const cadeteId = parseInt(req.body.cadeteId);
    const { codigo, observacion } = req.body;

    if (isNaN(cadeteId)) {
        return res.status(400).json({ error: "Cadete ID inválido" });
    }

    try {

        console.log("📌 Datos recibidos:", { cadeteId, codigo, observacion });
        console.log("📌 Usuario que registra:", req.usuario?.id);

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
                    puntajeAcumulado: nuevoTotal
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
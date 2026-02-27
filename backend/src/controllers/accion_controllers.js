import prisma from "../prisma/client.js";

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
    const { cadeteId, codigo, observacion } = req.body;
    const usuarioId = req.usuario.id;

    try {
        // Transacción para asegurar consistencia de puntajes
        const accionCreada = await prisma.$transaction(async (tx) => {
            // 1️⃣ Buscar acción definida por código
            const accionDef = await tx.accionDefinida.findUnique({ where: { codigo } });
            if (!accionDef) throw new Error("La acción no existe");
            if (!accionDef.activa) throw new Error("La acción está inactiva");

            // 2️⃣ Determinar puntos a aplicar
            const puntosAplicados = accionDef.tipo === "Negativa"
                ? -parseFloat(accionDef.puntaje)
                : parseFloat(accionDef.puntaje);

            // 3️⃣ Obtener puntaje acumulado actual del cadete desde acciones registradas
            const sumaActual = await tx.accion.aggregate({
                where: { cadeteId },
                _sum: { puntajeAplicado: true }
            });
            const totalActual = parseFloat(sumaActual._sum.puntajeAplicado || 0);

            // 4️⃣ Calcular nuevo puntaje acumulado
            const nuevoTotal = totalActual + puntosAplicados;

            // 5️⃣ Crear la acción
            const accion = await tx.accion.create({
                data: {
                    cadeteId,
                    accionDefinidaId: accionDef.id,
                    registradoPorId: usuarioId,
                    observacion,
                    puntajeAplicado: puntosAplicados,
                    puntajeAcumulado: nuevoTotal
                }
            });

            // 6️⃣ Actualizar puntaje total del cadete
            await tx.cadete.update({
                where: { id: cadeteId },
                data: { puntajeTotal: nuevoTotal }
            });

            return accion;
        });

        // 🔹 Obtener estadísticas después de registrar
        const estadisticas = await obtenerEstadisticasCadete(cadeteId);

        return res.status(201).json({
            msg: "Acción registrada correctamente",
            accion: accionCreada,
            estadisticas
        });

    } catch (error) {
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

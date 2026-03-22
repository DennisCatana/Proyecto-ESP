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
    const { cadeteId, codigo, observacion, ruta_imagen, fecha, hora } = req.body;
    const usuarioId = req.usuario.id;

    try {
        // Determinar la fecha de la acción
        let fechaAccion;
        if (fecha && hora) {
            fechaAccion = new Date(`${fecha}T${hora}`);
        } else if (fecha) {
            fechaAccion = new Date(`${fecha}T${new Date().toTimeString().slice(0, 8)}`);
        } else {
            fechaAccion = new Date();
        }

        // Calcular el día automáticamente
        const dia = fechaAccion.getDay();

        // Transacción para asegurar consistencia de puntajes
        const accionCreada = await prisma.$transaction(async (tx) => {
            // Buscar acción definida
            const accionDef = await tx.accionDefinida.findUnique({
                where: { codigo }
            });

            if (!accionDef) throw new Error("La acción no existe");
            if (!accionDef.activa) throw new Error("La acción está inactiva");

            // Calcular puntos aplicados
            let puntosAplicados = new Prisma.Decimal(accionDef.puntaje);
            if (accionDef.tipo === "Negativa") {
                puntosAplicados = puntosAplicados.negated();
            }

            // Obtener suma actual
            const sumaActual = await tx.accion.aggregate({
                where: { cadeteId },
                _sum: { puntajeAplicado: true }
            });

            const totalActual = sumaActual._sum.puntajeAplicado
                ? new Prisma.Decimal(sumaActual._sum.puntajeAplicado)
                : new Prisma.Decimal(0);

            const nuevoTotal = totalActual.plus(puntosAplicados);

            // Crear acción
            const accion = await tx.accion.create({
                data: {
                    cadete: { connect: { id: cadeteId } },
                    accionDefinida: { connect: { id: accionDef.id } },
                    registradoPor: { connect: { id: req.usuario.id } },
                    observacion,
                    puntajeAplicado: puntosAplicados,
                    puntajeAcumulado: nuevoTotal,
                    ruta_imagen: ruta_imagen || null,
                    fecha: fechaAccion,
                    dia
                }
            });

            // Actualizar puntaje del cadete
            await tx.cadete.update({
                where: { id: cadeteId },
                data: { puntajeTotal: nuevoTotal }
            });

            console.log("🔹 Cadete actualizado correctamente");
            return accion;
        });

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

// Listar todas las acciones definidas
export const listarAcciones = async (req, res) => {
    try {
        const acciones = await prisma.accionDefinida.findMany({
            include: { accionesAplicadas: true }
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
        const { cadeteId, tipo, fechaInicio, fechaFin } = req.query;
        const where = {};

        if (cadeteId) where.cadeteId = parseInt(cadeteId);
        if (tipo) where.accionDefinida = { tipo };

        if (fechaInicio || fechaFin) {
            where.fecha = {};
            if (fechaInicio) where.fecha.gte = new Date(fechaInicio);
            if (fechaFin) where.fecha.lte = new Date(fechaFin);
        }

        const acciones = await prisma.accion.findMany({
            where,
            include: {
                cadete: true,
                accionDefinida: true,
                registradoPor: {
                    select: { id: true, gradoU: true, nombreU: true }
                }
            },
            orderBy: { fecha: 'desc' }
        });
        res.json(acciones);
    } catch (error) {
        console.error('🚨 listarAccionesDisciplinarias ERROR:', {
            message: error.message,
            stack: error.stack,
            code: error.code,
            meta: error.meta
        });
        res.status(500).json({ error: error.message });
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
                    select: { id: true, gradoU: true, nombreU: true }
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
        const { codigo, titulo, descripcion, tipo, puntaje } = req.body;
        if (!codigo || !titulo || !tipo || puntaje == null) {
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }
        const accion = await prisma.accionDefinida.create({
            data: { codigo, titulo, descripcion, tipo, puntaje }
        });
        res.status(201).json(accion);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: "Código ya existe" });
        }
        res.status(500).json({ error: error.message });
    }
};

export const actualizarAccionDefinida = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const accion = await prisma.accionDefinida.update({
            where: { id: parseInt(id) },
            data
        });
        res.json(accion);
    } catch (error) {
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
        res.status(500).json({ error: error.message });
    }
};


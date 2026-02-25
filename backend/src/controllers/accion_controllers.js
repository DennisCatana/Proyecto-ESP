import prisma from "../prisma/client.js";

export const registrarAccion = async (req, res) => {
    const { cadeteId, accionDefinidaId, observacion } = req.body;
    const usuarioId = req.usuario.id; // viene del middleware JWT

    try {

        const resultado = await prisma.$transaction(async (tx) => {

            // 1️⃣ Buscar acción definida
            const accionDef = await tx.accionDefinida.findUnique({
                where: { id: accionDefinidaId }
            });

            if (!accionDef || !accionDef.activa) {
                throw new Error("Acción no válida o inactiva");
            }

            // 2️⃣ Crear acción aplicada
            const accionCreada = await tx.accion.create({
                data: {
                    cadeteId,
                    accionDefinidaId,
                    registradoPorId: usuarioId,
                    observacion
                }
            });

            // 3️⃣ Actualizar puntaje del cadete
            await tx.cadete.update({
                where: { id: cadeteId },
                data: {
                    puntajeTotal: {
                        increment: accionDef.puntaje
                    }
                }
            });

            return accionCreada;
        });

        res.json({
            msg: "Acción registrada correctamente",
            accion: resultado
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const obtenerAccionesDeCadete = async (req, res) => {
    const { id } = req.params;

    try {
        const acciones = await prisma.accion.findMany({
            where: { cadeteId: Number(id) },
            include: {
                accionDefinida: true,
                registradoPor: {
                    select: {
                        nombreU: true,
                        gradoU: true
                    }
                }
            },
            orderBy: { fecha: "desc" }
        });

        res.json(acciones);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const crearAccionDefinida = async (req, res) => {
    const { codigo, titulo, descripcion, tipo, puntaje } = req.body;

    try {
        const accion = await prisma.accionDefinida.create({
            data: {
                codigo,
                titulo,
                descripcion,
                tipo,
                puntaje
            }
        });

        res.json(accion);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
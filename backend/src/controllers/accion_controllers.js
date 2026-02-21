import prisma from "../prisma/client.js";

export const registrarAccion = async (req, res) => {
    try {
        const { tipo, descripcion, cadeteId } = req.body;

        const accion = await prisma.accion.create({
            data: {
                tipo,
                descripcion,
                cadeteId,
                registradoPorId: req.usuario.id
            }
        });

        res.status(201).json(accion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const listarAcciones = async (req, res) => {
    try {
        const acciones = await prisma.accion.findMany({ include: { cadete: true, registradoPor: true } });
        res.json(acciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
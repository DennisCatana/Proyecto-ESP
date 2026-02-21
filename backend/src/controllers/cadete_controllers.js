import prisma from "../prisma/client.js";

export const crearCadete = async (req, res) => {
    try {
        const cadete = await prisma.cadete.create({ data: req.body });
        res.status(201).json(cadete);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const listarCadetes = async (req, res) => {
    try {
        const cadetes = await prisma.cadete.findMany({ include: { usuario: true, acciones: true } });
        res.json(cadetes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
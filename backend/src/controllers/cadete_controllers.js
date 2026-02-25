import prisma from "../prisma/client.js";


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
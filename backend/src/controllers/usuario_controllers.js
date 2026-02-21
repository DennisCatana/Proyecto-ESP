import prisma from "../prisma/client.js";
import { hashPassword } from "../utils/password.js";

export const crearUsuario = async (req, res) => {
    try {
        const { username, email, password, rol, cedula } = req.body;
        const passwordHash = await hashPassword(password);

        const usuario = await prisma.usuario.create({
            data: { username, email, password: passwordHash, rol, cedula }
        });
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, rol } = req.body;

        const usuario = await prisma.usuario.update({
            where: { id: parseInt(id) },
            data: { username, email, rol }
        });

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const desactivarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await prisma.usuario.update({
            where: { id: parseInt(id) },
            data: { activo: false }
        });

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
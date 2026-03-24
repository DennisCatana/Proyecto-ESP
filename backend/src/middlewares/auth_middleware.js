import prisma from "../prisma/client.js";
import { verificarJWT } from "../utils/jwt.js";

export const protegerRuta = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader)
            return res.status(401).json({ msg: "No autorizado" });

        const token = authHeader.split(" ")[1];
        const decoded = verificarJWT(token);

        const usuario = await prisma.usuario.findUnique({
            where: { id: decoded.id }
        });

        if (!usuario)
            return res.status(401).json({ msg: "Usuario no válido" });

        if (usuario.tokenSession !== token) {
            return res.status(401).json({ msg: "Sesión inválida o expirada" });
        }

        if (!usuario.activo)
            return res.status(403).json({ msg: "Usuario desactivado" });

        // 🔥 Bloqueo si no ha cambiado password
        if (usuario.cambioPassword && !req.path.includes("cambiarpassword")) {
            return res.status(403).json({
                msg: "Debe cambiar su contraseña antes de continuar"
            });
        }

        req.usuario = {
            id: usuario.id,
            rol: usuario.rol
        };

        next();

    } catch (error) {
        return res.status(401).json({ msg: "Token inválido" });
    }
};
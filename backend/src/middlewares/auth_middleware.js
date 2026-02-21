import { verificarJWT } from "../utils/jwt.js";

export const protegerRuta = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ msg: "No autorizado" });

        const token = authHeader.split(" ")[1];
        req.usuario = verificarJWT(token);

        next();
    } catch (error) {
        return res.status(401).json({ msg: "Token inválido" });
    }
};
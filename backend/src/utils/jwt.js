import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

export const generarJWT = (usuario) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET no está definido");
    }

    return jwt.sign(
        { id: usuario.id, rol: usuario.rol }, // payload
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );
};

export const tokenV = () => {
    return randomBytes(32).toString("hex");
};



export const verificarJWT = (token) => jwt.verify(token, process.env.JWT_SECRET);
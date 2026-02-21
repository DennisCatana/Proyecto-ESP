import prisma from "../prisma/client.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generarJWT, tokenV } from "../utils/jwt.js";
import { sendMailToRegister, sendMailToRecoveryPassword } from "../config/nodemailer.js";


//Creación de usuario 
export const registro = async (req, res) => {
    try {
        const { nombreU, correoU, cedula, gradoU, rol } = req.body;

        // Validar campos
        if (!nombreU || !correoU || !cedula || !gradoU || !rol) {
            return res.status(400).json({ error: "Todos los campos obligatorios deben estar completos" });
        }

        // Verificar si ya existe por correo o cédula
        const existe = await prisma.usuario.findFirst({
            where: {
                OR: [{ correoU }, { cedula }, { nombreU }]
            }
        });

        if (existe) {
            return res.status(400).json({
                msg: "El usuario ya existe (correo, cédula o nombre en uso)"
            });
        }

        // Encriptar contraseña
        const passwordHash = await hashPassword(cedula);

        // Generar token de verificación
        const tokenVerificacion = tokenV();

        // Crear usuario
        let usuario = await prisma.usuario.create({
            data: {
                nombreU,
                correoU,
                cedula,
                gradoU,
                passwordU: passwordHash,
                rol,
                tokenVerificacion,
                confirmarCorreo: false,
                cambioPassword: true
            }
        });

        await sendMailToRegister(correoU, tokenVerificacion)

        return res.status(201).json({
            msg: "Usuario registrado. Revisa tu correo para confirmar la cuenta."
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: `Error en el servidor - ${error.message}` });
    }
};

//Confirmacion de correo
export const confirmarCorreo = async (req, res) => {
    try {
        const { token } = req.params;
        const usuario = await prisma.usuario.findFirst({ where: { tokenVerificacion: token } });
        if (!usuario) {
            return res.status(400).json({ msg: "Token de verificación inválido o cuenta ya confirmada" });
        }

        //Actualizar estado del usuario
        await prisma.usuario.update({
            where: { id: usuario.id },
            data: { confirmarCorreo: true, tokenVerificacion: null }
        });
        return res.json({ msg: "Correo confirmado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: `Error en el servidor - ${error.message}` });
    }
};

//Recuperacion de contraseña 
export const recuperarPassword = async (req, res) => {
    try {
        const { correoU } = req.body;

        if (!correoU) return res.status(400).json({ msg: "El correo es obligatorio" });

        const usuario = await prisma.usuario.findUnique({ where: { correoU } });

        if (!usuario) return res.status(400).json({ msg: "Usuario no existe" });

        const tokenRecuperacion = tokenV();
        const expiracion = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

        await prisma.usuario.update({
            where: { id: usuario.id },
            data: {
                tokenRecuperacion,
                tokenRecuperacionExpira: expiracion
            }
        });
        await sendMailToRecoveryPassword(correoU, tokenRecuperacion);

        return res.json({ msg: "Correo de recuperación enviado. Revisa tu bandeja." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: `Error en el servidor - ${error.message}` });
    }
};

//Comprobar token de recuperación
export const comprobarTokenRecuperacion = async (req, res) => {
    try {
        const { token } = req.params;
        const usuario = await prisma.usuario.findFirst({ where: { tokenRecuperacion: token } });
        if (!usuario) return res.status(400).json({ msg: "Token de recuperación inválido" });
        return res.json({ msg: "Token confirmado, ya puedes crear tu nuevo password", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: `Error en el servidor - ${error.message}` });
    }
};

//Crear nueva contraseña
export const nuevaPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { passwordU, confirmarpassword } = req.body;

        if (!passwordU || !confirmarpassword)
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });

        if (passwordU !== confirmarpassword)
            return res.status(400).json({ msg: "Las contraseñas no coinciden" });

        let usuario;

        // 🔹 Recuperación
        if (token) {
            usuario = await prisma.usuario.findFirst({
                where: { tokenRecuperacion: token }
            });

            if (!usuario)
                return res.status(400).json({ msg: "Token inválido" });
        }
        // 🔹 Primer login o cambio normal
        else {
            const usuarioId = req.usuario.id;

            usuario = await prisma.usuario.findUnique({
                where: { id: usuarioId }
            });

            if (!usuario)
                return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        // 🔐 No permitir usar la cédula como password
        if (passwordU === usuario.cedula) {
            return res.status(400).json({
                msg: "La nueva contraseña no puede ser igual a la cédula"
            });
        }

        const passwordHash = await hashPassword(passwordU);

        await prisma.usuario.update({
            where: { id: usuario.id },
            data: {
                passwordU: passwordHash,
                tokenRecuperacion: null,
                tokenRecuperacionExpira: null,
                cambioPassword: false
            }
        });

        return res.json({ msg: "Contraseña actualizada correctamente" });

    } catch (error) {
        return res.status(500).json({
            msg: `Error en el servidor - ${error.message}`
        });
    }
};

//creacion del login
export const login = async (req, res) => {
    try {
        const { correoU, passwordU } = req.body;

        if (!correoU || !passwordU)
            return res.status(400).json({ msg: "Correo y contraseña obligatorios" });

        const usuario = await prisma.usuario.findUnique({
            where: { correoU }
        });

        if (!usuario)
            return res.status(400).json({ msg: "Usuario no existe" });

        if (!usuario.activo)
            return res.status(403).json({ msg: "Usuario desactivado" });

        const valido = await comparePassword(passwordU, usuario.passwordU);

        if (!valido)
            return res.status(400).json({ msg: "Contraseña incorrecta" });

        const token = generarJWT(usuario);

        await prisma.usuario.update({
            where: { id: usuario.id },
            data: { tokenSession: token }
        });

        if (usuario.cambioPassword) {
            return res.json({
                msg: "Debe cambiar su contraseña",
                cambioPassword: true,
                token
            });
        }

        return res.json({
            usuario: {
                id: usuario.id,
                nombreU: usuario.nombreU,
                correoU: usuario.correoU,
                rol: usuario.rol
            },
            token,
            cambioPassword: false
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Error en el servidor - ${error.message}`
        });
    }
};

//Cerrar sesión
export const logout = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;

        await prisma.usuario.update({
            where: { id: usuarioId },
            data: { tokenSession: null }
        });

        return res.json({ msg: "Sesión cerrada correctamente" });

    } catch (error) {
        return res.status(500).json({
            msg: `Error en el servidor - ${error.message}`
        });
    }
};
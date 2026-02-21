import prisma from "../prisma/client.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generarJWT, tokenV } from "../utils/jwt.js";
import { sendMailToRegister, sendMailToRecoveryPassword } from "../config/nodemailer.js";


//Creación de usuario 
export const registro = async (req, res) => {
    try {
        const { nombreU, correoU, cedula, gradoU, passwordU, rol } = req.body;

        // Validar campos
        if (!nombreU || !correoU || !cedula || !gradoU || !passwordU || !rol) {
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
        const passwordHash = await hashPassword(passwordU);

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
                confirmarCorreo: false
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
        if (!passwordU) return res.status(400).json({ msg: "La nueva contraseña es obligatoria" });
        if (passwordU !== confirmarpassword) return res.status(400).json({ msg: "Las contraseñas no coinciden" });

        const usuario = await prisma.usuario.findFirst({ where: { tokenRecuperacion: token } });
        if (!usuario) return res.status(400).json({ msg: "Token de recuperación inválido" });
        const passwordHash = await hashPassword(passwordU);

        await prisma.usuario.update({
            where: { id: usuario.id },
            data: { passwordU: passwordHash, tokenRecuperacion: null }
        });
        return res.json({ msg: "Contraseña actualizada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: `Error en el servidor - ${error.message}` });
    }
};

//creacion del login
export const login = async (req, res) => {
    try {
        const { correoU, passwordU } = req.body;

        const usuario = await prisma.usuario.findUnique({ where: { correoU } });
        if (!usuario) return res.status(400).json({ msg: "Usuario no existe" });

        const valido = await comparePassword(passwordU, usuario.passwordU);
        if (!valido) return res.status(400).json({ msg: "Contraseña incorrecta" });

        // Generar token y actualizar DB
        const token = generarJWT(usuario);
        await prisma.usuario.update({
            where: { id: usuario.id },
            data: { tokenSession: token }
        });

        // ✅ Enviar solo UNA vez la respuesta
        return res.json({ usuario, token });

    } catch (error) {
        // Este catch solo se ejecutará si no se ha enviado respuesta antes
        return res.status(500).json({ msg: `Error en el servidor - ${error.message}` });
    }
};


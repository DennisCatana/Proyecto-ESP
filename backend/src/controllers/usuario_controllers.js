import { comparePassword,hashPassword } from '../utils/bcrypt.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


//Login 

export const login = async (req, res) => {
    const { cedula, password } = req.body

    if (!cedula || !password) {
        return res.status(400).json({
            msg: 'cedula y contraseña son obligatorios'
        })
    }

    try {
        // Buscar usuario por cédula (relación)
        const usuario = await prisma.usuario.findUnique({
            where: { personaCedula: cedula },
            include: {
                persona: {
                    select: {
                        apellidoNombre: true,
                        grado: true,
                    }
                }
            }
        })

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' })
        }

        // Comparar contraseña
        const passwordValido = await comparePassword(password, usuario.password);

        if (!passwordValido) {
            return res.status(401).json({ msg: 'Contraseña incorrecta' })
        }

        // 👇 SI DEBE CAMBIAR CONTRASEÑA
        if (usuario.cambiarPassword) {
            return res.status(403).json({
                msg: "Debe cambiar su contraseña",
                requirePasswordChange: true,
                cedula: usuario.personaCedula
            });
        }

        return res.status(200).json({
            msg: 'Inicio de sesión exitoso',
            usuario: {
                cedula: usuario.personaCedula,
                rol: usuario.rol,
                persona: usuario.persona
            }
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            msg: 'Error al iniciar sesión', error
        })
    }
}


//Cambiar contraseña
export const cambiarPassword = async (req, res) => {
    const { cedula, nuevaPassword, confirmarPassword } = req.body;

    if (!cedula || !nuevaPassword || !confirmarPassword) {
        return res.status(400).json({
            msg: "Datos incompletos"
        });
    }

    if (nuevaPassword !== confirmarPassword) {
        return res.status(400).json({
            msg: "Las contraseñas no coinciden"
        });
    }

    try {
        const passwordHash = await hashPassword(nuevaPassword);

        await prisma.usuario.update({
            where: { personaCedula: cedula },
            data: {
                password: passwordHash,
                cambiarPassword: false
            }
        });

        res.status(200).json({
            msg: "Contraseña actualizada correctamente"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al cambiar contraseña"
        });
    }
};






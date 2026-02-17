import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';

//Login con cédula y password
export const loginConCedula = async (req, res) => {
    const { cedula, password } = req.body

    if (!cedula || !password) {
        return res.status(400).json({
            msg: 'cedula y password son obligatorios'
        })
    }

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { personaCedula: cedula },
            include: {
                persona: {
                    select: {
                        cedula: true,
                        apellidoNombre: true,
                        grado: true,
                    }
                }
            }
        })

        if (!usuario) {
            return res.status(401).json({ msg: 'Usuario incorrecto' })
        }

        const passwordValida = await bcrypt.compare(password, usuario.password)

        if (!passwordValida) {
            return res.status(401).json({ msg: 'Contraseña incorrecta' })
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
            msg: 'Error al iniciar sesión'
        })
    }
}
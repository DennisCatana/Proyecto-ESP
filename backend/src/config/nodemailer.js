import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()


//Credenciales para el envio de correos
export const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP,
    },
})

/*
 * Función genérica para enviar correos
 * @param {string} to - Email del destinatario
 * @param {string} subject - Asunto del correo
 * @param {string} html - Contenido HTML del correo
 */

//Funcion para enviar correos
export const sendMail = async (to, subject, html) => {

    try {
        const info = await transporter.sendMail({
            from: '"RAP" <admin@rap.com>',
            to,
            subject,
            html,
        })
        console.log("✅ Email enviado:", info.messageId)

    } catch (error) {
        console.error("❌ Error enviando email:", error.message)
    }
}

// Función específica para enviar correo de confirmación de registro
export const sendMailToRegister = (userMail, token) => {
    return sendMail(
        userMail,
        "Bienvenido a RAP ",
        `
            <h1>Confirma tu cuenta</h1>
            <p>Hola, haz clic en el siguiente enlace para confirmar tu cuenta:</p>
            <a href="${process.env.URL_BACKEND}confirmar/${token}">
            Confirmar cuenta
            </a>
            <hr>
            <footer>El equipo de RAP te da la más cordial bienvenida.</footer>
        `
    )
}

// Función específica para enviar correo de recuperación de contraseña
export const sendMailToRecoveryPassword = (userMail, token) => {
    return sendMail(
        userMail,
        "Recupera tu contraseña",
        `
            <h1>RAP - 📖</h1>
            <p>Has solicitado restablecer tu contraseña.</p>
            <a href="${process.env.URL_BACKEND}recuperarpassword/${token}">
            Clic para restablecer tu contraseña
            </a>
            <hr>
            <footer>El equipo de RAP te da la más cordial bienvenida.</footer>
        `
    )
}




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

/* =====================================================
   PLANTILLA HTML REUTILIZABLE
===================================================== */

const emailTemplate = ({ title, message, buttonText, buttonLink }) => {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        padding: 20px;
        margin: 0;
    }

    .card {
        background-image: url('https://images2.imgbox.com/11/8e/Dip6iMHj_o.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        border-radius: 8px;
        border: 1px solid #ccc;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        padding: 60px;
        margin: 20px auto;
        max-width: 600px;
        background-color: rgba(255,255,255,0.95);
    }

    header {
        color: #555;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
    }

    h3 {
        color: #333;
        text-align: center;
        margin-top: 15px;
    }

    p {
        color: #555;
        text-align: center;
        font-size: 14px;
    }

    a.button {
        display: block;
        width: 220px;
        margin: 25px auto;
        background-color: #153557;
        color: #fff;
        text-decoration: none;
        text-align: center;
        padding: 12px;
        border-radius: 5px;
        font-weight: bold;
    }

    @media (max-width: 600px) {
        .card {
            padding: 15px;
        }
    }
</style>
</head>

<body>
    <div class="card">
        <header>Escuela Superior de Policía "Gral. Alberto Enríquez</header>
        <header>Gallo"</header>

        <h3>${title}</h3>

        <p>${message}</p>

        <a href="${buttonLink}" class="button">
            ${buttonText}
        </a>

        <p style="font-size:12px; margin-top:20px;">
            Sistema RAP - Registro de Acciones Positivas y Negativas
        </p>
    </div>
</body>
</html>
`
}

/* =====================================================
   CORREO DE CONFIRMACIÓN DE REGISTRO
===================================================== */

export const sendMailToRegister = (userMail, token) => {

    const link = `${process.env.URL_BACKEND}confirmar/${token}`

    return sendMail(
        userMail,
        "Bienvenido a RAP",
        emailTemplate({
            title: "Verificación de Correo",
            message: "Se le ha registrado en el sistema RAP. Confirme su cuenta para poder actualizar su contraseña.",
            buttonText: "Confirmar Cuenta",
            buttonLink: link
        })
    )
}

/* =====================================================
   CORREO DE RECUPERACIÓN DE CONTRASEÑA
===================================================== */

export const sendMailToRecoveryPassword = (userMail, token) => {

    const link = `${process.env.URL_BACKEND}recuperarpassword/${token}`

    return sendMail(
        userMail,
        "Recuperación de Contraseña - RAP",
        emailTemplate({
            title: "Recuperación de Contraseña",
            message: "Ha solicitado restablecer su contraseña. Presione el botón para continuar con el proceso.",
            buttonText: "Restablecer Contraseña",
            buttonLink: link
        })
    )
}




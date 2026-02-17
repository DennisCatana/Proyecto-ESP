import express from 'express'
import { login, cambiarPassword, recuperarPassword } from '../controllers/usuario_controllers.js'

const router = express.Router()

router.post('/auth/login', login)
router.post('/auth/cambiar-password', cambiarPassword)
router.post('/auth/recuperar-password', recuperarPassword)

export default router
import express from 'express'
import { login, cambiarPassword } from '../controllers/usuario_controllers.js'

const router = express.Router()

router.post('/auth/login', login)
router.post('/auth/cambiar-password', cambiarPassword)
export default router
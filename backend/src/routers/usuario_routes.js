import express from 'express'
import { loginConCedula } from '../controllers/usuario_controllers.js'

const router = express.Router()

router.post('/auth/login', loginConCedula)

export default router
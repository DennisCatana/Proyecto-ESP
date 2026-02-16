import express from 'express'
import { registrarPersona } from '../controllers/persona_controllers.js'

const router = express.Router()

router.post('/persona', registrarPersona)

export default router
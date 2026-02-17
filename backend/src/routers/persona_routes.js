import express from 'express'
import { registrarPersona, listarPersonas,actualizarPersona, eliminarPersona } from '../controllers/persona_controllers.js'

const router = express.Router()

router.post('/persona', registrarPersona)
router.get('/persona/lista', listarPersonas)
router.put('/persona/:cedula', actualizarPersona)
router.delete('/persona/:cedula', eliminarPersona)

export default router
import { Router } from "express";
import { registro, confirmarCorreo, recuperarPassword, comprobarTokenRecuperacion, nuevaPassword ,login } from "../controllers/auth_controllers.js";

const router = Router();

router.post("/registro", registro);
router.get("/confirmar/:token", confirmarCorreo);
router.post("/recuperarpassword", recuperarPassword);
router.get("/recuperarpassword/:token", comprobarTokenRecuperacion);
router.post("/nuevapassword/:token", nuevaPassword);



router.post("/login", login);

export default router;
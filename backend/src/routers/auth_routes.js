import { Router } from "express";
import { registro, confirmarCorreo, recuperarPassword, comprobarTokenRecuperacion, nuevaPassword ,login, logout } from "../controllers/auth_controllers.js";
import { protegerRuta } from "../middlewares/auth_middleware.js";

const router = Router();

// Registro y autenticación
router.post("/registro", registro);
router.post("/login", login);

router.post("/logout", protegerRuta, logout);

// Confirmación de correo
router.get("/confirmar/:token", confirmarCorreo);

// Recuperación de contraseña
router.post("/recuperarpassword", recuperarPassword);
router.get("/recuperarpassword/:token", comprobarTokenRecuperacion);
router.post("/nuevapassword/:token", nuevaPassword); //recuperacion

// PRIMER LOGIN O CAMBIO NORMAL (sin token)
router.put("/cambiarpassword", protegerRuta, nuevaPassword);


export default router;
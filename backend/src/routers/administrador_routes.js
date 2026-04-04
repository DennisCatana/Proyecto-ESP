import { Router } from "express";
import { listarAdministradores, crearAdministrador, eliminarTodosAdministradores } from "../controllers/administrador_controllers.js";
import { protegerRuta } from "../middlewares/auth_middleware.js";
import { autorizarRoles } from "../middlewares/role_middleware.js";

const router = Router();

router.get("/", protegerRuta, autorizarRoles("Administrador"), listarAdministradores);
router.post("/crearAdministrador", crearAdministrador);
router.delete("/eliminar-todos", protegerRuta, autorizarRoles("Administrador"), eliminarTodosAdministradores);

export default router;


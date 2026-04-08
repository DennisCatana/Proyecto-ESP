import { Router } from "express";
import { listarAdministradores, crearAdministrador, actualizarAdministrador, eliminarTodosAdministradores } from "../controllers/administrador_controllers.js";
import { protegerRuta } from "../middlewares/auth_middleware.js";
import { autorizarRoles } from "../middlewares/role_middleware.js";

const router = Router();

router.get("/usuarios/administradores",          protegerRuta, autorizarRoles("Administrador"), listarAdministradores);
router.post("/usuarios/administrador",           protegerRuta, autorizarRoles("Administrador"), crearAdministrador);
router.put("/administradores/:id",               protegerRuta, autorizarRoles("Administrador"), actualizarAdministrador);
router.delete("/administradores/eliminar-todos", protegerRuta, autorizarRoles("Administrador"), eliminarTodosAdministradores);

export default router;


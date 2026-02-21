import { Router } from "express";
import { crearUsuario, listarUsuarios, actualizarUsuario, desactivarUsuario } from "../controllers/usuario_controllers.js";
import { protegerRuta } from "../middlewares/auth_middleware.js";
import { autorizarRoles } from "../middlewares/role_middleware.js";

const router = Router();

router.post("/", protegerRuta, autorizarRoles("Administrador"), crearUsuario);
router.get("/", protegerRuta, autorizarRoles("Administrador", "Instructor"), listarUsuarios);
router.put("/:id", protegerRuta, autorizarRoles("Administrador"), actualizarUsuario);
router.delete("/:id", protegerRuta, autorizarRoles("Administrador"), desactivarUsuario);

export default router;
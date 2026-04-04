import { Router } from "express";
import { listarInstructores, crearInstructor, eliminarTodosInstructores } from "../controllers/instructor_controllers.js";
import { protegerRuta } from "../middlewares/auth_middleware.js";
import { autorizarRoles } from "../middlewares/role_middleware.js";

const router = Router();

router.get("/", protegerRuta, autorizarRoles("Administrador"), listarInstructores);
router.post("/", protegerRuta, autorizarRoles("Administrador"), crearInstructor);
router.delete("/eliminar-todos", protegerRuta, autorizarRoles("Administrador"), eliminarTodosInstructores);

export default router;


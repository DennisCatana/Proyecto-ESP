import { Router } from "express";
import { listarInstructores, crearInstructor, actualizarInstructor, eliminarTodosInstructores, bulkUploadInstructores } from "../controllers/instructor_controllers.js";
import { uploadBulk, handleUploadError } from "../middlewares/upload_middleware.js";
import { protegerRuta } from "../middlewares/auth_middleware.js";
import { autorizarRoles } from "../middlewares/role_middleware.js";

const router = Router();

router.get("/usuarios/instructores",          protegerRuta, autorizarRoles("Administrador"), listarInstructores);
router.post("/usuarios/instructor",           protegerRuta, autorizarRoles("Administrador"), crearInstructor);
router.put("/instructores/:id",               protegerRuta, autorizarRoles("Administrador"), actualizarInstructor);
router.delete("/instructores/eliminar-todos", protegerRuta, autorizarRoles("Administrador"), eliminarTodosInstructores);
router.post("/instructores/bulk-upload",      protegerRuta, autorizarRoles("Administrador"), uploadBulk.array('files', 1), handleUploadError, bulkUploadInstructores);

export default router;


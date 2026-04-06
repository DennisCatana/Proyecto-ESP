import { Router } from "express";
import { listarCadetes, crearCadete, actualizarCadete, eliminarCadete, eliminarTodosCadetes, obtenerCadete, obtenerEstadisticasGlobales, bulkUploadCadetes, obtenerMiPerfil, actualizarMiPerfil } from "../controllers/cadete_controllers.js";
import { uploadBulk, handleUploadError } from "../middlewares/upload_middleware.js";
import { protegerRuta } from "../middlewares/auth_middleware.js";
import { autorizarRoles } from "../middlewares/role_middleware.js";

const router = Router();

router.get("/", protegerRuta, autorizarRoles("Administrador", "Instructor"), listarCadetes);
router.get("/cadetes", protegerRuta, autorizarRoles("Administrador", "Instructor"), listarCadetes);

// ⚠️ Rutas fijas SIEMPRE antes de /:id
router.get("/cadetes/mi-perfil",       protegerRuta, autorizarRoles("Cadete", "Administrador"), obtenerMiPerfil);
router.put("/cadetes/mi-perfil",       protegerRuta, autorizarRoles("Cadete", "Administrador"), actualizarMiPerfil);
router.get("/cadetes/estadisticas",    protegerRuta, obtenerEstadisticasGlobales);
router.post("/cadetes/bulk-upload",    protegerRuta, autorizarRoles("Administrador"), uploadBulk.array('files', 1), handleUploadError, bulkUploadCadetes);
router.delete("/cadetes/eliminar-todos", protegerRuta, autorizarRoles("Administrador"), eliminarTodosCadetes);

// CRUD general
router.get("/cadetes/:id", obtenerCadete);
router.post("/cadetes",    protegerRuta, autorizarRoles("Administrador"), crearCadete);
router.put("/cadetes/:id", protegerRuta, autorizarRoles("Administrador"), actualizarCadete);
router.delete("/cadetes/:id", protegerRuta, autorizarRoles("Administrador"), eliminarCadete);




export default router;

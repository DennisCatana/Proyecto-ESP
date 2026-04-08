import { Router } from "express";
import { listarAcciones, registrarAccion, listarAccionesDisciplinarias, obtenerAccionesPorCadete, crearAccionDefinida, actualizarAccionDefinida, eliminarAccionDefinida, eliminarTodasLasAccionesDefinidas, bulkUploadAccionesDefinidas } from "../controllers/accion_controllers.js";
import { uploadEvidencia, uploadBulk, handleUploadError } from "../middlewares/upload_middleware.js"; 
import { protegerRuta } from "../middlewares/auth_middleware.js";
import { autorizarRoles } from "../middlewares/role_middleware.js";


const router = Router();

// Listar acciones definidas - accesible para Instructor, Administrador y Cadete
router.get("/acciones", protegerRuta, autorizarRoles("Administrador", "Instructor", "Cadete"), listarAcciones);

// Listar todas las acciones disciplinarias (registros) - accesible para Instructor y Administrador
router.get("/accionesdisciplinarias", protegerRuta, autorizarRoles("Administrador", "Instructor"), listarAccionesDisciplinarias);

// Obtener acciones de un cadete específico - accesible para Instructor, Administrador y Cadete
router.get("/acciones/:cadeteId", protegerRuta, autorizarRoles("Administrador", "Instructor", "Cadete"), obtenerAccionesPorCadete);

// Registrar una acción aplicada a un cadete - solo Instructor y Administrador
router.post("/registroaccion", protegerRuta, autorizarRoles("Administrador", "Instructor"), uploadEvidencia.single('evidencia'), handleUploadError, registrarAccion);

// Admin CRUD AccionDefinida — rutas fijas ANTES de /:id
router.post("/accionesdefinidas",             protegerRuta, autorizarRoles("Administrador"), crearAccionDefinida);
router.delete("/accionesdefinidas/all",       protegerRuta, autorizarRoles("Administrador"), eliminarTodasLasAccionesDefinidas);
router.post("/accionesdefinidas/bulk-upload", protegerRuta, autorizarRoles("Administrador"), uploadBulk.array('files', 1), handleUploadError, bulkUploadAccionesDefinidas);
router.put("/accionesdefinidas/:id",          protegerRuta, autorizarRoles("Administrador"), actualizarAccionDefinida);
router.delete("/accionesdefinidas/:id",       protegerRuta, autorizarRoles("Administrador"), eliminarAccionDefinida);

export default router;


import { Router } from "express";
import { listarCadetes, crearCadete, actualizarCadete, eliminarCadete, eliminarTodosLosCadetes, obtenerCadete, obtenerEstadisticasGlobales, bulkUploadCadetes, obtenerMiPerfil, actualizarMiPerfil } from "../controllers/cadete_controllers.js";

import { uploadBulk, handleUploadError } from "../middlewares/upload_middleware.js";
import { protegerRuta } from "../middlewares/auth_middleware.js";
import { autorizarRoles } from "../middlewares/role_middleware.js";


const router = Router();

// Perfil del alumno (requiere auth)
router.get("/mi-perfil", protegerRuta, autorizarRoles("Alumno", "Administrador"), obtenerMiPerfil);
router.put("/mi-perfil", protegerRuta, autorizarRoles("Alumno", "Administrador"), actualizarMiPerfil);

// Rutas públicas
router.get("/cadetes", listarCadetes);
router.get("/cadetes/:id", obtenerCadete);
router.get("/estadisticas", obtenerEstadisticasGlobales);

// Rutas protegidas CRUD
router.post("/cadetes", protegerRuta, autorizarRoles("Administrador"), crearCadete);
router.put("/cadetes/:id", protegerRuta, autorizarRoles("Administrador"), actualizarCadete);
router.delete("/cadetes/:id", protegerRuta, autorizarRoles("Administrador"), eliminarCadete);
router.delete("/elimiarcadetes", protegerRuta, autorizarRoles("Administrador"), eliminarTodosLosCadetes);

// Bulk upload
router.post("/cadetes/bulk-upload", protegerRuta, autorizarRoles("Administrador"), uploadBulk.array('files', 1), handleUploadError, bulkUploadCadetes);






export default router;

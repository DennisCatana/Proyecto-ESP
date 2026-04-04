import { Router } from "express";
import { listarAcciones, registrarAccion, listarAccionesDisciplinarias, obtenerAccionesPorCadete, crearAccionDefinida, actualizarAccionDefinida, eliminarAccionDefinida, eliminarTodasLasAccionesDefinidas } from "../controllers/accion_controllers.js";

import { protegerRuta } from "../middlewares/auth_middleware.js";
import { autorizarRoles } from "../middlewares/role_middleware.js";

const router = Router();

// Listar acciones definidas - accesible para Instructor, Administrador y Alumno
router.get("/acciones", protegerRuta, autorizarRoles("Administrador", "Instructor", "Alumno"), listarAcciones);

// Listar todas las acciones disciplinarias (registros) - accesible para Instructor y Administrador
router.get("/accionesdisciplinarias", protegerRuta, autorizarRoles("Administrador", "Instructor"), listarAccionesDisciplinarias);

// Obtener acciones de un cadete específico - accesible para Instructor, Administrador y Alumno
router.get("/acciones/:cadeteId", protegerRuta, autorizarRoles("Administrador", "Instructor", "Alumno"), obtenerAccionesPorCadete);

// Registrar una acción aplicada a un cadete - solo Instructor y Administrador
router.post("/registroaccion", protegerRuta, autorizarRoles("Administrador", "Instructor"), registrarAccion);

// Admin CRUD AccionDefinida
router.post("/accionesdefinidas", protegerRuta, autorizarRoles("Administrador"), crearAccionDefinida);
router.put("/accionesdefinidas/:id", protegerRuta, autorizarRoles("Administrador"), actualizarAccionDefinida);
router.delete("/accionesdefinidas/:id", protegerRuta, autorizarRoles("Administrador"), eliminarAccionDefinida);
router.delete("/accionesdefinidas/all", protegerRuta, autorizarRoles("Administrador"), eliminarTodasLasAccionesDefinidas);

export default router;


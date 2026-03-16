import { Router } from "express";
import { listarCadetes, eliminarTodosLosCadetes, obtenerCadete, obtenerEstadisticasGlobales } from "../controllers/cadete_controllers.js";
import { protegerRuta } from "../middlewares/auth_middleware.js";

const router = Router();

// Rutas públicas
router.get("/cadetes", listarCadetes);
router.get("/cadetes/:id", obtenerCadete);
router.get("/estadisticas", obtenerEstadisticasGlobales);

// Rutas protegidas
router.delete("/elimiarcadetes", protegerRuta, eliminarTodosLosCadetes);



export default router;

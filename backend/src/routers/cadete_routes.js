import { Router } from "express";
import { listarCadetes, eliminarTodosLosCadetes, obtenerCadete } from "../controllers/cadete_controllers.js";
import { protegerRuta } from "../middlewares/auth_middleware.js";

const router = Router();

// Listar cadetes
router.get("/cadetes", listarCadetes);
router.delete("/elimiarcadetes", eliminarTodosLosCadetes);
router.get("/cadetes/:id", protegerRuta, obtenerCadete);



export default router;
import { Router } from "express";
import { listarCadetes, eliminarTodosLosCadetes } from "../controllers/cadete_controllers.js";
import { protegerRuta } from "../middlewares/auth_middleware.js";

const router = Router();

// Listar cadetes
router.get("/cadetes", listarCadetes);
router.delete("/elimiarcadetes", eliminarTodosLosCadetes);



export default router;
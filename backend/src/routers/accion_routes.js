import { Router } from "express";
import { registrarAccion, obtenerAccionesDeCadete, crearAccionDefinida } from "../controllers/accion_controllers.js";
import { protegerRuta } from "../middlewares/auth_middleware.js";

const router = Router();

// Listar cadetes

router.post("/registraraccion", protegerRuta, registrarAccion);
router.post("/definida", protegerRuta, crearAccionDefinida);
router.get("/cadete/:id", protegerRuta, obtenerAccionesDeCadete);


export default router;
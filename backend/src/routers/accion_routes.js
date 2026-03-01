import { Router } from "express";
import { listarAcciones, registrarAccion, obtenerResumenCadete} from "../controllers/accion_controllers.js";
import { protegerRuta } from "../middlewares/auth_middleware.js";

const router = Router();

// Listar acciones definidas
router.get("/acciones", listarAcciones);
// Registrar una acción aplicada a un cadete
router.post("/registroaccion",protegerRuta, registrarAccion);

router.get("/cadeteresumen/:id", obtenerResumenCadete);


export default router;
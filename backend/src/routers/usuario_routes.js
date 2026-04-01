import { Router } from "express";
import { crearUsuario, listarUsuarios, actualizarUsuario, bulkUploadUsuarios, eliminarUsuario, eliminarTodosLosUsuarios } from "../controllers/usuario_controllers.js";
import upload, { handleUploadError } from "../middlewares/upload_middleware.js";

import { protegerRuta } from "../middlewares/auth_middleware.js";
import { autorizarRoles } from "../middlewares/role_middleware.js";

const router = Router();

router.post("/usuarios", protegerRuta, autorizarRoles("Administrador", "Instructor"), crearUsuario);
router.get("/", protegerRuta, autorizarRoles("Administrador", "Instructor"), listarUsuarios);
router.get("/usuarios", protegerRuta, autorizarRoles("Administrador", "Instructor"), listarUsuarios);
router.put("/usuarios/:id", protegerRuta, autorizarRoles("Administrador", "Instructor"), actualizarUsuario);


router.post("/bulk-upload", protegerRuta, autorizarRoles("Administrador"), upload.array('files', 1), handleUploadError, bulkUploadUsuarios);
router.delete("/usuarios/:id", protegerRuta, autorizarRoles("Administrador", "Instructor"), eliminarUsuario);
router.delete("/all", protegerRuta, autorizarRoles("Administrador"), eliminarTodosLosUsuarios);


export default router;
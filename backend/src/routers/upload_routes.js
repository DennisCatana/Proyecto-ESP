import { Router } from "express";
import upload, { handleUploadError } from "../middlewares/upload_middleware.js";
import { uploadEvidencia, eliminarEvidencia } from "../controllers/upload_controller.js";
import { protegerRuta } from "../middlewares/auth_middleware.js";

const router = Router();

// Subir evidencia fotográfica
// Cualquier usuario autenticado puede subir evidencias
router.post(
    "/upload-evidencia",
    protegerRuta,
    upload.single('evidencia'),
    handleUploadError,
    uploadEvidencia
);

// Eliminar evidencia
router.delete(
    "/eliminar-evidencia/:filename",
    protegerRuta,
    eliminarEvidencia
);

export default router;


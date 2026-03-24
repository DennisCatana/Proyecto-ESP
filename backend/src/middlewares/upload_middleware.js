import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── DIRECTORIOS ────────────────────────────────────────────────────────────

const evidenciasDir = path.join(__dirname, '../../uploads/evidencias');
const bulkDir = path.join(__dirname, '../../uploads/bulk');

if (!fs.existsSync(evidenciasDir)) fs.mkdirSync(evidenciasDir, { recursive: true });
if (!fs.existsSync(bulkDir)) fs.mkdirSync(bulkDir, { recursive: true });


// ─── UPLOAD DE IMÁGENES (evidencias) ────────────────────────────────────────

const evidenciaStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, evidenciasDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, 'evidencia-' + uniqueSuffix + ext);
    }
});

const imageFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no válido. Solo se permiten imágenes JPG, JPEG y PNG.'), false);
    }
};

const uploadEvidencia = multer({
    storage: evidenciaStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: imageFilter
});


// ─── UPLOAD DE ARCHIVOS BULK (xlsx / csv) ───────────────────────────────────

const bulkStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, bulkDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, 'bulk-' + uniqueSuffix + ext);
    }
});

const bulkFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel',                                           // .xls
        'text/csv',                                                            // .csv
        'application/csv',
        'text/plain' // algunos sistemas envían csv como text/plain
    ];
    const allowedExts = ['.xlsx', '.xls', '.csv'];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(file.mimetype) || allowedExts.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no válido. Solo se permiten archivos XLSX, XLS o CSV.'), false);
    }
};

const uploadBulk = multer({
    storage: bulkStorage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: bulkFilter
});


// ─── MANEJO DE ERRORES (compartido) ─────────────────────────────────────────

export const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'El archivo es demasiado grande.' });
        }
        return res.status(400).json({ error: err.message });
    } else if (err) {
        return res.status(400).json({ error: err.message });
    }
    next();
};


// ─── EXPORTS ─────────────────────────────────────────────────────────────────

export { uploadEvidencia, uploadBulk };
export default uploadEvidencia; // mantiene compatibilidad con imports existentes
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Endpoint para obtener la ruta de las evidencias
export const uploadEvidencia = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se ha proporcionado ningún archivo' });
        }

        // Devolver la ruta relativa del archivo guardado
        // La ruta se guarda como: /uploads/evidencias/nombre-archivo.jpg
        const rutaRelativa = `/uploads/evidencias/${req.file.filename}`;
        
        return res.status(200).json({
            msg: 'Evidencia subida correctamente',
            ruta_imagen: rutaRelativa,
            filename: req.file.filename
        });
    } catch (error) {
        console.error('Error al subir evidencia:', error);
        return res.status(500).json({ error: 'Error al procesar la evidencia' });
    }
};

// Endpoint para eliminar una evidencia
export const eliminarEvidencia = async (req, res) => {
    try {
        const { filename } = req.params;
        
        if (!filename) {
            return res.status(400).json({ error: 'Nombre de archivo requerido' });
        }

        const uploadDir = path.join(__dirname, '../../uploads/evidencias');
        const filePath = path.join(uploadDir, filename);

        // Verificar si el archivo existe
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return res.status(200).json({ msg: 'Evidencia eliminada correctamente' });
        } else {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar evidencia:', error);
        return res.status(500).json({ error: 'Error al eliminar la evidencia' });
    }
};


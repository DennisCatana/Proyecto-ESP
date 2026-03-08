import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from "./routers/auth_routes.js";
import cadeteRoutes from "./routers/cadete_routes.js";
import accionRoutes from "./routers/accion_routes.js";
import uploadRoutes from "./routers/upload_routes.js";

dotenv.config()

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Compress all responses
app.use(compression());

// CORS configuration - permitir ambos puertos de desarrollo y producción
app.use(cors({
  origin: true, // Permite todas las origins en desarrollo
  credentials: true
}));

//Middleware para parsear JSON - optimized for most common use cases
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Cache control for static assets
app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.set('Cache-Control', 'public, max-age=300');
  }
  next();
});

//Rutas
app.get('/',(req,res)=> res.send("API funcionando correctamente 🚀"))
app.use("/api", authRoutes);
app.use("/api", cadeteRoutes);
app.use("/api", accionRoutes);
app.use("/api", uploadRoutes);



app.use((req,res) =>
  res.status(404).send("Endpoint no encontrado - 404")
)


// Exportar la instancia de express por medio de app
export default app

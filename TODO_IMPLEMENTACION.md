# Plan de Implementación - Sistema Disciplinario

## Estado Actual
- ✅ Interfaz de usuario existente (Disciplina.jsx)
- ✅ Formulario de registro (FormularioRegistro.jsx)
- ✅ Expediente/Historial (ExpedienteCadete.jsx)
- ✅ Base de datos con modelo Accion que tiene `ruta_imagen`
- ✅ Endpoints básicos de acciones

## Pendiente por Implementar

### 1. Backend - Middleware de Roles
- [ ] Actualizar `role_middleware.js` para usar en rutas de acciones
- [ ] Proteger rutas de acciones disciplinarias con control de roles

### 2. Backend - Subida de Archivos
- [ ] Configurar multer para subida de imágenes
- [ ] Crear endpoint `/upload-evidencia`
- [ ] Guardar imágenes en `/uploads/evidencias`

### 3. Backend - Controlador de Acciones
- [ ] Modificar `registrarAccion` para aceptar `ruta_imagen`
- [ ] Agregar filtros al historial de acciones

### 4. Frontend - Control de Acceso por Roles
- [ ] Verificar rol del usuario en componente Disciplina
- [ ] Bloquear acceso si el rol es Alumno
- [ ] Mostrar mensaje de acceso restringido

### 5. Frontend - Evidencia Fotográfica
- [ ] Agregar input de archivo en FormularioRegistro
- [ ] Subir imagen junto con datos del formulario
- [ ] Validar tipo (jpg, png, jpeg) y tamaño (5MB max)

### 6. Frontend - Visualización de Evidencias
- [ ] Mostrar miniatura en tabla de historial
- [ ] Modal para ampliar imagen

---

## Archivos a crear/modificar:

### Backend:
1. `backend/src/middlewares/upload_middleware.js` - Configuración multer
2. `backend/src/controllers/upload_controller.js` - Controlador de uploads
3. `backend/src/routers/upload_routes.js` - Rutas de upload
4. `backend/src/server.js` - Agregar rutas de upload y static files

### Backend (modificar):
1. `backend/src/routers/accion_routes.js` - Agregar middleware de roles
2. `backend/src/controllers/accion_controllers.js` - Agregar ruta_imagen

### Frontend (modificar):
1. `frontend/src/pages/Disciplina.jsx` - Control de roles
2. `frontend/src/components/disciplina/FormularioRegistro.jsx` - Upload de imagen
3. `frontend/src/components/disciplina/ExpedienteCadete.jsx` - Ver imagen

---

## Notas técnicas:
- La base de datos ya tiene el campo `ruta_imagen` en el modelo Accion
- El rol "Alumno" debe ser bloqueado (no "Cadete" como dice el requerimiento - usar rol del sistema)
- El directorio `/uploads/evidencias` debe crearse en el backend


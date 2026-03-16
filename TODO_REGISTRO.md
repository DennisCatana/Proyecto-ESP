# Plan de Mejora - Formulario de Registro de Acciones

## Objetivo
Mejorar el formulario de registro de acciones disciplinarias para incluir:
1. Selector de tipo (Positiva/Negativa)
2. Selección de acción predefinida desde la base de datos
3. Campo de descripción/observación
4. Carga de imagen
5. Mostrar información del oficial que registra
6. Selector de fecha y hora

## Tareas

### Backend
- [x] 1. Modificar accion_controllers.js para aceptar fecha y hora opcionales

### Frontend
- [x] 2. Actualizar FormularioRegistro.jsx con todos los campos
- [x] 3. Actualizar Disciplina.jsx para pasar el usuario actual al formulario

## Resumen de cambios

### Backend (accion_controllers.js)
- Se agregó soporte para `fecha` y `hora` opcionales en el registro de acciones
- Si no se proporcionan, se usa la fecha/hora actual

### Frontend (FormularioRegistro.jsx)
- Selector de tipo (Positiva/Negativa) con botones claros
- Lista de acciones predefinidas filtrada por tipo
- Información del oficial que registra (grado y nombre)
- Selector de fecha y hora opcional (con checkbox para usar fecha actual)
- Campo de descripción/observación
- Carga de imágenes con preview
- Secciones colapsables para mejor UX

### Frontend (Disciplina.jsx)
- Se pasa `oficialActual` al formulario
- Se envía `fecha` y `hora` al backend


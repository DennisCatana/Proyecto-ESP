-- CreateEnum
CREATE TYPE "RolNombre" AS ENUM ('Administrador', 'Instructor', 'Cadete', 'Servicio');

-- CreateEnum
CREATE TYPE "TipoAccion" AS ENUM ('Positiva', 'Negativa');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "RolNombre" NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "cambioPassword" BOOLEAN NOT NULL DEFAULT true,
    "tokenSession" TEXT,
    "tokenVerificacion" TEXT,
    "tokenRecuperacion" TEXT,
    "tokenRecuperacionExpira" TIMESTAMP(3),
    "confirmarCorreo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cadete" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "promocion" TEXT NOT NULL,
    "cia" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "seccion" TEXT NOT NULL,
    "genero" TEXT,
    "habitacion" TEXT,
    "edad" TEXT,
    "grupo_guardia" TEXT,
    "antiguedad" INTEGER,
    "correo" TEXT,
    "telefono" TEXT,
    "fecha_nacimiento" TIMESTAMP(3),
    "seguro_medico" TEXT,
    "numero_emergencia" TEXT,
    "parentesco" TEXT,
    "lugar_nacimiento" TEXT,
    "lugar_residencia" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "existe" BOOLEAN NOT NULL DEFAULT true,
    "puntajeTotal" DECIMAL(7,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cadete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instructor" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "telefono" TEXT,
    "especialidad" TEXT,
    "grado" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administrador" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accion" (
    "id" SERIAL NOT NULL,
    "cadeteId" INTEGER NOT NULL,
    "accionDefinidaId" INTEGER NOT NULL,
    "registradoPorId" INTEGER NOT NULL,
    "observacion" TEXT,
    "puntajeAplicado" DECIMAL(5,2) NOT NULL,
    "puntajeAcumulado" DECIMAL(7,2) NOT NULL,
    "ruta_imagen" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dia" INTEGER,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Accion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccionDefinida" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" "TipoAccion" NOT NULL,
    "puntaje" DOUBLE PRECISION NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccionDefinida_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE INDEX "Usuario_rol_idx" ON "Usuario"("rol");

-- CreateIndex
CREATE INDEX "Usuario_correo_idx" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Cadete_usuarioId_key" ON "Cadete"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Cadete_cedula_key" ON "Cadete"("cedula");

-- CreateIndex
CREATE INDEX "Cadete_cedula_idx" ON "Cadete"("cedula");

-- CreateIndex
CREATE INDEX "Cadete_promocion_idx" ON "Cadete"("promocion");

-- CreateIndex
CREATE INDEX "Cadete_estado_idx" ON "Cadete"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_usuarioId_key" ON "Instructor"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_cedula_key" ON "Instructor"("cedula");

-- CreateIndex
CREATE INDEX "Instructor_cedula_idx" ON "Instructor"("cedula");

-- CreateIndex
CREATE INDEX "Instructor_estado_idx" ON "Instructor"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_usuarioId_key" ON "Administrador"("usuarioId");

-- CreateIndex
CREATE INDEX "Accion_cadeteId_idx" ON "Accion"("cadeteId");

-- CreateIndex
CREATE INDEX "Accion_accionDefinidaId_idx" ON "Accion"("accionDefinidaId");

-- CreateIndex
CREATE INDEX "Accion_registradoPorId_idx" ON "Accion"("registradoPorId");

-- CreateIndex
CREATE INDEX "Accion_fecha_idx" ON "Accion"("fecha");

-- CreateIndex
CREATE UNIQUE INDEX "AccionDefinida_codigo_key" ON "AccionDefinida"("codigo");

-- CreateIndex
CREATE INDEX "AccionDefinida_tipo_idx" ON "AccionDefinida"("tipo");

-- CreateIndex
CREATE INDEX "AccionDefinida_activa_idx" ON "AccionDefinida"("activa");

-- AddForeignKey
ALTER TABLE "Cadete" ADD CONSTRAINT "Cadete_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administrador" ADD CONSTRAINT "Administrador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accion" ADD CONSTRAINT "Accion_accionDefinidaId_fkey" FOREIGN KEY ("accionDefinidaId") REFERENCES "AccionDefinida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accion" ADD CONSTRAINT "Accion_cadeteId_fkey" FOREIGN KEY ("cadeteId") REFERENCES "Cadete"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accion" ADD CONSTRAINT "Accion_registradoPorId_fkey" FOREIGN KEY ("registradoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "RolNombre" AS ENUM ('Administrador', 'Instructor', 'Servicio', 'Alumno');

-- CreateEnum
CREATE TYPE "TipoAccion" AS ENUM ('Positiva', 'Negativa');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "cedula" TEXT NOT NULL,
    "gradoU" TEXT NOT NULL,
    "nombreU" TEXT NOT NULL,
    "correoU" TEXT NOT NULL,
    "passwordU" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "cambioPassword" BOOLEAN NOT NULL DEFAULT false,
    "tokenSession" TEXT,
    "tokenVerificacion" TEXT,
    "confirmarCorreo" BOOLEAN NOT NULL DEFAULT false,
    "rol" "RolNombre" NOT NULL,
    "cadeteId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cadete" (
    "id" SERIAL NOT NULL,
    "orden" TEXT,
    "promocion" TEXT NOT NULL,
    "cia" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "cedula" TEXT NOT NULL,
    "seccion" TEXT NOT NULL,
    "genero" TEXT,
    "habitacion" TEXT,
    "grupo_guardia" TEXT,
    "antiguedad" TEXT,
    "correo" TEXT,
    "telefono" TEXT,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "seguro_medico" TEXT,
    "numero_emergencia" TEXT,
    "parentesco" TEXT,
    "lugar_nacimiento" TEXT,
    "lugar_residencia" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cadete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accion" (
    "id" SERIAL NOT NULL,
    "tipo" "TipoAccion" NOT NULL,
    "descripcion" TEXT NOT NULL,
    "cadeteId" INTEGER NOT NULL,
    "registradoPorId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Accion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cedula_key" ON "Usuario"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nombreU_key" ON "Usuario"("nombreU");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correoU_key" ON "Usuario"("correoU");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cadeteId_key" ON "Usuario"("cadeteId");

-- CreateIndex
CREATE INDEX "Usuario_rol_idx" ON "Usuario"("rol");

-- CreateIndex
CREATE INDEX "Usuario_cedula_idx" ON "Usuario"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Cadete_cedula_key" ON "Cadete"("cedula");

-- CreateIndex
CREATE INDEX "Cadete_cedula_idx" ON "Cadete"("cedula");

-- CreateIndex
CREATE INDEX "Cadete_promocion_idx" ON "Cadete"("promocion");

-- CreateIndex
CREATE INDEX "Cadete_estado_idx" ON "Cadete"("estado");

-- CreateIndex
CREATE INDEX "Accion_cadeteId_idx" ON "Accion"("cadeteId");

-- CreateIndex
CREATE INDEX "Accion_registradoPorId_idx" ON "Accion"("registradoPorId");

-- CreateIndex
CREATE INDEX "Accion_tipo_idx" ON "Accion"("tipo");

-- CreateIndex
CREATE INDEX "Accion_fecha_idx" ON "Accion"("fecha");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_cadeteId_fkey" FOREIGN KEY ("cadeteId") REFERENCES "Cadete"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accion" ADD CONSTRAINT "Accion_cadeteId_fkey" FOREIGN KEY ("cadeteId") REFERENCES "Cadete"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accion" ADD CONSTRAINT "Accion_registradoPorId_fkey" FOREIGN KEY ("registradoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

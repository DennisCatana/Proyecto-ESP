/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Accion` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Accion` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Accion` table. All the data in the column will be lost.
  - Added the required column `accionDefinidaId` to the `Accion` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Accion_tipo_idx";

-- AlterTable
ALTER TABLE "Accion" DROP COLUMN "createdAt",
DROP COLUMN "descripcion",
DROP COLUMN "tipo",
ADD COLUMN     "accionDefinidaId" INTEGER NOT NULL,
ADD COLUMN     "observacion" TEXT;

-- AlterTable
ALTER TABLE "Cadete" ADD COLUMN     "puntajeTotal" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "AccionDefinida" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" "TipoAccion" NOT NULL,
    "puntaje" INTEGER NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccionDefinida_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccionDefinida_codigo_key" ON "AccionDefinida"("codigo");

-- CreateIndex
CREATE INDEX "AccionDefinida_tipo_idx" ON "AccionDefinida"("tipo");

-- CreateIndex
CREATE INDEX "AccionDefinida_activa_idx" ON "AccionDefinida"("activa");

-- CreateIndex
CREATE INDEX "Accion_accionDefinidaId_idx" ON "Accion"("accionDefinidaId");

-- AddForeignKey
ALTER TABLE "Accion" ADD CONSTRAINT "Accion_accionDefinidaId_fkey" FOREIGN KEY ("accionDefinidaId") REFERENCES "AccionDefinida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

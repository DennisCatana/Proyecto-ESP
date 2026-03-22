/*
  Warnings:

  - You are about to alter the column `puntajeTotal` on the `Cadete` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(7,2)`.

*/
-- AlterTable
ALTER TABLE "Cadete" ALTER COLUMN "puntajeTotal" DROP DEFAULT,
ALTER COLUMN "puntajeTotal" SET DATA TYPE DECIMAL(7,2);

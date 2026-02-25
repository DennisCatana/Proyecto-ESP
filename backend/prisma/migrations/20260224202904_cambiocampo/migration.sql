/*
  Warnings:

  - The `antiguedad` column on the `Cadete` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Cadete" DROP COLUMN "antiguedad",
ADD COLUMN     "antiguedad" INTEGER;

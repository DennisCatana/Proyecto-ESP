/*
  Warnings:

  - You are about to drop the column `email` on the `Persona` table. All the data in the column will be lost.
  - You are about to drop the column `confirmEmail` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Usuario` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Persona_email_key";

-- AlterTable
ALTER TABLE "Persona" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "confirmEmail",
DROP COLUMN "token";

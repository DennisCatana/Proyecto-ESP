-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "cambiarPassword" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "rol" DROP DEFAULT;

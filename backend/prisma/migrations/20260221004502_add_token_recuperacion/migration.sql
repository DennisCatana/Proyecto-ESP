-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "tokenRecuperacion" TEXT,
ADD COLUMN     "tokenRecuperacionExpira" TIMESTAMP(3);

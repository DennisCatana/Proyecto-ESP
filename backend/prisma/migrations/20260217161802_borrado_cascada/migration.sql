-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_personaCedula_fkey";

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_personaCedula_fkey" FOREIGN KEY ("personaCedula") REFERENCES "Persona"("cedula") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Administrador', 'Instructor');

-- CreateTable
CREATE TABLE "Persona" (
    "cedula" TEXT NOT NULL,
    "grado" VARCHAR(255),
    "apellidoNombre" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("cedula")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "rol" "Roles" NOT NULL DEFAULT 'Instructor',
    "confirmEmail" BOOLEAN NOT NULL DEFAULT false,
    "token" TEXT,
    "tokenSession" TEXT,
    "personaCedula" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Persona_cedula_key" ON "Persona"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Persona_email_key" ON "Persona"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_tokenSession_key" ON "Usuario"("tokenSession");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_personaCedula_key" ON "Usuario"("personaCedula");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_personaCedula_fkey" FOREIGN KEY ("personaCedula") REFERENCES "Persona"("cedula") ON DELETE RESTRICT ON UPDATE CASCADE;

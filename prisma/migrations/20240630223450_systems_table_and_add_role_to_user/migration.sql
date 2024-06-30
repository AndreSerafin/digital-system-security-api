/*
  Warnings:

  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'SYSTEM_ADMIN', 'TECHNICHAL_MANAGER');

-- CreateEnum
CREATE TYPE "SystemStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "Role" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "systems" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,
    "attendanceEmail" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" "SystemStatus" NOT NULL,
    "lastUpdateJustification" TEXT,
    "lastUpdateAuthorId" TEXT,
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "systems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "systems" ADD CONSTRAINT "systems_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

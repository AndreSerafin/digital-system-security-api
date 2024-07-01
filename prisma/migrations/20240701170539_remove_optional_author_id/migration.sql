/*
  Warnings:

  - Made the column `authorId` on table `systems` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "systems" DROP CONSTRAINT "systems_authorId_fkey";

-- AlterTable
ALTER TABLE "systems" ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "systems" ADD CONSTRAINT "systems_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

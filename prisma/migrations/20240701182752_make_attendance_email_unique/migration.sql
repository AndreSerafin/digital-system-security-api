/*
  Warnings:

  - A unique constraint covering the columns `[attendanceEmail]` on the table `systems` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "systems_attendanceEmail_key" ON "systems"("attendanceEmail");

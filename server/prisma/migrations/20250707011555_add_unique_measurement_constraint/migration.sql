/*
  Warnings:

  - A unique constraint covering the columns `[date,userId]` on the table `measurements` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "measurements_date_userId_key" ON "measurements"("date", "userId");

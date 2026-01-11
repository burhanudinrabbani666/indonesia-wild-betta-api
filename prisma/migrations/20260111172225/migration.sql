/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Betta` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Betta_slug_key" ON "Betta"("slug");

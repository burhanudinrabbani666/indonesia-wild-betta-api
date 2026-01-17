/*
  Warnings:

  - You are about to drop the column `complex_slug` on the `Betta` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Betta` table. All the data in the column will be lost.
  - You are about to drop the column `ph_water` on the `Betta` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Betta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Betta" DROP COLUMN "complex_slug",
DROP COLUMN "created_at",
DROP COLUMN "ph_water",
DROP COLUMN "updated_at",
ADD COLUMN     "complexSlug" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "phWater" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

/*
  Warnings:

  - You are about to drop the column `positionId` on the `City` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cityId]` on the table `Position` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cityId` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_positionId_fkey";

-- DropIndex
DROP INDEX "City_positionId_key";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "positionId";

-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "cityId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Position_cityId_key" ON "Position"("cityId");

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

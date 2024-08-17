/*
  Warnings:

  - You are about to drop the column `hospitalName` on the `Hospital` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fullName]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullName` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Hospital_hospitalName_key";

-- AlterTable
ALTER TABLE "Hospital" DROP COLUMN "hospitalName",
ADD COLUMN     "fullName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_fullName_key" ON "Hospital"("fullName");

/*
  Warnings:

  - You are about to drop the column `payment_status` on the `HealthConnect_Appointment` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PAYMENT_STATUS" AS ENUM ('PENDING', 'SUCCESSFULL', 'FAILED');

-- AlterTable
ALTER TABLE "HealthConnect_Appointment" DROP COLUMN "payment_status",
ADD COLUMN     "paymentStatus" "PAYMENT_STATUS" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "paymentVerifiedAt" DROP NOT NULL,
ALTER COLUMN "transactionId" DROP NOT NULL;

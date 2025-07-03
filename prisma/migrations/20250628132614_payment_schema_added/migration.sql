/*
  Warnings:

  - Added the required column `paymentVerifiedAt` to the `HealthConnect_Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_status` to the `HealthConnect_Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `HealthConnect_Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HealthConnect_Appointment" ADD COLUMN     "paymentVerifiedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "payment_status" BOOLEAN NOT NULL,
ADD COLUMN     "transactionId" TEXT NOT NULL;

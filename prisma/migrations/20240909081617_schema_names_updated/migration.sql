/*
  Warnings:

  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doctor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hospital` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "HEALTHCONNECT_STATUS" AS ENUM ('SCHEDULED', 'PENDING', 'CANCELLED', 'DONE');

-- CreateEnum
CREATE TYPE "HEALTHCONNECT_SPECIALIZATION" AS ENUM ('NA', 'Family_Medicine', 'Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'Neurology', 'Obstetrics', 'Oncology', 'Orthopedics', 'Pediatrics', 'Psychiatry', 'Surgery');

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_hospitalId_fkey";

-- DropTable
DROP TABLE "Appointment";

-- DropTable
DROP TABLE "Doctor";

-- DropTable
DROP TABLE "Hospital";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "SPECIALIZATION";

-- DropEnum
DROP TYPE "STATUS";

-- CreateTable
CREATE TABLE "HealthConnect_User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "HealthConnect_User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthConnect_Hospital" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "HealthConnect_Hospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthConnect_Doctor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialization" "HEALTHCONNECT_SPECIALIZATION" NOT NULL DEFAULT 'NA',
    "hospitalId" TEXT NOT NULL,

    CONSTRAINT "HealthConnect_Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthConnect_Appointment" (
    "id" TEXT NOT NULL,
    "doctorSpecialization" "HEALTHCONNECT_SPECIALIZATION" NOT NULL DEFAULT 'NA',
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL DEFAULT 'NA',
    "doctorId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "status" "HEALTHCONNECT_STATUS" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "HealthConnect_Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HealthConnect_User_email_key" ON "HealthConnect_User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "HealthConnect_User_phoneNumber_key" ON "HealthConnect_User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "HealthConnect_Hospital_fullName_key" ON "HealthConnect_Hospital"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "HealthConnect_Hospital_email_key" ON "HealthConnect_Hospital"("email");

-- CreateIndex
CREATE UNIQUE INDEX "HealthConnect_Hospital_phoneNumber_key" ON "HealthConnect_Hospital"("phoneNumber");

-- AddForeignKey
ALTER TABLE "HealthConnect_Doctor" ADD CONSTRAINT "HealthConnect_Doctor_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "HealthConnect_Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthConnect_Appointment" ADD CONSTRAINT "HealthConnect_Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "HealthConnect_Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthConnect_Appointment" ADD CONSTRAINT "HealthConnect_Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "HealthConnect_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthConnect_Appointment" ADD CONSTRAINT "HealthConnect_Appointment_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "HealthConnect_Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

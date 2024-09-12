-- AlterTable
ALTER TABLE "HealthConnect_Hospital" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "HealthConnect_User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

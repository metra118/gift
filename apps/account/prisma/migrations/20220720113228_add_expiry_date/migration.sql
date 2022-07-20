/*
  Warnings:

  - Added the required column `expiry_date` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "expiry_date" VARCHAR(5) NOT NULL;

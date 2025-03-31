/*
  Warnings:

  - You are about to drop the column `indurstry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "indurstry",
ADD COLUMN     "industry" TEXT;

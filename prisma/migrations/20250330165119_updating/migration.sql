/*
  Warnings:

  - Changed the type of `demandLevel` on the `IndustryInsight` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `marketOutlook` on the `IndustryInsight` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Assessment_userId_key";

-- DropIndex
DROP INDEX "coverLetter_userId_key";

-- AlterTable
ALTER TABLE "IndustryInsight" DROP COLUMN "demandLevel",
ADD COLUMN     "demandLevel" "DemandLevel" NOT NULL,
DROP COLUMN "marketOutlook",
ADD COLUMN     "marketOutlook" "MarketOutlook" NOT NULL;

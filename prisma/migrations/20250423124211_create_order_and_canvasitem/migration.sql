/*
  Warnings:

  - You are about to drop the column `first_Name` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `last_Name` on the `Order` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "first_Name",
DROP COLUMN "last_Name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

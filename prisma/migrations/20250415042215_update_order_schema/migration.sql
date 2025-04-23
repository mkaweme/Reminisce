/*
  Warnings:

  - You are about to drop the column `canvasSizes` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `photos` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantities` on the `Order` table. All the data in the column will be lost.
  - Added the required column `delivery` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "canvasSizes",
DROP COLUMN "contact",
DROP COLUMN "photos",
DROP COLUMN "price",
DROP COLUMN "quantities",
ADD COLUMN     "delivery" BOOLEAN NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "CanvasItem" (
    "id" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "CanvasItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CanvasItem" ADD CONSTRAINT "CanvasItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

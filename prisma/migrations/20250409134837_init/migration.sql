-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "first_Name" TEXT NOT NULL,
    "last_Name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "Latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "photos" TEXT[],
    "canvasSizes" TEXT[],
    "quantities" INTEGER[],
    "price" DOUBLE PRECISION NOT NULL,
    "orderID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

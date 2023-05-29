-- CreateEnum
CREATE TYPE "route_status" AS ENUM ('PREPARING', 'PROCESSING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "transport_status" AS ENUM ('FREE', 'BUSY');

-- CreateEnum
CREATE TYPE "transport_type" AS ENUM ('TRUCK', 'SHIP', 'PLAN', 'TRAIN');

-- CreateTable
CREATE TABLE "route" (
    "id" SERIAL NOT NULL,
    "cityStart" VARCHAR,
    "cityEnd" VARCHAR,
    "distanceBetweenCities" INTEGER,
    "sendingDate" TIMESTAMP(6),
    "deliveryDate" TIMESTAMP(6),
    "transportType" "transport_type" NOT NULL,
    "revenue" INTEGER,
    "transportId" INTEGER NOT NULL,
    "status" "route_status" NOT NULL,

    CONSTRAINT "route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transport" (
    "id" SERIAL NOT NULL,
    "licensePlate" VARCHAR,
    "status" "transport_status" NOT NULL,
    "model" VARCHAR,
    "purchaseDate" TIMESTAMP(6),
    "mileage" INTEGER,
    "type" "transport_type" NOT NULL,

    CONSTRAINT "transport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transport_licensePlate_key" ON "transport"("licensePlate");

-- AddForeignKey
ALTER TABLE "route" ADD CONSTRAINT "route_transportId_fkey" FOREIGN KEY ("transportId") REFERENCES "transport"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

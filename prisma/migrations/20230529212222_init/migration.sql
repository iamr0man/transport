/*
  Warnings:

  - A unique constraint covering the columns `[status]` on the table `route` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "route_status_key" ON "route"("status");

/*
  Warnings:

  - You are about to drop the column `delivery_address` on the `shipment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."shipment" DROP COLUMN "delivery_address";

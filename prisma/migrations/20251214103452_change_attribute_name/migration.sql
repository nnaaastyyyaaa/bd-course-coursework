/*
  Warnings:

  - The primary key for the `review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."review" DROP CONSTRAINT "review_pkey",
DROP COLUMN "id",
ADD COLUMN     "review_id" SERIAL NOT NULL,
ADD CONSTRAINT "review_pkey" PRIMARY KEY ("review_id");

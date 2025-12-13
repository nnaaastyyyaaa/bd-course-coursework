-- AlterTable
ALTER TABLE "public"."product" ALTER COLUMN "stock_status" SET DEFAULT 'in stock';

-- AlterTable
ALTER TABLE "public"."shipment" ALTER COLUMN "shipping_date" DROP DEFAULT;

-- CreateEnum
CREATE TYPE "public"."methods" AS ENUM ('by card', 'online', 'by cash on delivery');

-- CreateEnum
CREATE TYPE "public"."payment_status_name" AS ENUM ('paid', 'not paid');

-- CreateEnum
CREATE TYPE "public"."role_name" AS ENUM ('admin', 'courier', 'operator', 'manager');

-- CreateEnum
CREATE TYPE "public"."status_name" AS ENUM ('confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');

-- CreateEnum
CREATE TYPE "public"."stock_status_name" AS ENUM ('in stock', 'out of stock', 'coming soon');

-- CreateTable
CREATE TABLE "public"."address" (
    "address_id" SERIAL NOT NULL,
    "country" VARCHAR(32) NOT NULL,
    "city" VARCHAR(32) NOT NULL,
    "street" VARCHAR(32) NOT NULL,
    "postal_code" VARCHAR(32) NOT NULL,
    "client_id" INTEGER NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "public"."category" (
    "category_id" SERIAL NOT NULL,
    "category_name" VARCHAR(32) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "public"."client" (
    "client_id" SERIAL NOT NULL,
    "client_name" VARCHAR(32) NOT NULL,
    "last_name" VARCHAR(32) NOT NULL,
    "email" VARCHAR(32) NOT NULL,
    "phone_number" VARCHAR(20),

    CONSTRAINT "client_pkey" PRIMARY KEY ("client_id")
);

-- CreateTable
CREATE TABLE "public"."order_item" (
    "order_item_id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("order_item_id")
);

-- CreateTable
CREATE TABLE "public"."orders" (
    "order_id" SERIAL NOT NULL,
    "order_date" DATE NOT NULL DEFAULT CURRENT_DATE,
    "order_price" INTEGER NOT NULL,
    "status" "public"."status_name" NOT NULL,
    "discount" INTEGER,
    "client_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "worker_id" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "public"."payment" (
    "payment_id" SERIAL NOT NULL,
    "payment_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_method" "public"."methods" NOT NULL,
    "payment_status" "public"."payment_status_name" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "order_id" INTEGER NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "public"."product" (
    "product_id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "stock_status" "public"."stock_status_name" NOT NULL,
    "image_url" TEXT,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "public"."shipment" (
    "shipment_id" SERIAL NOT NULL,
    "carrier" TEXT,
    "tracking_number" TEXT,
    "shipment_status" VARCHAR(50) NOT NULL DEFAULT 'processing',
    "shipping_date" DATE,
    "delivery_address" TEXT NOT NULL,
    "order_id" INTEGER NOT NULL,
    "worker_id" INTEGER,

    CONSTRAINT "shipment_pkey" PRIMARY KEY ("shipment_id")
);

-- CreateTable
CREATE TABLE "public"."worker" (
    "worker_id" SERIAL NOT NULL,
    "worker_role" "public"."role_name" NOT NULL,
    "first_name" VARCHAR(32) NOT NULL,
    "last_name" VARCHAR(32) NOT NULL,
    "phone_number" VARCHAR(13),

    CONSTRAINT "worker_pkey" PRIMARY KEY ("worker_id")
);

-- CreateTable
CREATE TABLE "public"."review" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "product_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_order_item" ON "public"."order_item"("order_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "shipment_tracking_number_key" ON "public"."shipment"("tracking_number");

-- CreateIndex
CREATE UNIQUE INDEX "worker_phone_number_key" ON "public"."worker"("phone_number");

-- AddForeignKey
ALTER TABLE "public"."address" ADD CONSTRAINT "address_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."client"("client_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."order_item" ADD CONSTRAINT "order_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."client"("client_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "public"."worker"("worker_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."payment" ADD CONSTRAINT "payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."shipment" ADD CONSTRAINT "shipment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."shipment" ADD CONSTRAINT "shipment_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "public"."worker"("worker_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."review" ADD CONSTRAINT "review_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."client"("client_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."review" ADD CONSTRAINT "review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

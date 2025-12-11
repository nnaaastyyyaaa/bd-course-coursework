-- DropForeignKey
ALTER TABLE "public"."address" DROP CONSTRAINT "address_client_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."address" ADD CONSTRAINT "address_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."client"("client_id") ON DELETE CASCADE ON UPDATE NO ACTION;

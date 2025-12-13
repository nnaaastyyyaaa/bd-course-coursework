-- AlterTable
ALTER TABLE "orders" 
ADD CONSTRAINT order_price_check
CHECK (order_price >= 0);

ALTER TABLE "orders" 
ADD CONSTRAINT discount_check
CHECK (discount >= 0 AND discount <= 100);

ALTER TABLE "product" 
ADD CONSTRAINT product_price_check
CHECK (price >= 0);

ALTER TABLE "product" 
ADD CONSTRAINT quantity_check
CHECK (quantity >= 0);

ALTER TABLE "order_item" 
ADD CONSTRAINT quantity_check
CHECK (quantity >= 0);

ALTER TABLE "payment" 
ADD CONSTRAINT price_check
CHECK (price >= 0);
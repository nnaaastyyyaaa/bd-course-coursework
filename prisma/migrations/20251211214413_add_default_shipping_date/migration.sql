-- This is an empty migration.
ALTER TABLE "shipment"
  ALTER COLUMN "shipping_date"
  SET DEFAULT (CURRENT_DATE + INTERVAL '5 days');

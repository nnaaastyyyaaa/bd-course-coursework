-- This is an empty migration.
ALTER TABLE "client"
ADD CONSTRAINT email_check
CHECK (email LIKE '_%@_%._%');

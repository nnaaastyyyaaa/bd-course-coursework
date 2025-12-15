-- This is an empty migration.

ALTER TABLE "review" 
ADD CONSTRAINT review_rating_check
CHECK (rating >= 0 AND rating <= 5);